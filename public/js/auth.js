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
    .then((data) => console.log(data));
};
