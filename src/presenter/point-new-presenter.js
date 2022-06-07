import {remove, render, RenderPosition} from '../utils/render';
import {UpdateType, UserAction} from '../utils/const';
import {nanoid} from 'nanoid';
import SiteEventEditView from '../view/site-event-edit-view';

export default class PointNewPresenter {
  #eventListComponent = null;
  #changeData = null;
  #tripEditComponent = null;

  constructor(eventListComponent, changeData) {
    this.#eventListComponent = eventListComponent;
    this.#changeData = changeData;
  }

  init = () => {
    if (this.#tripEditComponent !== null) {
      return;
    }

    this.#tripEditComponent = new SiteEventEditView();
    this.#tripEditComponent.setFormSubmitHandler(this.#handleFormSubmit);
    this.#tripEditComponent.setDeleteClickHandler(this.#handleDeleteClick);

    render(this.#eventListComponent, this.#tripEditComponent, RenderPosition.AFTERBEGIN);

    document.addEventListener('keydown', this.#escKeyDownHandler);
  }

  destroy = () => {
    if (this.#tripEditComponent === null) {
      return;
    }

    remove(this.#tripEditComponent);
    this.#tripEditComponent = null;

    document.removeEventListener('keydown', this.#escKeyDownHandler);
  }

  #handleFormSubmit = (task) => {
    this.#changeData(
      UserAction.ADD_POINT,
      UpdateType.MINOR,
      {id: nanoid(), ...task},
    );
    this.destroy();
  }

  #handleDeleteClick = () => {
    this.destroy();
  }

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.destroy();
    }
  }

}
