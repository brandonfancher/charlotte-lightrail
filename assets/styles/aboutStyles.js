import { COLORS } from './constants';

export const aboutStyles = {
  viewContainer: {
    position: 'absolute',
    top: 64,
    right: 0,
    bottom: 0,
    left: 0,
  },
  scrollView: {
    flex: 1,
    backgroundColor: COLORS.backgroundColorDark,
  },
  bold: {
    fontWeight: 'bold',
    color: COLORS.primaryTextColor,
  },
  bulletWrapper: {
    flexDirection: 'row',
  },
  bullet: {
    width: 13,
  },
  bulletContent: {
    flex: 1,
  },
  accordionWrapper: {
    flex: 1,
    margin: 10,
    backgroundColor: COLORS.accordionBackground,
    borderWidth: 1,
    borderColor: COLORS.grayText,
    borderTopWidth: 0,
  },
  accordionHeader: {
    borderTopWidth: 1,
    borderTopColor: COLORS.grayText,
    padding: 10,
    flexDirection: 'row',
  },
  accordionContent: {
    padding: 10,
    paddingTop: 0,
  },
  arrow: {
    borderTopWidth: 2,
    borderRightWidth: 2,
    borderColor: COLORS.primaryTextColor,
    height: 14,
    width: 14,
  },
  content: {
    fontSize: 14,
    color: COLORS.primaryTextColor,
  },
  teamluna: {
    textDecorationLine: 'underline',
    color: COLORS.highlightTextColor,
  },
};
