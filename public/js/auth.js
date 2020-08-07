export const login = (email, password) => {
  console.log(email, password);
  fetch("http://localhost:9000/api/v1/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      window.setTimeout(() => {
        window.location.assign("/dramas");
      }, 1000);
    });
};

export const signup = (name, email, password, passwordConfirm) => {
  console.log(name, email, password, passwordConfirm);
  fetch("http://localhost:9000/api/v1/users/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, password, passwordConfirm }),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      window.setTimeout(() => {
        window.location.assign("/dramas");
      }, 1000);
    })
    .catch((err) => {
      console.log(err);
    });
};
