import styled from 'styled-components/native';

export const BulletWrapperView = styled.View`
  flexDirection: row;
`;

export const BulletView = styled.View`
  width: 13px;
`;

export const BulletContentView = styled.View`
  flex: 1;
`;

export const ContentText = styled.Text`
  fontSize: 14px;
  color: ${props => props.theme.primaryTextColor};
`;
