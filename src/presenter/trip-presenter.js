import SiteSortView from '../view/site-sort-view.js';
import SiteEmptyTripListView from '../view/site-empty-trip-list-view';
import SiteEventListView from '../view/site-event-list-view';
import {render, RenderPosition} from '../utils/render';
import PointPresenter from './point-presenter';
import {updateItem} from '../utils/common';
import {sortTaskByDay, sortTaskByDuration, sortTaskByPrice} from '../utils/point';
import {SortType} from '../utils/const';

export default class TripPresenter{
  #mainElement = null;
  #tripEvents = null;

  #eventListComponent = new SiteEventListView();
  #sortComponent = new SiteSortView();

  #trips = [];
  #pointPresenter = new Map();

  #currentSortType = SortType.SORT_DAY;
  #sourcedTripPoints = [];

  constructor(mainElement) {
    this.#mainElement = mainElement;
    this.#tripEvents = this.#mainElement.querySelector('.trip-events');
  }

  init = (trips) => {
    this.#trips = [...trips];
    this.#sourcedTripPoints = [...trips];
    this.#renderMain();
  }

  #handleModeChange = () => {
    this.#pointPresenter.forEach((presenter) => presenter.resetView());
  }

  #handleTaskChange = (updatedPoint) => {
    this.#trips = updateItem(this.#trips, updatedPoint);
    this.#sourcedTripPoints = updateItem(this.#sourcedTripPoints, updatedPoint);
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

  #sortTasks = (sortType) => {
    switch (sortType) {
      case SortType.SORT_DAY:
        this.#trips.sort(sortTaskByDay);
        break;
      case SortType.SORT_TIME:
        this.#trips.sort(sortTaskByDuration);
        break;
      case SortType.SORT_PRICE:
        this.#trips.sort(sortTaskByPrice);
        break;
      default:
        this.#trips = [...this.#sourcedTripPoints];
    }
    this.#currentSortType = sortType;
  }

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }
    this.#sortTasks(sortType);
    this.#clearTaskList();
    this.#renderTripEventsList();
  }

  #renderSort = () => {
    render(this.#tripEvents, this.#sortComponent, RenderPosition.AFTERBEGIN);
    this.#sortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);
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
      this.#sortTasks(this.#currentSortType);
      this.#renderTripEventsList();
    }
  }

  #clearTaskList = () => {
    this.#pointPresenter.forEach((presenter) => presenter.destroy());
    this.#pointPresenter.clear();
  }
}
