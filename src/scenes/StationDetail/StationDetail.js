/* eslint-disable max-len */
import React from 'react';
import PropTypes from 'prop-types';
import { View, Image } from 'react-native';
import {
  FeaturesContainerView, FeaturesText, FeaturesTextItemView,
  FeaturesWrapperScrollView, IconImageView, NextBlockView,
  NextTimeBoldText, SmallText, SubtitleText, TabView, TimesContainerView
} from './StationDetailCss';

export default class StationDetail extends React.Component {

  static propTypes = {
    navigation: PropTypes.shape({
      state: PropTypes.shape({
        params: PropTypes.shape({
          activeCallout: PropTypes.object.isRequired,
          stop: PropTypes.object.isRequired
        })
      })
    })
  }

  renderStationFeatures = () => {
    const { stop } = this.props.navigation.state.params;
    return (
      <FeaturesWrapperScrollView>
        {stop.stationFeatures.map((feature, index) =>
          <FeaturesContainerView key={`feature-${index}`}>
            <IconImageView>
              <Image source={feature.icon} />
            </IconImageView>
            <FeaturesTextItemView>
              <FeaturesText allowFontScaling={false} key={`station-feature-${index}`}>{feature.featureDesc}</FeaturesText>
            </FeaturesTextItemView>
          </FeaturesContainerView>
        )}
      </FeaturesWrapperScrollView>
    );
  }

  render() {
    const { activeCallout, stop } = this.props.navigation.state.params;
    const nextInboundTime = activeCallout.inbound.time;
    const nextInboundDelta = activeCallout.inbound.delta;
    const nextOutboundTime = activeCallout.outbound.time;
    const nextOutboundDelta = activeCallout.outbound.delta;

    return (
      <TabView>
        <TimesContainerView>
          <NextBlockView>
            <SmallText allowFontScaling={false}>Next Inbound</SmallText>
            <NextTimeBoldText allowFontScaling={false}>{nextInboundTime}</NextTimeBoldText>
            <SmallText allowFontScaling={false}>{nextInboundDelta}</SmallText>
          </NextBlockView>
          <NextBlockView>
            <SmallText allowFontScaling={false}>Next Outbound</SmallText>
            <NextTimeBoldText allowFontScaling={false}>{nextOutboundTime}</NextTimeBoldText>
            <SmallText allowFontScaling={false}>{nextOutboundDelta}</SmallText>
          </NextBlockView>
        </TimesContainerView>
        {stop.mapLabel && <SubtitleText allowFontScaling={false}>{stop.mapLabel}</SubtitleText>}
        <View style={{ flex: 1 }}>
          {this.renderStationFeatures()}
        </View>
      </TabView>
    );
  }
}
