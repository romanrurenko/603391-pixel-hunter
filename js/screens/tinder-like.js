import TinderLikeView from "../view/tinder-like-view";
import {show} from "../util";
import setGreetingScreen from "./greeting";
import {winLevel} from "../game";
import {levelsData} from "../data/game-data";


export default (currentState, answersArray) => {

  const tinderLike = new TinderLikeView(levelsData[currentState.level], currentState, answersArray);

  tinderLike.onClick = (inputs) => {
    for (const it of inputs) {
      if (it.checked) {
        if (it.value === levelsData[currentState.level].answers[0].type) {
          winLevel(true);
        } else {
          winLevel(false);
        }
      }
    }
  };

  tinderLike.onClickBack = () => {
    show(setGreetingScreen());

  };

  return tinderLike.element;

};

