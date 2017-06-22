import styled from 'styled-components/native';
import { COLORS } from '../../assets/styles/constants';

export const View = styled.View`
  ${props => props.bulletWrapper && "flexDirection: row;"}
  ${props => props.bullet && "width: 13px;"}
  ${props => props.bulletContent && "flex: 1px;"}
`;

export const Text = styled.Text`
  fontSize: 14px;
  color: ${COLORS.primaryTextColor};
`;
