import {getList} from "./stats-line";
import {gamePoints, getDataStat} from "./game-data";


export const getStatsTemplate = (lastAanswersArrays) => {

  let statNode = ``;
  let game = {};

  lastAanswersArrays.forEach((it, index) => {
    let answersArray = it;
    game = getDataStat(answersArray);
    const rezultNumber = index + 1;

    const stat = {
      win: `<section class="result">
    <h2 class="result__title">Победа!</h2>
    <table class="result__table">
      <tr>
        <td class="result__number">${rezultNumber}.</td>
        <td colspan="2">
          ${getList(answersArray)}
        </td>
        <td class="result__points">× 100</td>
        <td class="result__total">${game.correct * 100}</td>
      </tr>
      ${(game.fast > 0) ? `<tr>
        <td></td>
        <td class="result__extra">Бонус за скорость:</td>
        <td class="result__extra">${game.fast} <span class="stats__result stats__result--fast"></span></td>
        <td class="result__points">× 50</td>
        <td class="result__total">${game.fast * 50}</td>
      </tr>` : ``}
      ${(game.lives > 0) ? `<tr>
        <td></td>
        <td class="result__extra">Бонус за жизни:</td>
        <td class="result__extra">${game.lives}<span class="stats__result stats__result--alive"></span></td>
        <td class="result__points">× 50</td>
        <td class="result__total">${game.lives * 50}</td>
      </tr>` : ``}
      ${(game.slow > 0) ? `<tr> 
        <td></td>
        <td class="result__extra">Штраф за медлительность:</td>
        <td class="result__extra">${game.slow}<span class="stats__result stats__result--slow"></span></td>
        <td class="result__points">× 50</td>
        <td class="result__total">${game.slow * -50}</td>
      </tr>` : ``}
      <tr>
        <td colspan="5" class="result__total  result__total--final">${gamePoints(answersArray)}</td>
      </tr>
    </table>
    </section>`,
      fail: `<table class="result__table">
    <tr>
    <td class="result__number">${rezultNumber}.</td>
    <td>
    ${getList(answersArray)}
    </td>
    <td class="result__total"></td>
    <td class="result__total  result__total--final">fail</td>
    </tr>
    </table>
    </section>`,
    };

    statNode += `${(game.lives > 0) ? (stat.win) : (stat.fail)}
    `;
  });

  const header = `<header class="header">
    <button class="back">
      <span class="visually-hidden">Вернуться к началу</span>
      <svg class="icon" width="45" height="45" viewBox="0 0 45 45" fill="#000000">
        <use xlink:href="img/sprite.svg#arrow-left"></use>
      </svg>
      <svg class="icon" width="101" height="44" viewBox="0 0 101 44" fill="#000000">
        <use xlink:href="img/sprite.svg#logo-small"></use>
      </svg>
    </button>
  </header>`;


  return `${header} ${statNode}`;
};

export default getStatsTemplate;
