import styled from 'styled-components/native';
import { Dimensions } from 'react-native';
import { COLORS } from '../../assets/styles/constants';
import { identifyDevice } from '../../helpers/helpers';

const device = identifyDevice();
const deviceScreen = Dimensions.get('window');
let deviceVariableSizes = {};
if (device === 'iPhone 6+') {
  deviceVariableSizes.calloutHeight = 300;
  deviceVariableSizes.nextTimeFontSize = 40;
  deviceVariableSizes.stationLabelFontSize = 36;
  deviceVariableSizes.nextTimeWrapPaddingVertical = 4;
  deviceVariableSizes.nearestStationText = 'Nearest Station - ';
} else if (device === 'iPhone 6') {
  deviceVariableSizes.calloutHeight = 279;
  deviceVariableSizes.nextTimeFontSize = 36;
  deviceVariableSizes.stationLabelFontSize = 30;
  deviceVariableSizes.nextTimeWrapPaddingVertical = 1;
  deviceVariableSizes.nearestStationText = 'Nearest Station - ';
} else {
  deviceVariableSizes.calloutHeight = 279;
  deviceVariableSizes.nextTimeFontSize = 33;
  deviceVariableSizes.stationLabelFontSize = 22;
  deviceVariableSizes.nextTimeWrapPaddingVertical = 1;
  deviceVariableSizes.nearestStationText = 'Nearest - ';
}

const calloutBoxHeight = deviceVariableSizes.calloutHeight - 25; // excludes triangle
const blueBoxHeight = calloutBoxHeight * 0.45; // 45% of calloutBoxHeight
const blackBoxHeight = calloutBoxHeight * 0.55; // 55% of calloutBoxHeight

export const NearestContainerView = styled.View`
  height: ${deviceVariableSizes.calloutHeight}px;
  width: ${deviceScreen.width}px;
`;

export const TriangleView = styled.View`
  flexDirection: row;
  alignSelf: center;
  width: 0px;
  height: 0px;
  backgroundColor: ${COLORS.transparent};
  borderStyle: solid;
  borderLeftWidth: 25px;
  borderRightWidth: 25px;
  borderBottomWidth: 25px;
  borderLeftColor: ${COLORS.transparent};
  borderRightColor: ${COLORS.transparent};
  borderBottomColor: ${COLORS.backgroundColorTrans};
`;

export const InfoContainerView = styled.View`
  height: ${blueBoxHeight};
  flexDirection: row;
  backgroundColor: ${COLORS.backgroundColorTrans};
  paddingHorizontal: 12px;
  paddingVertical: 0px;
`;

export const ArrowWrapperTouchableOpacity = styled.TouchableOpacity`
  justifyContent: center;
  padding: 6px;
`;

export const ArrowWrapperView = styled.View`
  justifyContent: center;
  padding: 6px;
`;

export const ArrowView = styled.View`
  borderStyle: solid;
  borderTopWidth: 1px;
  borderRightWidth: 1px;
  borderBottomWidth: 0px;
  borderLeftWidth: 0px;
  borderColor: ${props => props.disabled ? COLORS.disabledArrow : COLORS.primaryTextColor};
  margin: 10px;
  height: 30px;
  width: 30px;
  transform: ${props => props.left ? [{ rotate: '-135deg' }] : [{ rotate: '45deg' }]};
`;

export const StationLabelContainerView = styled.View`
  alignItems: center;
  justifyContent: center;
  flex: 1px;
`;

export const StationLabelText = styled.Text`
  fontSize: ${deviceVariableSizes.stationLabelFontSize}px;
  color: ${COLORS.primaryTextColor};
`;

export const SmallGrayText = styled.Text`
  color: ${COLORS.grayText};
  fontSize: 13px;
`;