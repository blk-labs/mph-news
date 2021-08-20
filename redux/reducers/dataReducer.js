import {
	UPLOAD,
	SET_POSTS,
	SET_TOPIC,
	SET_DOCUMENTS,
	SET_POST,
	DELETE_POST,
	DELETE_DOC,
	POST_COMMENTS,
	DELETE_COMMENT,
	CLEAR_UPLOAD,
	LOADING_DATA } from '../types'

const initialState = {
	posts: [],
	post: {},
	topic: [],
	docs: [],
	upload: {},
	loading: false,
};

export default function(state = initialState, action) {
	switch (action.type) {
		case SET_POSTS:
			return {
				...state,
				posts: action.payload,
				loading: false
			};
		case SET_TOPIC:
			return {
				...state,
				topic: action.payload,
				loading: false
			};
		case SET_DOCUMENTS:
			return {
				...state,
				docs: action.payload,
				loading: false
			};
		case UPLOAD:
			return {
				...state,
				upload: action.payload
			};

		case SET_POST:
			return {
				...state,
				post: action.payload
			};
		case DELETE_POST:
			let index = state.posts.findIndex(
				(post) => post.postsid === action.payload
				);
			state.posts.splice(index, 1);
			return {
				...state
			};
		case DELETE_DOC:
			let index1 = state.docs.findIndex(
				(doc) => doc.docid === action.payload
				);
			state.docs.splice(index1, 1);
			return {
				...state
			};
		case POST_COMMENTS:
			return {
				...state,
				post: {
					...state.post,
					comments: [
						action.payload,
						...state.post.comments
					]
				}
			};
		case DELETE_COMMENT:
			let index3 = state.post.comments.findIndex(
				(comment) => comment.commentsid === action.payload
				);
			state.post.comments.splice(index3, 1);
			return {
				...state
			};
		case CLEAR_UPLOAD:
			return {
				...state,
				upload: { }
			};
		case LOADING_DATA:
			return {
				...state,
				loading: true
			};
		default:
			return state;
	}
}