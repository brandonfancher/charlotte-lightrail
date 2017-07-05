import styled from 'styled-components/native';
import { COLORS } from 'assets/styles/constants';
import { deviceProps } from 'helpers/device';

const {
  insideColPadding, circleWrapperHeight, circleWidth, deviceScreen
} = deviceProps;

export const TableCellView = styled.View`
  paddingRight: 10px;
  paddingLeft: 10px;
`;

export const NextCircleWrapperVeiw = styled.View`
  position: relative;
  right: ${insideColPadding + 10 + (circleWidth / 2)}px;
  bottom: ${((circleWrapperHeight - 24) / 2) - 2}px;
`;

const HorizontalLineView = styled.View`
  position: relative;
  borderColor: ${COLORS.highlightTextColor};
  borderStyle: solid;
  borderBottomWidth: 1px;
  width: ${insideColPadding}px;
`;

export const HorizontalLineInsideLeftView = HorizontalLineView.extend`
  top: ${(circleWrapperHeight / 2) + 1}px;
  right: ${insideColPadding - (circleWidth / 2)}px;
`;

export const HorizontalLineInsideRightView = HorizontalLineView.extend`
  top: ${circleWrapperHeight / 2}px;
  left: ${circleWidth / 2}px;
`;

export const HorizontalLineOutsideLeftView = HorizontalLineView.extend`
  position: absolute;
  top: ${(24 / 2) + 1}px;
  left: -100px;
  width: 100px;
`;

export const HorizontalLineOutsideRightView = HorizontalLineView.extend`
  position: absolute;
  top: ${(24 / 2) + 3}px;
  right: -100px;
  width: 100px;
`;

export const NextLabelCircleOuterView = styled.View`
  position: absolute;
  backgroundColor: ${COLORS.backgroundColor};
  height: ${circleWrapperHeight}px;
  paddingVertical: 7px;
`;

export const NextLabelCircleView = styled.View`
  justifyContent: center;
  borderColor: ${COLORS.highlightTextColor};
  borderStyle: solid;
  borderWidth: 1px;
  height: ${circleWidth}px;
  width: ${circleWidth}px;
  borderRadius: ${circleWidth / 2}px;
`;

export const NextLabelText = styled.Text`
  backgroundColor: ${COLORS.transparent};
  color: ${COLORS.highlightTextColor};
  fontSize: 10px;
  fontWeight: bold;
  textAlign: center;
`;

export const NextTimeText = styled.Text`
  color: ${COLORS.highlightTextColor};
  fontSize: 20px;
`;

export const DescriptionText = styled.Text`
  color: ${COLORS.primaryTextColor};
`;

export const TableColScrollView = styled.ScrollView`
  backgroundColor: ${COLORS.backgroundColor};
`;

export const TableView = styled.View`
  flexDirection: row;
  backgroundColor: ${COLORS.transparent};
  paddingBottom: 10px;
`;

const TableColView = styled.View`
  flex: 1px;
  alignSelf: flex-start;
`;

export const TableColInboundView = TableColView.extend`
  alignItems: flex-end;
  paddingRight: ${insideColPadding}px;
`;

export const TableColOutboundView = TableColView.extend`
  alignItems: flex-start;
  paddingLeft: ${insideColPadding}px;
`;

export const WrapView = styled.View`
  position: absolute;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;
`;

export const VerticalLineView = styled.View`
  position: absolute;
  height: ${deviceScreen.height}px;
  left: ${deviceScreen.width / 2}px;
  borderRightColor: ${COLORS.verticalDividerLine};
  borderRightWidth: 1px;
  borderStyle: solid;
  width: 1px;
`;

export const TableContainerView = styled.View`
  flex: 1px;
`;

export const TableHeadView = styled.View`
  flexDirection: row;
  backgroundColor: ${COLORS.backgroundColor};
`;

export const TableColHeadView = styled.View`
  alignItems: center;
  flex: 1px;
  paddingBottom: 16px;
  paddingTop: 12px;
  marginTop: 10px;
  borderLeftColor: ${COLORS.transparent};
  borderRightColor: ${COLORS.verticalDividerLine};
  borderStyle: solid;
  ${props => props.borderRightWidth && 'borderRightWidth: 1px;'}
  ${props => props.borderLeftWidth && 'borderLeftWidth: 1px;'}
`;

export const BoldWhiteText = styled.Text`
  fontWeight: bold;
  color: ${COLORS.primaryTextColor};
  fontSize: 15px;
  paddingBottom: 2px;
`;

export const GrayText = styled.Text`
  color: ${COLORS.grayText};
`;