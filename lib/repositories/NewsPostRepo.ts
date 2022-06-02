import NewsPost, { INewsPost } from "../models/NewsPostModel";
import { where, limit, orderBy, startAfter, endBefore } from "firebase/firestore";
import FirebaseClient from "./data-sources/firebase-client";

type INewsPostRepo = {
    getEditorPicks: () => Promise<Array<INewsPost>>;
}

export default class NewsPostRepo implements INewsPostRepo {
    id: string;
    body: string;
    commentCount: number;
    createdAt: string | number;
    important: boolean;
    editors_pick: boolean;
    link: string;
    postImage: string;
    postedBy: string;
    title: string;
    topic: "nigeria" | "international" | "business" | "health" | "others";
    subTitle: string;
    
    constructor(private db: FirebaseClient) {
    }

    async getEditorPicks() {
        const constraints = [
            where("editors_pick", "==", true),
            orderBy("createdAt", "desc"),
            limit(4)
        ];

        try {
            const response = await this.db.getDocuments("posts", constraints);
            return Promise.resolve(response.docs.map((doc) => NewsPost.fromJson({...doc.data(), id: doc.id})))
        } catch (e) {
            return Promise.reject(e);
        }
    }
    
    async getLatestNews() {
        const constraints = [
            where("important", "==", true),
            orderBy("createdAt", "desc"),
            limit(5)
        ];

        try {
            const response = await this.db.getDocuments("posts", constraints);
            return Promise.resolve(response.docs.map((doc) => NewsPost.fromJson({...doc.data(), id: doc.id})))
        } catch (e) {
            return Promise.reject(e);
        }
    }
    
    async getAllNews() {
        const constraints = [
            where("important", "==", true),
            orderBy("createdAt", "desc")
        ];

        try {
            const response = await this.db.getDocuments("posts", constraints);
            return Promise.resolve(response.docs.map((doc) => NewsPost.fromJson({...doc.data(), id: doc.id})))
        } catch (e) {
            return Promise.reject(e);
        }
    }

    async getTrendingNews() {
        // Fetch 10 and skip 5 because skip with FB requires passing start item, and there is no start item.
        const constraints = [
            where("important", "==", true),
            orderBy("createdAt", "desc"),
            limit(10)
        ];

        try {
            const response = await this.db.getDocuments("posts", constraints);
            return Promise.resolve(response.docs.slice(5).map((doc) => NewsPost.fromJson({...doc.data(), id: doc.id})))
        } catch (e) {
            return Promise.reject(e);
        }
    }
    
    async getTopicNews(topic: string, count: number, skipPostsCreatedBefore: string, beforePivot: boolean) {
        const constraints = [
            where("topic", "==", topic),
            orderBy("createdAt", "desc"),
            limit(count)
        ];
        if(skipPostsCreatedBefore) {
            if(beforePivot) constraints.push(endBefore(skipPostsCreatedBefore))
            else constraints.push(startAfter(skipPostsCreatedBefore))
        }

        try {
            const response = await this.db.getDocuments("posts", constraints);
            return Promise.resolve(response.docs.map((doc) => NewsPost.fromJson({...doc.data(), id: doc.id})))
        } catch (e) {
            return Promise.reject(e);
        }
    }
    
    async getVideoNews() {
        const constraints = [
            where("topic", "==", "video"),
            orderBy("createdAt", "desc"),
            limit(5)
        ];

        try {
            const response = await this.db.getDocuments("posts", constraints);
            return Promise.resolve(response.docs.map((doc) => NewsPost.fromJson({...doc.data(), id: doc.id})))
        } catch (e) {
            return Promise.reject(e);
        }
    }
    
    async getNewsPost(postId: string) {
        try {
            const response = await this.db.getDocument(`posts/${postId}`);
            return Promise.resolve(NewsPost.fromJson({...response.data(), id: response.id}))
        } catch (e) {
            return Promise.reject(e);
        }
    }
    
    async deleteNewsPost(postId: string) {
        try {
            return await this.db.deleteDocument(`posts/${postId}`);
        } catch (e) {
            return Promise.reject(e);
        }
    }
}