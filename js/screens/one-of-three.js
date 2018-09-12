import {show} from "../util";
import setGreetingScreen from "./greeting";
import {winLevel} from "../game";
import {levelsData} from "../data/game-data";
import OneOfThreeView from "../view/one-of-three-view";


export default (currentState, answersArray) => {


  const OneOfThree = new OneOfThreeView(levelsData[currentState.level], currentState, answersArray);

  OneOfThree.onClickAnswers = (evt) => {
    const targetOption = evt.target.dataset.option;
    const countPainting = levelsData[currentState.level].answers.slice().map((it) => it.type).filter(function (it) {
      return it === `painting`;
    }).length;
    const rightAnswer = (countPainting > 1) ? `photo` : `painting`;

    if (targetOption !== undefined) {
      const userAnswer = levelsData[currentState.level].answers[targetOption - 1].type;
      if (userAnswer === rightAnswer) {
        winLevel(true);
      } else {
        winLevel(false);
      }
    }
  };


  OneOfThree.onClickBack = () => {
    show(setGreetingScreen());
  };

  return OneOfThree.element;

};

