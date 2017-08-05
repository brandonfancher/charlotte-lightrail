import styled from 'styled-components/native';

export const WrapView = styled.View`
  backgroundColor: ${props => props.theme.verticalDividerLine};
  flex: 1;
  height: 74px;
  width: ${props => props.width}px;
`;

export const ScheduleSelectorView = styled.View`
  width: 240px;
  alignSelf: center;
  marginTop: 4px;
  marginBottom: 12px;
`;

export const TitleText = styled.Text`
  alignSelf: center;
  fontSize: 16px;
  marginTop: 9px;
  marginBottom: 3px;
  color: ${props => props.theme.primaryTextColor};
`;
