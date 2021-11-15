import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import EditStory from './EditStory';

// Redux
import { deletePost, clearErrors } from '../../redux/actions/dataActions';
import { connect } from 'react-redux';

// Material UI
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Fade from '@material-ui/core/Fade';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { makeStyles, createStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import TextField from '@material-ui/core/TextField';
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
    },
    delete: {
      cursor: 'pointer',
      '&:hover': {
        transition: '.5s',
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
      [theme.breakpoints.down('xs')]: {
        fontSize: 24,
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
      [theme.breakpoints.down('xs')]: {
        fontSize: 13,
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

  const posts = props.video
    ? props.posts.filter((fil) => fil.topic === 'video')
    : props.posts.filter((fil) => fil.topic !== 'video');
  const { loading } = props.UI;

  const handleEdit = (pid) => {};

  const handleDelete = (pid) => {
    props.deletePost(pid);
  };

  return (
    <div>
      <div className={classes.inputCont}>
        <TextField
          //   id='search'
          placeholder='Search story...'
          fullWidth
          //   value={search}
          //   onChange={(e) => setSearch(e.target.value)}
          InputProps={{ disableUnderline: true }}
          style={{ border: '1px solid #D9D9D9', height: '42px 60px' }}
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
                style={{
                  minWidth: '378px',
                  maxWidth: '378px',
                  height: '281px',
                  objectFit: 'cover',
                }}
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
