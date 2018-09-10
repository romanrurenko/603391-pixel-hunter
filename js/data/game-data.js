
export const INITIAL_STATE = Object.freeze({
  level: 0,
  lives: 3,
  time: 0
});

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

export const level = [{"type": `one-of-three`,
  "question": `Найдите фото среди изображений`,
  "answers": [
    {"image": {"url": `https://k36.kn3.net/E9B401148.jpg`, "width": 304, "height": 455}, "type": `painting`},
    {"image": {"url": `https://k41.kn3.net/FF5009BF0.jpg`, "width": 304, "height": 455}, "type": `painting`},
    {"image": {"url": `http://i.imgur.com/jP4C1IS.jpg`, "width": 304, "height": 455}, "type": `photo`}
  ]},
{"type": `one-of-three`, "question": `Найдите рисунок среди изображений`,
  "answers": [{"image": {"url": `http://i.imgur.com/dWTKNtv.jpg`, "width": 304, "height": 455},
    "type": `photo`}, {"image": {"url": `https://i.imgur.com/NXlVX48.png`, "width": 304, "height": 455},
    "type": `photo`}, {"image": {"url": `https://k35.kn3.net/9ACD0AC56.jpg`, "width": 304, "height": 455},
    "type": `painting`}]},
{"type": `tinder-like`, "question": `Угадай, фото или рисунок?`,
  "answers": [{"image": {"url": `http://i.imgur.com/q7rBB8Y.jpg`, "width": 705, "height": 455},
    "type": `photo`}]},
{"type": `one-of-three`, "question": `Найдите фото среди изображений`,
  "answers": [{"image": {"url": `https://k36.kn3.net/1619797DF.jpg`, "width": 304, "height": 455},
    "type": `painting`}, {"image": {"url": `https://k38.kn3.net/AD92BA712.jpg`, "width": 304, "height": 455},
    "type": `painting`}, {"image": {"url": `http://i.imgur.com/Gvq3jc2.jpg`, "width": 304, "height": 455},
    "type": `photo`}]},
{"type": `tinder-like`, "question": `Угадай, фото или рисунок?`,
  "answers": [{"image": {"url": `http://i.imgur.com/rY9u55S.jpg`, "width": 705, "height": 455},
    "type": `photo`}]},
{"type": `two-of-two`, "question": `Угадайте для каждого изображения фото или рисунок?`,
  "answers": [{"image": {"url": `http://i.imgur.com/W5DNOVJ.jpg`, "width": 468, "height": 458}, "type": `photo`},
    {"image": {"url": `https://k31.kn3.net/4BF6BBF0E.jpg`, "width": 468, "height": 458}, "type": `painting`}]},
{"type": `two-of-two`, "question": `Угадайте для каждого изображения фото или рисунок?`,
  "answers": [{"image": {"url": `http://i.imgur.com/jBLSxQ9.png`, "width": 468, "height": 458},
    "type": `photo`}, {"image": {"url": `https://k43.kn3.net/956572A45.jpg`, "width": 468, "height": 458},
    "type": `painting`}]},
{"type": `two-of-two`, "question": `Угадайте для каждого изображения фото или рисунок?`,
  "answers": [{"image": {"url": `http://i.imgur.com/mz0MSsy.jpg`, "width": 468, "height": 458}, "type": `photo`},
    {"image": {"url": `http://i.imgur.com/ncXRs5Y.jpg`, "width": 468, "height": 458}, "type": `photo`}]},
{"type": `two-of-two`, "question": `Угадайте для каждого изображения фото или рисунок?`,
  "answers": [{"image": {"url": `http://i.imgur.com/Jvzh3pk.jpg`, "width": 468, "height": 458},
    "type": `photo`}, {"image": {"url": `https://k43.kn3.net/27AC45B8B.jpg`, "width": 468,
    "height": 458}, "type": `painting`}]}, {"type": `tinder-like`,
  "question": `Угадай, фото или рисунок?`, "answers": [{"image": {"url": `https://i.redd.it/n1vqglrr0o2y.jpg`,
    "width": 705, "height": 455}, "type": `photo`}]}];


