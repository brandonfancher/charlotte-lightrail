import styled from 'styled-components/native';
import {COLORS} from '../../assets/styles/constants';

export const AccordionHeaderView = styled.View`
  borderTopWidth: 1px;
  borderTopColor: ${COLORS.grayText};
  padding: 10px;
  flexDirection: row;
`;

export const BoldText = styled.Text`
  fontWeight: bold;
  color: ${COLORS.primaryTextColor};
`;

const bounceConfig = {
  inputRange: [0, 360],
  outputRange: ['0deg', '360deg']
};

export const AnimatedArrowsView = styled.View`
  borderTopWidth: 2px;
  borderRightWidth: 2px;
  borderColor: ${COLORS.primaryTextColor};
  height: 14px;
  width: 14px;
  transform: rotate( ${({bounce}) => bounce.interpolate(bounceConfig)} );
`;