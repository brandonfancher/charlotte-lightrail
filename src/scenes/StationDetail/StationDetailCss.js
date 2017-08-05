import styled from 'styled-components/native';

export const FeaturesWrapperScrollView = styled.ScrollView`
  flex: 1;
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
  flex: 1;
  alignSelf: center;
`;

export const FeaturesText = styled.Text`
  fontSize: 18px;
  marginBottom: 6px;
  color: ${props => props.theme.primaryTextColor};
`;

export const TabView = styled.View`
  flex: 1;
  marginTop: 0px;
  backgroundColor: ${props => props.theme.backgroundColor};
`;

export const TimesContainerView = styled.View`
  flexDirection: row;
  paddingTop: 25px;
  backgroundColor: ${props => props.theme.black};
`;

export const NextBlockView = styled.View`
  alignItems: center;
  flex: 1;
  marginBottom: 25px;
  backgroundColor: ${props => props.theme.black};
`;

export const SmallText = styled.Text`
  color: ${props => props.theme.primaryTextColor};
  fontSize: 13px;
`;

export const NextTimeBoldText = styled.Text`
  fontSize: 32px;
  color: ${props => props.theme.primaryTextColor};
  fontWeight: bold;
`;

export const SubtitleText = styled.Text`
  alignSelf: center;
  fontSize: 28px;
  marginTop: 20px;
  marginBottom: 20px;
  color: ${props => props.theme.primaryTextColor};
`;
