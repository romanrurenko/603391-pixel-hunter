
export const INITIAL_STATE = Object.freeze({
  level: 0,
  lives: 3,
  time: 0
});


// const points = {
//   successAnswer: 100,
//   fastAnswer: 50,
//   slowAnswer: -50,
//   forLife: 50
// };


export const changeLevel = (game, level) => {
  if (typeof level !== `number`) {
    throw new Error(`Level should be of type number`);
  }

  if (level < 0) {
    throw new Error(`Level should not be negative value`);
  }

  const newGame = Object.assign({}, game, {
    level
  });
  return newGame;
};

export const getDataStat = (array) => {
  let game = {};
  game.lives = 3 - array.slice().filter((it) => it.success === false).length;
  game.fast = array.slice().filter((it) => it.time < 10).length;
  game.slow = array.slice().filter((it) => it.time >= 20).length;
  game.normal = array.slice().filter((it) => it.time > 10 && it.time < 20).length;
  game.correct = array.slice().filter((it) => it.success === true).length;
  game.undefined = array.slice().filter((it) => it.success === undefined).length;
  return game;
};


export const gamePoints = (answers) => {

  let game = getDataStat(answers);
  let sumGamePoint = game.correct * 100 + game.fast * 50 + game.slow * -50 + game.lives * 50;
  if (game.undefined > 0) {
    sumGamePoint = -1;
  }

  return sumGamePoint;
};

export const level = [{"type": `tinder-like`, "question": `Угадай, фото или рисунок?`,
  "answers": [{"image": {"url": `https://k43.kn3.net/1C4F7F5D5.jpg`, "width": 705, "height": 455}, "type": `painting`}]},
{"type": `tinder-like`, "question": `Угадай, фото или рисунок?`,
  "answers": [{"image": {"url": `https://k41.kn3.net/CF684A85A.jpg`, "width": 705, "height": 455}, "type": `painting`}]},
{"type": `tinder-like`, "question": `Угадай, фото или рисунок?`,
  "answers": [{"image": {"url": `http://i.imgur.com/ncXRs5Y.jpg`,
    "width": 705, "height": 455}, "type": `photo`}]}, {"type": `one-of-three`,
  "question": `Найдите фото среди изображений`, "answers": [{"image": {"url": `https://k40.kn3.net/6A7A24F7C.jpg`,
    "width": 304, "height": 455}, "type": `painting`}, {"image": {"url": `https://k32.kn3.net/42C83EF0A.jpg`,
    "width": 304, "height": 455}, "type": `painting`}, {"image": {"url": `https://i.imgur.com/NXlVX48.png`,
    "width": 304, "height": 455}, "type": `photo`}]}, {"type": `tinder-like`, "question": `Угадай, фото или рисунок?`,
  "answers": [{"image": {"url": `https://k36.kn3.net/1619797DF.jpg`, "width": 705, "height": 455}, "type": `painting`}]},
{"type": `one-of-three`, "question": `Найдите рисунок среди изображений`,
  "answers": [{"image": {"url": `http://i.imgur.com/mz0MSsy.jpg`, "width": 304,
    "height": 455}, "type": `photo`}, {"image": {"url": `http://i.imgur.com/jP4C1IS.jpg`,
    "width": 304, "height": 455}, "type": `photo`}, {"image": {"url": `https://k42.kn3.net/D2F0370D6.jpg`,
    "width": 304, "height": 455}, "type": `painting`}]}, {"type": `one-of-three`,
  "question": `Найдите рисунок среди изображений`, "answers": [{"image": {"url": `http://i.imgur.com/W5DNOVJ.jpg`,
    "width": 304, "height": 455}, "type": `photo`}, {"image": {"url": `http://i.imgur.com/zHRZW1C.jpg`, "width": 304,
    "height": 455}, "type": `photo`}, {"image": {"url": `https://k42.kn3.net/D660F0768.jpg`, "width": 304, "height": 455},
    "type": `painting`}]}, {"type": `one-of-three`, "question": `Найдите рисунок среди изображений`,
  "answers": [{"image": {"url": `http://i.imgur.com/1KegWPz.jpg`, "width": 304, "height": 455}, "type": `photo`},
    {"image": {"url": `http://i.imgur.com/gUeK0qE.jpg`, "width": 304, "height": 455}, "type": `photo`},
    {"image": {"url": `https://k42.kn3.net/F588C1419.jpg`, "width": 304, "height": 455}, "type": `painting`}]},
{"type": `one-of-three`, "question": `Найдите рисунок среди изображений`,
  "answers": [{"image": {"url": `https://i.redd.it/bj70zjl196kx.jpg`, "width": 304, "height": 455}, "type": `photo`},
    {"image": {"url": `http://i.imgur.com/UIHVp0P.jpg`, "width": 304, "height": 455}, "type": `photo`},
    {"image": {"url": `https://k35.kn3.net/2B925F44D.jpg`, "width": 304, "height": 455}, "type": `painting`}]},
{"type": `tinder-like`, "question": `Угадай, фото или рисунок?`,
  "answers": [{"image": {"url": `https://k37.kn3.net/0F4598844.jpg`, "width": 705, "height": 455}, "type": `painting`}]}];


