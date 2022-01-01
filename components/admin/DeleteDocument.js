import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';

// Redux
import { deleteDoc, clearErrors } from '../../redux/actions/dataActions';
import { connect } from 'react-redux';

// Material UI
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@material-ui/icons/Delete';
import { makeStyles, createStyles, useTheme } from '@mui/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

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

export function DeleteDocument(props) {

  const theme = useTheme();
  const classes = useStyles(props);
  const matches = useMediaQuery(theme.breakpoints.up('md'));

  const docs = props.docs;

  const handleDelete = (did) => {
  	props.deleteDoc(did);
  }

	return (
		<div>
			{
				docs.map((doc, i) => (
					<div key={i}>
						<Grid container>
							<Grid xs={11} className={classes.postCont}>
								<Typography style={{ textTransform: 'capitalize' }} variant="subtitle1">{doc.title}</Typography>
								<Typography variant="subtitle2">{doc.info}</Typography>
								<Typography variant="caption">Posted By: {doc.postedBy}</Typography>
								<Typography variant="caption">Posted On: {dayjs(doc.createdAt).format('h:mm a, dddd DD-MMM-YYYY')}</Typography>
							</Grid>
							<Grid xs={1} className={classes.postCont}>
								<DeleteIcon onClick={() => handleDelete(doc.docid)} className={classes.delete} color='error' />
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

const mapDispatchToProps = { deleteDoc, clearErrors };

export default connect(mapStateToProps, mapDispatchToProps)(DeleteDocument);
