import geolib from 'geolib';
import { mapboxApiKey } from './config';


const orderByDistance = (origin, destinations) => {
  const currentLocation = { latitude: origin[1], longitude: origin[0] };
  const stations = destinations.map(latlng => ({ latitude: latlng[1], longitude: latlng[0] }));

  const nearestStationDistances = geolib
    .orderByDistance(currentLocation, stations)
    .slice(0, 3)
    .sort((a, b) => a.key - b.key);

  const nearestStationCoordinates = nearestStationDistances.map(item => destinations[item.key]);
  const nearestStationIndices = nearestStationDistances.map(item => item.key);

  return { coordinates: nearestStationCoordinates, indices: nearestStationIndices };
};

export const mapboxDistanceAPI = {
  getDistance(origin, destinations, mode) {
    // First, get the nearest three stations as-the-crow-flies, to save on API calls.
    const { coordinates, indices } = orderByDistance(origin, destinations);

    // Prepare the URL for the GET request.
    coordinates.unshift(origin);
    const endpoint = `directions-matrix/v1/mapbox/${mode}`;
    const coordinatesString = coordinates.map(coordinate => coordinate.toString());
    const coordinatesQuery = coordinatesString.join(';');
    const url = `https://api.mapbox.com/${endpoint}/${coordinatesQuery}?sources=0&access_token=${mapboxApiKey}`;

    // Fetch the datat from the Mapbox API.
    return fetch(url)
      .then(res => res.json())
      .then(res => res.durations[0].slice(1)) // remove our current location from the results
      .then((res) => { // build out an array representing the station distances, with null values for stations that were not queried
        const distances = [];
        for (let i = 0; i < destinations.length; i++) {
          if (indices.includes(i.toString())) {
            distances.push(res.shift());
          } else {
            distances.push(null);
          }
        }
        return distances;
      });
  }
};
