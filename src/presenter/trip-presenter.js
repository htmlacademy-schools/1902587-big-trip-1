import SiteSortView from '../view/site-sort-view.js';
import SiteEmptyTripListView from '../view/site-empty-trip-list-view';
import SiteEventListView from '../view/site-event-list-view';
import {remove, render, RenderPosition} from '../utils/render';
import PointPresenter from './point-presenter';
import {sortTaskByDay, sortTaskByDuration, sortTaskByPrice} from '../utils/point';
import {FilterType, SortType, UpdateType, UserAction} from '../utils/const';
import {filter} from '../utils/filters';
import PointNewPresenter from './point-new-presenter';

export default class TripPresenter{
  #mainElement = null;
  #tripEvents = null;

  #filterModel = null;
  #pointsModel = null;

  #noTripPointsComponent = null;
  #eventListComponent = new SiteEventListView();
  #sortComponent = null;

  #pointPresenter = new Map();
  #pointNewPresenter = null;

  #currentSortType = SortType.SORT_DAY;
  #filterType = FilterType.EVERYTHING;

  constructor(mainElement, pointsModel, filterModel) {
    this.#mainElement = mainElement;
    this.#tripEvents = this.#mainElement.querySelector('.trip-events');

    this.#pointsModel = pointsModel;
    this.#filterModel = filterModel;

    this.#pointNewPresenter = new PointNewPresenter(this.#eventListComponent, this.#handleViewAction);

    this.#pointsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get points() {
    this.#filterType = this.#filterModel.filter;
    const points = this.#pointsModel.points;
    const filteredPoints = filter[this.#filterType](points);

    switch (this.#currentSortType) {
      case SortType.SORT_DAY:
        return filteredPoints.sort(sortTaskByDay);
      case SortType.SORT_TIME:
        return filteredPoints.sort(sortTaskByDuration);
      case SortType.SORT_PRICE:
        return filteredPoints.sort(sortTaskByPrice);
    }

    return filteredPoints;
  }

  init = () => {
    this.#renderMain();
  }

  createPoint = () => {
    this.#currentSortType = SortType.SORT_DAY;
    this.#filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    this.#pointNewPresenter.init();
  }

  #renderNoTasks = () => {
    this.#noTripPointsComponent = new SiteEmptyTripListView(this.#filterType);
    render(this.#tripEvents, this.#noTripPointsComponent, RenderPosition.BEFOREEND);
  }

  #renderTripEventsListElement = () => {
    render(this.#tripEvents, this.#eventListComponent, RenderPosition.AFTEREND);
  }

  #handleModeChange = () => {
    this.#pointNewPresenter.destroy();
    this.#pointPresenter.forEach((presenter) => presenter.resetView());
  }

  #handleViewAction = (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.#pointsModel.updatePoint(updateType, update);
        break;
      case UserAction.ADD_POINT:
        this.#pointsModel.addPoint(updateType, update);
        break;
      case UserAction.DELETE_POINT:
        this.#pointsModel.deletePoint(updateType, update);
        break;
    }
  }

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#pointPresenter.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this.#clearMain();
        this.#renderMain();
        break;
      case UpdateType.MAJOR:
        this.#clearMain({resetRenderedTaskCount: true, resetSortType: true});
        this.#renderMain();
        break;
    }
  }

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }
    this.#currentSortType = sortType;
    this.#clearTaskList();
    this.#renderTripPoints(this.points);
    this.#clearMain({resetRenderedTaskCount: true});
    this.#renderMain();

  }

  #renderSort = () => {
    this.#sortComponent = new SiteSortView(this.#currentSortType);
    this.#sortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);
    render(this.#tripEvents, this.#sortComponent, RenderPosition.AFTERBEGIN);
  }

  #renderTripPoint = (point) => {
    const pointPresenter = new PointPresenter(this.#eventListComponent, this.#handleViewAction, this.#handleModeChange);
    pointPresenter.init(point);
    this.#pointPresenter.set(point.id, pointPresenter);
  };

  #renderTripPoints = (points) => {
    points.forEach((point) => this.#renderTripPoint(point));
  }

  #clearMain = ({resetSortType = false} = {}) => {
    this.#pointPresenter.forEach((presenter) => presenter.destroy());
    this.#pointPresenter.clear();

    remove(this.#sortComponent);

    if (resetSortType) {
      this.#currentSortType = SortType.SORT_DAY;
    }

    if (this.#noTripPointsComponent) {
      remove(this.#noTripPointsComponent);
    }
  }

  #renderMain = () => {
    const points = this.points;
    const pointCount = points.length;

    if (pointCount === 0) {
      this.#renderNoTasks();
      return;
    }

    this.#renderSort();
    this.#renderTripEventsListElement();
    this.#renderTripPoints(points);
  }

  #clearTaskList = () => {
    this.#pointNewPresenter.destroy();
    this.#pointPresenter.forEach((presenter) => presenter.destroy());
    this.#pointPresenter.clear();
  }
}
