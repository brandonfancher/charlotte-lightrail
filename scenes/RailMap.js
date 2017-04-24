import React from 'react';
import { AppState, NetInfo, Platform, StatusBar, StyleSheet, View, DeviceEventEmitter } from 'react-native';
import Mapbox, { MapView } from 'react-native-mapbox-gl';
import moment from 'moment';
import { blueStops, mapboxApiKey, timeInterval, SIMULATE_DISCONNECTED } from '../helpers/config';
import { identifyDevice } from '../helpers/helpers';
import { distanceTimeConverter, getNextTrainTime } from '../helpers/scheduleCalcs';
import { blueLine, getAnnotations, getStopCallouts } from '../helpers/mapSetup';
import { mapboxDistanceAPI } from '../helpers/mapboxDistanceAPI';
import MapOverlay from '../components/MapOverlay';

// OS-specific imports
let QuickActions;
if (Platform.OS === 'ios') {
  QuickActions = require('react-native-quick-actions');
}

const userDefaults = Platform.select({
  ios: require('react-native-user-defaults').default,
  android: null,
});

Mapbox.setAccessToken(mapboxApiKey);

// Set default map center and zoom coordinates
const device = identifyDevice();
let defaultCenter;
let defaultZoom;
if (device === 'iPhone 6+') {
  defaultCenter = { latitude: 35.12848262558094, longitude: -80.84703007335676 };
  defaultZoom = 10.35016331854935;
} else if (device === 'iPhone 5') {
  defaultCenter = { latitude: 35.09018630471958, longitude: -80.84307324707783 };
  defaultZoom = 9.228717656576594;
} else {
  defaultCenter = { latitude: 35.12642689061146, longitude: -80.8549019571087 };
  defaultZoom = 10.10400032344327;
}

export default class RailMap extends React.Component {
  state = {
    annotations: [...getAnnotations(), {
      coordinates: blueLine,
      type: 'polyline',
      strokeColor: '#009ada',
      strokeWidth: 4,
      strokeAlpha: 0.9,
      id: 'foobar',
    }],
    center: defaultCenter,
    connected: true,
    error: null,
    lastAppUpdate: null,
    loading: true,
    locationDenied: false,
    locationError: true,
    mode: 'walking', // could be 'driving' or 'walking'
    nearestStationIndex: null,
    connectionDetected: true,
    stationDistances: null,
    ...getStopCallouts(), // inject stop callouts generated above into initial state object
    zoom: defaultZoom,
  }

  componentDidMount() {
    this.interval = setInterval(this.keepTime, timeInterval);

    if (Platform.OS === 'android') {
      this.fetchDistances('walking');
    } else {
      this.setDefaultDirections();
    }

    // Managing App State (active, background, inactive, etc.)
    AppState.addEventListener('change', (appState) => {
      const elapsedSinceLastUpdate = moment().diff(this.state.lastAppUpdate, 'seconds');
      // If the app is going inactive or to the background, set locationError to true. That prevents an edge-case
      // mapbox bug. If the user backgrounds the app and either disables or somehow loses location services, the
      // app would crash on resume because the mapbox map would try to display a location that doesn't exist. So on
      // background, we tell it to stop displaying location and on resume, we check for location and display it IF we have it.
      // We must record the maps last center and zoom level so that it doesn't reset the zoom when it re-renders after locationError changes.
      if (appState !== 'active') {
        this.mapRef.getCenterCoordinateZoomLevel((coords) => {
          const { latitude, longitude, zoom } = coords;
          this.setState({
            center: { latitude, longitude },
            locationError: true,
            zoom,
          });
        });
      }
      if (appState === 'active' && elapsedSinceLastUpdate <= 120) {
        // By calling this no arguments, we check for location without re-fetching or otherwise setting up the app again.
        this.getPosition();
      }
      if (appState === 'active' && elapsedSinceLastUpdate > 120) {
        // If the app has been inactive for more than 2 min, refresh everything so their info is up to date.
        this.fetchDistances();
      }
    });

    // Listen for connection change and set state accordingly
    NetInfo.isConnected.addEventListener('change', (connectionDetected) => {
      this.setState({ connectionDetected });
    });
  }

  componentWillUnmount() {
    clearInterval(this.interval);
    AppState.removeEventListener('change');
    NetInfo.isConnected.removeEventListener('change');
  }

  onRegionChange = (location) => {
    this.setState({ currentZoom: location.zoom });
  }

  onOpenAnnotation = (annotation) => {
    // When user opens an annotation, display the times above for that station
    const { stationDistances } = this.state;
    const stationIndex = blueStops.indexOf(blueStops.find(stop => stop.mapLabel === annotation.title));
    const station = stationDistances[stationIndex];
    this.getCalloutTrainTime(station);
  }

  setDefaultDirections = () => {
    const action = QuickActions.popInitialAction();

    if (action) {
      this.fetchDistances(action.type === 'co.TeamLuna.CharlotteLightRail.drive' ? 'driving' : 'walking');
      if (action.type === 'co.TeamLuna.CharlotteLightRail.drive') {
        userDefaults.set('SavedDirectionsChoice', 'driving');
      } else {
        userDefaults.set('SavedDirectionsChoice', 'walking');
      }
    } else {
      userDefaults.get('SavedDirectionsChoice')
        .then(data => this.fetchDistances(data))
        .catch((err) => {
          this.fetchDistances('walking');
          console.log('No saved mode preference found. Default to walking. Error: ', err);
        });
    }
  // If an event is emitted then lets set the default
    DeviceEventEmitter.addListener(
      'quickActionShortcut', (quickAction) => {
        if (quickAction.type === 'co.TeamLuna.CharlotteLightRail.drive') {
          this.fetchDistances('driving');
        } else {
          this.fetchDistances('walking');
        }
      });
  }

  keepTime = () => {
    // NEW FOR ALL STATIONS
    const stopsRequiringUpdate = {};
    blueStops.forEach((stop, index) => {
      const stopCallout = this.state[`stopCallout${index}`];
      const nextInbound = getNextTrainTime('inbound', index);
      const nextOutbound = getNextTrainTime('outbound', index);
      const inboundTimeChanged = stopCallout.inbound.time !== nextInbound.time;
      const inboundDeltaChanged = stopCallout.inbound.delta !== nextInbound.delta;
      const outboundTimeChanged = stopCallout.outbound.time !== nextOutbound.time;
      const outboundDeltaChanged = stopCallout.outbound.delta !== nextOutbound.delta;
      const shouldUpdate = (inboundTimeChanged || inboundDeltaChanged || outboundTimeChanged || outboundDeltaChanged);

      if (shouldUpdate) {
        stopsRequiringUpdate[`stopCallout${index}`] = {
          ...this.state[`stopCallout${index}`],
          inbound: nextInbound,
          outbound: nextOutbound,
        };
      }
    });
    this.setState(stopsRequiringUpdate);
  }

  seeAllStations = () => {
    this.mapRef.setCenterCoordinateZoomLevel(defaultCenter.latitude, defaultCenter.longitude, defaultZoom);
  }

  showCallout = (stopNum, stationDistances = this.state.stationDistances) => {
    // Swiping to new station while fetching closest station can, under some circumstances, call showCallout()
    // while stationDistances is null. This if block protects against errors in those cases
    if (!this.state.loading) {
      const stopInfo = blueStops[stopNum];
      const { latitude, longitude } = stopInfo.latlng;
      const zoomLatitude = device === 'iPhone 5' ? latitude - 0.001 : latitude; // adjust zoom alignment on iPhone 5s
      const doZoom = () => this.mapRef.setCenterCoordinateZoomLevel(zoomLatitude, longitude, 13.1857257019792);
      const station = stationDistances[stopNum];
      this.getCalloutTrainTime(station, doZoom);
    }
  }

  // Change the color of the nearest station marker so that it sticks out to user
  setNearestMarkerColor = (newNearestIndex) => {
    const oldNearestIndex = this.state.nearestStationIndex;
    // If the nearest station has changed...
    if (newNearestIndex !== oldNearestIndex) {
      // If there is a newNearestIndex (if user is online), change the color of the new nearest station marker to green.
      if (newNearestIndex !== null) {
        this.setState({
          annotations: [
            ...this.state.annotations,
            {
              coordinates: [blueStops[newNearestIndex].latlng.latitude, blueStops[newNearestIndex].latlng.longitude],
              type: 'point',
              title: blueStops[newNearestIndex].mapLabel,
              annotationImage: {
                source: {
                  uri: 'greenmarker',
                },
                height: 32,
                width: 32,
              },
              id: `marker-${newNearestIndex}`,
            },
          ],
        });
      }
      // If there was a nearest station already, change its marker color back to blue.
      if (oldNearestIndex !== null) {
        this.setState({
          annotations: [
            ...this.state.annotations,
            {
              coordinates: [blueStops[oldNearestIndex].latlng.latitude, blueStops[oldNearestIndex].latlng.longitude],
              type: 'point',
              title: blueStops[oldNearestIndex].mapLabel,
              annotationImage: {
                source: {
                  uri: 'bluemarker',
                },
                height: 32,
                width: 32,
              },
              id: `marker-${oldNearestIndex}`,
            },
          ],
        });
      }
    }
  }

  setUpDisconnectedState = (mode) => {
    const stationDistances = [];
    blueStops.forEach((stop, index) => stationDistances.push({ duration: 60, durationText: '---', index }));

    const stopCallouts = {};
    blueStops.forEach((stop, index) => {
      const nextInbound = getNextTrainTime('inbound', index);
      const nextOutbound = getNextTrainTime('outbound', index);
      stopCallouts[`stopCallout${index}`] = {
        durationText: '---',
        inbound: nextInbound,
        outbound: nextOutbound,
      };
    });

    // set station marker colors
    this.setNearestMarkerColor(null);

    this.setState({
      connected: false,
      loading: false,
      mode,
      stationDistances,
      ...stopCallouts,
      nearestStationIndex: null,
    });

    // Show nearest station callout. We pass stationDistances because sometimes showCallout() gets
    // called before the setState above happens, and showCallout depends on stationDistances.
    this.showCallout(0, stationDistances);
  }

  setUpConnectedState = (position, mode) => {
    const origin = [position.coords.longitude, position.coords.latitude];
    const destinations = blueStops
      .map(stop => [stop.latlng.longitude, stop.latlng.latitude]);

    mapboxDistanceAPI.getDistance(origin, destinations, mode)
      .then((res) => {
        const stationDistances = res.durations[0]
          .slice(1) // get rid of first item, which is the distance of current location to itself (0)
          .map((duration, index) => ({ index, duration, durationText: distanceTimeConverter(duration) })); // this index is used to map to blueStops index

        const nearestStation = stationDistances.reduce((prev, curr) => {
          if (prev.duration < curr.duration) {
            return prev;
          }
          return curr;
        });
        const nearestIndex = nearestStation.index;

        // set station marker colors
        this.setNearestMarkerColor(nearestIndex);

        const updatedStationDistances = {};
        stationDistances.forEach((stop, index) => {
          updatedStationDistances[`stopCallout${index}`] = {
            ...this.state[`stopCallout${index}`],
            durationText: distanceTimeConverter(stationDistances[index].duration),
            inbound: getNextTrainTime('inbound', index),
            outbound: getNextTrainTime('outbound', index),
          };
        });

        this.setState({
          ...updatedStationDistances,
          connected: true,
          loading: false,
          nearestStationIndex: nearestIndex,
          stationDistances,
        });

        // Show nearest station callout. We pass stationDistances because sometimes showCallout() gets
        // called before the setState above happens, and showCallout depends on stationDistances.
        this.showCallout(nearestIndex, stationDistances);
      })
      .catch((err) => {
        this.setState({ error: 'mapboxDistanceAPI' });
        console.log('Request failed', err);
      });
  }

  getPosition = (setUpApp, mode = this.state.mode) => {
    navigator.geolocation.getCurrentPosition((position) => {
      this.setState({
        locationDenied: false,
        locationError: false,
      }, () => setUpApp && this.setUpConnectedState(position, mode));
    }, (error) => { // second arg to getCurrentPosition() is an error callback
      // Error Code 1: User denied access to location services
      // Error Code 2: Location services disabled
      // Error Code 3: Timeout
      if (error.code === 1) {
        this.setState({
          locationDenied: true,
          locationError: true,
        }, () => setUpApp && this.setUpDisconnectedState(mode));
      } else {
        this.setState({
          locationDenied: false,
          locationError: true,
        }, () => setUpApp && this.setUpDisconnectedState(mode));
      }
      // this.setState({ error: error.message })
      console.log("User's position not acquired: ", error.message);
    }, { // third arg to getCurrentPosition() is the settings for the position
      enableHighAccuracy: true,
      timeout: 20000,
      maximumAge: 1000,
    });
  }

  fetchDistances = (mode = this.state.mode) => {
    this.setState({
      lastAppUpdate: moment(),
      loading: true,
      mode,
      stationDistances: null,
    });

    if (SIMULATE_DISCONNECTED || !this.state.connectionDetected) {
      this.setUpDisconnectedState(mode);
    } else {
      this.getPosition(true, mode);
    }
  }

  getCalloutTrainTime = (station, doZoom) => {
    this.setState({ activeStationIndex: station.index },
      doZoom ? () => doZoom() : null
    );
  }

  render() {
    const { activeStationIndex, annotations, center, connected, error, loading, locationDenied, locationError, nearestStationIndex, stationDistances, zoom } = this.state;

    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="blue" barStyle="light-content" />
        <View style={styles.visible}>
          <MapView
            annotations={annotations}
            annotationsAreImmutable
            attributionButtonIsHidden
            initialCenterCoordinate={center}
            compassIsHidden
            initialDirection={0}
            logoIsHidden
            onOpenAnnotation={this.onOpenAnnotation}
            onRegionDidChange={this.onRegionChange} // onRegionWillChange?
            onRightAnnotationTapped={this.onRightAnnotationTapped}
            ref={map => this.mapRef = map}
            rotateEnabled={false}
            scrollEnabled
            showsUserLocation={!locationError}
            style={styles.container}
            styleURL={Mapbox.mapStyles.streets}
            userTrackingMode={Mapbox.userTrackingMode.none}
            zoomEnabled
            initialZoomLevel={zoom}
          />
        </View>
        <MapOverlay
          activeStationIndex={activeStationIndex}
          connected={connected}
          error={error}
          fetchNearest={this.fetchDistances}
          loading={loading}
          locationDenied={locationDenied}
          mode={this.state.mode}
          nearestStationIndex={nearestStationIndex}
          seeAllStations={this.seeAllStations}
          showCallout={this.showCallout}
          stationDistances={stationDistances}
          stopCallout0={this.state.stopCallout0}
          stopCallout1={this.state.stopCallout1}
          stopCallout2={this.state.stopCallout2}
          stopCallout3={this.state.stopCallout3}
          stopCallout4={this.state.stopCallout4}
          stopCallout5={this.state.stopCallout5}
          stopCallout6={this.state.stopCallout6}
          stopCallout7={this.state.stopCallout7}
          stopCallout8={this.state.stopCallout8}
          stopCallout9={this.state.stopCallout9}
          stopCallout10={this.state.stopCallout10}
          stopCallout11={this.state.stopCallout11}
          stopCallout12={this.state.stopCallout12}
          stopCallout13={this.state.stopCallout13}
          stopCallout14={this.state.stopCallout14}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  visible: {
    opacity: 1,
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
});
