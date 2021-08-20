import {
	SET_POSTS,
	SET_TOPIC,
	SET_POST,
	DELETE_POST,
	POST_COMMENTS,
	DELETE_COMMENT,
	SET_DOCUMENTS,
	DELETE_DOC,
	LOADING_DATA,
	SET_ERRORS,
	CLEAR_ERRORS,
	LOADING_UI,
	STOP_LOADING_UI,
	CLEAR_UPLOAD
} from '../types';
import axios from 'axios';

// Get all posts

export const getAllPosts = () => (dispatch) => {
	dispatch({ type: LOADING_DATA });
	axios.get('/posts')
	.then((res) => {
		dispatch({
			type: SET_POSTS,
			payload: res.data
		})
	})
	.catch((err) => {
		dispatch({
			type: SET_POSTS,
			payload: []
		});
	});
};


// Get Topic

export const getTopic = (topic) => (dispatch) => {
	dispatch({ type: LOADING_UI });
	axios.get(`/posts/${topic}`)
		.then((res) => {
			dispatch({
				type: SET_TOPIC,
				payload: res.data
			})
			dispatch({ type: STOP_LOADING_UI });
		})
		.catch((err) => console.log(err));
}


// Get A post

export const getPost = (id) => (dispatch) => {
	dispatch({ type: LOADING_UI });
	axios.get(`/post/${id}`)
		.then((res) => {
			dispatch({
				type: SET_POST,
				payload: res.data
			})
			dispatch({ type: STOP_LOADING_UI });
		})
		.catch((err) => console.log(err));
}

// Delete Post

export const deletePost = (postsid) => (dispatch) => {
	axios.delete(`/post/${postsid}`)
		.then(() => {
			dispatch({
				type: DELETE_POST,
				payload: postsid
			})
		})
		.catch((err) => console.log(err));
}


// Post comment

export const commentOnPost = (postsid, submitComment) => (dispatch) => {
	axios.post(`/comment/${postsid}`, submitComment)
		.then((res) => {
			dispatch({
				type: POST_COMMENTS,
				payload: res.data
			});
			dispatch(clearErrors());
		})
		.catch((err) => {
			dispatch({
				type: SET_ERRORS,
				payload: err.response.data
			});
		});
}


// Delete Commment

export const deleteComment = (commentsid) => (dispatch) => {
	axios.delete(`/comment/${commentsid}`)
		.then(() => {
			dispatch({
				type: DELETE_COMMENT,
				payload: commentsid
			})
		})
		.catch((err) => console.log(err));
}



// Get Documents

export const getDocuments = () => (dispatch) => {
	dispatch({ type: LOADING_DATA });
	axios.get('/documents')
	.then((res) => {
		dispatch({
			type: SET_DOCUMENTS,
			payload: res.data
		})
	})
	.catch((err) => {
		dispatch({
			type: SET_DOCUMENTS,
			payload: []
		});
	});
};


// Delete Post

export const deleteDoc = (docid) => (dispatch) => {
	axios.delete(`/document/${docid}`)
		.then(() => {
			dispatch({
				type: DELETE_DOC,
				payload: docid
			})
		})
		.catch((err) => console.log(err));
}

// Clear errors

export const clearErrors = () => (dispatch) => {
	dispatch({ type: CLEAR_ERRORS })
}


// Clear upload
export const clearUpload = () => (dispatch) => {
	dispatch({ type: CLEAR_UPLOAD })
}