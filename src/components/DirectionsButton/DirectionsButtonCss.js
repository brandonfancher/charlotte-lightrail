import styled from 'styled-components/native';

export const BubbleTouchableOpacity = styled.TouchableOpacity`
  backgroundColor: ${props => props.theme.backgroundColorButton};
  borderRadius: 50;
  borderWidth: 0;
  marginHorizontal: 6;
  padding: 7px;
  width: 50;
  height: 50;
`;

export const ActiveIconImage = styled.Image`
  opacity: 1;
`;
