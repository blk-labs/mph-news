import UserRepo from "../repositories/UserRepo";
import FirebaseClient from "../repositories/data-sources/firebase-client";
import UserService from "./UserService";
import NewsService from "./NewsService";
import NewsPostRepo from "../repositories/NewsPostRepo";

const firebaseClient = FirebaseClient.getInstance();

const userRepo = new UserRepo(firebaseClient);

const userService = new UserService({
    repo: userRepo
})

const newsRepo = new NewsPostRepo(firebaseClient);
const newsService = new NewsService(newsRepo);

export {
    userService,
    newsService
};