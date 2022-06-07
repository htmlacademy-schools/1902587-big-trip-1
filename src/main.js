import {generateTrip} from './mock/trip.js';
import TripPresenter from './presenter/trip-presenter';
import {render, RenderPosition} from './utils/render';
import SiteTabView from './view/site-tab-view';
//import SiteFilterView from './view/site-filter-view';
import PointsModel from './model/points-model';
import FilterModel from './model/filter-model';
import FilterPresenter from './presenter/filter-presenter';

const TRIP_COUNT = 15;
const trips = Array.from({length: TRIP_COUNT}, generateTrip);
const pageMainElement = document.querySelector('.page-body');

const tripTab = document.querySelector('.trip-main');
const tripFilters = document.querySelector('.trip-controls__filters');

const pointsModel = new PointsModel();
pointsModel.points = trips;

const filterModel = new FilterModel();

render(tripTab, new SiteTabView(trips), RenderPosition.AFTERBEGIN);
//render(tripFilters, new SiteFilterView(), RenderPosition.BEFOREBEGIN);

const tripPresenter = new TripPresenter(pageMainElement, pointsModel, filterModel);
const filterPresenter = new FilterPresenter(tripFilters, filterModel);

tripPresenter.init();
filterPresenter.init();

document.querySelector('.trip-main__event-add-btn').addEventListener('click', (evt) => {
  evt.preventDefault();
  tripPresenter.createPoint();
});
