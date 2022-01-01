	import React, { useState, useEffect } from 'react';

// Redux
import { connect } from 'react-redux';
import { deleteComment } from '../../redux/actions/dataActions';

// Material
import { makeStyles, createStyles, useTheme } from '@mui/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Button from '@mui/material/Button';

const useStyles = makeStyles((theme) => createStyles({
	...theme.spreadThis,
	delete: {
		color: 'red',
		cursor: 'pointer',
		fontWeight: 'bold',
		'&:hover': {
			color: 'maroon'
		}
	}
}));

export function Comments(props) {

  const handleDelete = () => {
    props.deleteComment(props.commentsid)
  }

  const theme = useTheme();
  const classes = useStyles(props);
  const matches = useMediaQuery(theme.breakpoints.up('md'));

  const { credentials: { email, moderator } } = props.user;

  const deleteMarkup = ((moderator === false) && (email !== props.email)) ? null : (
  	<div onClick={handleDelete} className={classes.delete}>&#x2715;</div>
	);

	return (
		<span style={{ marginLeft: 'auto' }}>
			{ deleteMarkup }
		</span>
	);
}

const mapStateToProps = state => ({
  user: state.user,
});

const mapDispatchToProps = { deleteComment };

export default connect(mapStateToProps, mapDispatchToProps)(Comments);