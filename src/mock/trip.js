import dayjs from 'dayjs';
import {getRandomInteger} from '../utils/common';
import {nanoid} from 'nanoid';

const generateWaypointType = () => {
  const waypointType = [
    'Taxi', 'Bus', 'Train', 'Ship', 'Drive', 'Flight', 'Check-in', 'Sightseeing', 'Restaurant'
  ];

  const randomIndex = getRandomInteger(0, waypointType.length - 1);
  return waypointType[randomIndex];
};

const generateDestination = () => {
  const destinations = [
    'Geneva', 'London', 'Mexico', 'Odessa', 'Riga', 'Rome', 'Chicago'
  ];

  const randomIndex = getRandomInteger(0, destinations.length - 1);
  return destinations[randomIndex];
};

const generateDescription = () => {
  const descriptions = [
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget.',
    'Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra.',
    'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.',
    'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis.',
    'Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.'
  ];

  const randomIndex = getRandomInteger(0, descriptions.length - 1);
  return descriptions[randomIndex];
};

export const generateDates = () => {
  const maxGap = 7;
  const dateStart = dayjs()
    .add(getRandomInteger(-maxGap, maxGap), 'day')
    .add(getRandomInteger(-maxGap, maxGap), 'hour')
    .add(getRandomInteger(-maxGap, maxGap), 'minute');
  const dateEnd = dateStart
    .clone()
    .add(getRandomInteger(0, maxGap), 'day')
    .add(getRandomInteger(0, 59), 'hour')
    .add(getRandomInteger(0, 59), 'minute');
  return{
    start: dateStart.toDate(),
    end: dateEnd.toDate()
  };
};

const generateDurationStay = (start, end) => {
  const period = new Date(end - start);

  return {
    day: period.getDate() - 1,
    hour: period.getHours(),
    minute: period.getMinutes()
  };
};

const generateAdditionalOptions = () => {
  const offers = [
    {
      name: 'Add luggage',
      price: 30,
      type: 'luggage',
      isChosen: Boolean(getRandomInteger(0,1))
    },
    {
      name: 'Switch to comfort class',
      price: 100,
      type: 'class',
      isChosen: Boolean(getRandomInteger(0,1))
    },
    {
      name: 'Add meal',
      price: 15,
      type: 'meal',
      isChosen: Boolean(getRandomInteger(0,1))
    },
    {
      name: 'Choose seats',
      price: 5,
      type: 'flight',
      isChosen: Boolean(getRandomInteger(0,1))
    },
    {
      name: 'Travel by train',
      price: 40,
      type: 'transport',
      isChosen: Boolean(getRandomInteger(0,1))
    },
  ];

  const offersNum = getRandomInteger(0, 5);
  const offersRandom = [];
  while (offersRandom.length < offersNum){
    const offer = Math.floor(Math.random() * offers.length);
    if (offersRandom.indexOf(offers[offer]) === -1) {
      offersRandom.push(offers[offer]);
    }
  }

  return offersRandom;
};

const generatePhoto = () => {
  const randomPhoto = getRandomInteger(1, 5);
  const photo = [];
  for (let i = 0; i < randomPhoto; i++){
    photo.push(`http://picsum.photos/248/152?r=${getRandomInteger(1, 100)}`);
  }
  return photo;
};

const generatePrice = () => getRandomInteger(10, 1000);

export const generateTrip = () => {
  const dates = generateDates();

  return {
    id: nanoid(),
    waypointType: generateWaypointType(),
    destination: generateDestination(),
    description: generateDescription(),
    dateStart: dates.start,
    dateEnd: dates.end,
    durationStay: generateDurationStay(dates.start, dates.end),
    additionalOptions: generateAdditionalOptions(),
    photo: generatePhoto(),
    price: generatePrice(),
    isFavorite: Boolean(getRandomInteger(0,1))
  };
};
