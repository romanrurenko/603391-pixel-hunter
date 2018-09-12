import {show} from '../util.js';
import {startGame} from "../game";
import setGreetingScreen from "./greeting";
import RulesView from "../view/rules-view";

export default () => {
  const rules = new RulesView();

  rules.onClick = () => {
    startGame();
  };

  rules.onClickBack = () => {
    show(setGreetingScreen());
  };

  return rules.element;
};


