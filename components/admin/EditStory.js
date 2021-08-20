import React, { useState } from 'react';
import axios from 'axios';
import { postImage } from '../../redux/actions/userActions';
import { connect } from 'react-redux';

// Material UI
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Fade from '@material-ui/core/Fade';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Typography from '@material-ui/core/Typography';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton'
import ToolTip from  '@material-ui/core/ToolTip';
import CheckIcon from '@material-ui/icons/CheckCircle';
import PhotoCamera from  '@material-ui/icons/PhotoCameraOutlined';
import { makeStyles, createStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const useStyles = makeStyles((theme) => createStyles({
	...theme.spreadThis,
	editBtn: {
		padding: '.5rem',
		borderRadius: '50%',
		cursor: 'pointer',
		'&:hover': {
			backgroundColor: 'rgba(0,0,0,.1)',
			transition: '.5s'
		}
	},
	modal: {
		display: 'flex',
		margin: 'auto'
	},
	modalClass: {
		borderRadius: '10px',
		backgroundColor: 'white',
		width: '100%%',
		height: '75%',
		margin: 'auto',
		padding: '2.5%',
		overflow: 'scroll',
	},
	textClass: {
		marginBottom: '2rem',
		width: '100%'
	},
	btnClass: {
		width: 'fit-content'
	},
	userCont: {
		marginTop: '1.5rem',
		display: 'flex',
		alignItems: 'center'
	},
	picBtn: {
    backgroundColor: 'rgba(0,0,0,.10)',
    padding: '.5rem',
    borderRadius: '50%',
	},
}));

export function EditStory(props) {

  const theme = useTheme();
  const classes = useStyles(props);
  const matches = useMediaQuery(theme.breakpoints.up('md'));
  const [open, setOpen] = useState(false);
	const [title, setTitle] = useState('');
	const [subTitle, setSub] = useState('');
	const [body, setBody] = useState('');
	const [link, setLink] = useState('');
	const [id, setID] = useState(false);
	const [image, setImage] = useState(false);

  const handleOpen = () => {

  	axios.get(`/post/${props.postID}`)
  	.then((res) => {
	  	setTitle(res.data.title)
			setSub(res.data.subTitle)
			setBody(res.data.body)
			setID(res.data.postsid)
  	})
  	.catch((err) => console.log(err));
  	
  	setOpen(true)
  };

  const handleUpdate = () => {

		const postUpdate = {
			title: title,
			subTitle: subTitle,
			body: body,
			link: link,
			postImage: props.data.upload.imgName
		};

		axios.patch(`/post/${id}`, postUpdate)
		.then((res) => props.handleSuccess())
		.catch((err) => console.log(err));

		setOpen(false)
  }

  const handleClose = () => {
    setOpen(false);
  	setTitle('')
		setSub('')
		setBody('')
		setLink('')
  };

	const handleImgChange = (event) => {
		const image = event.target.files[0];
		const formData = new FormData();
		formData.append('image', image, image.name);
		props.postImage(formData);
		setImage(true)
	};

	const handleAdd = () => {
		const fileInput = document.getElementById('imageInput')
		fileInput.click();
	}

	return (
		<div>
			<div onClick={handleOpen}>
				<EditIcon className={classes.editBtn} />
			</div>
	    <Modal
	      aria-labelledby="transition-modal-title"
	      aria-describedby="transition-modal-description"
	      className={classes.modal}
	      open={open}
	      onClose={handleClose}
	      closeAfterTransition
	      BackdropComponent={Backdrop}
	      BackdropProps={{
	        timeout: 500,
	      }}
	    >
	    	<Fade in={open}>
	    		<div className={classes.modalClass} onClose={handleClose}>
	    			<div style={{ marginTop: '4rem' }}>
			        <TextField
			        	className={classes.textClass}
			          label="Title"
			          color="secondary"
			          value={title}
			          onChange={e => setTitle(e.target.value)}
			          InputLabelProps={{
			            shrink: true,
			          }}
			        />
			        <TextField
			        	className={classes.textClass}
			          label="SubTitle"
			          color="secondary"
			          value={subTitle}
			          onChange={e => setSub(e.target.value)}
			          InputLabelProps={{
			            shrink: true,
			          }}
			        />
			        <TextField
			        	className={classes.textClass}
			          label="Body"
			          multiline
			          rows={4}
			          color="secondary"
			          value={body}
			          onChange={e => setBody(e.target.value)}
			          InputLabelProps={{
			            shrink: true,
			          }}
			        />
			        <TextField
			        	className={classes.textClass}
			          label="Link"
			          color="secondary"
			          value={link}
			          onChange={e => setLink(e.target.value)}
			          InputLabelProps={{
			            shrink: true,
			          }}
			        />
			        {
			        	!props.video &&
				        <span className={classes.userCont}>
				        	<Typography style={{ marginRight: '.25rem' }} variant="caption">Change Picture</Typography>
									<input type="file" id="imageInput" hidden="hidden" onChange={handleImgChange} />
									<ToolTip title="Edit profile picture" placement="top">
										<IconButton onClick={handleAdd}>
											<PhotoCamera className={classes.picBtn} />
										</IconButton>
									</ToolTip>
									{ image && <CheckIcon color="secondary" /> }
				        </span>
			        }
			        <Button color='secondary' onClick={handleUpdate} className={classes.btnClass}>Update</Button>
	    			</div>
	    		</div>
    		</Fade>
			</Modal>
		</div>
	);
}

const mapStateToProps = state => ({
	data: state.data,
  UI: state.UI
});

const mapDispatchToProps = { postImage };

export default connect(mapStateToProps, mapDispatchToProps)(EditStory);