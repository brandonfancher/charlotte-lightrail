import React from 'react';
import PropTypes from 'prop-types';
import { ActivityIndicator, Image } from 'react-native';
import { blueStops } from 'helpers/config';
import { startNavigation } from 'helpers/helpers';
import { deviceProps } from 'helpers/device';
import DirectionsButton from '../DirectionsButton';
import {
  NearestContainerView, TriangleView, InfoContainerView,
  ArrowWrapperTouchableOpacity, ArrowWrapperView,
  LeftArrowView, RightArrowView, StationLabelContainerView,
  StationLabelText, SmallGrayText, TimesContainerView,
  NextBlockView, NextTimeText, ButtonContainerView, ButtonsView,
  BubbleTouchableOpacity, LoadingWrapperView, LoadingText,
  NextTimeWrapView
} from './StationCardCss';

export default class StationCard extends React.Component {

  static propTypes = {
    connected: PropTypes.bool.isRequired,
    loading: PropTypes.bool.isRequired,
    mode: PropTypes.string.isRequired,
    nearestStationIndex: PropTypes.number,
    panToStation: PropTypes.func.isRequired,
    stationDistances: PropTypes.array,
    stationIndex: PropTypes.number,
    stopCallout: PropTypes.object,
    navigation: PropTypes.shape({
      navigate: PropTypes.func.isRequired
    })
  }

  renderDistanceText = () => {
    const { stationIndex, stationDistances, mode } = this.props;
    if (stationDistances && stationDistances[stationIndex].duration) {
      return `${stationDistances[stationIndex].durationText} ${mode === 'driving' ? 'drive' : 'walk'}`;
    }
    return null;
  }

  render() {
    const { connected, loading, mode, nearestStationIndex, panToStation, stationIndex, stopCallout } = this.props;
    const { navigate } = this.props.navigation;
    const stop = blueStops[stationIndex];
    const onNearestStation = stationIndex === nearestStationIndex;
    if (stopCallout && stopCallout.inbound && !loading) {
      return (
        <NearestContainerView key={`nearestContainer-${stationIndex}`}>
          <TriangleView />
          <InfoContainerView>
            {stationIndex > 0
              ?
                <ArrowWrapperTouchableOpacity onPress={() => panToStation(-1)}>
                  <LeftArrowView />
                </ArrowWrapperTouchableOpacity>
              :
                <ArrowWrapperView>
                  <LeftArrowView disabled />
                </ArrowWrapperView>
            }
            <StationLabelContainerView>
              <StationLabelText allowFontScaling={false}>{stop.mapLabel}</StationLabelText>
              {connected && <SmallGrayText allowFontScaling={false}>
                {onNearestStation && deviceProps.deviceVariableSizes['nearestStationText']}{this.renderDistanceText()}
              </SmallGrayText>}
            </StationLabelContainerView>
            {stationIndex < blueStops.length - 1
              ?
                <ArrowWrapperTouchableOpacity onPress={() => panToStation(1)}>
                  <RightArrowView />
                </ArrowWrapperTouchableOpacity>
              :
                <ArrowWrapperView>
                  <RightArrowView disabled />
                </ArrowWrapperView>
            }
          </InfoContainerView>
          <TimesContainerView>
            <NextBlockView>
              <SmallGrayText allowFontScaling={false}>Northbound</SmallGrayText>
              <NextTimeWrapView>
                <NextTimeText allowFontScaling={false}>{stopCallout.inbound.time}</NextTimeText>
              </NextTimeWrapView>
              <SmallGrayText allowFontScaling={false}>{stopCallout.inbound.delta}</SmallGrayText>
            </NextBlockView>

            <NextBlockView>
              <SmallGrayText allowFontScaling={false}>Southbound</SmallGrayText>
              <NextTimeWrapView>
                <NextTimeText allowFontScaling={false}>{stopCallout.outbound.time}</NextTimeText>
              </NextTimeWrapView>
              <SmallGrayText allowFontScaling={false}>{stopCallout.outbound.delta}</SmallGrayText>
            </NextBlockView>
          </TimesContainerView>

          <ButtonContainerView>
            <ButtonsView>
              <BubbleTouchableOpacity onPress={() => navigate('StationDetail', { activeCallout: stopCallout, stop })}>
                <Image
                  source={require('assets/icons/info/ic_info_white_36pt.png')}
                />
              </BubbleTouchableOpacity>
              <BubbleTouchableOpacity onPress={() => navigate('StationSchedule', { activeStationIndex: stationIndex, loading, stopCallout })}>
                <Image
                  source={require('assets/icons/schedule/ic_schedule_white_36pt.png')}
                />
              </BubbleTouchableOpacity>
              <DirectionsButton onPress={() => startNavigation(mode, stop.latlng)} />
            </ButtonsView>
          </ButtonContainerView>
        </NearestContainerView>
      );
    }

    return (
      <NearestContainerView>
        <TriangleView />
        <LoadingWrapperView>
          <ActivityIndicator size="large" />
          <LoadingText allowFontScaling={false}>
            {connected ? 'Finding nearest station...' : 'Loading...'}
          </LoadingText>
        </LoadingWrapperView>
      </NearestContainerView>
    );
  }
}
