import React, { AppStateIOS, NetInfo, StatusBar, StyleSheet, View, DeviceEventEmitter } from 'react-native'
import QuickActions from 'react-native-quick-actions'
import Mapbox from 'react-native-mapbox-gl'
import moment from 'moment'
import { blueStops, blueLine, identifyDevice, mapboxApiKey, timeInterval, SIMULATE_DISCONNECTED } from '../helpers/config'
import { distanceTimeConverter, mapboxDistanceAPI } from '../helpers/mapboxDistanceAPI'
import MapOverlay from '../components/MapOverlay'
import userDefaults from 'react-native-user-defaults'

const mapRef = 'mapRef'

// Set default map center and zoom coordinates
const device = identifyDevice()
let defaultCenter
let defaultZoom
if (device === 'iPhone 6+') {
  defaultCenter = { latitude: 35.12848262558094, longitude: -80.84703007335676 }
  defaultZoom = 10.35016331854935
} else if (device === 'iPhone 5') {
  defaultCenter = { latitude: 35.09018630471958, longitude: -80.84307324707783 }
  defaultZoom = 9.228717656576594
} else {
  defaultCenter = { latitude: 35.12642689061146, longitude: -80.8549019571087 }
  defaultZoom = 10.10400032344327
}

const annotations = blueStops.map((stop, index) => ({
  coordinates: [stop.latlng.latitude, stop.latlng.longitude],
  type: 'point',
  title: stop.mapLabel,
  annotationImage: {
    url: 'image!blueMarker',
    height: 32,
    width: 32
  },
  id: `marker-${index}`
}))

export const RailMap = React.createClass({
  mixins: [Mapbox.Mixin],
  propTypes: {
    navigationState: React.PropTypes.object.isRequired
  },

  getInitialState () {
    // Set up initial callouts state
    const stopCallouts = {}
    blueStops.forEach((stop, index) => {
      const nextInbound = this.getNextTrainTime('inbound', index)
      const nextOutbound = this.getNextTrainTime('outbound', index)
      stopCallouts[`stopCallout${index}`] = {
        durationText: null,
        inbound: nextInbound,
        outbound: nextOutbound
      }
    })

    return {
      annotations: [...annotations, {
        'coordinates': blueLine,
        'type': 'polyline',
        'strokeColor': '#009ada',
        'strokeWidth': 4,
        'strokeAlpha': 0.9,
        'id': 'foobar'
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
      stationDistances: null,
      ...stopCallouts, // inject stop callouts generated above into initial state object
      zoom: defaultZoom
    }
  },

  onRegionChange (location) {
    this.setState({ currentZoom: location.zoom })
  },

  onOpenAnnotation (annotation) {
    // When user opens an annotation, display the times above for that station
    const { stationDistances } = this.state
    const stationIndex = blueStops.indexOf(blueStops.find(stop => stop.mapLabel === annotation.title))
    const station = stationDistances[stationIndex]
    this.getCalloutTrainTime(station)
  },

  setDefaultDirections () {
    let action = QuickActions.popInitialAction()

    if (action) {
      this.fetchDistances(action.type === "co.TeamLuna.CharlotteLightRail.drive" ? 'driving' : 'walking')
      action.type === "co.TeamLuna.CharlotteLightRail.drive" ? (userDefaults.set('SavedDirectionsChoice', 'driving')) : (userDefaults.set('SavedDirectionsChoice', 'walking'))
    } else {
      userDefaults.get('SavedDirectionsChoice')
        .then(data => {
          this.fetchDistances(data)
        })
        .catch(err => {
          this.fetchDistances('walking')
          console.log('No saved mode preference found. Default to walking. Error: ', err)
        })
    }
  //if an event is emitted then lets set the default
    DeviceEventEmitter.addListener(
      'quickActionShortcut', (action) => {
        (action.type === "co.TeamLuna.CharlotteLightRail.drive") ? this.fetchDistances('driving') : this.fetchDistances('walking')
      });
  },

  componentDidMount () {

    this.interval = setInterval(this.keepTime, timeInterval)

    this.setDefaultDirections()

    // Managing App State (active, background, inactive, etc.)
    AppStateIOS.addEventListener('change', appState => {
      const elapsedSinceLastUpdate = moment().diff(this.state.lastAppUpdate, 'seconds')
      // If the app is going inactive or to the background, set locationError to true. That prevents an edge-case
      // mapbox bug. If the user backgrounds the app and either disables or somehow loses location services, the
      // app would crash on resume because the mapbox map would try to display a location that doesn't exist. So on
      // background, we tell it to stop displaying location and on resume, we check for location and display it IF we have it.
      // We must record the maps last center and zoom level so that it doesn't reset the zoom when it re-renders after locationError changes.
      if (appState !== 'active') {
        this.getCenterCoordinateZoomLevel('mapRef', coords => {
          const { latitude, longitude, zoom } = coords
          this.setState({
            center: { latitude, longitude },
            locationError: true,
            zoom
          })
        })
      }
      if (appState === 'active' && elapsedSinceLastUpdate <= 120) {
        // By calling this no arguments, we check for location without re-fetching or otherwise setting up the app again.
        this.getPosition()
      }
      if (appState === 'active' && elapsedSinceLastUpdate > 120) {
        // If the app has been inactive for more than 2 min, refresh everything so their info is up to date.
        this.fetchDistances()
      }
    })
  },

  componentWillUnmount () {
    clearInterval(this.interval)
    AppStateIOS.removeEventListener('change')
  },

  keepTime () {
    // NEW FOR ALL STATIONS
    const stopsRequiringUpdate = {}
    blueStops.forEach((stop, index) => {
      const stopCallout = this.state[`stopCallout${index}`]
      const nextInbound = this.getNextTrainTime('inbound', index)
      const nextOutbound = this.getNextTrainTime('outbound', index)
      const inboundTimeChanged = stopCallout.inbound.time !== nextInbound.time
      const inboundDeltaChanged = stopCallout.inbound.delta !== nextInbound.delta
      const outboundTimeChanged = stopCallout.outbound.time !== nextOutbound.time
      const outboundDeltaChanged = stopCallout.outbound.delta !== nextOutbound.delta
      const shouldUpdate = (inboundTimeChanged || inboundDeltaChanged || outboundTimeChanged || outboundDeltaChanged)

      if (shouldUpdate) {
        stopsRequiringUpdate[`stopCallout${index}`] = {
          ...this.state[`stopCallout${index}`],
          inbound: nextInbound,
          outbound: nextOutbound
        }
      }
    })
    this.setState(stopsRequiringUpdate)
  },

  seeAllStations () {
    this.setCenterCoordinateZoomLevelAnimated('mapRef', defaultCenter.latitude, defaultCenter.longitude, defaultZoom)
  },

  showCallout (stopNum, stationDistances = this.state.stationDistances) {
    // Swiping to new station while fetching closest station can, under some circumstances, call showCallout()
    // while stationDistances is null. This if block protects against errors in those cases
    if (!this.state.loading) {
      const stopInfo = blueStops[stopNum]
      const { latitude, longitude } = stopInfo.latlng
      const zoomLatitude = device === 'iPhone 5' ? latitude - 0.001 : latitude // adjust zoom alignment on iPhone 5s
      const doZoom = () => this.setCenterCoordinateZoomLevelAnimated('mapRef', zoomLatitude, longitude, 13.1857257019792)
      const station = stationDistances[stopNum]
      this.getCalloutTrainTime(station, doZoom)
    }
  },

  // Change the color of the nearest station marker so that it sticks out to user
  setNearestMarkerColor (newNearestIndex) {
    const oldNearestIndex = this.state.nearestStationIndex
    // If the nearest station has changed...
    if (newNearestIndex !== oldNearestIndex) {
      // If there is a newNearestIndex (if user is online), change the color of the new nearest station marker to green.
      if (newNearestIndex !== null) {
        this.updateAnnotation('mapRef', {
          coordinates: [blueStops[newNearestIndex].latlng.latitude, blueStops[newNearestIndex].latlng.longitude],
          type: 'point',
          title: blueStops[newNearestIndex].mapLabel,
          annotationImage: {
            url: 'image!greenMarker',
            height: 32,
            width: 32
          },
          id: `marker-${newNearestIndex}`
        })
      }
      // If there was a nearest station already, change its marker color back to blue.
      if (oldNearestIndex !== null) {
        this.updateAnnotation('mapRef', {
          coordinates: [blueStops[oldNearestIndex].latlng.latitude, blueStops[oldNearestIndex].latlng.longitude],
          type: 'point',
          title: blueStops[oldNearestIndex].mapLabel,
          annotationImage: {
            url: 'image!blueMarker',
            height: 32,
            width: 32
          },
          id: `marker-${oldNearestIndex}`
        })
      }
    }
  },

  setUpDisconnectedState (mode) {
    const stationDistances = []
    blueStops.forEach((stop, index) => stationDistances.push({ duration: 60, durationText: '---', index }))

    const stopCallouts = {}
    blueStops.forEach((stop, index) => {
      const nextInbound = this.getNextTrainTime('inbound', index)
      const nextOutbound = this.getNextTrainTime('outbound', index)
      stopCallouts[`stopCallout${index}`] = {
        durationText: '---',
        inbound: nextInbound,
        outbound: nextOutbound
      }
    })

    // set station marker colors
    this.setNearestMarkerColor(null)

    this.setState({
      connected: false,
      loading: false,
      mode,
      stationDistances,
      ...stopCallouts,
      nearestStationIndex: null
    })

    // Show nearest station callout. We pass stationDistances because sometimes showCallout() gets
    // called before the setState above happens, and showCallout depends on stationDistances.
    this.showCallout(0, stationDistances)
  },

  setUpConnectedState (position, mode) {
    const origin = [position.coords.longitude, position.coords.latitude]
    const destinations = blueStops
      .map(stop => [stop.latlng.longitude, stop.latlng.latitude])

    mapboxDistanceAPI.getDistance(origin, destinations, mode)
      .then(res => {
        const stationDistances = res.durations[0]
          .slice(1) // get rid of first item, which is the distance of current location to itself (0)
          .map((duration, index) => ({ index, duration, durationText: distanceTimeConverter(duration) })) // this index is used to map to blueStops index

        const nearestStation = stationDistances.reduce((prev, curr) => {
          return prev.duration < curr.duration ? prev : curr
        })
        const nearestIndex = nearestStation.index

        // set station marker colors
        this.setNearestMarkerColor(nearestIndex)

        const updatedStationDistances = {}
        stationDistances.forEach((stop, index) => {
          updatedStationDistances[`stopCallout${index}`] = {
            ...this.state[`stopCallout${index}`],
            durationText: distanceTimeConverter(stationDistances[index].duration),
            inbound: this.getNextTrainTime('inbound', index),
            outbound: this.getNextTrainTime('outbound', index)
          }
        })

        this.setState({
          ...updatedStationDistances,
          connected: true,
          loading: false,
          nearestStationIndex: nearestIndex,
          stationDistances
        })

        // Show nearest station callout. We pass stationDistances because sometimes showCallout() gets
        // called before the setState above happens, and showCallout depends on stationDistances.
        this.showCallout(nearestIndex, stationDistances)
      })
      .catch(err => {
        this.setState({ error: 'mapboxDistanceAPI' })
        console.log('Request failed', err)
      })
  },

  getPosition (setUpApp, mode = this.state.mode) {
    navigator.geolocation.getCurrentPosition(position => {
      this.setState({
        locationDenied: false,
        locationError: false
      }, () => setUpApp && this.setUpConnectedState(position, mode))
    }, error => { // second arg to getCurrentPosition() is an error callback
      // Error Code 1: User denied access to location services
      // Error Code 2: Location services disabled
      // Error Code 3: Timeout
      if (error.code === 1) {
        this.setState({
          locationDenied: true,
          locationError: true
        }, () => setUpApp && this.setUpDisconnectedState(mode))
      } else {
        this.setState({
          locationDenied: false,
          locationError: true
        }, () => setUpApp && this.setUpDisconnectedState(mode))
      }
      // this.setState({ error: error.message })
      console.log("User's position not acquired: ", error.message)
    }, { // third arg to getCurrentPosition() is the settings for the position
      enableHighAccuracy: true, timeout: 20000, maximumAge: 1000
    })
  },

  fetchDistances (mode = this.state.mode) {
    this.setState({
      lastAppUpdate: moment(),
      loading: true,
      mode,
      stationDistances: null
    })

    // Check network connectivity and set up app accordingly
    NetInfo.fetch().done(connectivity => {
      let connectedState = connectivity === 'none' || connectivity === 'unknown'
      if (SIMULATE_DISCONNECTED) {
        connectedState = !connectedState
      }

      if (connectedState) {
        this.setUpDisconnectedState(mode)
      } else {
        this.getPosition(true, mode)
      }
    })
  },

  getNextTrainTime (direction, stationIndex) {
    const targetStation = blueStops[stationIndex]

    let day = moment().day()
    let time = moment().format('HH:mm')

    const getTime = (firstOrLast, dayOfWeek) => {
      let getTime = targetStation[`${direction}${dayOfWeek}`]
        .filter(time => time !== 'no stop')
      if (firstOrLast === 'last' && getTime[getTime.length - 1] < '12:00') {
        return getTime[getTime.length - 1]
      } else if (firstOrLast === 'last') {
        return '00:00'
      }
      return getTime[0]
    }

    // Based on current time and day of week, determine which schedule should be in effect.
    let targetSchedule
    if ((day === 6 && time > getTime('last', 'Weekday')) || (day === 0 && time <= getTime('first', 'Sunday'))) {
      targetSchedule = `${direction}Saturday`
    } else if ((day === 0 && time > getTime('last', 'Saturday')) || (day === 1 && time <= getTime('first', 'Weekday'))) {
      targetSchedule = `${direction}Sunday`
    } else {
      targetSchedule = `${direction}Weekday`
    }

    // Filter out the 'no stops' and sort from earliest time to latest so that we can get the next train time.
    const schedule = targetStation[targetSchedule]
      .filter(time => time !== 'no stop')
      .sort()

    const firstTrain = moment(schedule[0], 'HH:mm')
    const nextTrain = schedule
      .map(time => moment(time, 'HH:mm'))
      .find(time => time.isAfter(moment()))

    // If there's no scheduled time after the current time, then default to the first time
    const nextTrainTime = nextTrain ? nextTrain.format('LT') : firstTrain.format('LT')
    const nextTrainDelta = nextTrain ? nextTrain.fromNow() : firstTrain.add(1, 'days').fromNow()
    return { time: nextTrainTime, delta: nextTrainDelta }
  },

  getCalloutTrainTime (station, doZoom) {
    // console.debug(station)
    this.setState({ activeStationIndex: station.index }, doZoom && doZoom())
  },

  render () {
    // console.log('RailMap rendered')
    const { activeStationIndex, annotations, center, connected, error, loading, locationDenied, locationError, nearestStationIndex, stationDistances, zoom } = this.state
    const { navigationState } = this.props
    const navState = navigationState.children[navigationState.index]

    return (
      <View style={styles.container}>
        <StatusBar
         backgroundColor='blue'
         barStyle='light-content'
       />
        <View style={[styles.visible, navState.name !== 'home' && styles.invisible]}>
          <Mapbox
            accessToken={mapboxApiKey}
            annotations={annotations}
            attributionButtonIsHidden
            centerCoordinate={center}
            compassIsHidden
            direction={0}
            logoIsHidden
            onOpenAnnotation={this.onOpenAnnotation}
            onRegionChange={this.onRegionChange}
            onRightAnnotationTapped={this.onRightAnnotationTapped}
            ref={mapRef}
            rotateEnabled={false}
            scrollEnabled
            showsUserLocation={!locationError}
            style={styles.container}
            styleURL='mapbox://styles/mapbox/streets-v9'
            userTrackingMode={this.userTrackingMode.none}
            zoomEnabled
            zoomLevel={zoom}
          />
        </View>
        {/* The other option is to detect when the router switches to a dummy component and toggle a child component. */}
        {/* If we're on the 'home' route, show the overlay. Otherwise, hide it. */}
        {/* TODO: Figure out how to pass the stopCallouts down in a more sane way. */}
        {navState.name === 'home' &&
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
        }
      </View>
    )
  }
})

var styles = StyleSheet.create({
  container: {
    flex: 1
  },
  visible: {
    opacity: 1,
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  },
  invisible: {
    opacity: 0
  }
})
