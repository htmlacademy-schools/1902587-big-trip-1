import {generateTrip} from './mock/trip.js';
import TripPresenter from './presenter/trip-presenter';
import {render, RenderPosition} from './utils/render';
import SiteTabView from './view/site-tab-view';
import SiteFilterView from './view/site-filter-view';

const TRIP_COUNT = 15;
const trips = Array.from({length: TRIP_COUNT}, generateTrip);
const pageMainElement = document.querySelector('.page-body');

const tripTab = document.querySelector('.trip-main');
const tripFilters = document.querySelector('.trip-controls__filters');

const tripPresenter = new TripPresenter(pageMainElement);

render(tripTab, new SiteTabView(trips), RenderPosition.AFTERBEGIN);
render(tripFilters, new SiteFilterView(), RenderPosition.BEFOREBEGIN);

tripPresenter.init(trips);
