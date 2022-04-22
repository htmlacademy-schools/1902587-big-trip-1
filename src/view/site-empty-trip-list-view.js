import AbstractView from './abstract-view';

const createEmptyTripListTemplate = () => (
  `<p class="trip-events__msg">
     Click New Event to create your first point
  </p>`
);

export default class SiteEmptyTripListView extends AbstractView{
  get template(){
    return createEmptyTripListTemplate();
  }
}
