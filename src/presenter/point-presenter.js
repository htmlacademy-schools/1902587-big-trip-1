import SiteListView from '../view/site-list-view';
import SiteEventEditView from '../view/site-event-edit-view';
import {remove, render, RenderPosition, replace} from '../utils/render';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

export default class PointPresenter {
  #eventListComponent = null;
  #changeData = null;
  #changeMode = null;

  #tripComponent = null;
  #tripEditComponent = null;

  #trip = null;
  #mode = Mode.DEFAULT;

  constructor(eventListComponent, changeData, changeMode) {
    this.#eventListComponent = eventListComponent;
    this.#changeData = changeData;
    this.#changeMode = changeMode;
  }

  init = (trip) => {
    this.#trip = trip;

    const prevTripComponent = this.#tripComponent;
    const prevTripEditComponent = this.#tripEditComponent;

    this.#tripComponent = new SiteListView(trip);
    this.#tripEditComponent = new SiteEventEditView(trip);

    this.#tripComponent.setEditClickHandler(this.#handleEditClick);
    this.#tripComponent.setFavoriteClickHandler(this.#handleFavoriteClick);
    this.#tripEditComponent.setRollupClickHandler(this.#handleRollupClick);
    this.#tripEditComponent.setFormSubmitHandler(this.#handleFormSubmit);

    if (prevTripComponent === null || prevTripEditComponent === null){
      render(this.#eventListComponent, this.#tripComponent, RenderPosition.BEFOREEND);
      return;
    }

    if (this.#mode === Mode.DEFAULT){
      replace(this.#tripComponent, prevTripComponent);
    }

    if (this.#mode === Mode.EDITING){
      replace(this.#tripEditComponent, prevTripEditComponent);
    }

    remove(prevTripComponent);
    remove(prevTripEditComponent);
  }

  destroy = () => {
    remove(this.#tripComponent);
    remove(this.#tripEditComponent);
  }

  resetView = () => {
    if (this.#mode !== Mode.DEFAULT) {
      this.#replaceFormToItem();
    }
  }

  #replaceItemToForm = () => {
    replace(this.#tripEditComponent, this.#tripComponent);
    document.addEventListener('keydown', this.#escKeyDownHandler);
    this.#changeMode();
    this.#mode = Mode.EDITING;
  }

  #replaceFormToItem = () => {
    replace(this.#tripComponent, this.#tripEditComponent);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
    this.#mode = Mode.DEFAULT;
  }

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#replaceFormToItem();
      document.removeEventListener('keydown', this.#escKeyDownHandler);
    }
  }

  #handleEditClick = () => {
    this.#replaceItemToForm();
  }

  #handleFavoriteClick = () => {
    this.#changeData({...this.#trip, isFavorite: !this.#trip.isFavorite});
  }

  #handleRollupClick = () => {
    this.#replaceFormToItem();
  };

  #handleFormSubmit = (trip) => {
    this.#changeData(trip);
    this.#replaceFormToItem();
  };
}
