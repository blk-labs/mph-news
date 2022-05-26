import NewsPostRepo from "../repositories/NewsPostRepo";


export default class NewsService {
    constructor(private repo: NewsPostRepo){}

    async getEditorPicks() {
        return this.repo.getEditorPicks();
    }

    async getLatestNews() {
        return this.repo.getLatestNews();
    }

    async getAllNews() {
        return this.repo.getAllNews();
    }

    async getTrendingNews() {
        return this.repo.getTrendingNews();
    }

    async getTopicNews(topic: string, count: number = 8, skipPostsCreatedBefore: string = '', beforePivot: boolean = false) {
        return this.repo.getTopicNews(topic, count, skipPostsCreatedBefore, beforePivot);
    }

    async getVideoNews() {
        return this.repo.getVideoNews();
    }

    async getNewsPost(postId: string) {
        return this.repo.getNewsPost(postId);
    }

    async deletePost(postId: string) {
        return this.repo.deleteNewsPost(postId);
    }
}