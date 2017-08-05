import styled from 'styled-components/native';

export const ContentText = styled.Text`
  fontSize: 14px;
  color: ${props => props.theme.primaryTextColor};
`;

export const TeamLunaText = styled.Text`
  textDecorationLine: underline;
  color: ${props => props.theme.highlightTextColor};
`;
