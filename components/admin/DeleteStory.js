import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import EditStory from './EditStory';

// Redux
import { deletePost, clearErrors } from '../../redux/actions/dataActions';
import { connect } from 'react-redux';

// Material UI
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Fade from '@mui/material/Fade';
import Modal from '@mui/material/Modal';
import Backdrop from '@mui/material/Backdrop';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { makeStyles, createStyles, useTheme } from '@mui/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import TextField from '@mui/material/TextField';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles((theme) =>
  createStyles({
    ...theme.spreadThis,
    postConts: {
      display: 'flex',
      alignItems: 'center',
      marginLeft: 'auto',
      justifyContent: 'end',
    },
    postCont: {
      display: 'flex',
      margin: '1rem auto',
      gap: 20,
      [theme.breakpoints.down('sm')]: {
        flexDirection: 'column',
        width: '344px',
      },
      [theme.breakpoints.down('sm')]: {
        width: '100%!important',
      },
    },
    delete: {
      cursor: 'pointer',
      '&:hover': {
        transition: '.5s',
      },
    },
    postImg: {
      minWidth: '378px',
      maxWidth: '378px',
      height: '281px',
      objectFit: 'cover',
      [theme.breakpoints.down('sm')]: {
        minWidth: '100%',
        maxWidth: '344px',
      },
    },
    title: {
      fontWeight: 900,
      fontSize: 20,
      textTransform: 'initial',
      fontFamily: '"Playfair Display"',
      lineHeight: 1.1,
      paddingTop: 25,
      letterSpacing: -1,
      [theme.breakpoints.down('sm')]: {
        fontSize: '24px!important',
      },
    },
    subnews: {
      color: 'black',
      fontSize: 15,
      margin: '10px 0',
      letterSpacing: 0,
      fontFamily: '"Helvetica Light"',
      fontWeight: 300,
      display: '-webkit-box',
      WebkitLineClamp: 2,
      WebkitBoxOrient: 'vertical',
      overflow: 'hidden',
      [theme.breakpoints.down('sm')]: {
        fontSize: '13px!important',
      },
    },
    inputCont: {
      display: 'flex',
      margin: '2rem 0 1.5rem',
    },
    iconCont: {
      cursor: 'pointer',
      minWidth: '3rem',
      minHeight: '2.6rem',
      backgroundColor: 'transparent',
      borderTopRightRadius: 2,
      borderBottomRightRadius: 2,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      border: '1px solid #D9D9D9',
      [theme.breakpoints.down('sm')]: {
        minWidth: '2.5rem',
      },
    },
    iconClass: {
      '&:hover': {
        color: theme.palette.secondary.main,
      },
    },
  })
);

export function DeleteStory(props) {
  const theme = useTheme();
  const classes = useStyles(props);
  const matches = useMediaQuery(theme.breakpoints.up('md'));

  const [search, setSearch] = useState('');

  const posts = props.video
    ? props.posts.filter((fil) => fil.topic === 'video')
    : props.posts.filter((fil) => fil.topic !== 'video');
  const { loading } = props.UI;

  const handleEdit = (pid) => {};

  const handleDelete = (pid) => {
    props.deletePost(pid);
  };
  dayjs.extend(relativeTime);

  return (
    <div>
      <div className={classes.inputCont}>
        <TextField
          //   id='search'
          placeholder='Search story...'
          fullWidth
          //   value={search}
          //   onChange={(e) => setSearch(e.target.value)}
          onChange={(e) => setSearch(e.target.value)}
          InputProps={{
            disableUnderline: true,
            className: classes.input,
          }}
          style={{
            border: '1px solid #D9D9D9',
            padding: '4px 10px',
            fontFamily: '"Helvetica"',
            marginTop: '0',
            borderTopLeftRadius: 2,
            borderBottomLeftRadius: 2,
          }}
        />
        <div className={classes.iconCont}>
          <SearchIcon
            style={{ color: '#6B3FA0' }}
            // onClick={searchFunc}
            className={classes.iconClass}
          />
        </div>
      </div>
      {posts.map((post, i) => (
        <div key={i}>
          <Grid container style={{ flexDirection: 'column' }}>
            <Grid className={classes.postCont}>
              <img
                src={post.postImage}
                alt={`${props.topic} image`}
                className={classes.postImg}
              />
              <div>
                <div className={classes.postConts}>
                  <EditStory
                    handleSuccess={props.handleSuccess}
                    postID={post.id}
                  />
                  <DeleteIcon
                    onClick={() => handleDelete(post.postsid)}
                    className={classes.delete}
                    color='error'
                    fontSize='small'
                  />
                </div>
                <Typography className={classes.title} variant='subtitle1'>
                  {post.title}
                </Typography>
                <Typography variant='subtitle2' className={classes.subnews}>
                  {post.subTitle}
                </Typography>
                <Typography variant='caption'>
                  {dayjs(post.createdAt).fromNow()}
                </Typography>
              </div>
            </Grid>
          </Grid>
          <hr />
        </div>
      ))}
    </div>
  );
}

const mapStateToProps = (state) => ({
  data: state.data,
  UI: state.UI,
});

const mapDispatchToProps = { deletePost, clearErrors };

export default connect(mapStateToProps, mapDispatchToProps)(DeleteStory);
