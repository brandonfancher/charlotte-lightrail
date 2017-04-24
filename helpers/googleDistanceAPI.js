import { googleApiKey } from './config'

export const googleDistanceAPI = {
  getDistance (origins, destinations, mode) {
    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origins}&destinations=${destinations}&mode=${mode}&units=imperial&departure_time=now&key=${googleApiKey}`
    return fetch(url).then(res => res.json()) // eslint-disable-line no-undef
  }
}
