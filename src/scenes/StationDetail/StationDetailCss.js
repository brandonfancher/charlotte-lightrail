import styled from 'styled-components/native';
import {COLORS} from 'assets/styles/constants';

export const FeaturesWrapperScrollView = styled.ScrollView`
  flex: 1px;
`;

export const FeaturesContainerView = styled.View`
  flexDirection: row;
  marginVertical: 10px;
  padding: 6px;
`;

export const IconImageView = styled.View`
  paddingLeft: 10px;
  paddingRight: 20px;
`;

export const FeaturesTextItemView = styled.View`
  flex: 1px;
  alignSelf: center;
`;

export const FeaturesText = styled.Text`
  fontSize: 18px;
  marginBottom: 6px;
  color: ${COLORS.primaryTextColor};
`;

export const TabView = styled.View`
  flex: 1px;
  marginTop: 0px;
  backgroundColor: ${COLORS.backgroundColor};
`;

export const TimesContainerView = styled.View`
  flexDirection: row;
  paddingTop: 25px;
  backgroundColor: ${COLORS.black};
`;

export const NextBlockView = styled.View`
  alignItems: center;
  flex: 1px;
  marginBottom: 25px;
  backgroundColor: ${COLORS.black};
`;

export const SmallText = styled.Text`
  color: ${COLORS.primaryTextColor};
  fontSize: 13px;
`;

export const NextTimeBoldText = styled.Text`
  fontSize: 32px;
  color: ${COLORS.primaryTextColor};
  fontWeight: bold;
`;

export const SubtitleText = styled.Text`
  alignSelf: center;
  fontSize: 28px;
  marginTop: 20px;
  marginBottom: 20px;
  color: ${COLORS.primaryTextColor};
`;