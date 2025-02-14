import { deadpool, gladiator2, kravenMovie, moana, nosferatu } from "../assets";

const sideBarLinks = [
  {
    id: "home",
    title: "Home",
    href: "/",
  },
  {
    id: "about",
    title: "About",
    href: "/about",
  },
  {
    id: "movies",
    title: "Movies",
    href: "",
  },
  {
    id: "tvSeries",
    title: "TV-Series",
    href: "",
  },
  {
    id: "topIMDB",
    title: "Top IMDB",
    href: "",
  },
];

const genres = [
  {
    id: "action&adve",
    genre: "Action",
  },
  {
    id: "animation",
    genre: "Animation",
  },
  {
    id: "crime",
    genre: "Crime",
    color: "blue",
  },
  {
    id: "comedy",
    genre: "Comedy",
    color: "pink",
  },
  {
    id: "family",
    genre: "Family",
    color: "orange",
  },
  {
    id: "drama",
    genre: "Drama",
    color: "yellow",
  },
  {
    id: "kids",
    genre: "Kids",
    color: "cyan",
  },
  {
    id: "documentary",
    genre: "Documentary",
    color: "purple",
  },
  {
    id: "sci-fi",
    genre: "Sci-Fi & Fantasy",
    color: "#8ecae6",
  },
  {
    id: "mistery",
    genre: "Mistery",
    color: "#ff006e",
  },
  {
    id: "western",
    genre: "Western",
    color: "#bfd200",
  },
  {
    id: "war",
    genre: "War & Politics",
    color: "#902923",
  },
  {
    id: "soap",
    genre: "Soap",
    color: "#ff69eb",
  },
  {
    id: "reality",
    genre: "Reality",
    color: "#eb5e28",
  },
  {
    id: "talk",
    genre: "Talk",
    color: "#f7a072",
  },
];

const slides = [
  {
    id: 1,
    image: kravenMovie,
  },
  {
    id: 2,
    image: nosferatu,
  },
  {
    id: 3,
    image: moana,
  },
  {
    id: 4,
    image: deadpool,
  },
  {
    id: 5,
    image: gladiator2,
  },
];

export { sideBarLinks, slides, genres };
