import {show} from "../util";
import setGreetingScreen from "./greeting";
import {winLevel} from "../game";
import {levelsData} from "../data/game-data";
import TwoOfTwoView from "../view/two-of-two-view";


export default (currentState, answersArray) => {

  const TwoOfTwo = new TwoOfTwoView(levelsData[currentState.level], currentState, answersArray);

  TwoOfTwo.onClick = (inputs) => {
    const checkedButtons = Array.from(inputs).map((item)=>
      item.checked ? item.value : ``).filter((it) => it !== ``);

    let answersData = levelsData[currentState.level].answers.map((item)=>
      item.type);

    if (checkedButtons.length > 1) {
      if (JSON.stringify(answersData) === JSON.stringify(checkedButtons)) {
        winLevel(true);
      } else {
        winLevel(false);
      }
    }
  };

  TwoOfTwo.onClickBack = () => {
    show(setGreetingScreen());

  };

  return TwoOfTwo.element;
};

