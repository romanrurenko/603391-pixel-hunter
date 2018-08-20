// intro.js

import {changeScreen, render} from './util.js';
import greetingScreen from './greeting.js';

const introTamplate = `
<section class="intro">
    <button class="intro__asterisk asterisk" type="button"><span class="visually-hidden">Продолжить</span>*</button>
    <p class="intro__motto">
    <sup>*</sup> Это не фото. Это рисунок маслом нидерландского художника-фотореалиста Tjalf Sparnaay.</p>
</section>`;

const element = render(introTamplate);

const asteriskButton = element.querySelector(`.intro__asterisk`);

asteriskButton.addEventListener(`click`, () => {
  changeScreen(greetingScreen);
});

export default element;
