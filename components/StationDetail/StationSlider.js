import React from 'react';
import { Dimensions, Image, ScrollView, StyleSheet, View } from 'react-native';
import StationCard from './StationCard';
import AttributionButton from '../AttributionButton';
import { blueStops } from '../../helpers/config';

const deviceScreen = Dimensions.get('window');
const mapboxIcon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIIAAAAoCAMAAAAFWtJHAAAAwFBMVEUAAAAAAAAAAABtbW0AAAAAAAAAAAAAAAAAAAAAAAClpaUAAADp6ekAAAD5+fna2toAAAAMDAzv7+/Nzc0AAAA2Njb8/Pz9/f3T09MAAAAAAAD7+/sAAAArKyuxsbH39/fs7OwbGxuIiIjz8/N8fHyenp7u7u74+PgAAAC8vLxWVlbx8fF1dXXl5eVcXFyUlJTQ0NDFxcVCQkLAwMC4uLj19fXo6OjW1tarq6ve3t77+/vi4uL6+vrKysrNzc3///8w7gSSAAAAP3RSTlMAOQNdPSYBPywKexLLGPCxNEHXnzFL+v2nGwf1IEiE6dBFad9jd9PuLo1V2mDDV3Cjl06SiuXIq4C3973ym6BQMVUPAAAEXElEQVR4Ae2WCVP6OBiH05L0l1IqrVbkKHJ54I0oHn+PfP9vtUle0z/YdhbH2XVnd58ZnRJIeHiPJOx//mH4vQSAN+8FjAhFxgHIaPvJeZ99hxwEElon5iAQbj85Y98g8ODwjEOMAvGFyeE3FEKgodTBqj0BJGN9DhyNd5Ta3ean9QEopfaA+LsKhnEKRExqg4FSP6Og7oEkAjBWnxSCgBX4xF+kcLoPcOBQrSv0e5kH7s1j37jECQieCTPiFGxL5VHw2zQWCeeJiPt6kjRQw0XSkIdVChf67xGa4alSnZlT6HEQ8CK9ANbhvXUF9xlDkBfTuHDWScgC9+z5FQpPI12TlwC6+sV7ixR8CUMKiwjm2GQeOQWHMGuHGdbnObJAwCEqFJpNU5H6uaPUaEIKiQfg+PHk1+u4OwW9PlWW2ctbA4BHCtp+cNK+H8Jos4gDmC5ar4Nx9waaG/2B13NgDqS7+vm2RgEtEws82P+kwIHhs/pgkQKcFIhfd7CogtGNjYMHTLpurD0ERbYFw4JaD3GlQuNAL/JEsSAF4HqlCnaHACk4WhOn4OgCkMD5hSpYNYDJTD8Y46n+jsE1kPhVCuR6QBXhFK7MUOu9O6b1SWF3b+/9ZVWMGOlu93E8UDaAhgc7bfH+0DHqKXCkHzoNDFfU+zxiVQrUC9QXTuHYtKpN59OA3IxCG4b7jh6ZFuVockaNTW09mkJzOaPU49a6mE9cAchZpQJNpUWcwgV9r6FJswsFKrITp2B5pMBMdnS0z2HZNy2+BNKxSZxZfglkrFYBJxQnpzA5sN/HheR2aFQoZBLAi149dQoyAYYjW0hHlHguBAdMcR0DuDZ5omevX6+AI8qcU7ikKT3GBHCnXwydgmCC0tRwCnGQ2Wp6Be71yNIWfQSkOl9vAI1SBCNWrwC01RROgX7BuT2HI4r7tFAw086p/NwZEdOEa7R1uAFuNmQPuKAEAjYNQ0CyeoUEWHYBnpQVQgpvc0Ph+gsKlAnKg1+vEHsw5LKciLKCAJobiWBzYFGbCKpHqkZZrxBFHEASyFI59vJPCskcwNVGOWZAOqsrR+pKbaNeAMT1CixMEtlnsqopNxUMzVJT3tY35aXZm6a6Y9QhwMN6BUJWbE1lhbMO1WehkO7poO0sK7em9MJGxp1XSbC1gtugzzSLQmGsX7VntJGSwsPZ2d2z3bIPKzdoOp3Wzqt8G4XyMVUoFIxLx1S7+piaHtCvR3FeRVsq0GFdp9C5TbGpcNqsPqyHKxcfd14h21KhuLKUFU4f3osrC7F6uV3WXFnadL7wyAPeKDXw2RoJCO5GY4DouYvb/gepVXheLoewzPseQG9N/vzilrMIjoStE3++zvle4eSurw7XEe76ynI4aq+v7lEyt1x5awiFlFLQbHKIpabnM3eJLym4Szzzc/du7SU+zOXv9UNpECH7IoH/gecURPlN9vdQpeD47yhIFNX0U0QgvID9nENm+yxk/xb+AGAjNfRZuk9qAAAAAElFTkSuQmCC';

export default class StationSlider extends React.Component {

  static propTypes = {
    activeStationIndex: React.PropTypes.number,
    connected: React.PropTypes.bool.isRequired,
    loading: React.PropTypes.bool.isRequired,
    mode: React.PropTypes.string.isRequired,
    nearestStationIndex: React.PropTypes.number,
    showCallout: React.PropTypes.func.isRequired,
    stationDistances: React.PropTypes.array,
  }

  state = {
    stationIndex: 0,
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
        x: nextProps.activeStationIndex * deviceScreen.width,
        y: 0,
        animated: true,
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
    const { connected, loading, mode, nearestStationIndex, stationDistances } = this.props;
    return (
      <View style={styles.bottomSection}>
        <View style={styles.calloutSection}>
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
              />
            ))}
          </ScrollView>
        </View>
        <View style={styles.creditSection}>
          <View style={styles.attribution}>
            <Image source={{ uri: mapboxIcon }} style={styles.mapboxIcon} />
          </View>
          <View style={{ flex: 1 }} />
          <AttributionButton styles={styles} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  bottomSection: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    left: 0,
  },
  creditSection: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: (deviceScreen.width > 375 ? 275 : 254) + 4,
    width: deviceScreen.width,
  },
  attribution: {
    position: 'relative',
    marginHorizontal: 4,
    height: 20,
    width: 20,
  },
  attributionIcon: { // eslint-disable-line
    height: 20,
    width: 20,
  },
  calloutSection: {
    width: deviceScreen.width,
  },
  mapboxIcon: {
    flex: 1,
    height: 20,
    width: 50,
    resizeMode: 'contain',
  },
});
