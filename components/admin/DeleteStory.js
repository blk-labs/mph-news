import React, { useState } from 'react';
import dayjs from 'dayjs';
import EditStory from './EditStory'

// Redux
import { deletePost, clearErrors } from '../../redux/actions/dataActions';
import { connect } from 'react-redux';

// Material UI
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Fade from '@material-ui/core/Fade';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { makeStyles, createStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const useStyles = makeStyles((theme) => createStyles({
	...theme.spreadThis,
	postCont: {
		display: 'flex',
		flexDirection: 'column',
		margin: '1rem auto'
	},
	delete: {
		padding: '.5rem',
		borderRadius: '50%',
		cursor: 'pointer',
		'&:hover': {
			backgroundColor: 'rgba(0,0,0,.1)',
			transition: '.5s'
		}
	}
}));

export function DeleteStory(props) {

  const theme = useTheme();
  const classes = useStyles(props);
  const matches = useMediaQuery(theme.breakpoints.up('md'));

  const posts = props.video ? props.posts.filter(fil => fil.topic === 'video') : props.posts.filter(fil => fil.topic !== 'video');
  const { loading } = props.UI;

  const handleEdit = (pid) => {
  	
  }

  const handleDelete = (pid) => {
  	props.deletePost(pid);
  }

	return (
		<div>
			{
				posts.map((post, i) => (
					<div key={i}>
						<Grid container>
							<Grid xs={11} className={classes.postCont}>
								<Typography style={{ textTransform: 'capitalize' }} variant="subtitle1">{post.title}</Typography>
								<Typography variant="subtitle2">{post.subtitle}</Typography>
								<Typography variant="button">topic: {post.topic}</Typography>
								<Typography variant="caption">Posted By: {post.postedBy}</Typography>
								<Typography variant="caption">Posted On: {dayjs(post.createdAt).format('h:mm a, dddd DD-MMM-YYYY')}</Typography>
							</Grid>
							<Grid xs={1} className={classes.postCont}>
								<EditStory handleSuccess={props.handleSuccess} postID={post.id} />
								<DeleteIcon onClick={() => handleDelete(post.postsid)} className={classes.delete} color='error' />
							</Grid>
						</Grid>
						<hr />
					</div>
				))
			}
		</div>
	);
}

const mapStateToProps = state => ({
	data: state.data,
  UI: state.UI
});

const mapDispatchToProps = { deletePost, clearErrors };

export default connect(mapStateToProps, mapDispatchToProps)(DeleteStory);