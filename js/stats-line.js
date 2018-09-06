
const getClasses = (classArray) => {

  let stringStat = ``;
  let item = ``;
  for (let i = 0; i < classArray.length; ++i) {

    if (classArray[i].success === undefined) {
      item = `unknown`;
    } else if (classArray[i].success === false) {
      item = `wrong`;
    } if (classArray[i].time < 10) {
      item = `fast`;
    }
    if (classArray[i].time >= 10 && classArray[i].time < 20) {
      item = `correct`;
    }
    if (classArray[i].time > 20) {
      item = `slow`;
    }

    stringStat += `<li class="stats__result stats__result--${item}"></li>    
`;
  }

  return stringStat;
};

export const getList = (array) =>
  `<ul class="stats">
${getClasses(array)}
${new Array(10 - array.length)
    .fill(`<li class="stats__result stats__result--unknown"></li>`)
  .join(``)}
</ul>`;
