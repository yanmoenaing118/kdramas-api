export const showAuthErr = (msg) => {
  const markup = `<div class="error__auth">${msg}</div>`;
  const el = document
    .querySelector(".form-auth")
    .insertAdjacentHTML("afterbegin", markup);

  window.setTimeout(() => {
    document.querySelector(".error__auth").textContent = "";
  }, 2000);
};
