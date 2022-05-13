import SiteSortView from '../view/site-sort-view.js';
import SiteEmptyTripListView from '../view/site-empty-trip-list-view';
import SiteEventListView from '../view/site-event-list-view';
import {render, RenderPosition} from '../utils/render';
import PointPresenter from './point-presenter';
import {updateItem} from '../utils/common';

export default class TripPresenter{
  #mainElement = null;
  #tripEvents = null;

  #eventListComponent = new SiteEventListView();

  #trips = [];
  #pointPresenter = new Map();

  constructor(mainElement) {
    this.#mainElement = mainElement;
    this.#tripEvents = this.#mainElement.querySelector('.trip-events');
  }

  init = (trips) => {
    this.#trips = [...trips];
    this.#renderMain();
  }

  #handleModeChange = () => {
    this.#pointPresenter.forEach((presenter) => presenter.resetView());
  }

  #handleTaskChange = (updatedPoint) => {
    this.#trips = updateItem(this.#trips, updatedPoint);
    this.#pointPresenter.get(updatedPoint.id).init(updatedPoint);
  }

  #renderTask = (trip) => {
    const pointPresenter = new PointPresenter(this.#eventListComponent, this.#handleTaskChange, this.#handleModeChange);
    pointPresenter.init(trip);
    this.#pointPresenter.set(trip.id, pointPresenter);
  }

  #renderEmptyList = () => {
    render(this.#tripEvents, new SiteEmptyTripListView(), RenderPosition.AFTERBEGIN);
  }

  #renderSort = () => {
    render(this.#tripEvents, new SiteSortView(), RenderPosition.AFTERBEGIN);
  }

  #renderTripEventsListElement = () => {
    render(this.#tripEvents, this.#eventListComponent, RenderPosition.AFTEREND);
  }

  #renderTripEventsList = () => {
    for (let i = 0; i < this.#trips.length; i++){
      this.#renderTask(this.#trips[i]);
    }
  }

  #renderMain = () => {
    if (this.#trips.length === 0){
      this.#renderEmptyList();
    }
    else {
      this.#renderSort();
      this.#renderTripEventsListElement();
      this.#renderTripEventsList();
    }
  }

  #clearTaskList = () => {
    this.#pointPresenter.forEach((presenter) => presenter.destroy());
    this.#pointPresenter.clear();
  }
}
