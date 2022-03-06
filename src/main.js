import {renderTemplate, RenderPosition} from './render.js';

import {createSiteTabTemplate} from './view/site-tab-view.js';
import {createSiteFilterTeamplate} from './view/site-filter-view.js';
import {createSiteSortTeamplate} from './view/site-sort-view.js';
//import {createSiteEditFormTeamplate} from './view/site-edit-form-view.js';
//import {createSiteAddPointTeamplate} from './view/site-add-point-view.js';

const tripTab = document.querySelector('.trip-main');
const tripFilters = document.querySelector('.trip-controls__filters');
const tripEventsSort = document.querySelector('.trip-events');
//const tr = document.querySelector('.trip-events');

renderTemplate(tripTab,createSiteTabTemplate(), RenderPosition.AFTERBEGIN);
renderTemplate(tripFilters, createSiteFilterTeamplate(), RenderPosition.BEFOREBEGIN);
renderTemplate(tripEventsSort, createSiteSortTeamplate(), RenderPosition.BEFOREBEGIN);
//renderTemplate(tr, createSiteEditFormTeamplate(), RenderPosition.AFTERBEGIN);

//for (let i = 0; i < 3; i++){
//renderTemplate(tripEventsSort, createSiteAddPointTeamplate(), RenderPosition.AFTEREND);
//}

