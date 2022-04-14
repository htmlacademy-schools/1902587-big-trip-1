import {createElement} from '../render';

const createEmptyTripListTemplate = () => (
  `<p class="trip-events__msg">
     Click New Event to create your first point
  </p>`
);

export default class SiteEmptyTripListView {
  #element = null;

  get element() {
    if (!this.#element){
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  get template(){
    return createEmptyTripListTemplate();
  }

  removeElement() {
    this.#element = null;
  }
}
