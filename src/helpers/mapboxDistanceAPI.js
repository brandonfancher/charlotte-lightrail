import { mapboxApiKey } from './config';

export const mapboxDistanceAPI = {
  getDistance(origin, destinations, mode) {
    const coordinates = destinations;
    coordinates.unshift(origin);

    const endpoint = `directions-matrix/v1/mapbox/${mode}`;
    const coordinatesString = coordinates.map(coordinate => coordinate.toString());
    const coordinatesQuery = coordinatesString.join(';');
    const url = `https://api.mapbox.com/${endpoint}/${coordinatesQuery}?access_token=${mapboxApiKey}`;
    return fetch(url).then(res => res.json());
  }
};
