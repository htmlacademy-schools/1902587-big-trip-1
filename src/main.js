import {render, RenderPosition, replace} from './utils/render';

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
    replace(tripEditComponent, tripComponent);
  };

  const replaceEditToTrip = () => {
    replace(tripComponent, tripEditComponent);
  };

  const onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      replaceEditToTrip();
      document.removeEventListener('keydown', onEscKeyDown);
    }
  };

  tripComponent.setEditClickHandler(() => {
    replaceTripToEdit();
    document.addEventListener('keydown', onEscKeyDown);
  });

  tripEditComponent.setFormSubmitHandler(() => {
    replaceEditToTrip();
    document.removeEventListener('keydown', onEscKeyDown);
  });

  render(eventListElement, tripComponent, RenderPosition.BEFOREEND);
};

if (trips.length === 0){
  render(tripTab, new SiteTabView(trips), RenderPosition.AFTERBEGIN);
  render(tripFilters, new SiteFilterView(), RenderPosition.BEFOREBEGIN);
  render(tripEvents, new SiteEmptyTripListView(), RenderPosition.AFTERBEGIN);
}
else {
  const eventListComponent = new SiteEventListView();
  render(tripEvents, eventListComponent, RenderPosition.AFTEREND);

  render(tripTab, new SiteTabView(trips), RenderPosition.AFTERBEGIN);
  render(tripFilters, new SiteFilterView(), RenderPosition.BEFOREBEGIN);
  render(tripEvents, new SiteSortView(), RenderPosition.AFTERBEGIN);

  for (let i = 0; i < TRIP_COUNT; i++){
    renderTask(eventListComponent.element, trips[i]);
  }
}
