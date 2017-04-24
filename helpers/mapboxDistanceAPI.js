import { mapboxApiKey } from './config'

export const mapboxDistanceAPI = {
  getDistance (origin, destinations, mode) {
    const coordinates = destinations
    coordinates.unshift(origin)

    const endpoint = `distances/v1/mapbox/${mode}`
    const url = `https://api.mapbox.com/${endpoint}?access_token=${mapboxApiKey}`
    return fetch(url, { // eslint-disable-line no-undef
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        coordinates: coordinates
      })
    }).then(res => res.json())
  }
}

export const distanceTimeConverter = distance => {
  let time = distance
  let hours = 0
  let mins
  // Get hours
  if (distance >= 3600) {
    hours += Number.parseInt(distance / 3600, 10)
    time = distance % 3600
  }
  // Get minutes
  mins = Math.round(time / 60)
  // If minutes is sixty, add an hour to hours and set minutes to 0
  if (mins === 60) {
    hours += 1
    mins = 0
  }
  // If hours is 0, drop it and only send back minutes
  if (hours) {
    return `${hours} hr ${mins} min`
  }
  return `${mins} min`
}
