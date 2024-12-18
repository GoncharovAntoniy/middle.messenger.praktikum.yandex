export const redirect = (element, changePage) => {
  element.addEventListener('click', e => {
    e.preventDefault();
    changePage();
  });
};
