/* eslint-disable max-len */
import styled from 'styled-components/native';
import { deviceProps } from 'helpers/device';

export const NearestContainerView = styled.View`
  height: ${deviceProps.deviceVariableSizes['calloutHeight']}px;
  width: ${deviceProps.deviceScreen.width}px;
`;

export const TriangleView = styled.View`
  flexDirection: row;
  alignSelf: center;
  width: 0px;
  height: 0px;
  backgroundColor: ${props => props.theme.transparent};
  borderStyle: solid;
  borderLeftWidth: 25px;
  borderRightWidth: 25px;
  borderBottomWidth: 25px;
  borderLeftColor: ${props => props.theme.transparent};
  borderRightColor: ${props => props.theme.transparent};
  borderBottomColor: ${props => props.theme.backgroundColorTrans};
`;

export const InfoContainerView = styled.View`
  height: ${deviceProps.blueBoxHeight};
  flexDirection: row;
  backgroundColor: ${props => props.theme.backgroundColorTrans};
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

const ArrowView = styled.View`
  borderStyle: solid;
  borderTopWidth: 1px;
  borderRightWidth: 1px;
  borderBottomWidth: 0px;
  borderLeftWidth: 0px;
  borderColor: ${props => props.disabled ? props.theme.disabledArrow : props.theme.primaryTextColor};
  margin: 10px;
  height: 30px;
  width: 30px;
`;

export const LeftArrowView = ArrowView.extend`
  transform: rotate(-135deg);
`;

export const RightArrowView = ArrowView.extend`
  transform: rotate(45deg);
`;

export const StationLabelContainerView = styled.View`
  alignItems: center;
  justifyContent: center;
  flex: 1px;
`;

export const StationLabelText = styled.Text`
  fontSize: ${deviceProps.deviceVariableSizes['stationLabelFontSize']}px;
  color: ${props => props.theme.primaryTextColor};
`;

export const SmallGrayText = styled.Text`
  color: ${props => props.theme.grayText};
  fontSize: 13px;
`;

export const TimesContainerView = styled.View`
  height: ${deviceProps.blackBoxHeight}px;
  flexDirection: row;
  alignItems: center;
  paddingHorizontal: 12px;
  backgroundColor: ${props => props.theme.backgroundColorDark};
`;

export const NextBlockView = styled.View`
  alignItems: center;
  flex: 1px;
`;

export const NextTimeWrapView = styled.View`
  paddingVertical: ${deviceProps.deviceVariableSizes['nextTimeWrapPaddingVertical']}px;
`;

export const NextTimeText = styled.Text`
  fontSize: ${deviceProps.deviceVariableSizes['nextTimeFontSize']}px;
  color: ${props => props.theme.primaryTextColor};
`;

// left: Half device width - half of ((buttonWidth + buttonPadding) * numButtons)
export const ButtonContainerView = styled.View`
  position: absolute;
  height: 50px;
  bottom: ${deviceProps.blackBoxHeight - (50 / 2)}px;
  left: ${(deviceProps.deviceScreen['width'] / 2) - (((50 + 12) * 3) / 2)}px;
`;

export const ButtonsView = styled.View`
  flex: 1px;
  flexDirection: row;
  alignSelf: center;
`;

export const BubbleTouchableOpacity = styled.TouchableOpacity`
  backgroundColor: ${props => props.theme.backgroundColorButton};
  borderRadius: 50px;
  borderWidth: 0px;
  marginHorizontal: 6px;
  padding: 7px;
  width: 50px;
  height: 50px;
`;

export const LoadingWrapperView = styled.View`
  backgroundColor: ${props => props.theme.backgroundColorTrans};
  height: ${deviceProps.calloutBoxHeight}px;
  justifyContent: center;
`;

export const LoadingText = styled.Text`
  textAlign: center;
  fontSize: 16px;
  paddingVertical: 10px;
  color: ${props => props.theme.grayText};
`;
