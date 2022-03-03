import {renderTemplate, RenderPosition} from './render.js';

import {createSiteTabTemplate} from './view/site-tab-view.js';
import {createSiteFilterTeamplate} from './view/site-filter-view.js';
import {createSiteSortTeamplate} from './view/site-sort-view.js';
//import {createSiteListTeamplate} from './view/site-list-view.js';
import {createSiteEventEditTeamplate} from './view/site-event-edit-view.js';

const tripTab = document.querySelector('.trip-main');
const tripFilters = document.querySelector('.trip-controls__filters');
const tripEventsSort = document.querySelector('.trip-events');
//const tripEventsList = document.querySelector('.trip-events__item');
const tripEventsEdit = document.querySelector('.trip-events__list');

renderTemplate(tripTab,createSiteTabTemplate(), RenderPosition.AFTERBEGIN);
renderTemplate(tripFilters, createSiteFilterTeamplate(), RenderPosition.BEFOREBEGIN);
renderTemplate(tripEventsSort, createSiteSortTeamplate(), RenderPosition.AFTERBEGIN);
//renderTemplate(tripEventsList, createSiteListTeamplate(), RenderPosition.AFTEREND);
renderTemplate(tripEventsEdit, createSiteEventEditTeamplate(), RenderPosition.BEFOREEND);
