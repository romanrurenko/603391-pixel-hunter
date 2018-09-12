
const mainContainer = document.querySelector(`#main`);

export const render = (template) => {
  const wrapper = document.createElement(`div`);
  wrapper.innerHTML = template;
  return wrapper;
};

export const show = (element) => {
  mainContainer.innerHTML = ``;
  mainContainer.appendChild(element);
};


