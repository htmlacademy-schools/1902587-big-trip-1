import {renderTemplate, RenderPosition} from './render.js';

import {createSiteTabTemplate} from './view/site-tab-view.js';
import {createSiteFilterTeamplate} from './view/site-filter-view.js';
import {createSiteSortTeamplate} from './view/site-sort-view.js';
import {createSiteListTeamplate} from './view/site-list-view.js';
import {createSiteEventEditTeamplate} from './view/site-event-edit-view.js';
import {generateTrip} from './mock/trip.js';

const TRIP_COUNT = 15;

const trips = Array.from({length: TRIP_COUNT}, generateTrip);

const tripTab = document.querySelector('.trip-main');
const tripFilters = document.querySelector('.trip-controls__filters');
const tripEvents = document.querySelector('.trip-events');

renderTemplate(tripTab,createSiteTabTemplate(trips), RenderPosition.AFTERBEGIN);
renderTemplate(tripFilters, createSiteFilterTeamplate(), RenderPosition.BEFOREBEGIN);
renderTemplate(tripEvents, createSiteSortTeamplate(), RenderPosition.AFTERBEGIN);
renderTemplate(tripEvents, createSiteEventEditTeamplate(trips[1]), RenderPosition.BEFOREEND);


for (let i = 1; i < TRIP_COUNT; i++){
  renderTemplate(tripEvents, createSiteListTeamplate(trips[i]), RenderPosition.AFTEREND);
}
