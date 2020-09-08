export const showAuthErr = (msg) => {
  const markup = `<div class="error__auth">${msg}</div>`;
  document.querySelector(".form-auth").insertAdjacentHTML("afterbegin", markup);

  window.setTimeout(() => {
    document.querySelector(".error__auth").textContent = "";
  }, 2000);
};

export const showCmtErr = () => {
  const markup = "<div class='error__cmt'>*A comment cannot be empty!</div>";
  document
    .querySelector(".comment-box")
    .insertAdjacentHTML("afterbegin", markup);
  window.setTimeout(() => {
    document.querySelector(".error__cmt").textContent = "";
  }, 1000);
};
