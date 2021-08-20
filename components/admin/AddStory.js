import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Redux
import { clearUpload } from '../../redux/actions/dataActions';
import { postImage } from '../../redux/actions/userActions';
import { connect } from 'react-redux';

// Material UI
import Grid from '@material-ui/core/Grid';
import Switch from '@material-ui/core/Switch';
import Select from '@material-ui/core/Select';
import Popover from '@material-ui/core/Popover';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton'
import ToolTip from  '@material-ui/core/ToolTip';
import CheckIcon from '@material-ui/icons/CheckCircle';
import PhotoCamera from  '@material-ui/icons/PhotoCameraOutlined';
import { makeStyles, createStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const useStyles = makeStyles((theme) => createStyles({
	...theme.spreadThis,
	formCont: {
		display: 'flex',
		flexDirection: 'column',
		marginTop: '1rem'
	},
	optionClass: {
		display: 'flex',
		margin: '1rem 0 1rem',
		alignItems: 'center'
	},
	userCont: {
		marginTop: '1.5rem',
		display: 'flex',
		alignItems: 'center'
	},
	btnClass: {
    backgroundColor: 'rgba(0,0,0,.10)',
    padding: '.5rem',
    borderRadius: '50%',
	},
	popover: {
		padding: '.5rem .75rem'
	}
}));

export function AddStory(props) {

  const theme = useTheme();
  const classes = useStyles(props);
  const matches = useMediaQuery(theme.breakpoints.up('md'));

  const [important, setImportant] = useState(false);
	const [title, setTtile] = useState('');
	const [subTitle, setSub] = useState('');
	const [body, setBody] = useState('');
	const [topic, setTopic] = useState('');
	const [link, setLink] = useState('');
	const [image, setImage] = useState(false);
	const [errors, setErrors] = useState();
	const [loading, setLoading] = useState();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const handleTopic = (event) => {
    setTopic(event.target.value);
  };

  const handleSwitch = () => {
    setImportant(!important);
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    setLoading(true)
    const newPosts = {
    	title: title,
    	subTitle: subTitle,
    	body: body,
    	important: important,
    	topic: props.video ? 'video' : topic,
    	link: props.video ? `https://www.youtube.com/embed/${link}` : link,
    	postImage: props.video ? '' : props.data.upload.imgName,
    	postedBy: `${props.user.credentials.fName} ${props.user.credentials.lName}`
    };

    newPosts.postImage !== undefined ? (
				axios.post(`/post`, newPosts)
				.then((res) => {
					props.handleSuccess();
					props.clearUpload();
				})
				.catch(err => {
					setErrors(true);
					setLoading(false);
				})
    	) : (
    		function() {
    			setAnchorEl(evt.currentTarget);
					setLoading(false);
    		}()
    	)
  }

  const handleClose = () => {
    setAnchorEl(null);
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
			<Typography variant="caption">Please enter news post details</Typography>
      <form className={classes.formCont} onSubmit={handleSubmit}>
      	{
      		!props.video &&
      		<Grid container>
	        	<Grid xs={6} sm={4} className={classes.optionClass}>
	        		<Typography variant="body1" style={{ marginRight: '.5rem' }}>Important</Typography>
					    <Switch
					      checked={important.checkedB}
					      onChange={handleSwitch}
					      color="secondary"
					      name="checkedB"
					      inputProps={{ 'aria-label': 'primary checkbox' }}
					    />
	        	</Grid>
	        	<Grid xs={6} sm={4} className={classes.optionClass}>
	        		<Typography variant="body1" style={{ marginRight: '1rem' }}>Topic</Typography>
			        <Select
			          labelId="Topic"
			          id="topic"
			          error={errors}
			          value={topic}
			          onChange={handleTopic}
			          style={{ minWidth: 125 }}
			          color="secondary"
			        >
								<MenuItem value="">
			            <em>None</em>
			          </MenuItem>
			          <MenuItem value='nigeria'>Nigeria</MenuItem>
			          <MenuItem value='international'>International</MenuItem>
			          <MenuItem value='security'>Security</MenuItem>
			          <MenuItem value='health'>Health</MenuItem>
			          <MenuItem value='business'>Business</MenuItem>
			          <MenuItem value='other'>Other</MenuItem>
			        </Select>
	        	</Grid>
	        </Grid>
      	}
        <TextField
          color="secondary"
          label="Title"
          error={errors}
          fullWidth
          value={title}
          onChange={e => setTtile(e.target.value)}
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />
        {
        	important &&
	        <TextField
	          color="secondary"
	          label="Subtitle"
	          error={errors}
	          fullWidth
	          value={subTitle}
	          onChange={e => setSub(e.target.value)}
	          margin="normal"
	          InputLabelProps={{
	            shrink: true,
	          }}
	        />
        }
        <TextField
          label="Body"
          multiline
          rows={4}
          error={errors}
          color="secondary"
          value={body}
          onChange={e => setBody(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          id="standard-full-width"
          color="secondary"
          label="Link"
          error={errors}
          fullWidth
          value={link}
          onChange={e => setLink(e.target.value)}
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />
        {
        	!props.video &&
	        <span className={classes.userCont}>
	        	<Typography style={{ marginRight: '.25rem' }} variant="caption">Add Picture</Typography>
						<input type="file" id="imageInput" hidden="hidden" onChange={handleImgChange} />
						<ToolTip title="Edit profile picture" placement="top">
							<IconButton onClick={handleAdd}>
								<PhotoCamera className={classes.btnClass} />
							</IconButton>
						</ToolTip>
						{ image && <CheckIcon color="secondary" /> }
	        </span>
        }
        <span className={classes.userCont}>
        	<Typography style={{ marginRight: '.25rem' }} variant="caption">User Name:</Typography>
        	<Typography variant="button">{props.user.credentials.fName} {props.user.credentials.lName}</Typography>
        </span>
        <Button disabled={loading} variant="contained" color="secondary" type="submit" style={{ margin: '1rem 0', width: 'fit-content' }}>Post</Button>
	      <Popover
	        id={id}
	        open={open}
	        anchorEl={anchorEl}
	        onClose={handleClose}
	        anchorOrigin={{
	          vertical: 'bottom',
	          horizontal: 'center',
	        }}
	        transformOrigin={{
	          vertical: 'top',
	          horizontal: 'center',
	        }}
	      >
	        <Typography className={classes.popover}>Image hasn&apos;t been uploaded yet.</Typography>
	      </Popover>
      </form>
		</div>
	);
}

const mapStateToProps = state => ({
	data: state.data,
	user: state.user,
  UI: state.UI
});

const mapDispatchToProps = { clearUpload, postImage };

export default connect(mapStateToProps, mapDispatchToProps)(AddStory);