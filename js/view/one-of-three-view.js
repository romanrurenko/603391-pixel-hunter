import AbstractView from "./abstract-view";
import {getList} from "../stats-line";
import {getHeader} from "../header";
import {resize} from "../resize";

export default class OneOfThreeView extends AbstractView {
  constructor(currentLevel, currentState, answersArray) {
    super();
    this.currentLevel = currentLevel;
    this.currentGame = currentState;
    this.answersArray = answersArray;
  }

  get template() {
    return `${getHeader(this.currentGame)}
<section class="game">
    <p class="game__task">${this.currentLevel.question}</p>
    <form class="game__content  game__content--triple">
      <div class="game__option">
        <img src="${this.currentLevel.answers[0].image.url}" alt="Option 1" data-option=1 width="304" height="455">
      </div>
      <div class="game__option  game__option--selected">
        <img src="${this.currentLevel.answers[1].image.url}" alt="Option 2" data-option=2 width="304" height="455">
      </div>
      <div class="game__option">
        <img src="${this.currentLevel.answers[2].image.url}" alt="Option 3" data-option=3 width="304" height="455">
      </div>
    </form>
  ${getList(this.answersArray)}
  </section>`;
  }

  bind() {
    const backButton = this.element.querySelector(`.back`);
    const form = this.element.querySelector(`.game__content`);

    const images = this.element.querySelectorAll(`.game__option img`);
    images.forEach((it) => {
      it.addEventListener(`load`, function () {
        let realSize = {width: it.naturalWidth, height: it.naturalHeight};
        const newSize = resize({width: it.width, height: it.height}, realSize);
        it.width = newSize.width;
        it.height = newSize.height;
      });
    });


    form.addEventListener(`click`, (evt) => {
      this.onClickAnswers(evt);
    });


    backButton.addEventListener(`click`, () => {
      this.onClickBack();
    });

  }

  onClick() {

  }

  onClickAnswers() {

  }

}
