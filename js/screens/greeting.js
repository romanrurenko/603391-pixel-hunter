
import {show} from "../util";
import setRulesScreen from './rules.js';
import GreetingView from "../view/greeting-view";

export default () => {
  const greeting = new GreetingView();
  greeting.onClick = () => {
    show(setRulesScreen());
  };
  return greeting.element;
};

