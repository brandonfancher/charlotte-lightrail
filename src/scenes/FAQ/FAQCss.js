import { Animated } from 'react-native';
import styled from 'styled-components/native';
import { COLORS } from 'assets/styles/constants';

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

const ArrowsView = styled.View`
  borderTopWidth: 2px;
  borderRightWidth: 2px;
  borderColor: ${COLORS.primaryTextColor};
  height: 14px;
  width: 14px;
`;

export const AnimatedArrowsView = Animated.createAnimatedComponent(ArrowsView);

export const AccordionContentView = styled.View`
  padding: 10px;
  paddingTop: 0px;
`;

export const ViewContainerView = styled.View`
  position: absolute;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;
`;

export const ScrollViewView = styled.ScrollView`
  flex: 1px;
  backgroundColor: ${COLORS.backgroundColorDark};
`;

export const AccordionWrapperView = styled.View`
  flex: 1px;
  margin: 10px;
  backgroundColor: ${COLORS.accordionBackground};
  borderWidth: 1px;
  borderColor: ${COLORS.grayText};
  borderTopWidth: 0px;
`;
