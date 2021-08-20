import { SET_USER, SET_ERRORS, UPLOAD, LOADING_UI, CLEAR_ERRORS, SET_UNAUTHENTICATED, LOADING_USER } from  '../types';
import axios from 'axios';

export const loginUser = (userData, history) => (dispatch) => {
	dispatch({ type: LOADING_UI });
	axios.post('/login', userData)
		.then((res) => {
			setAuthorizationHeader(res.data.token)
			dispatch(getUserData());
			dispatch({ type: CLEAR_ERRORS });
		})
		.catch((err) => {
			dispatch({
				type: SET_ERRORS,
				payload: err.response.data
			})
		});
}

export const signupUser = (newUser, history) => (dispatch) => {
	dispatch({ type: LOADING_UI });
	axios.post('/signup', newUser)
		.then((res) => {
			setAuthorizationHeader(res.data.token)
			dispatch(getUserData());
			dispatch({ type: CLEAR_ERRORS });
			window.location.reload()
		})
		.catch((err) => {
			dispatch({
				type: SET_ERRORS,
				payload: err.response.data
			})
		});
}

export const logoutUser = () => (dispatch) => {
	localStorage.removeItem('FBIdToken');
	delete axios.defaults.headers.common['Authorization'];
	dispatch({ type: SET_UNAUTHENTICATED })
}

export const getUserData = () => (dispatch) => {
	dispatch({ type: LOADING_USER });
	axios.get('/user')
	.then((res) => {
		dispatch({
			type: SET_USER,
			payload: res.data
		})
	})
	.catch((err) => console.log(err));
}

export const postImage = (formData) => (dispatch) => {
	axios.post('/post/postImage', formData)
	.then((res) => {
		dispatch({
			type: UPLOAD,
			payload: res.data
		})
	})
	.catch((err) => console.log(err));
}

export const postDoc = (formData) => (dispatch) => {
	axios.post('/document/upload', formData)
	.then((res) => {
		dispatch({
			type: UPLOAD,
			payload: res.data
		})
	})
	.catch((err) => console.log(err));
}

const setAuthorizationHeader = (token) => {
	const FBIdToken = `Bearer ${token}`;
	localStorage.setItem('FBIdToken', FBIdToken);
	axios.defaults.headers.common['Authorization'] = FBIdToken;
}