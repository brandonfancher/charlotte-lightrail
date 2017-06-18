import styled from 'styled-components/native';

export const TouchableOpacity = styled.TouchableOpacity`
  flex: 0.8;
  alignItems: flex-end;
  paddingTop: 1px;
  paddingRight: 14px;
`;

export const Image = styled.Image`
  opacity: ${props => props.inactive ? 0.4 : 1}
`;
