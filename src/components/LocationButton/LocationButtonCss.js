import styled from 'styled-components/native';

export const LocationMarkerTouchableOpacity = styled.TouchableOpacity`
  flex: 0.8;
  alignItems: flex-end;
  paddingTop: 1px;
  paddingRight: 14px;
`;

export const IconImage = styled.Image`
  opacity: ${props => props.inactiveIcon ? 0.4 : 1};
`;
