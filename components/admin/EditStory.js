import React, { useState } from 'react';
import axios from 'axios';
import { postImage } from '../../redux/actions/userActions';
import { connect } from 'react-redux';

// Material UI
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Fade from '@mui/material/Fade';
import Modal from '@mui/material/Modal';
import Backdrop from '@mui/material/Backdrop';
import Typography from '@mui/material/Typography';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import CheckIcon from '@material-ui/icons/CheckCircle';
import PhotoCamera from '@material-ui/icons/PhotoCameraOutlined';
import { makeStyles, createStyles, useTheme } from '@mui/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';

const useStyles = makeStyles((theme) =>
  createStyles({
    ...theme.spreadThis,
    editBtn: {
      fill: '#185E5C',
      width: '2em',
      fontSize: '.80rem',
      cursor: 'pointer',
      '&:hover': {
        transition: '.5s',
      },
    },
    modal: {
      display: 'flex',
      margin: 'auto',
    },
    modalClass: {
      borderRadius: '10px',
      backgroundColor: 'white',
      width: '690px',
      height: '75%',
      margin: 'auto',
      padding: '2.5%',
      overflow: 'scroll',
      [theme.breakpoints.down('sm')]: {
        width: '90%',
      },
    },
    textClass: {
      width: '100%',
      fontFamily: '"Helvetica"',
      fontSize: 15,
    },
    input: {
      color: '#000',
    },

    btnClass: {
      width: 'fit-content',
    },
    userCont: {
      marginTop: '1.5rem',
      display: 'flex',
      alignItems: 'center',
    },
    uploadImg: {
      '&:hover, &.MuiIconButton-root': { borderRadius: '0' },
    },
    btnClass: {
      height: 32,
      alignItems: 'center',
      justifyContent: 'center',
      width: 146,
      border: '1px solid #D9D9D9',
      display: 'flex',
    },
    clickUp: {
      fontFamily: '"Helvetica"',
      fontSize: 14,
      marginLeft: 5,
      color: '#000',
    },
    updateClass: {
      float: 'right',
      width: '100px',
      color: '#fff',
      height: 46,
      backgroundColor: '#36C2F3',
      boxShadow: 'none',
      [theme.breakpoints.down('sm')]: {
        width: 'auto',
      },
    },
  })
);

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
    axios
      .get(`/post/${props.postID}`)
      .then((res) => {
        setTitle(res.data.title);
        setSub(res.data.subTitle);
        setBody(res.data.body);
        setID(res.data.postsid);
      })
      .catch((err) => console.log(err));

    setOpen(true);
  };

  const handleUpdate = () => {
    const postUpdate = {
      title: title,
      subTitle: subTitle,
      body: body,
      link: link,
      postImage: props.data.upload.imgName,
    };

    axios
      .patch(`/post/${id}`, postUpdate)
      .then((res) => props.handleSuccess())
      .catch((err) => console.log(err));

    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
    setTitle('');
    setSub('');
    setBody('');
    setLink('');
  };

  const handleImgChange = (event) => {
    const image = event.target.files[0];
    const formData = new FormData();
    formData.append('image', image, image.name);
    props.postImage(formData);
    setImage(true);
  };

  const handleAdd = () => {
    const fileInput = document.getElementById('imageInput');
    fileInput.click();
  };

  return (
    <div>
      <div onClick={handleOpen}>
        <EditIcon className={classes.editBtn} />
      </div>
      <Modal
        aria-labelledby='transition-modal-title'
        aria-describedby='transition-modal-description'
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
                className={classes.textClass}
                color='secondary'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                InputProps={{ disableUnderline: true }}
                style={{
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
                Body
              </Typography>
              <TextareaAutosize
                className={classes.textClass}
                aria-label='minimum height'
                minRows={3}
                maxRows={3}
                multiline
                rows={4}
                color='secondary'
                value={body}
                onChange={(e) => setBody(e.target.value)}
                style={{
                  border: '1px solid #D9D9D9',
                  padding: '8px 16px',
                }}
                InputLabelProps={{
                  shrink: true,
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
                className={classes.textClass}
                color='secondary'
                value={link}
                onChange={(e) => setLink(e.target.value)}
                InputProps={{
                  disableUnderline: true,
                  className: classes.input,
                }}
                style={{
                  border: '1px solid #D9D9D9',
                  padding: '4px 12px',
                  fontFamily: '"Helvetica"',
                  marginTop: '0',
                }}
              />
              {!props.video && (
                <span className={classes.userCont}>
                  <Typography
                    style={{
                      marginRight: '.25rem',
                      fontFamily: '"Helvetica"',
                      fontSize: 14,
                    }}
                    variant='caption'
                  >
                    Upload Picture
                  </Typography>
                  <input
                    type='file'
                    id='imageInput'
                    hidden='hidden'
                    onChange={handleImgChange}
                  />
                  <Tooltip
                    title='Edit profile picture'
                    placement='top'
                    className={classes.uploadImg}
                  >
                    <IconButton onClick={handleAdd}>
                      <div className={classes.btnClass}>
                        <FileUploadOutlinedIcon fontSize='small' />
                        <Typography className={classes.clickUp}>
                          Click to Upload
                        </Typography>
                      </div>
                    </IconButton>
                  </Tooltip>
                  {image && <CheckIcon color='secondary' />}
                </span>
              )}
              <Button onClick={handleUpdate} className={classes.updateClass}>
                Update
              </Button>
            </div>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}

const mapStateToProps = (state) => ({
  data: state.data,
  UI: state.UI,
});

const mapDispatchToProps = { postImage };

export default connect(mapStateToProps, mapDispatchToProps)(EditStory);
