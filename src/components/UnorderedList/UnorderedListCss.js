import styled from 'styled-components/native';
import { COLORS } from '../../assets/styles/constants';

export const BulletWrapperView = styled.View`
  flexDirection: row;
`;

export const BulletView = styled.View`
  width: 13px;
`;

export const BulletContentView = styled.View`
  flex: 1px;
`;

export const ContentText = styled.Text`
  fontSize: 14px;
  color: ${COLORS.primaryTextColor};
`;
