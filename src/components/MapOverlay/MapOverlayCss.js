import styled from 'styled-components/native';

export const ContainerView = styled.View`
  position: absolute;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;
`;

export const HeaderView = styled.View`
  backgroundColor: ${props => props.theme.backgroundColorDark};
  height: 40px;
  justifyContent: center;
  left: 0px;
  position: absolute;
  right: 0px;
  top: 0px;
`;

export const HeaderContainerView = styled.View`
  flexDirection: row;
  justifyContent: space-between;
`;

export const AboutTouchableOpacity = styled.TouchableOpacity`
  flex: 0.8px;
  paddingTop: 1px;
  paddingLeft: 14px;
`;

export const ModeSelectorSegmentedControlIOS = styled.SegmentedControlIOS`
  flex: 1.5px;
  marginBottom: 10px;
`;

export const OfflineButtonTouchableOpacity = styled.TouchableOpacity`
  borderColor: ${props => props.theme.primaryBorderColor};
  borderWidth: 1px;
  height: 28px;
  paddingHorizontal: 4px;
  paddingVertical: 2px;
  justifyContent: center;
  marginBottom: 6px;
  borderRadius: 4px;
`;

export const OfflineText = styled.Text`
  color: ${props => props.theme.primaryTextColor};
  fontSize: 13px;
`;

export const HelpView = styled.View`
  alignItems: center;
  flexDirection: row;
`;