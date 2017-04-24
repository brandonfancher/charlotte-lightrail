import { COLORS } from './constants'

export const aboutStyles = {
  viewContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: COLORS.headerBackgroundColor
  },
  aboutContainer: {
    flex: 1,
    marginTop: 20
  },
  bold: {
    fontWeight: 'bold',
    color: COLORS.primaryTextColor
  },
  name: {
    color: COLORS.primaryTextColor
  },
  center: {
    alignSelf: 'center'
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center'
  },
  desc: {
    fontSize: 14,
    color: COLORS.primaryTextColor,
    fontWeight: 'bold',
    marginTop: 14,
    marginBottom: 7,
    alignSelf: 'center'
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around'
  },
  gridCell: {
    alignItems: 'center',
    paddingBottom: 10,
    paddingTop: 10
  },
  profileImg: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderColor: COLORS.primaryTextColor,
    borderWidth: 2
  },
  img: {
    borderRadius: 4,
    marginBottom: 30,
    alignSelf: 'center'
  },
  italic: {
    fontStyle: 'italic',
    color: COLORS.primaryTextColor
  },
  subtitle: {
    alignSelf: 'center',
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 6
  },
  bulletWrapper: {
    flexDirection: 'row'
  },
  bullet: {
    width: 13
  },
  bulletContent: {
    flex: 1
  },
  tabView: {
    flex: 1,
    padding: 10
  },
  accordionWrapper: {
    flex: 1,
    margin: 10,
    backgroundColor: COLORS.accordionBackground,
    borderWidth: 1,
    borderColor: COLORS.grayText,
    borderTopWidth: 0
  },
  accordionHeader: {
    borderTopWidth: 1,
    borderTopColor: COLORS.grayText,
    padding: 10,
    flexDirection: 'row'
  },
  accordionContent: {
    padding: 10,
    paddingTop: 0
  },
  arrowWrap: {
    width: 20
  },
  arrow: {
    borderTopWidth: 2,
    borderRightWidth: 2,
    borderColor: COLORS.primaryTextColor,
    height: 14,
    width: 14
  },
  title: {
    alignSelf: 'center',
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.primaryTextColor
  },
  underline: {
    textDecorationLine: 'underline',
    color: COLORS.primaryTextColor
  },
  content: {
    fontSize: 14,
    color: COLORS.primaryTextColor
  },
  contentAbout: {
    alignSelf: 'center',
    fontSize: 14,
    color: COLORS.primaryTextColor,
    margin: 10
  },
  madeby: {
    alignSelf: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.primaryTextColor
  },
  teamluna: {
    textDecorationLine: 'underline',
    color: COLORS.highlightTextColor
  }
}
