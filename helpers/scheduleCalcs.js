import moment from 'moment';
import { blueStops } from './config';


// Get day for purposes of determining which train schedule is in force
// I chose 3 AM as the cutoff. If DST were to impact this, it would shift one
// hour, and an hour in either direction will not adversely affect the results.
export const getScheduleDay = () => {
  const day = moment().day();
  const hour = moment().hour();
  if ((day === 6 && hour >= 3) || (day === 0 && hour < 3)) {
    return { day: 'Saturday', index: 1 };
  } else if ((day === 0 && hour >= 3) || (day === 1 && hour < 3)) {
    return { day: 'Sunday', index: 2 };
  }
  return { day: 'Weekday', index: 0 };
};

export const distanceTimeConverter = (distance) => {
  let time = distance;
  let hours = 0;
  let mins;
  // Get hours
  if (distance >= 3600) {
    hours += Number.parseInt(distance / 3600, 10);
    time = distance % 3600;
  }
  // Get minutes
  mins = Math.round(time / 60);
  // If minutes is sixty, add an hour to hours and set minutes to 0
  if (mins === 60) {
    hours += 1;
    mins = 0;
  }
  // If hours is 0, drop it and only send back minutes
  if (hours) {
    return `${hours} hr ${mins} min`;
  }
  return `${mins} min`;
};

export const getNextTrainTime = (direction, stationIndex) => {
  const targetStation = blueStops[stationIndex];

  const day = moment().day();
  const time = moment().format('HH:mm');

  const getTime = (firstOrLast, dayOfWeek) => {
    const getTheTime = targetStation[`${direction}${dayOfWeek}`]
      .filter(theTime => theTime !== 'no stop');
    if (firstOrLast === 'last' && getTheTime[getTheTime.length - 1] < '12:00') {
      return getTheTime[getTheTime.length - 1];
    } else if (firstOrLast === 'last') {
      return '00:00';
    }
    return getTheTime[0];
  };

  // Based on current time and day of week, determine which schedule should be in effect.
  let targetSchedule;
  if ((day === 6 && time > getTime('last', 'Weekday')) || (day === 0 && time <= getTime('first', 'Sunday'))) {
    targetSchedule = `${direction}Saturday`;
  } else if ((day === 0 && time > getTime('last', 'Saturday')) || (day === 1 && time <= getTime('first', 'Weekday'))) {
    targetSchedule = `${direction}Sunday`;
  } else {
    targetSchedule = `${direction}Weekday`;
  }

  // Filter out the 'no stops' and sort from earliest time to latest so that we can get the next train time.
  const schedule = targetStation[targetSchedule]
    .filter(theTime => theTime !== 'no stop')
    .sort();

  const firstTrain = moment(schedule[0], 'HH:mm');
  const nextTrain = schedule
    .map(theTime => moment(theTime, 'HH:mm'))
    .find(theTime => theTime.isAfter(moment()));

  // If there's no scheduled time after the current time, then default to the first time
  const nextTrainTime = nextTrain ? nextTrain.format('LT') : firstTrain.format('LT');
  const nextTrainDelta = nextTrain ? nextTrain.fromNow() : firstTrain.add(1, 'days').fromNow();
  return { time: nextTrainTime, delta: nextTrainDelta };
};
