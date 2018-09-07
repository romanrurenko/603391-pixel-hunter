import {insertToMainContainer, createElement} from './util.js';
import {getHeader} from "./header";
import {level, INITIAL_STATE} from "./game-data";
import {getList} from "./stats-line";
import {getStatsTemplate} from "./stats";
import {setIntroScreen} from "./intro";

let currentGame = Object.assign({}, INITIAL_STATE);
let answersArray = [];
let lastAnswersArray = [];

export const startGame = () => {

  let answer = {
    success: 0,
    time: 0,
  };

  const decLife = (lives) => {
    let newLives = lives - 1;
    if (newLives < 0) {
      newLives = 0;
    }
    currentGame.lives = newLives;
  };

  const getGameTamplate = (type, currentLevel, levelData) => {
    let template;

    switch (type) {

      case `two-of-two`: template = `<section class="game">
    <p class="game__task">${levelData[currentLevel].question}</p>
    <form class="game__content">
      <div class="game__option">
        <img src="${levelData[currentLevel].answers[0].image.url}" alt="Option 1" width="468" height="458">
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
         <img src="${levelData[currentLevel].answers[1].image.url}" alt="Option 2" width="468" height="458">
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
    ${getList(answersArray)}
  </section>`;
        break;
      case `tinder-like`: template = `<section class="game">
    <p class="game__task">${levelData[currentLevel].question}</p>
    <form class="game__content  game__content--wide">
      <div class="game__option">
         <img src="${levelData[currentLevel].answers[0].image.url}" alt="Option 1" width="705" height="455">
        <label class="game__answer  game__answer--photo">
          <input class="visually-hidden" name="question1" type="radio" value="photo">
          <span>Фото</span>
        </label>
        <label class="game__answer  game__answer--paint">
          <input class="visually-hidden" name="question1" type="radio" value="painting">
          <span>Рисунок</span>
        </label>
      </div>
    </form>
  ${getList(answersArray)}
  </section>`;
        break;
      case `one-of-three`: template = `<section class="game">
    <p class="game__task">${levelData[currentLevel].question}</p>
    <form class="game__content  game__content--triple">
      <div class="game__option">
        <img src="${levelData[currentLevel].answers[0].image.url}" alt="Option 1" data-option=1 width="304" height="455">
      </div>
      <div class="game__option  game__option--selected">
        <img src="${levelData[currentLevel].answers[1].image.url}" alt="Option 2" data-option=2 width="304" height="455">
      </div>
      <div class="game__option">
        <img src="${levelData[currentLevel].answers[2].image.url}" alt="Option 3" data-option=3 width="304" height="455">
      </div>
    </form>
  ${getList(answersArray)}
  </section>`;
        break;
      default: template = `Error`;
    }

    return template;
  };


  const refreshLevel = () => {
    const gameContainerElement = document.createDocumentFragment();
    const headerElement = createElement(getHeader(currentGame));

    const levelElement = createElement(getGameTamplate(level[currentGame.level].type, currentGame.level, level));

    gameContainerElement.appendChild(headerElement);
    gameContainerElement.appendChild(levelElement);
    insertToMainContainer(gameContainerElement);
  };

  refreshLevel();


  const checkOneOfThree = (evt) => {
    const targetOption = evt.target.dataset.option;
    if (targetOption !== undefined) {
      if (level[currentGame.level].answers[targetOption - 1].type === `painting`) {
        goToNextLevel(true);
      } else {
        decLife(currentGame.lives);
        goToNextLevel(false);
      }
    }
  };
  const checkTinderLike = () => {
    for (const it of inputs) {
      if (it.checked) {
        if (it.value === level[currentGame.level].answers[0].type) {
          goToNextLevel(true);
        } else {
          decLife(currentGame.lives);
          goToNextLevel(false);
        }
      }
    }
  };
  const checkTwoOfTwo = () => {
    let checkedButtons = Array.from(inputs).map((item)=>
      item.checked ? item.value : ``);

    checkedButtons = checkedButtons.filter((it) => it !== ``);

    let answersData = level[currentGame.level].answers.map((item)=>
      item.type);

    if (checkedButtons.length > 1) {
      if (JSON.stringify(answersData) === JSON.stringify(checkedButtons)) {
        goToNextLevel(true);
      } else {
        decLife(currentGame.lives);
        goToNextLevel(false);
      }
    }
  };

  const checkAnswers = (evt) => {
    if (level[currentGame.level].type === `one-of-three`) {
      checkOneOfThree(evt);
    } else if (level[currentGame.level].type === `tinder-like`) {
      checkTinderLike();
    } else if (level[currentGame.level].type === `two-of-two`) {
      checkTwoOfTwo();
    }
  };


  const onInputsChange = (evt) => {
    checkAnswers(evt);
  };
  const form = document.querySelector(`.game__content`);
  const inputs = form.querySelectorAll(`input`);

  form.addEventListener(`click`, onInputsChange);

  const goToNextLevel = (rightAnswer) => {

    if (currentGame.level < 10) {
      if (rightAnswer) {
        answer = {
          success: true,
          time: 15,
        };
      } else {
        answer = {
          success: false,
          time: undefined,
        };
      }
      answersArray.push(answer);
      currentGame.level += 1;
    }

    if (currentGame.level === 10 || currentGame.lives === 0) {

      if (lastAnswersArray.length < 3) {
        lastAnswersArray.push(answersArray);
      } else {
        lastAnswersArray.shift();
        lastAnswersArray.push(answersArray);
      }

      const statScreen = createElement(getStatsTemplate(lastAnswersArray));
      insertToMainContainer(statScreen);
      const backButton = document.querySelector(`.back`);
      backButton.addEventListener(`click`, () => {
        setIntroScreen();
      });
      currentGame = Object.assign({}, INITIAL_STATE);
      answersArray = [];
    } else {
      startGame();
    }
  };

  const backButton = document.querySelector(`.back`);
  backButton.addEventListener(`click`, () => {
    setIntroScreen();
  });
};


