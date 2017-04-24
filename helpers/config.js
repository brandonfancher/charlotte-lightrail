import { Dimensions, Linking } from 'react-native'
import schedules from './schedules.json'
import moment from 'moment'

export const displayLink = url => Linking.openURL(url).catch(err => console.error('An error occurred', err))

// identify iPhone model based on device width
const deviceScreen = Dimensions.get('window')
export const identifyDevice = () => {
  if (deviceScreen.width === 414) {
    return 'iPhone 6+'
  } else if (deviceScreen.width === 320) {
    return 'iPhone 5'
  } else {
    return 'iPhone 6'
  }
}

// secrets that we'll want to secure later
export const googleApiKey = '[GOOGLE_API_KEY]'
export const mapboxApiKey = '[MAPBOX_API_KEY]'

// setting for simulating a disconnected state
export const SIMULATE_DISCONNECTED = false

// how often to scheduled time against current time to ensure displayed time is not stale
export const timeInterval = 15000

// Get day for purposes of determining which train schedule is in force
// I chose 3 AM as the cutoff. If DST were to impact this, it would shift one
// hour, and an hour in either direction will not adversely affect the results.
export const getScheduleDay = () => {
  const day = moment().day()
  const hour = moment().hour()
  if ((day === 6 && hour >= 3) || (day === 0 && hour < 3)) {
    return { day: 'Saturday', index: 1 }
  } else if ((day === 0 && hour >= 3) || (day === 1 && hour < 3)) {
    return { day: 'Sunday', index: 2 }
  } else {
    return { day: 'Weekday', index: 0 }
  }
}

const features = {
  covered: {
    featureDesc: 'Covered waiting area',
    icon: require('../assets/icons/station-features/covered-waiting-area/ic_nature_people_white_48pt.png')
  },
  tickets: {
    featureDesc: 'Ticket vending machines',
    icon: require('../assets/icons/station-features/ticket-vending-machine/ic_confirmation_number_white_48pt.png')
  },
  emergency: {
    featureDesc: 'Emergency call box',
    icon: require('../assets/icons/station-features/emergency-call-box/ic_phone_in_talk_white_48pt.png')
  },
  lighted: {
    featureDesc: 'Lighted station',
    icon: require('../assets/icons/station-features/lighted-station/ic_lightbulb_outline_white_48pt.png')
  },
  water: {
    featureDesc: 'Water fountain',
    icon: require('../assets/icons/station-features/water-fountain/ic_local_drink_white_48pt.png')
  },
  seating: {
    featureDesc: 'Seating',
    icon: require('../assets/icons/station-features/seating/ic_airline_seat_recline_normal_white_48pt.png')
  },
  announce: {
    featureDesc: 'Automatic audio announcements',
    icon: require('../assets/icons/station-features/audio-annoucements/ic_announcement_white_48pt.png')
  },
  wheelchair: {
    featureDesc: 'Wheelchair accessible platform',
    icon: require('../assets/icons/station-features/wheelchair/ic_accessible_white_48pt.png')
  },
  art: {
    featureDesc: 'Public art',
    icon: require('../assets/icons/station-features/public-art/ic_photo_white_48pt.png')
  },
  bike: {
    featureDesc: 'Bike racks',
    icon: require('../assets/icons/station-features/bike-lockers/ic_directions_bike_white_48pt.png')
  },
  elevators: {
    featureDesc: 'Elevators',
    icon: require('../assets/icons/station-features/elevators/ic_filter_frames_white_48pt.png')
  },
  park: {
    featureDesc: 'Park and Ride',
    icon: require('../assets/icons/station-features/park-and-ride/ic_local_parking_white_48pt.png')
  }
}

// other config the app relies on
// we'll want several of these to move to Firebase or something similar for on-the-fly updates
export const blueStops = [{
  latlng: {
    latitude: 35.107174,
    longitude: -80.882812
  },
  description: 'The end of the line.',
  title: 'I-485 Station',
  mapLabel: 'I-485 Station',
  labelSide: 'right',
  inboundWeekday: schedules.inboundWeekday['station-1'],
  outboundWeekday: schedules.outboundWeekday['station-15'],
  inboundSaturday: schedules.inboundSaturday['station-1'],
  outboundSaturday: schedules.outboundSaturday['station-15'],
  inboundSunday: schedules.inboundSunday['station-1'],
  outboundSunday: schedules.outboundSunday['station-15'],
  stationFeatures: [
    features.covered,
    features.park,
    features.tickets,
    features.emergency,
    features.lighted,
    features.water,
    features.seating,
    features.announce,
    features.wheelchair,
    features.art,
    features.bike,
    features.elevators
  ]
}, {
  latlng: {
    latitude: 35.119440,
    longitude: -80.882333
  },
  title: 'Sharon Rd. West Station',
  mapLabel: 'Sharon Rd. West',
  labelSide: 'right',
  inboundWeekday: schedules.inboundWeekday['station-2'],
  outboundWeekday: schedules.outboundWeekday['station-14'],
  inboundSaturday: schedules.inboundSaturday['station-2'],
  outboundSaturday: schedules.outboundSaturday['station-14'],
  inboundSunday: schedules.inboundSunday['station-2'],
  outboundSunday: schedules.outboundSunday['station-14'],
  stationFeatures: [
    features.covered,
    features.park,
    features.tickets,
    features.emergency,
    features.lighted,
    features.water,
    features.seating,
    features.announce,
    features.wheelchair,
    features.art,
    features.bike
  ]
}, {
  latlng: {
    latitude: 35.135149,
    longitude: -80.876513
  },
  title: 'Arrowood Station',
  mapLabel: 'Arrowood',
  labelSide: 'right',
  inboundWeekday: schedules.inboundWeekday['station-3'],
  outboundWeekday: schedules.outboundWeekday['station-13'],
  inboundSaturday: schedules.inboundSaturday['station-3'],
  outboundSaturday: schedules.outboundSaturday['station-13'],
  inboundSunday: schedules.inboundSunday['station-3'],
  outboundSunday: schedules.outboundSunday['station-13'],
  stationFeatures: [
    features.covered,
    features.park,
    features.tickets,
    features.emergency,
    features.lighted,
    features.water,
    features.seating,
    features.announce,
    features.wheelchair,
    features.art,
    features.bike
  ]
}, {
  latlng: {
    latitude: 35.152865,
    longitude: -80.877460
  },
  title: 'Archdale Station',
  mapLabel: 'Archdale',
  labelSide: 'right',
  inboundWeekday: schedules.inboundWeekday['station-4'],
  outboundWeekday: schedules.outboundWeekday['station-12'],
  inboundSaturday: schedules.inboundSaturday['station-4'],
  outboundSaturday: schedules.outboundSaturday['station-12'],
  inboundSunday: schedules.inboundSunday['station-4'],
  outboundSunday: schedules.outboundSunday['station-12'],
  stationFeatures: [
    features.covered,
    features.park,
    features.tickets,
    features.emergency,
    features.lighted,
    features.water,
    features.seating,
    features.announce,
    features.wheelchair,
    features.art,
    features.bike
  ]
}, {
  latlng: {
    latitude: 35.162842,
    longitude: -80.877519
  },
  title: 'Tyvola Station',
  mapLabel: 'Tyvola',
  labelSide: 'right',
  inboundWeekday: schedules.inboundWeekday['station-5'],
  outboundWeekday: schedules.outboundWeekday['station-11'],
  inboundSaturday: schedules.inboundSaturday['station-5'],
  outboundSaturday: schedules.outboundSaturday['station-11'],
  inboundSunday: schedules.inboundSunday['station-5'],
  outboundSunday: schedules.outboundSunday['station-11'],
  stationFeatures: [
    features.covered,
    features.park,
    features.tickets,
    features.emergency,
    features.lighted,
    features.water,
    features.seating,
    features.announce,
    features.wheelchair,
    features.art,
    features.bike
  ]
}, {
  latlng: {
    latitude: 35.175341,
    longitude: -80.879281
  },
  title: 'Woodlawn Station',
  mapLabel: 'Woodlawn',
  labelSide: 'right',
  inboundWeekday: schedules.inboundWeekday['station-6'],
  outboundWeekday: schedules.outboundWeekday['station-10'],
  inboundSaturday: schedules.inboundSaturday['station-6'],
  outboundSaturday: schedules.outboundSaturday['station-10'],
  inboundSunday: schedules.inboundSunday['station-6'],
  outboundSunday: schedules.outboundSunday['station-10'],
  stationFeatures: [
    features.covered,
    features.park,
    features.tickets,
    features.emergency,
    features.lighted,
    features.water,
    features.seating,
    features.announce,
    features.wheelchair,
    features.art,
    features.bike
  ]
}, {
  latlng: {
    latitude: 35.190825,
    longitude: -80.875068
  },
  title: 'Scaleybark Station',
  mapLabel: 'Scaleybark',
  labelSide: 'right',
  inboundWeekday: schedules.inboundWeekday['station-7'],
  outboundWeekday: schedules.outboundWeekday['station-9'],
  inboundSaturday: schedules.inboundSaturday['station-7'],
  outboundSaturday: schedules.outboundSaturday['station-9'],
  inboundSunday: schedules.inboundSunday['station-7'],
  outboundSunday: schedules.outboundSunday['station-9'],
  stationFeatures: [
    features.covered,
    features.park,
    features.tickets,
    features.emergency,
    features.lighted,
    features.water,
    features.seating,
    features.announce,
    features.wheelchair,
    features.art,
    features.bike
  ]
}, {
  latlng: {
    latitude: 35.199883,
    longitude: -80.869027
  },
  title: 'New Bern Station',
  mapLabel: 'New Bern',
  labelSide: 'right',
  inboundWeekday: schedules.inboundWeekday['station-8'],
  outboundWeekday: schedules.outboundWeekday['station-8'],
  inboundSaturday: schedules.inboundSaturday['station-8'],
  outboundSaturday: schedules.outboundSaturday['station-8'],
  inboundSunday: schedules.inboundSunday['station-8'],
  outboundSunday: schedules.outboundSunday['station-8'],
  stationFeatures: [
    features.covered,
    features.tickets,
    features.emergency,
    features.lighted,
    features.water,
    features.seating,
    features.announce,
    features.wheelchair,
    features.art,
    features.bike
  ]
}, {
  latlng: {
    latitude: 35.212099,
    longitude: -80.859134
  },
  title: 'East/West Station',
  mapLabel: 'East/West',
  labelSide: 'right',
  inboundWeekday: schedules.inboundWeekday['station-9'],
  outboundWeekday: schedules.outboundWeekday['station-7'],
  inboundSaturday: schedules.inboundSaturday['station-9'],
  outboundSaturday: schedules.outboundSaturday['station-7'],
  inboundSunday: schedules.inboundSunday['station-9'],
  outboundSunday: schedules.outboundSunday['station-7'],
  stationFeatures: [
    features.covered,
    features.tickets,
    features.emergency,
    features.lighted,
    features.water,
    features.seating,
    features.announce,
    features.wheelchair,
    features.art,
    features.bike
  ]
}, {
  latlng: {
    latitude: 35.215771,
    longitude: -80.855336
  },
  title: 'Bland Street Station',
  mapLabel: 'Bland Street',
  labelSide: 'left',
  inboundWeekday: schedules.inboundWeekday['station-10'],
  outboundWeekday: schedules.outboundWeekday['station-6'],
  inboundSaturday: schedules.inboundSaturday['station-10'],
  outboundSaturday: schedules.outboundSaturday['station-6'],
  inboundSunday: schedules.inboundSunday['station-10'],
  outboundSunday: schedules.outboundSunday['station-6'],
  stationFeatures: [
    features.covered,
    features.tickets,
    features.emergency,
    features.lighted,
    features.water,
    features.seating,
    features.announce,
    features.wheelchair,
    features.art,
    features.bike
  ]
}, {
  latlng: {
    latitude: 35.218808,
    longitude: -80.850954
  },
  title: 'Carson Station',
  mapLabel: 'Carson',
  labelSide: 'right',
  inboundWeekday: schedules.inboundWeekday['station-11'],
  outboundWeekday: schedules.outboundWeekday['station-5'],
  inboundSaturday: schedules.inboundSaturday['station-11'],
  outboundSaturday: schedules.outboundSaturday['station-5'],
  inboundSunday: schedules.inboundSunday['station-11'],
  outboundSunday: schedules.outboundSunday['station-5'],
  stationFeatures: [
    features.covered,
    features.tickets,
    features.emergency,
    features.lighted,
    features.water,
    features.seating,
    features.announce,
    features.wheelchair,
    features.art,
    features.bike
  ]
}, {
  latlng: {
    latitude: 35.221313,
    longitude: -80.847064
  },
  title: 'Stonewall Station',
  mapLabel: 'Stonewall',
  labelSide: 'left',
  inboundWeekday: schedules.inboundWeekday['station-12'],
  outboundWeekday: schedules.outboundWeekday['station-4'],
  inboundSaturday: schedules.inboundSaturday['station-12'],
  outboundSaturday: schedules.outboundSaturday['station-4'],
  inboundSunday: schedules.inboundSunday['station-12'],
  outboundSunday: schedules.outboundSunday['station-4'],
  stationFeatures: [
    features.covered,
    features.tickets,
    features.emergency,
    features.lighted,
    features.water,
    features.seating,
    features.announce,
    features.wheelchair,
    features.art,
    features.bike,
    features.elevators
  ]
}, {
  latlng: {
    latitude: 35.223630,
    longitude: -80.843222
  },
  title: '3rd Street Station',
  mapLabel: '3rd Street',
  labelSide: 'right',
  inboundWeekday: schedules.inboundWeekday['station-13'],
  outboundWeekday: schedules.outboundWeekday['station-3'],
  inboundSaturday: schedules.inboundSaturday['station-13'],
  outboundSaturday: schedules.outboundSaturday['station-3'],
  inboundSunday: schedules.inboundSunday['station-13'],
  outboundSunday: schedules.outboundSunday['station-3'],
  stationFeatures: [
    features.covered,
    features.tickets,
    features.emergency,
    features.lighted,
    features.water,
    features.seating,
    features.announce,
    features.wheelchair,
    features.art,
    features.bike,
    features.elevators
  ]
}, {
  latlng: {
    latitude: 35.225298,
    longitude: -80.840909
  },
  title: 'Charlotte Transportation Center',
  mapLabel: 'CTC/Arena',
  labelSide: 'left',
  inboundWeekday: schedules.inboundWeekday['station-14'],
  outboundWeekday: schedules.outboundWeekday['station-2'],
  inboundSaturday: schedules.inboundSaturday['station-14'],
  outboundSaturday: schedules.outboundSaturday['station-2'],
  inboundSunday: schedules.inboundSunday['station-14'],
  outboundSunday: schedules.outboundSunday['station-2'],
  stationFeatures: [
    features.covered,
    features.tickets,
    features.emergency,
    features.lighted,
    features.water,
    features.seating,
    features.announce,
    features.wheelchair,
    features.art,
    features.bike,
    features.elevators
  ]
}, {
  latlng: {
    latitude: 35.227370,
    longitude: -80.838119
  },
  description: 'The other end of the line.',
  title: '7th Street Station',
  mapLabel: '7th Street',
  labelSide: 'right',
  inboundWeekday: schedules.inboundWeekday['station-15'],
  outboundWeekday: schedules.outboundWeekday['station-1'],
  inboundSaturday: schedules.inboundSaturday['station-15'],
  outboundSaturday: schedules.outboundSaturday['station-1'],
  inboundSunday: schedules.inboundSunday['station-15'],
  outboundSunday: schedules.outboundSunday['station-1'],
  stationFeatures: [
    features.covered,
    features.tickets,
    features.emergency,
    features.lighted,
    features.water,
    features.seating,
    features.announce,
    features.wheelchair,
    features.art,
    features.bike
  ]
}]

export const blueLine = [
  [35.1071072084213, -80.88274493478862],
  [35.11281207790962, -80.88371053012516],
  [35.11620847975965, -80.8834959533837],
  [35.12499283144439, -80.87889328227942],
  [35.12823078006564, -80.87704792230286],
  [35.12877481300133, -80.8765973111458],
  [35.13064380168687, -80.8759213944102],
  [35.13191609338824, -80.87572827534288],
  [35.13893527640222, -80.87685480323556],
  [35.13998810165949, -80.8769084474209],
  [35.14073384464492, -80.87725177020725],
  [35.14630476724896, -80.87847485763356],
  [35.15572621570436, -80.8768011590502],
  [35.15829630972654, -80.87692990509507],
  [35.16793563174688, -80.87751999113408],
  [35.17142620543254, -80.87793841577991],
  [35.17787197149588, -80.87948336831843],
  [35.17916106338081, -80.87947263948135],
  [35.1809412042798, -80.87916150320623],
  [35.18522039825676, -80.87800278880235],
  [35.1869302590751, -80.87721958369602],
  [35.19589986250858, -80.87211265724929],
  [35.19689934643547, -80.87131872330588],
  [35.19961147702468, -80.86871680985416],
  [35.2031708238481, -80.86632427918687],
  [35.20945628440922, -80.86100277599868],
  [35.20964607146928, -80.86089029367096],
  [35.21358189792325, -80.8577360155715],
  [35.21666430519905, -80.85388804435898],
  [35.22095914699968, -80.8476438611825],
  [35.22163403004883, -80.84628129887426],
  [35.22437157036239, -80.84209337111913],
  [35.2273621965736, -80.838079946956244]
]
