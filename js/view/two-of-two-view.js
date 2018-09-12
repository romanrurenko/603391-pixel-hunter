import AbstractView from "./abstract-view";
import {resize} from "../resize";
import {getHeader} from "../header";
import {getList} from "../stats-line";

export default class TwoOfTwoView extends AbstractView {
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
    <form class="game__content">
      <div class="game__option">
        <img src="${this.currentLevel.answers[0].image.url}" alt="Option 1"  width="468" height="458"}>
        <label class="game__answer game__answer--photo">
          <input class="visually-hidden" name="question1" type="radio" value="photo">
          <span>Фото</span>
        </label>
        <label class="game__answer game__answer--paint">
          <input class="visually-hidden" name="question1" type="radio" value="painting">
          <span>Рисунок</span>
        </label>
      </div>
      <div class="game__option">
         <img src="${this.currentLevel.answers[1].image.url}" alt="Option 2"   width="468" height="458">
        <label class="game__answer  game__answer--photo">
          <input class="visually-hidden" name="question2" type="radio" value="photo">
          <span>Фото</span>
        </label>
        <label class="game__answer  game__answer--paint">
          <input class="visually-hidden" name="question2" type="radio" value="painting">
          <span>Рисунок</span>
        </label>
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

    const inputs = this.element.querySelectorAll(`input`);

    form.addEventListener(`click`, () => {
      this.onClick(inputs);
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
