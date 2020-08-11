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


const json = {
  "title": "Strong Woman Do Bong-soon",
  "genre": ["Fantasy", "Thriller", "Action", "Romantic-comedy"],
  "scriptWriter": "Baek Mi-kyung",
  "director": "Lee Hyung-min",
  "leadActor": "Park Hyung-sik",
  "leadActress": "Park Bo-young",
  "noepisodes": "16",
  "releasedYear": 2017,
  "countryOfOrigin": "South Korea",
  "distributor": "JTBC",
  "imdbRating": "8.2",
  "poster": "Strong_Woman_Do_Bong_Soon.jpg",
  "images": ["swdbs-1.jpg", "swdbs-2.jpg", "swdbs-3.jpg", "swdbs-4.jpg"],
  "synopsis": "Do Bong-soon (Park Bo-young) was born with superhuman strength. Her strength is hereditary and passed along only to the women in her family. Her dream is to create a video game with herself as the main character. She desperately wants to become a delicate and elegant woman, which is the ideal type of her crush, In Guk-doo (Ji Soo), a police officer. Thanks to her strength, she gets a job as bodyguard to rich heir Ahn Min-hyuk (Park Hyung-sik), the CEO of a gaming company, Ainsoft. In contrast to Guk-doo, Min-hyuk is an eccentric man who is playful, a little spoiled, has no regard for rules, and dislikes policemen. He has recently received anonymous threats and has even been stalked, leading him to hire Bong-soon as his bodyguard after witnessing her beat up a bunch of construction workers when they threatened an old elementary school bus driver.\nA series of kidnapping cases happen in Dobong-dong, the district Bong-soon lives in, and she is determined to catch the culprit, who targeted her best friend. With help and training from Min-hyuk, she manages to control her strength to use it for good causes. Min-hyuk and Bong-soon find their relationship growing into something more. Their relationship at work and in pursuit of kidnapper creates comical and dangerous situations, which bring them closer."
  }