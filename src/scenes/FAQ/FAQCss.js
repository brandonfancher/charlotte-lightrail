import { Animated } from 'react-native';
import styled from 'styled-components/native';

export const AccordionHeaderView = styled.View`
  borderTopWidth: 1px;
  borderTopColor: ${props => props.theme.grayText};
  padding: 10px;
  flexDirection: row;
`;

export const BoldText = styled.Text`
  fontWeight: bold;
  color: ${props => props.theme.primaryTextColor};
`;

const ArrowsView = styled.View`
  borderTopWidth: 2px;
  borderRightWidth: 2px;
  borderColor: ${props => props.theme.primaryTextColor};
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
  backgroundColor: ${props => props.theme.backgroundColorDark};
`;

export const AccordionWrapperView = styled.View`
  flex: 1px;
  margin: 10px;
  backgroundColor: ${props => props.theme.accordionBackground};
  borderWidth: 1px;
  borderColor: ${props => props.theme.grayText};
  borderTopWidth: 0px;
`;
