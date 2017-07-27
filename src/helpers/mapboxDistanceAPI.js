/* eslint-disable no-else-return */
import { mapboxApiKey } from './config';

export const mapboxDistanceAPI = {
  getDistance(origin, destinations, mode) {
    const coordinates = destinations;
    coordinates.unshift(origin);

    if (__DEV__) {
      const endpoint = `directions-matrix/v1/mapbox/${mode}`;
      const coordinatesString = coordinates.map(coordinate => coordinate.toString());
      const coordinatesQuery = coordinatesString.join(';');
      // eslint-disable-next-line
      const url = `https://api.mapbox.com/${endpoint}/${coordinatesQuery}?access_token=${mapboxApiKey}`;
      return fetch(url).then(res => res.json());
    } else {
      const endpoint = `distances/v1/mapbox/${mode}`;
      const url = `https://api.mapbox.com/${endpoint}?access_token=${mapboxApiKey}`;
      return fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          coordinates
        })
      }).then(res => res.json());
    }
  }
};
