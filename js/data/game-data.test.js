import {assert} from 'chai';
import {generateAnswersArray} from './generate-data.js';
import {INITIAL_STATE, changeLevel, gamePoints} from './game-data.js';

describe(`The calculations in the game`, () => {
  it(`should return -1 when the player answered less than 10 questions`, () => {
    assert.equal(gamePoints(generateAnswersArray(0, 3, 0, 0)), -1);
  });

  it(`should return 1150 when the player has answered all the questions,
    and not quickly, and not slowly, and he had all the lives`, () => {
    assert.equal(gamePoints(generateAnswersArray(10, 0, 0, 0)), 1150);
  });
  it(`should return 1050 when the player answered 9 questions where 4 
  questions fast and 5 slow, and he had 3 the lives `, () => {
    assert.equal(gamePoints(generateAnswersArray(9, 1, 4, 5)), 950);
  });
});

describe(`Check level changer`, () => {

  it(`should update level of the game`, () => {
    assert.equal(changeLevel(INITIAL_STATE, 1).level, 1);
    assert.equal(changeLevel(INITIAL_STATE, 2).level, 2);
    assert.equal(changeLevel(INITIAL_STATE, 10).level, 10);
    assert.equal(changeLevel(INITIAL_STATE, 102).level, 102);
  });

  it(`should not allow set negative values`, () => {
    assert.throws(() => changeLevel(INITIAL_STATE, -1).level, `Level should not be negative value`);
  });

  it(`should not allow set non number value`, () => {
    assert.throws(() => changeLevel(INITIAL_STATE, []).level, `Level should be of type number`);

  });
});

