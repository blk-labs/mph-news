import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useHistory } from "react-router-dom";

// Redux
import { connect } from 'react-redux';
import { getTopic, getAllPosts, getDocuments } from '../redux/actions/dataActions';

// Material
import { makeStyles, createStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';

// Comps
import AddStory from '../components/admin/AddStory'
import DeleteStory from '../components/admin/DeleteStory'
import AddDocument from '../components/admin/AddDocument'
import DeleteDocument from '../components/admin/DeleteDocument'
import EditorsPick from '../components/admin/EditorsPick'
import logoFull from '../images/logoFullColor.png'
import logo from '../images/logo.png'

const useStyles = makeStyles((theme) => createStyles({
	...theme.spreadThis,
  formControl: {
  	marginTop: '2.5rem',
  },
	navCont: {
		marginBottom: '5rem'
	},
	logoFull: {
		height: 'auto',
		width: 50,
		margin: '1rem'
	},
	mainCont: {
		marginTop: '2.5rem'
	},
	buttonCont: {
		display: 'flex',
		flexDirection: 'column',
		marginTop: '2.5rem'
	},
	btnCont: {
		backgroundColor: '#d34b47',
		marginTop: '1rem',
		color: 'white',
		borderColor: 'transparent',
		'&:hover': {
			backgroundColor: '#e94b47'
		}
	}
}));

export function Admin(props) {

  const [select, setSelect] = useState('');
  const [add, setAdd] = useState(false);
  const [remove, setRemove] = useState(false);
  const [content, setContent] = useState([]);

  const { docs, topic } = props.data;
  const { loading } = props.UI;

  const [open, setOpen] = useState(false);

  const handleSuccess = () => {
  	setSelect('');
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const handleChange = (event) => {
    setSelect(event.target.value);
    getContent(event.target.value);
  };

  const getContent = (cont) => {
  	if (cont === 'story' || cont === 'editors') {
			props.getAllPosts()
			setAdd(false);
			setRemove(false);
			setContent(props.data.posts);
		} else if (cont === 'video') {
			props.getTopic(cont)
			setAdd(false);
			setRemove(false);
			setContent(props.data.topic);
		} else if (cont === 'documents') {
			props.getDocuments()
			setAdd(false);
			setRemove(false);
			setContent(props.data.docs);
		}
  }

  const addContent = () => {
  	setAdd(true);
  	setRemove(false)
  }

  const removeContent = () => {
  	setAdd(false);
  	setRemove(true)
  }

  let history = useHistory();

  const theme = useTheme();
  const classes = useStyles(props);
  const matches = useMediaQuery(theme.breakpoints.up('md'));

	if (props.user.authenticated === false) {
		history.push('/')
	} else if (props.user.credentials.moderator === false) {
		history.push('/')
	} else {		
	  let nav = document.getElementById('navBar');
	  if (nav !== null) {
	  	nav.style.display = 'none'
	  }
	}

	return (
		<div>
	    <Container className={classes.navCont}>
	    	<Link href='/' className={classes.logoComp}>
	    		<img src={matches ? logoFull : logo} className={matches ? classes.logoClass : classes.logoFull} alt="MPH-logo" />
	    	</Link>
    	</Container>
    	<Container className={classes.adminCont}>
    		<Typography style={{ fontWeight: 'bold' }} variant="h5">Admin Panel</Typography>
    		<Grid justify="space-between" container>
    			<Grid xs={12} sm={6} lg={3} className={classes.formControl}>
    				<Typography>Select a Content Type</Typography>
			      <FormControl style={{ minWidth: 120 }}>
			        <Select
			          id="demo-simple-select-outlined"
			          value={select}
			          color="secondary"
			          onChange={handleChange}
			          label="Content"
			        >
			        	<MenuItem value=""><em>None</em></MenuItem>
			          <MenuItem value='story'>Story</MenuItem>
			          <MenuItem value='video'>Video</MenuItem>
			          <MenuItem value='documents'>Documents</MenuItem>
			          <MenuItem value='editors'>Editors Pick</MenuItem>
			        </Select>
			      </FormControl>
    			</Grid>
    			{
    				select !== "" &&
	    			<Grid  xs={12} sm={6} lg={3} className={classes.buttonCont}>
	    				<Button
	    					size={matches ? 'small' : 'large'}
	    					onClick={addContent}
	    					style={{ width: 'fit-content', textTransform: 'capitalize' }}
	    					variant="contained"
	    					color="secondary"
    					>Add New {select}</Button>
    					{
    						select !== 'editors' &&
		    				<Button
		    					size={matches ? 'small' : 'large'}
		    					onClick={removeContent}
		    					style={{ width: 'fit-content', textTransform: 'capitalize' }}
		    					variant="outlined"
		    					className={classes.btnCont}
		    				>{select === "story" ? "Edit" : "Delete"} {select}</Button>
    					}
	    			</Grid>
    			}

    			<Grid xs={12} lg={6} className={classes.mainCont}>
						<Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
						  <Alert onClose={handleClose} severity="success">
						    Successful!
						  </Alert>
						</Snackbar>
    				{
    					select === 'story' ? (
    						add === true ? <AddStory handleSuccess={handleSuccess} /> : (
    							remove === true ? <DeleteStory handleSuccess={handleSuccess} posts={props.data.posts} /> : null
	  							)
	  						) : (
  						select === 'video' ? (
  							add === true ? <AddStory video={true} handleSuccess={handleSuccess} /> : (
  								remove === true ? <DeleteStory video={true} posts={props.data.posts} /> : null
									)
								) : (
							select === 'documents' ? (
								add === true ? <AddDocument handleSuccess={handleSuccess} /> : (
									remove === true ? <DeleteDocument docs={props.data.docs} /> : null
									)
								) : (
							select === 'editors' ? (
								add === true ? <EditorsPick posts={props.data.posts} handleSuccess={handleSuccess} /> : null
									) : null
								)
							)
						)}
    			</Grid>
    		</Grid>
    	</Container>
		</div>
	)
}

const mapStateToProps = state => ({
  user: state.user,
  data: state.data,
  UI: state.UI
});

const mapDispatchToProps = { getTopic, getAllPosts, getDocuments };

export default connect(mapStateToProps, mapDispatchToProps)(Admin);