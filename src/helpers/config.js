import { Linking } from 'react-native';
import { MAPBOX_API_KEY } from 'env'; // eslint-disable-line
import schedules from './schedules.json';

export const mapboxApiKey = process.env.MAPBOX_API_KEY ? process.env.MAPBOX_API_KEY : MAPBOX_API_KEY;

export const displayLink = url => Linking.openURL(url).catch(err => console.error('An error occurred', err));

// setting for simulating a disconnected state
export const SIMULATE_DISCONNECTED = false;

// how often to scheduled time against current time to ensure displayed time is not stale
export const timeInterval = 15000;

const features = {
  covered: {
    featureDesc: 'Covered waiting area',
    icon: require('assets/icons/station-features/covered-waiting-area/ic_nature_people_white_48pt.png')
  },
  tickets: {
    featureDesc: 'Ticket vending machines',
    icon: require('assets/icons/station-features/ticket-vending-machine/ic_confirmation_number_white_48pt.png')
  },
  emergency: {
    featureDesc: 'Emergency call box',
    icon: require('assets/icons/station-features/emergency-call-box/ic_phone_in_talk_white_48pt.png')
  },
  lighted: {
    featureDesc: 'Lighted station',
    icon: require('assets/icons/station-features/lighted-station/ic_lightbulb_outline_white_48pt.png')
  },
  water: {
    featureDesc: 'Water fountain',
    icon: require('assets/icons/station-features/water-fountain/ic_local_drink_white_48pt.png')
  },
  seating: {
    featureDesc: 'Seating',
    icon: require('assets/icons/station-features/seating/ic_airline_seat_recline_normal_white_48pt.png')
  },
  announce: {
    featureDesc: 'Automatic audio announcements',
    icon: require('assets/icons/station-features/audio-annoucements/ic_announcement_white_48pt.png')
  },
  wheelchair: {
    featureDesc: 'Wheelchair accessible platform',
    icon: require('assets/icons/station-features/wheelchair/ic_accessible_white_48pt.png')
  },
  art: {
    featureDesc: 'Public art',
    icon: require('assets/icons/station-features/public-art/ic_photo_white_48pt.png')
  },
  bike: {
    featureDesc: 'Bike racks',
    icon: require('assets/icons/station-features/bike-lockers/ic_directions_bike_white_48pt.png')
  },
  elevators: {
    featureDesc: 'Elevators',
    icon: require('assets/icons/station-features/elevators/ic_filter_frames_white_48pt.png')
  },
  park: {
    featureDesc: 'Park and Ride',
    icon: require('assets/icons/station-features/park-and-ride/ic_local_parking_white_48pt.png')
  }
};

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
  outboundWeekday: schedules.outboundWeekday['station-26'],
  inboundSaturday: schedules.inboundSaturday['station-1'],
  outboundSaturday: schedules.outboundSaturday['station-26'],
  inboundSunday: schedules.inboundSunday['station-1'],
  outboundSunday: schedules.outboundSunday['station-26'],
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
  outboundWeekday: schedules.outboundWeekday['station-25'],
  inboundSaturday: schedules.inboundSaturday['station-2'],
  outboundSaturday: schedules.outboundSaturday['station-25'],
  inboundSunday: schedules.inboundSunday['station-2'],
  outboundSunday: schedules.outboundSunday['station-25'],
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
  outboundWeekday: schedules.outboundWeekday['station-24'],
  inboundSaturday: schedules.inboundSaturday['station-3'],
  outboundSaturday: schedules.outboundSaturday['station-24'],
  inboundSunday: schedules.inboundSunday['station-3'],
  outboundSunday: schedules.outboundSunday['station-24'],
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
  outboundWeekday: schedules.outboundWeekday['station-23'],
  inboundSaturday: schedules.inboundSaturday['station-4'],
  outboundSaturday: schedules.outboundSaturday['station-23'],
  inboundSunday: schedules.inboundSunday['station-4'],
  outboundSunday: schedules.outboundSunday['station-23'],
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
  outboundWeekday: schedules.outboundWeekday['station-22'],
  inboundSaturday: schedules.inboundSaturday['station-5'],
  outboundSaturday: schedules.outboundSaturday['station-22'],
  inboundSunday: schedules.inboundSunday['station-5'],
  outboundSunday: schedules.outboundSunday['station-22'],
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
  outboundWeekday: schedules.outboundWeekday['station-21'],
  inboundSaturday: schedules.inboundSaturday['station-6'],
  outboundSaturday: schedules.outboundSaturday['station-21'],
  inboundSunday: schedules.inboundSunday['station-6'],
  outboundSunday: schedules.outboundSunday['station-21'],
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
  outboundWeekday: schedules.outboundWeekday['station-20'],
  inboundSaturday: schedules.inboundSaturday['station-7'],
  outboundSaturday: schedules.outboundSaturday['station-20'],
  inboundSunday: schedules.inboundSunday['station-7'],
  outboundSunday: schedules.outboundSunday['station-20'],
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
  outboundWeekday: schedules.outboundWeekday['station-19'],
  inboundSaturday: schedules.inboundSaturday['station-8'],
  outboundSaturday: schedules.outboundSaturday['station-19'],
  inboundSunday: schedules.inboundSunday['station-8'],
  outboundSunday: schedules.outboundSunday['station-19'],
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
  outboundWeekday: schedules.outboundWeekday['station-18'],
  inboundSaturday: schedules.inboundSaturday['station-9'],
  outboundSaturday: schedules.outboundSaturday['station-18'],
  inboundSunday: schedules.inboundSunday['station-9'],
  outboundSunday: schedules.outboundSunday['station-18'],
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
  outboundWeekday: schedules.outboundWeekday['station-17'],
  inboundSaturday: schedules.inboundSaturday['station-10'],
  outboundSaturday: schedules.outboundSaturday['station-17'],
  inboundSunday: schedules.inboundSunday['station-10'],
  outboundSunday: schedules.outboundSunday['station-17'],
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
  outboundWeekday: schedules.outboundWeekday['station-16'],
  inboundSaturday: schedules.inboundSaturday['station-11'],
  outboundSaturday: schedules.outboundSaturday['station-16'],
  inboundSunday: schedules.inboundSunday['station-11'],
  outboundSunday: schedules.outboundSunday['station-16'],
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
  outboundWeekday: schedules.outboundWeekday['station-15'],
  inboundSaturday: schedules.inboundSaturday['station-12'],
  outboundSaturday: schedules.outboundSaturday['station-15'],
  inboundSunday: schedules.inboundSunday['station-12'],
  outboundSunday: schedules.outboundSunday['station-15'],
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
  outboundWeekday: schedules.outboundWeekday['station-14'],
  inboundSaturday: schedules.inboundSaturday['station-13'],
  outboundSaturday: schedules.outboundSaturday['station-14'],
  inboundSunday: schedules.inboundSunday['station-13'],
  outboundSunday: schedules.outboundSunday['station-14'],
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
  outboundWeekday: schedules.outboundWeekday['station-13'],
  inboundSaturday: schedules.inboundSaturday['station-14'],
  outboundSaturday: schedules.outboundSaturday['station-13'],
  inboundSunday: schedules.inboundSunday['station-14'],
  outboundSunday: schedules.outboundSunday['station-13'],
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
  title: '7th Street Station',
  mapLabel: '7th Street',
  labelSide: 'right',
  inboundWeekday: schedules.inboundWeekday['station-15'],
  outboundWeekday: schedules.outboundWeekday['station-12'],
  inboundSaturday: schedules.inboundSaturday['station-15'],
  outboundSaturday: schedules.outboundSaturday['station-12'],
  inboundSunday: schedules.inboundSunday['station-15'],
  outboundSunday: schedules.outboundSunday['station-12'],
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
    latitude: 35.229714,
    longitude: -80.834874
  },
  title: '9th Street Station',
  mapLabel: '9th Street',
  labelSide: 'right',
  inboundWeekday: schedules.inboundWeekday['station-16'],
  outboundWeekday: schedules.outboundWeekday['station-11'],
  inboundSaturday: schedules.inboundSaturday['station-16'],
  outboundSaturday: schedules.outboundSaturday['station-11'],
  inboundSunday: schedules.inboundSunday['station-16'],
  outboundSunday: schedules.outboundSunday['station-11'],
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
    latitude: 35.235556,
    longitude: -80.825498
  },
  title: 'Parkwood Station',
  mapLabel: 'Parkwood',
  labelSide: 'right',
  inboundWeekday: schedules.inboundWeekday['station-17'],
  outboundWeekday: schedules.outboundWeekday['station-10'],
  inboundSaturday: schedules.inboundSaturday['station-17'],
  outboundSaturday: schedules.outboundSaturday['station-10'],
  inboundSunday: schedules.inboundSunday['station-17'],
  outboundSunday: schedules.outboundSunday['station-10'],
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
    latitude: 35.241383,
    longitude: -80.817717
  },
  title: '25th Street Station',
  mapLabel: '25th Street',
  labelSide: 'left',
  inboundWeekday: schedules.inboundWeekday['station-18'],
  outboundWeekday: schedules.outboundWeekday['station-9'],
  inboundSaturday: schedules.inboundSaturday['station-18'],
  outboundSaturday: schedules.outboundSaturday['station-9'],
  inboundSunday: schedules.inboundSunday['station-18'],
  outboundSunday: schedules.outboundSunday['station-9'],
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
    latitude: 35.249134,
    longitude: -80.806609
  },
  title: '36th Street Station',
  mapLabel: '36th Street',
  labelSide: 'right',
  inboundWeekday: schedules.inboundWeekday['station-19'],
  outboundWeekday: schedules.outboundWeekday['station-8'],
  inboundSaturday: schedules.inboundSaturday['station-19'],
  outboundSaturday: schedules.outboundSaturday['station-8'],
  inboundSunday: schedules.inboundSunday['station-19'],
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
    latitude: 35.251457,
    longitude: -80.792172
  },
  title: 'Sugar Creek Station',
  mapLabel: 'Sugar Creek',
  labelSide: 'left',
  inboundWeekday: schedules.inboundWeekday['station-20'],
  outboundWeekday: schedules.outboundWeekday['station-7'],
  inboundSaturday: schedules.inboundSaturday['station-20'],
  outboundSaturday: schedules.outboundSaturday['station-7'],
  inboundSunday: schedules.inboundSunday['station-20'],
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
    latitude: 35.261930,
    longitude: -80.772479
  },
  title: 'Old Concord Road Station',
  mapLabel: 'Old Concord Rd',
  labelSide: 'right',
  inboundWeekday: schedules.inboundWeekday['station-21'],
  outboundWeekday: schedules.outboundWeekday['station-6'],
  inboundSaturday: schedules.inboundSaturday['station-21'],
  outboundSaturday: schedules.outboundSaturday['station-6'],
  inboundSunday: schedules.inboundSunday['station-21'],
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
    latitude: 35.277857,
    longitude: -80.766301
  },
  title: 'Tom Hunter Station',
  mapLabel: 'Tom Hunter',
  labelSide: 'left',
  inboundWeekday: schedules.inboundWeekday['station-22'],
  outboundWeekday: schedules.outboundWeekday['station-5'],
  inboundSaturday: schedules.inboundSaturday['station-22'],
  outboundSaturday: schedules.outboundSaturday['station-5'],
  inboundSunday: schedules.inboundSunday['station-22'],
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
    latitude: 35.286842,
    longitude: -80.760829
  },
  title: 'University City Blvd Station',
  mapLabel: 'University City',
  labelSide: 'right',
  inboundWeekday: schedules.inboundWeekday['station-23'],
  outboundWeekday: schedules.outboundWeekday['station-4'],
  inboundSaturday: schedules.inboundSaturday['station-23'],
  outboundSaturday: schedules.outboundSaturday['station-4'],
  inboundSunday: schedules.inboundSunday['station-23'],
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
    features.bike
  ]
}, {
  latlng: {
    latitude: 35.286842,
    longitude: -80.760829
  },
  title: 'McCullough Station',
  mapLabel: 'McCullough',
  labelSide: 'left',
  inboundWeekday: schedules.inboundWeekday['station-24'],
  outboundWeekday: schedules.outboundWeekday['station-3'],
  inboundSaturday: schedules.inboundSaturday['station-24'],
  outboundSaturday: schedules.outboundSaturday['station-3'],
  inboundSunday: schedules.inboundSunday['station-24'],
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
    features.bike
  ]
}, {
  latlng: {
    latitude: 35.310792,
    longitude: -80.745061
  },
  title: 'JW Clay Blvd Station',
  mapLabel: 'JW Clay Blvd',
  labelSide: 'right',
  inboundWeekday: schedules.inboundWeekday['station-25'],
  outboundWeekday: schedules.outboundWeekday['station-2'],
  inboundSaturday: schedules.inboundSaturday['station-25'],
  outboundSaturday: schedules.outboundSaturday['station-2'],
  inboundSunday: schedules.inboundSunday['station-25'],
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
    features.bike
  ]
}, {
  latlng: {
    latitude: 35.312174,
    longitude: -80.733635
  },
  description: 'The end of the line.',
  title: 'UNC Charlotte Main Station',
  mapLabel: 'UNC Charlotte',
  labelSide: 'left',
  inboundWeekday: schedules.inboundWeekday['station-26'],
  outboundWeekday: schedules.outboundWeekday['station-1'],
  inboundSaturday: schedules.inboundSaturday['station-26'],
  outboundSaturday: schedules.outboundSaturday['station-1'],
  inboundSunday: schedules.inboundSunday['station-26'],
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
}];
