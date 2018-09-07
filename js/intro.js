
import {insertToMainContainer, createElement} from './util.js';
import {setGreetingScreen} from './greeting.js';

export const setIntroScreen = () => {

  const introTamplate = `<section class="intro">
    <button class="intro__asterisk asterisk" type="button"><span class="visually-hidden">Продолжить</span>*</button>
    <p class="intro__motto">
    <sup>*</sup> Это не фото. Это рисунок маслом нидерландского художника-фотореалиста Tjalf Sparnaay.</p>
</section>`;
  const element = createElement(introTamplate);
  insertToMainContainer(element);
  const asteriskButton = element.querySelector(`.intro__asterisk`);

  asteriskButton.addEventListener(`click`, () => {
    return setGreetingScreen();
  });
  return element;
};

