import React from 'react';
import PropTypes from 'prop-types';
import { ScrollView, View } from 'react-native';
import { deviceProps } from 'helpers/device';
import { blueStops } from 'helpers/config';
import { mapboxIcon } from 'assets/icons/mapbox-icon';
import StationCard from '../StationCard';
import AttributionButton from '../AttributionButton';
import {
  AttributionView, BottomSectionView, CalloutSectionView,
  CreditSectionView, MapboxIconImage
} from './StationSliderCss';

export default class StationSlider extends React.Component {

  static propTypes = {
    activeStationIndex: PropTypes.number,
    connected: PropTypes.bool.isRequired,
    loading: PropTypes.bool.isRequired,
    mode: PropTypes.string.isRequired,
    nearestStationIndex: PropTypes.number,
    showCallout: PropTypes.func.isRequired,
    stationDistances: PropTypes.array,
    navigation: PropTypes.object.isRequired
  }

  state = {
    stationIndex: 0
  }

  componentWillReceiveProps(nextProps) {
    const { activeStationIndex } = this.props;
    const scrollView = this.stationScrollView;

    const newStationIndexProp = (activeStationIndex !== nextProps.activeStationIndex);
    const newStationIndexState = (nextProps.activeStationIndex !== this.state.stationIndex);

    if (newStationIndexProp && newStationIndexState) {
      // console.group('Indexes')
      // console.debug('stationIndex: ', this.state.stationIndex)
      // console.debug('activeStationIndex: ', nextProps.activeStationIndex)
      // console.groupEnd()

      // console.group(newStationIndexProp && newStationIndexState)
      // console.log('newStationIndexProp: ', newStationIndexProp)
      // console.log('newStationIndexState: ', newStationIndexState)
      // console.groupEnd()

      scrollView.scrollTo({
        x: nextProps.activeStationIndex * deviceProps.deviceScreen.width,
        y: 0,
        animated: true
      });
    }
  }

  componentWillUnmount() {
    // Clean up any open timeouts when unmounting
    clearTimeout(this.delayShowCallout);
  }

  zoomToMarker = (e) => {
    // console.log('zoomToMarker(): SCROLL ANIMATION END')

    // If we call this more than once quickly, bail out of the earlier showCallout calls
    clearTimeout(this.delayShowCallout);

    // Figure out which station the ScrollView ended up on and set that state
    const { showCallout } = this.props;
    const offset = e.nativeEvent.contentOffset.x;
    const scrollViewWidth = e.nativeEvent.layoutMeasurement.width;
    const stationIndex = Math.abs(Math.round(offset / scrollViewWidth));
    this.setState({ stationIndex });

    // Set a delay so that we guarantee componentWillReceiveProps has updated stationIndex state
    // before it gets the updated activeStationIndex from Railmap so it can decide whether to change
    // the scrollTo position or not. This prevents crazy conditions where ScrollView bounces around
    // without end.
    this.delayShowCallout = setTimeout(() => showCallout(stationIndex), 100);
  }

  panToStation = (direction) => {
    clearTimeout(this.delayShowCallout);
    const { stationIndex } = this.state;
    const { showCallout } = this.props;
    this.delayShowCallout = setTimeout(() => showCallout(stationIndex + direction), 100);
  }

  render() {
    // console.log('StationSlider rendered')
    const { connected, loading, mode, nearestStationIndex, stationDistances, navigation } = this.props;
    return (
      <BottomSectionView>
        <CalloutSectionView>
          <ScrollView
            automaticallyAdjustContentInsets={false}
            horizontal
            onMomentumScrollEnd={this.zoomToMarker}
            pagingEnabled
            ref={scrollView => this.stationScrollView = scrollView}
          >
            {blueStops.map((stop, index) => (
              <StationCard
                connected={connected}
                stationIndex={index}
                key={`nearestStationInfo-${index}`}
                loading={loading}
                mode={mode}
                nearestStationIndex={nearestStationIndex}
                panToStation={this.panToStation}
                stationDistances={stationDistances}
                stopCallout={this.props[`stopCallout${index}`]}
                navigation={navigation}
              />
            ))}
          </ScrollView>
        </CalloutSectionView>
        <CreditSectionView>
          <AttributionView>
            <MapboxIconImage source={{ uri: mapboxIcon }} />
          </AttributionView>
          <View style={{ flex: 1 }} />
          <AttributionButton />
        </CreditSectionView>
      </BottomSectionView>
    );
  }
}
