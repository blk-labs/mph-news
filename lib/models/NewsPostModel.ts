type NewsTopic = "nigeria" | "international" | "business" | "health" | "others";

export type INewsPost = {
  body: string;
  createdAt: string;
  link: string;
  editors_pick: boolean;
  postImage: string;
  postedBy: string;
  subTitle: string;
  title: string;
  topic: NewsTopic;
  important: boolean;
  id: string;
  commentCount: number;
};

export default class NewsPost implements INewsPost {
    id: string;
    body: string;
    commentCount: number;
    createdAt: string;
    important: boolean;
    editors_pick: boolean;
    link: string;
    postImage: string;
    postedBy: string;
    title: string;
    topic: "nigeria" | "international" | "business" | "health" | "others";
    subTitle: string;

    constructor(postData: INewsPost) {
        this.id = postData.id;
        this.body = postData.body;
        this.commentCount = postData.commentCount;
        this.createdAt = postData.createdAt;
        this.important = postData.important;
        this.editors_pick = postData.editors_pick;
        this.link = postData.link;
        this.postImage = postData.postImage;
        this.postedBy = postData.postedBy;
        this.title = postData.title;
        this.topic = postData.topic;
        this.subTitle = postData.subTitle;
    }

    static fromJson(jsonData: any) {
        return new NewsPost(jsonData);
    }
    
    toJsonSerializable() {
        return {
            id: `${this.id}`,
            body: `${this.body}`,
            commentCount: this.commentCount || 0,
            createdAt: `${this.createdAt}`,
            important: this.important || false,
            editors_pick: this.editors_pick || false,
            link: `${this.link}`,
            postImage: `${this.postImage}`,
            postedBy: `${this.postedBy}`,
            title: `${this.title}`,
            topic: `${this.topic}`,
            subTitle: `${this.subTitle}`
        }
    }
}