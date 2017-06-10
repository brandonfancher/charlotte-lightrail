import { mapboxApiKey } from './config';

export const mapboxDistanceAPI = {
  getDistance(origin, destinations, mode) {
    const coordinates = destinations;
    coordinates.unshift(origin);

    const endpoint = `distances/v1/mapbox/${mode}`;
    const new_endpoint = `directions-matrix/v1/mapbox/${mode}`;
    const url = `https://api.mapbox.com/${endpoint}?access_token=${mapboxApiKey}`;
    coordinates_string = coordinates.map(coordinate => {
      return coordinate.toString();
    });
    coordinates_query = coordinates_string.join(';');
    const new_url = `https://api.mapbox.com/${new_endpoint}/${coordinates_query}?access_token=${mapboxApiKey}`;
    return fetch(new_url).then(res => res.json());
  },
};
