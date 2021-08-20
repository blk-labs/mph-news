import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Redux
import { clearErrors } from '../../redux/actions/dataActions';
import { postDoc } from '../../redux/actions/userActions';
import { connect } from 'react-redux';

// Material UI
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton'
import ToolTip from  '@material-ui/core/ToolTip';
import CheckIcon from '@material-ui/icons/CheckCircle';
import DocumentIcon from '@material-ui/icons/Description';
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
}));

export function AddDocument(props) {

  const theme = useTheme();
  const classes = useStyles(props);
  const matches = useMediaQuery(theme.breakpoints.up('md'));

	const [title, setTtile] = useState('');
	const [info, setInfo] = useState('');
	const [docu, setDocu] = useState(false);
	const [errors, setErrors] = useState();
	const [loading, setLoading] = useState();


  const handleSubmit = (evt) => {
    evt.preventDefault();
    setLoading(true)
    const uploadDoc = {
    	title: title,
    	info: info,
    	postedBy: `${props.user.credentials.fName} ${props.user.credentials.lName}`,
    	url: props.data.upload.doc,
    };

		axios.post('/document', uploadDoc)
		.then((res) => props.handleSuccess())
		.catch(err => {
			setErrors(true);
			setLoading(false);
		})
  }

	const handleDocChange = (event) => {
		const doc = event.target.files[0];
		const formData = new FormData();
		formData.append('doc', doc, doc.name);
		props.postDoc(formData);
		setDocu(true)
	};

	const handleAdd = () => {
		const fileInput = document.getElementById('docInput')
		fileInput.click();
	}

	return (
		<div>
			<Typography variant="caption">Please upload document</Typography>
      <form className={classes.formCont} onSubmit={handleSubmit}>
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
        <TextField
          color="secondary"
          label="Info"
          error={errors}
          fullWidth
          value={info}
          onChange={e => setInfo(e.target.value)}
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <span className={classes.userCont}>
        	<Typography style={{ marginRight: '.25rem' }} variant="caption">Add Document</Typography>
					<input type="file" id="docInput" hidden="hidden" onChange={handleDocChange} />
					<ToolTip title="Edit profile picture" placement="top">
						<IconButton onClick={handleAdd}>
							<DocumentIcon className={classes.btnClass} />
						</IconButton>
					</ToolTip>
					{ docu && <CheckIcon color="secondary" /> }
        </span>
        <span className={classes.userCont}>
        	<Typography style={{ marginRight: '.25rem' }} variant="caption">User Name:</Typography>
        	<Typography variant="button">{props.user.credentials.fName} {props.user.credentials.lName}</Typography>
        </span>
        <Button disabled={loading} variant="contained" color="secondary" type="submit" style={{ margin: '1rem 0', width: 'fit-content' }}>Post</Button>
      </form>
		</div>
	);
}

const mapStateToProps = state => ({
	data: state.data,
	user: state.user,
  UI: state.UI
});

const mapDispatchToProps = { clearErrors, postDoc };

export default connect(mapStateToProps, mapDispatchToProps)(AddDocument);