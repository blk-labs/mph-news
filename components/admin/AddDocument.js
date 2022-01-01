import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Redux
import { clearErrors } from '../../redux/actions/dataActions';
import { postDoc } from '../../redux/actions/userActions';
import { connect } from 'react-redux';

// Material UI
import Grid from '@mui/material/Grid';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import CheckIcon from '@material-ui/icons/CheckCircle';
import DocumentIcon from '@material-ui/icons/Description';
import { makeStyles, createStyles, useTheme } from '@mui/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import TextareaAutosize from '@mui/material/TextareaAutosize';

const useStyles = makeStyles((theme) =>
  createStyles({
    ...theme.spreadThis,
    formCont: {
      display: 'flex',
      flexDirection: 'column',
      marginTop: '1rem',
    },
    resize: {
      fontSize: 15,
      fontFamily: '"Helvetica"',
    },
    optionClass: {
      display: 'flex',
      margin: '1rem 0 1rem',
      alignItems: 'center',
    },
    userCont: {
      marginTop: '1.5rem',
      display: 'flex',
      alignItems: 'center',
    },
    btnClass: {
      backgroundColor: 'rgba(0,0,0,.10)',
      padding: '.5rem',
      borderRadius: '50%',
    },
    post: {
      marginLeft: 'auto',
      width: '100px',
      height: 46,
      backgroundColor: '#36C2F3',
      boxShadow: 'none',
      [theme.breakpoints.down('sm')]: {
        width: '60px',
      },
    },
  })
);

export function AddDocument(props) {
  const theme = useTheme();
  const classes = useStyles(props);
  const matches = useMediaQuery(theme.breakpoints.up('md'));

  const [title, setTtile] = useState('');
  const [info, setInfo] = useState('');
  const [link, setLink] = useState('');

  const [docu, setDocu] = useState(false);
  const [errors, setErrors] = useState();
  const [loading, setLoading] = useState();

  const handleSubmit = (evt) => {
    evt.preventDefault();
    setLoading(true);
    const uploadDoc = {
      title: title,
      info: info,
      postedBy: `${props.user.credentials.fName} ${props.user.credentials.lName}`,
      url: props.data.upload.doc,
      link: props.video ? `https://www.youtube.com/embed/${link}` : link,
    };

    axios
      .post('/document', uploadDoc)
      .then((res) => props.handleSuccess())
      .catch((err) => {
        setErrors(true);
        setLoading(false);
      });
  };

  const handleDocChange = (event) => {
    const doc = event.target.files[0];
    const formData = new FormData();
    formData.append('doc', doc, doc.name);
    props.postDoc(formData);
    setDocu(true);
  };

  const handleAdd = () => {
    const fileInput = document.getElementById('docInput');
    fileInput.click();
  };

  return (
    <div>
      <Typography
        variant='caption'
        style={{
          margin: '1rem 0 0.5rem',
          fontFamily: '"Helvetica"',
          fontSize: 15,
        }}
      >
        Please upload document
      </Typography>
      <form className={classes.formCont} onSubmit={handleSubmit}>
        <Typography
          variant='body1'
          style={{
            margin: '1rem 0 0.5rem',
            fontFamily: '"Helvetica"',
            fontSize: 15,
          }}
        >
          Title
        </Typography>
        <TextField
          color='secondary'
          error={errors}
          fullWidth
          value={title}
          onChange={(e) => setTtile(e.target.value)}
          margin='normal'
          InputProps={{
            disableUnderline: true,
            classes: {
              input: classes.resize,
            },
          }}
          style={{
            fontFamily: '"Helvetica"',
            fontSize: 15,
            border: '1px solid #D9D9D9',
            padding: '4px 12px',
            marginTop: '0',
          }}
        />
        <Typography
          variant='body1'
          style={{
            margin: '1rem 0 0.5rem',
            fontFamily: '"Helvetica"',
            fontSize: 15,
          }}
        >
          Info
        </Typography>
        <TextareaAutosize
          color='secondary'
          error={errors}
          aria-label='minimum height'
          maxRows={3}
          minRows={3}
          multiline
          value={info}
          onChange={(e) => setInfo(e.target.value)}
          margin='normal'
          InputProps={{ disableUnderline: true }}
          style={{
            fontFamily: '"Helvetica"',
            fontSize: 15,
            border: '1px solid #D9D9D9',
            padding: '4px 12px',
            marginTop: '0',
          }}
        />
        <Typography
          variant='body1'
          style={{
            margin: '1.5rem 0 0.5rem',
            fontFamily: '"Helvetica"',
            fontSize: 15,
          }}
        >
          Link
        </Typography>
        <TextField
          id='standard-full-width'
          color='secondary'
          error={errors}
          fullWidth
          value={link}
          onChange={(e) => setLink(e.target.value)}
          margin='normal'
          InputProps={{
            disableUnderline: true,
            classes: {
              input: classes.resize,
            },
          }}
          style={{
            fontFamily: '"Helvetica"',
            fontSize: 15,
            border: '1px solid #D9D9D9',
            padding: '4px 12px',
            marginTop: '0',
          }}
        />
        {/* <span className={classes.userCont}>
          <Typography style={{ marginRight: '.25rem' }} variant='caption'>
            Add Document
          </Typography>
          <input
            type='file'
            id='docInput'
            hidden='hidden'
            onChange={handleDocChange}
          />
          <Tooltip title='Edit profile picture' placement='top'>
            <IconButton onClick={handleAdd}>
              <DocumentIcon className={classes.btnClass} />
            </IconButton>
          </Tooltip>
          {docu && <CheckIcon color='secondary' />}
        </span> */}
        <span className={classes.userCont}>
          <Typography
            style={{
              marginRight: '.25rem',
              fontSize: 15,
              fontFamily: '"Helvetica"',
            }}
            variant='caption'
          >
            User name:
          </Typography>
          <Typography
            variant='p'
            style={{
              color: '#6B3FA0',
              fontSize: 15,
              textTransform: 'capitalize',
              fontFamily: '"Helvetica"',
            }}
          >
            {props.user.credentials.fName} {props.user.credentials.lName}
          </Typography>
        </span>
        <Button
          disabled={loading}
          variant='contained'
          color='secondary'
          type='submit'
          className={classes.post}
        >
          Post
        </Button>
      </form>
    </div>
  );
}

const mapStateToProps = (state) => ({
  data: state.data,
  user: state.user,
  UI: state.UI,
});

const mapDispatchToProps = { clearErrors, postDoc };

export default connect(mapStateToProps, mapDispatchToProps)(AddDocument);
