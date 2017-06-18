import styled from 'styled-components/native';
import { COLORS } from '../../assets/styles/constants';

export const TouchableOpacity = styled.TouchableOpacity`
  backgroundColor: ${COLORS.backgroundColorButton};
  borderRadius: 50;
  borderWidth: 0;
  marginHorizontal: 6;
  padding: 7px;
  width: 50;
  height: 50;
`;

export const Image = styled.Image`
  opacity: 1;
`;