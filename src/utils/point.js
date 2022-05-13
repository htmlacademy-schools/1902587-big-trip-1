import dayjs from 'dayjs';

export const sortTaskByDay = (pointA, pointB) => dayjs(pointA.dateStart).diff(dayjs(pointB.dateStart));

export const sortTaskByDuration = (pointA, pointB) => {
  const durationPointA = dayjs(pointA.dateEnd).diff(dayjs(pointA.dateStart));
  const durationPointB = dayjs(pointB.dateEnd).diff(dayjs(pointB.dateStart));

  if (durationPointB - durationPointA !== 0) {
    return durationPointB - durationPointA;
  } else {
    return dayjs(pointA.dateStart).diff(dayjs(pointB.dateStart));
  }
};

export const sortTaskByPrice = (pointA, pointB) => {
  if (pointB.price - pointA.price !== 0) {
    return pointB.price - pointA.price;
  } else {
    return dayjs(pointA.dateStart).diff(dayjs(pointB.dateStart));
  }
};
