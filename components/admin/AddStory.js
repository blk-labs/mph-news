import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Redux
import { clearUpload } from '../../redux/actions/dataActions';
import { postImage } from '../../redux/actions/userActions';
import { connect } from 'react-redux';

// Material UI
import Grid from '@mui/material/Grid';
import Switch from '@mui/material/Switch';
import Select from '@mui/material/Select';
import Popover from '@mui/material/Popover';
import FormControl from '@mui/material/FormControl';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import CheckIcon from '@material-ui/icons/CheckCircle';
import PhotoCamera from '@material-ui/icons/PhotoCameraOutlined';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import { makeStyles, createStyles, useTheme } from '@mui/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

const useStyles = makeStyles((theme) =>
  createStyles({
    ...theme.spreadThis,
    formCont: {
      display: 'flex',
      flexDirection: 'column',
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
      [theme.breakpoints.down('sm')]: {
        marginTop: '1rem',
      },
    },
    list: {
      padding: 0,
    },
    topicSel: {
      justifyContent: 'space-between',
      [theme.breakpoints.down('sm')]: {
        flexDirection: 'column',
      },
    },
    resize: {
      fontSize: 15,
      fontFamily: '"Helvetica"',
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
    popover: {
      padding: '.5rem .75rem',
    },
    bottmInfo: {
      display: 'flex',
      justifyContent: 'space-between',
      [theme.breakpoints.down('sm')]: {
        flexDirection: 'column',
      },
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
    setLoading(true);
    const newPosts = {
      title: title,
      subTitle: subTitle,
      body: body,
      important: important,
      topic: props.video ? 'video' : topic,
      link: props.video ? `https://www.youtube.com/embed/${link}` : link,
      postImage: props.video ? '' : props.data.upload.imgName,
      postedBy: `${props.user.credentials.fName} ${props.user.credentials.lName}`,
    };

    newPosts.postImage !== undefined
      ? axios
          .post(`/post`, newPosts)
          .then((res) => {
            props.handleSuccess();
            props.clearUpload();
          })
          .catch((err) => {
            setErrors(true);
            setLoading(false);
          })
      : (function () {
          setAnchorEl(evt.currentTarget);
          setLoading(false);
        })();
  };

  const handleClose = () => {
    setAnchorEl(null);
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
      <form className={classes.formCont} onSubmit={handleSubmit}>
        {!props.video && (
          <Grid container className={classes.topicSel}>
            <Grid xs={6} sm={4} lg={4} className={classes.optionClass}>
              <Typography
                variant='body1'
                style={{
                  marginRight: '.5rem',
                  fontFamily: '"Helvetica"',
                  fontSize: 15,
                }}
              >
                Important
              </Typography>
              <Switch
                checked={important.checkedB}
                onChange={handleSwitch}
                color='secondary'
                name='checkedB'
                inputProps={{ 'aria-label': 'primary checkbox' }}
              />
            </Grid>
            <Grid sm={12} md={8} lg={4} className={classes.optionClass}>
              <div style={{ width: '100%' }}>
                <Typography
                  variant='body1'
                  style={{
                    marginBottom: '0.5rem',
                    fontFamily: '"Helvetica"',
                    fontSize: 15,
                  }}
                >
                  Select a Topic
                </Typography>
                <Select
                  labelId='Topic'
                  id='topic'
                  error={errors}
                  value={topic}
                  onChange={handleTopic}
                  style={{ minWidth: '100%' }}
                  disableUnderline
                  color='secondary'
                  MenuProps={{ classes: { list: classes.list } }}
                  classes={{
                    root: classes.selectRoot,
                    icon: classes.icon,
                  }}
                  style={{
                    border: '1px solid #D9D9D9',
                    padding: '3px 0 3px 5px',
                    minWidth: '100%',
                  }}
                >
                  <MenuItem value=''>
                    <em>None</em>
                  </MenuItem>
                  <MenuItem
                    value='nigeria'
                    style={{
                      fontFamily: '"Helvetica"',
                      fontSize: 15,
                    }}
                  >
                    Nigeria
                  </MenuItem>
                  <MenuItem
                    value='international'
                    style={{
                      fontFamily: '"Helvetica"',
                      fontSize: 15,
                    }}
                  >
                    International
                  </MenuItem>
                  <MenuItem
                    value='security'
                    style={{
                      fontFamily: '"Helvetica"',
                      fontSize: 15,
                    }}
                  >
                    Security
                  </MenuItem>
                  <MenuItem
                    value='health'
                    style={{
                      fontFamily: '"Helvetica"',
                      fontSize: 15,
                    }}
                  >
                    Health
                  </MenuItem>
                  <MenuItem
                    value='business'
                    style={{
                      fontFamily: '"Helvetica"',
                      fontSize: 15,
                    }}
                  >
                    Business
                  </MenuItem>
                  <MenuItem
                    value='other'
                    style={{
                      fontFamily: '"Helvetica"',
                      fontSize: 15,
                    }}
                  >
                    Other
                  </MenuItem>
                </Select>
              </div>
            </Grid>
          </Grid>
        )}
        <Typography
          variant='body1'
          style={{
            margin: '1rem 0 0.5rem',
            fontFamily: '"Helvetica"',
            fontSize: 15,
          }}
        >
          Topic
        </Typography>
        <TextField
          color='secondary'
          error={errors}
          fullWidth
          value={title}
          onChange={(e) => setTtile(e.target.value)}
          InputProps={{
            disableUnderline: true,
            classes: {
              input: classes.resize,
            },
          }}
          margin='normal'
          style={{
            border: '1px solid #D9D9D9',
            padding: '4px 12px',
            marginTop: '0',
          }}
        />
        {important && (
          <TextField
            color='secondary'
            label='Subtitle'
            error={errors}
            fullWidth
            value={subTitle}
            onChange={(e) => setSub(e.target.value)}
            margin='normal'
            InputLabelProps={{
              shrink: true,
            }}
          />
        )}
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
          aria-label='minimum height'
          maxRows={3}
          minRows={3}
          multiline
          error={errors}
          color='secondary'
          value={body}
          onChange={(e) => setBody(e.target.value)}
          style={{
            fontFamily: '"Helvetica"',
            fontSize: 15,
            border: '1px solid #D9D9D9',
            padding: '8px 16px',
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
            border: '1px solid #D9D9D9',
            padding: '4px 12px',
            marginTop: '0',
          }}
        />
        <div className={classes.bottmInfo}>
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
        </div>
        <Button
          disabled={loading}
          variant='contained'
          color='secondary'
          type='submit'
          className={classes.post}
        >
          Post
        </Button>
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
          <Typography className={classes.popover}>
            Image hasn&apos;t been uploaded yet.
          </Typography>
        </Popover>
      </form>
    </div>
  );
}

const mapStateToProps = (state) => ({
  data: state.data,
  user: state.user,
  UI: state.UI,
});

const mapDispatchToProps = { clearUpload, postImage };

export default connect(mapStateToProps, mapDispatchToProps)(AddStory);
