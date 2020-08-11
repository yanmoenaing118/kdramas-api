const createNewComment = (cmt, cmter) => {
  const cmtContainer = document.querySelector(".drama-comments");
  const newCmt = `<div class="comment">
  <div  class="comment__avatar">
    <a href="/">
      <img src="/img/users/${cmter.photo}" alt="avatar" class="avatar">
    </a>
  </div>
  <div class="comment__details">
    <div class="comment__ut">
      <a href="/" class="comment__author">${cmter.name}</a>
      <div class="comment__time">${cmt.createdAt.toString()}</div>
    </div>
    <div class="comment__content">
      ${cmt.comment}
    </div>
    <div class="comment__react">
      <button class="comment__react-btn">
        <svg class="comment__react-icon">
          <use xlink:href="/img/assets/sprite.svg#icon-heart"></use>
        </svg>
      </button>
      <div class="comment__react-count">${cmt.likes}</div>
    </div>
  </div>
</div>`;
  cmtContainer.insertAdjacentHTML("beforeend", newCmt);
};

export const postComment = (cmt, drama) => {
  console.log(cmt, drama);
  let comment = null;
  fetch(`http://localhost:9000/api/v1/dramas/${drama}/comments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ comment: cmt }),
  })
    .then((res) => res.json())
    .then((data) => {
      comment = { ...data.data.data };
      return fetch(`http://localhost:9000/api/v1/users/getMe`);
    })
    .then((response) => response.json())
    .then((data) => {
      const cmter = { ...data.data.data };
      createNewComment(comment, cmter);
    })
    .catch((err) => console.log(err));
};
