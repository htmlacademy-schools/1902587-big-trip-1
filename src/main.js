import {renderTemplate, RenderPosition} from './render.js';

import {createSiteTabTemplate} from './view/site-tab-view.js';
import {createSiteFilterTeamplate} from './view/site-filter-view.js';
import {createSiteSortTeamplate} from './view/site-sort-view.js';
import {createSiteListTeamplate} from './view/site-list-view.js';
import {createSiteEventEditTeamplate} from './view/site-event-edit-view.js';

const tripTab = document.querySelector('.trip-main');
const tripFilters = document.querySelector('.trip-controls__filters');
const tripEvents = document.querySelector('.trip-events');

renderTemplate(tripTab,createSiteTabTemplate(), RenderPosition.AFTERBEGIN);
renderTemplate(tripFilters, createSiteFilterTeamplate(), RenderPosition.BEFOREBEGIN);
renderTemplate(tripEvents, createSiteSortTeamplate(), RenderPosition.AFTERBEGIN);
renderTemplate(tripEvents, createSiteEventEditTeamplate(), RenderPosition.BEFOREEND);


for (let i = 0; i < 3; i++){
  renderTemplate(tripEvents, createSiteListTeamplate(), RenderPosition.AFTEREND);
}
