import dayjs from 'dayjs';
import SmartView from './smart-view';
import {destinations} from '../mock/destinations';
import flatpickr from 'flatpickr';

import '../../node_modules/flatpickr/dist/flatpickr.min.css';

const createSiteEventEditTemplate = (trip) => {
  const {additionalOptions, photo, dateStart, dateEnd, price, waypointType, destination, description} = trip;

  const getOfferElement = (offer) => {
    const isChecked = offer.isChosen ? ' checked=""' : '';
    return `<div class="event__offer-selector">
                <input class="event__offer-checkbox  visually-hidden" id="event-offer-${offer.type}-1" type="checkbox" name="event-offer-${offer.type}"${isChecked}>
                <label class="event__offer-label" for="event-offer-${offer.type}-1">
                      <span class="event__offer-title">${offer.name}</span>
                      &plus;&euro;&nbsp;
                      <span class="event__offer-price">${offer.price}</span>
               </label>
            </div>`;
  };
  const offerElement = additionalOptions.map(getOfferElement).join('');

  const getOfferList = (offers) => {
    if (offers.length !== 0) {
      return `<section class="event__section  event__section--offers">
              <h3 class="event__section-title  event__section-title--offers">Offers</h3>
              <div class="event__available-offers">
                 ${offers}
              </div>
              </section>`;
    }
    return '';
  };
  const offersList = getOfferList(offerElement);

  const getPhoto = (photos) => `<img class="event__photo" src="${photos}" alt="Event photo">`;
  const photosList = photo.map(getPhoto).join('');

  const startDate = dayjs(dateStart).format('DD/MM/YY HH:mm');
  const endDate = dayjs(dateEnd).format('DD/MM/YY HH:mm');

  return `<li class="trip-events__item">
              <form class="event event--edit" action="#" method="post">
                <header class="event__header">
                  <div class="event__type-wrapper">
                    <label class="event__type  event__type-btn" for="event-type-toggle-1">
                      <span class="visually-hidden">Choose event type</span>
                      <img class="event__type-icon" width="17" height="17" src="img/icons/${waypointType}.png" alt="Event type icon">
                    </label>
                    <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

                    <div class="event__type-list">
                      <fieldset class="event__type-group">
                        <legend class="visually-hidden">Event type</legend>

                        <div class="event__type-item">
                          <input id="event-type-taxi-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="taxi">
                          <label class="event__type-label  event__type-label--taxi" for="event-type-taxi-1">Taxi</label>
                        </div>

                        <div class="event__type-item">
                          <input id="event-type-bus-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="bus">
                          <label class="event__type-label  event__type-label--bus" for="event-type-bus-1">Bus</label>
                        </div>

                        <div class="event__type-item">
                          <input id="event-type-train-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="train">
                          <label class="event__type-label  event__type-label--train" for="event-type-train-1">Train</label>
                        </div>

                        <div class="event__type-item">
                          <input id="event-type-ship-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="ship">
                          <label class="event__type-label  event__type-label--ship" for="event-type-ship-1">Ship</label>
                        </div>

                        <div class="event__type-item">
                          <input id="event-type-drive-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="drive">
                          <label class="event__type-label  event__type-label--drive" for="event-type-drive-1">Drive</label>
                        </div>

                        <div class="event__type-item">
                          <input id="event-type-flight-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="flight" checked>
                          <label class="event__type-label  event__type-label--flight" for="event-type-flight-1">Flight</label>
                        </div>

                        <div class="event__type-item">
                          <input id="event-type-check-in-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="check-in">
                          <label class="event__type-label  event__type-label--check-in" for="event-type-check-in-1">Check-in</label>
                        </div>

                        <div class="event__type-item">
                          <input id="event-type-sightseeing-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="sightseeing">
                          <label class="event__type-label  event__type-label--sightseeing" for="event-type-sightseeing-1">Sightseeing</label>
                        </div>

                        <div class="event__type-item">
                          <input id="event-type-restaurant-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="restaurant">
                          <label class="event__type-label  event__type-label--restaurant" for="event-type-restaurant-1">Restaurant</label>
                        </div>
                      </fieldset>
                    </div>
                  </div>

                  <div class="event__field-group  event__field-group--destination">
                    <label class="event__label  event__type-output" for="event-destination-1">
                      ${waypointType}
                    </label>
                    <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destination}" list="destination-list-1">
                    <datalist id="destination-list-1">
                      <option value="Amsterdam"></option>
                      <option value="Geneva"></option>
                      <option value="Chamonix"></option>
                    </datalist>
                  </div>

                  <div class="event__field-group  event__field-group--time">
                    <label class="visually-hidden" for="event-start-time-1">From</label>
                    <input class="event__input  event__input--time event__input-start-time" id="event-start-time-1" type="text" name="event-start-time" value="${startDate}">
                    &mdash;
                    <label class="visually-hidden" for="event-end-time-1">To</label>
                    <input class="event__input  event__input--time event__input-end-time" id="event-end-time-1" type="text" name="event-end-time" value="${endDate}">
                  </div>

                  <div class="event__field-group  event__field-group--price">
                    <label class="event__label" for="event-price-1">
                      <span class="visually-hidden">Price</span>
                      &euro;
                    </label>
                    <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${price}">
                  </div>

                  <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
                  <button class="event__reset-btn" type="reset">Cancel</button>
                  <button class="event__rollup-btn" type="button">
                    <span class="visually-hidden">Open event</span>
                  </button>
                </header>
                <section class="event__details">
                  ${offersList}
                  <section class="event__section  event__section--destination">
                    <h3 class="event__section-title  event__section-title--destination">Destination</h3>
                    <p class="event__destination-description">${description}</p>
                    <div class="event__photos-container">
                    <div class="event__photos-tape">
                    ${photosList}
                    </div>
                    </div>
                  </section>
                </section>
              </form>
            </li>
  `;
};

export default class SiteEventAddView extends SmartView{
  #trip = null;
  #datepicker = null;

  constructor(trip) {
    super();
    this._data = SiteEventAddView.parsePointToData(trip);

    this.#setInnerHandlers();
    this.#setStartDatepicker();
    this.#setEndDatepicker();
  }

  get template(){
    return createSiteEventEditTemplate(this._data);
  }

  removeElement = () => {
    super.removeElement();

    if (this.#datepicker) {
      this.#datepicker.destroy();
      this.#datepicker = null;
    }
  }

  reset = (trip) => {
    this.updateData(
      SiteEventAddView.parsePointToData(trip),
    );
  }

  restoreHandlers = () => {
    this.#setInnerHandlers();
    this.#setStartDatepicker();
    this.#setEndDatepicker();
    //this.setRollupClickHandler(this._callback.rollupClick);
    this.setFormSubmitHandler(this._callback.formSubmit);
    //this.setDeleteClickHandler(this._callback.deleteClick);
  }

  #setStartDatepicker = () => {
    this.#datepicker = flatpickr(
      this.element.querySelector('.event__input-start-time'),
      {
        enableTime: true,
        dateFormat: 'd/m/y H:i',
        defaultDate: this._data.date,
        onChange: this.#dateStartChangeHandler,
      },
    );
  }

  #setEndDatepicker = () => {
    this.#datepicker = flatpickr(
      this.element.querySelector('.event__input-end-time'),
      {
        enableTime: true,
        dateFormat: 'd/m/y H:i',
        defaultDate: this._data.date,
        onChange: this.#dateEndChangeHandler,
      },
    );
  }

  #dateEndChangeHandler = ([userDate]) => {
    this.updateData({
      dateEnd: userDate,
    });
  }

  #dateStartChangeHandler = ([userDate]) => {
    this.updateData({
      dateStart: userDate,
    });
  }

  #setInnerHandlers = () => {
    this.element.querySelector('.event__type-group')
      .addEventListener('change', this.#typeGroupClickHandler);
    this.element.querySelector('.event__input--destination')
      .addEventListener('change', this.#destinationChangeHandler);
    this.element.querySelector('.event__input-start-time')
      .addEventListener('change', this.#startTimeChangeHandler);
    this.element.querySelector('.event__input-end-time')
      .addEventListener('change', this.#endTimeChangeHandler);
    this.element.querySelector('.event__input--price')
      .addEventListener('change', this.#basePriceChangeHandler);
  }

  #typeGroupClickHandler = (evt) => {
    evt.preventDefault();
    this.updateData({
      type: evt.target.value
    }, false);
  }

  #destinationChangeHandler = (evt) => {
    evt.preventDefault();
    this.updateData({
      destination: this.#getChangedDestination(evt.target.value)
    }, false);
  }

  #startTimeChangeHandler = (evt) => {
    evt.preventDefault();
    this.updateData({
      dateFrom: evt.target.value
    }, true);
  }

  #endTimeChangeHandler = (evt) => {
    evt.preventDefault();
    this.updateData({
      dateTo: evt.target.value
    }, true);
  }

  #basePriceChangeHandler = (evt) => {
    evt.preventDefault();
    this.updateData({
      basePrice: evt.target.value
    }, true);
  }

  setFormSubmitHandler = (callback) => {
    this._callback.formSubmit = callback;
    this.element.querySelector('form').addEventListener('submit', this.#formSubmitHandler);
  }

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this._callback.formSubmit();
    this._callback.formSubmit(this._data);
    this._callback.formSubmit(SiteEventAddView.parseDataToPoint(this._data));
  }

  setRollupClickHandler = (callback) => {
    this._callback.rollupClick = callback;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#rollupClickHandler);
  }

  #rollupClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.rollupClick();
  }

  setDeleteClickHandler = (callback) => {
    this._callback.deleteClick = callback;
    this.element.querySelector('.event__reset-btn').addEventListener('click', this.#formDeleteClickHandler);
  }

  #formDeleteClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.deleteClick(SiteEventAddView.parseDataToPoint(this._data));
  }

  static parsePointToData = (point) => ({...point,

  });

  static parseDataToPoint = (data) => {
    const point = {...data};

    return point;
  }

  #getChangedDestination = (destinationName) => {
    const allDestinations = destinations();

    for (let i = 0; i < allDestinations.length; i++) {
      if (allDestinations[i].name === destinationName) {
        return allDestinations[i];
      }
    }

    return {
      'description': null,
      'name': '',
      'pictures': []
    };
  };
}
