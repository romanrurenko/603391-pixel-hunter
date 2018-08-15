
const ARROW_CONTENT = `<div class="arrows__wrap">
  <style>
.arrows__wrap {
  position: absolute;
  top: 95px;
  left: 50%;
  margin-left: -56px;
}
.arrows__btn {
  background: none;
  border: 2px solid black;
  padding: 5px 20px;
}
</style>
<button class="arrows__btn"><-</button>
<button class="arrows__btn">-></button>
</div>`;

const SCREENS_IDS = [`intro`, `greeting`, `rules`, `game-1`, `game-2`, `game-3`, `stats`];

const mainElement = document.querySelector(`#main`);

const selectSlide = (element) => {
  mainElement.innerHTML = ``;
  mainElement.appendChild(element.cloneNode(true));
};

const screens = Array.from(document.querySelectorAll(`template`)).
map((item) => item.content);

const screenAdress = Array.from(document.querySelectorAll(`template`)).
map((item) => SCREENS_IDS.indexOf(item.id));

let current = 0;

const select = (index) => {
  index = index < 0 ? 0 : index;
  index = index >= 6 ? 6 : index;
  current = index;
  selectSlide(screens[(screenAdress[current])]);
};


document.addEventListener(`keydown`, (event) => {
  switch (event.key) {
    case `ArrowRight`:
      select(current + 1);
      break;
    case `ArrowLeft`:
      select(current - 1);
      break;
  }
});

document.body.insertAdjacentHTML(`beforeend`, ARROW_CONTENT);

const arrows = document.querySelectorAll(`.arrows__btn`);

arrows[0].addEventListener(`click`, () => {
  select(current - 1);
});

arrows[1].addEventListener(`click`, () => {
  select(current + 1);
});

select(0);
