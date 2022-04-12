import {render, RenderPosition} from './render.js';

import SiteTabView from './view/site-tab-view.js';
import SiteFilterView from './view/site-filter-view.js';
import SiteSortView from './view/site-sort-view.js';
import SiteListView from './view/site-list-view.js';
import SiteEventEditView from './view/site-event-edit-view.js';
import SiteEventListView from './view/site-event-list-view';
import SiteEmptyTripListView from './view/site-empty-trip-list-view';
import {generateTrip} from './mock/trip.js';

const TRIP_COUNT = 15;
const trips = Array.from({length: TRIP_COUNT}, generateTrip);

const tripTab = document.querySelector('.trip-main');
const tripFilters = document.querySelector('.trip-controls__filters');
const tripEvents = document.querySelector('.trip-events');

const renderTask = (eventListElement, trip) => {
  const tripComponent = new SiteListView(trip);
  const tripEditComponent = new SiteEventEditView(trip);

  const replaceTripToEdit = () => {
    eventListElement.replaceChild(tripEditComponent.element, tripComponent.element);
  };

  const replaceEditToTrip = () => {
    eventListElement.replaceChild(tripComponent.element, tripEditComponent.element);
  };

  const onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      replaceEditToTrip();
      document.removeEventListener('keydown', onEscKeyDown);
    }
  };

  tripComponent.element.querySelector('.event__rollup-btn').addEventListener('click', () => {
    replaceTripToEdit();
    document.addEventListener('keydown', onEscKeyDown);
  });

  tripEditComponent.element.querySelector('form').addEventListener('submit', (evt) => {
    evt.preventDefault();
    replaceEditToTrip();
    document.removeEventListener('keydown', onEscKeyDown);
  });

  render(eventListElement, tripComponent.element, RenderPosition.BEFOREEND);
};

if (trips.length === 0){
  render(tripTab, new SiteTabView(trips).element, RenderPosition.AFTERBEGIN);
  render(tripFilters, new SiteFilterView().element, RenderPosition.BEFOREBEGIN);
  render(tripEvents, new SiteEmptyTripListView().element, RenderPosition.AFTERBEGIN);
}
else {
  const eventListComponent = new SiteEventListView();
  render(tripEvents, eventListComponent.element, RenderPosition.AFTEREND);

  render(tripTab, new SiteTabView(trips).element, RenderPosition.AFTERBEGIN);
  render(tripFilters, new SiteFilterView().element, RenderPosition.BEFOREBEGIN);
  render(tripEvents, new SiteSortView().element, RenderPosition.AFTERBEGIN);

  for (let i = 0; i < TRIP_COUNT; i++){
    renderTask(eventListComponent.element, trips[i]);
  }
}
