import styled from 'styled-components/native';
import { deviceProps } from 'helpers/device';

export const BottomSectionView = styled.View`
  position: absolute;
  right: 0px;
  bottom: 0px;
  left: 0px;
`;

export const CreditSectionView = styled.View`
  flexDirection: row;
  position: absolute;
  bottom: ${(deviceProps.deviceScreen.width > 375 ? 275 : 254) + 4}px;
  width: ${deviceProps.deviceScreen.width}px;
`;

export const CalloutSectionView = styled.View`
  width: ${deviceProps.deviceScreen.width}px;
`;

export const AttributionView = styled.View`
  height: 20px;
  width: 20px;
`;

export const MapboxIconImage = styled.Image`
  flex: 1px;
  height: 20px;
  width: 50px;
  resizeMode: contain;
`;
