import AbstractView from './abstract-view';

const createSiteFilterTemplate = (type, currentFilterType) =>  (
  `<div class="trip-filters__filter">
        <input id="filter-${type}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${type}" ${type === currentFilterType ? 'checked' : ''}>
        <label class="trip-filters__filter-label" for="filter-${type}">${type}</label>
   </div>`
);

const createFilterTemplate = (filterItems, currentFilterType) => {
  const filterItemsTemplate = filterItems
    .map((filter) => createSiteFilterTemplate(filter, currentFilterType))
    .join('');


  return `<div class="trip-main__trip-controls  trip-controls">
             <div class="trip-controls__navigation">
               <h2 class="visually-hidden">Switch trip view</h2>
               <nav class="trip-controls__trip-tabs  trip-tabs">
                 <a class="trip-tabs__btn  trip-tabs__btn--active" href="#">Table</a>
                 <a class="trip-tabs__btn" href="#">Stats</a>
               </nav>
             </div>

             <div class="trip-controls__filters">
               <h2 class="visually-hidden">Filter events</h2>
               <form class="trip-filters" action="#" method="get">
               ${filterItemsTemplate}
                 <button class="visually-hidden" type="submit">Accept filter</button>
               </form>
             </div>
           </div>`;
};

export default class SiteFilterView extends AbstractView{
  #filters = null;
  #currentFilter = null;

  constructor(filters, currentFilterType) {
    super();
    this.#filters = filters;
    this.#currentFilter = currentFilterType;
  }

  get template() {
    return createFilterTemplate(this.#filters, this.#currentFilter);
  }

  setFilterTypeChangeHandler = (callback) => {
    this._callback.filterTypeChange = callback;
    this.element.addEventListener('change', this.#filterTypeChangeHandler);
  }

  #filterTypeChangeHandler = (evt) => {
    evt.preventDefault();
    this._callback.filterTypeChange(evt.target.value);
  }
}
