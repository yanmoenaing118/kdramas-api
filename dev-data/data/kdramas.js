const a_drama = {
  title: "",
  leadActor: "",
  leadActress: "",
  director: "",
  scriptWriter: "",
  noepisodes: 16,
  poster: "",
  images: ["img1.jpg", "img2.jpg"],
  releasedYear: "",
  countryOfOrigin: "",
  description: "",
  imdbRating: "",
  //comment: [], virtual populate
};

const a_user = {
  name: "",
  email: "",
  password: "",
  passwordConfirm: "",
  role: "",
};

const a_comment = {
  userId: "ObjectId of a user who commented",
  dramaId: "objectId of a drama which a user commented",
  body: "comments",
  createdAt: "",
  eiditedAt: "",
};
