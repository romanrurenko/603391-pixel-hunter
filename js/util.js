
export const mainContainer = document.querySelector(`#main`);

export const createElement = (template) => {
  const wrapper = document.createElement(`div`);
  wrapper.innerHTML = template;
  return wrapper;
};

export const insertToMainContainer = (element) => {
  mainContainer.innerHTML = ``;
  mainContainer.appendChild(element);
};


