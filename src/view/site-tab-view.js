import {generateDates} from '../mock/trip.js';
import dayjs from 'dayjs';
import {createElement} from "../render";

const createSiteTabTemplate = (trips) => {

  const randomDate = generateDates();
  const startDate = dayjs(randomDate.start).format('MMM D');
  const endDate = dayjs(randomDate.end).format('D');

  const countPrice = () => {
    let result = 0;
    for (let i = 0; i < trips.length; i++){
      result += trips[i].price;
    }
    return result;
  };

  return `<section class="trip-main__trip-info  trip-info">
             <div class="trip-info__main">
               <h1 class="trip-info__title">Amsterdam &mdash; Chamonix &mdash; Geneva</h1>

               <p class="trip-info__dates">${startDate}&nbsp;&mdash;&nbsp;${endDate}</p>
             </div>

             <p class="trip-info__cost">
               Total: &euro;&nbsp;<span class="trip-info__cost-value">${countPrice()}</span>
             </p>
           </section>`;
};

export default class SiteTabView{
  #element = null;
  #trips = null;

  constructor(trips) {
    this.#trips = trips;
  }

  get element() {
    if (!this.#element){
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  get template(){
    return createSiteTabTemplate(this.#trips);
  }

  removeElement(){
    this.#element = null;
  }
}

