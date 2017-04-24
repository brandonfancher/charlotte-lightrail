import { mapboxApiKey } from './config';

export const mapboxDistanceAPI = {
  getDistance(origin, destinations, mode) {
    const coordinates = destinations;
    coordinates.unshift(origin);

    const endpoint = `distances/v1/mapbox/${mode}`;
    const url = `https://api.mapbox.com/${endpoint}?access_token=${mapboxApiKey}`;
    return fetch(url, { // eslint-disable-line no-undef
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        coordinates,
      }),
    }).then(res => res.json());
  },
};
