
import {show} from '../util.js';
import setGreetingScreen from './greeting.js';
import IntroView from "../view/intro-view";

export default () => {
  const intro = new IntroView();
  intro.onClick = () => {
    show(setGreetingScreen());
  };

  return intro.element;
};

