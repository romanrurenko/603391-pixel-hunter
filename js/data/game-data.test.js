import {assert} from 'chai';
import {generateAnswersArray} from './generate-data.js';
import {INITIAL_GAME, changeLevel, gamePoints, decLife} from '../game-data.js';

describe(`The calculations in the game`, () => {
  it(`should return -1 when the player answered less than 10 questions`, () => {
    assert.equal(gamePoints(generateAnswersArray(10, 0, 0, 0), 0), -1);
  });

  it(`should return 1150 when the player has answered all the questions,
    and not quickly, and not slowly, and he had all the lives`, () => {
    assert.equal(gamePoints(generateAnswersArray(10, 10, 0, 0), 3), 1150);
  });
  it(`should return 1050 when the player answered 10 questions where 5 
  questions fast and 5 slow, and he had 1 the lives `, () => {
    assert.equal(gamePoints(generateAnswersArray(10, 10, 5, 5), 1), 1050);
  });
});

describe(`Check lives decrement`, () => {
  it(`should decrement lives `, () => {
    assert.equal(decLife(3), 2);
    assert.equal(decLife(2), 1);
    assert.equal(decLife(1), 0);
  });
  it(`Lives should not be negative value `, () => {
    assert.equal(decLife(0), 0);
  });
});

describe(`countdown`, () => {

});

describe(`Check level changer`, () => {

  it(`should update level of the game`, () => {
    assert.equal(changeLevel(INITIAL_GAME, 1).level, 1);
    assert.equal(changeLevel(INITIAL_GAME, 2).level, 2);
    assert.equal(changeLevel(INITIAL_GAME, 10).level, 10);
    assert.equal(changeLevel(INITIAL_GAME, 102).level, 102);
  });

  it(`should not allow set negative values`, () => {
    assert.throws(() => changeLevel(INITIAL_GAME, -1).level, `Level should not be negative value`);
  });

  it(`should not allow set non number value`, () => {
    assert.throws(() => changeLevel(INITIAL_GAME, []).level, `Level should be of type number`);

  });
});

