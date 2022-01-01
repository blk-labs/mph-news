import React, { useState, useEffect } from 'react';

// Redux
import { connect } from 'react-redux';
import { commentOnPost } from '../../redux/actions/dataActions';

// Material
import { makeStyles, createStyles, useTheme } from '@mui/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';
import Container from '@mui/material/Container';

// Components
import CommentMap from './CommentMap';
import Loading from '../layout/Loading';

const useStyles = makeStyles((theme) => ({
  ...theme.spreadThis,
  gridCont: {
    margin: '2rem auto',
    [theme.breakpoints.down('md')]: {
      margin: '2rem 0',
    },
    [theme.breakpoints.down('sm')]: {
      margin: '2rem auto',
    },
  },
  paperCont: {
    boxShadow: 'none',
    width: '70%',
    margin: 'auto',
    [theme.breakpoints.down('md')]: {
      width: '80%',
      margin: 0,
      marginLeft: 'auto',
    },
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      margin: 'auto',
    },
  },
  commentSort: {
    marginLeft: 'auto',
    color: 'lightgray',
  },
  resize: {
    fontSize: 16,
  },
  button: {
    width: '100%',
    height: 45,
    padding: '.25rem 1rem',
    fontSize: '75%',
  },
  commentHr: {
    border: 0,
    borderTop: 'solid .5px rgba(0,0,0,.05)',
  },
  textField: {
    height: 160,
  },
}));

export function Comments(props) {
  const { comments, commentCount, postsid, id } = props.story;
  const { loading } = props.UI;

  const [comment, setComment] = useState('');

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const submitComment = {
      body: comment,
      id: id,
      user: `${props.user.credentials.fName} ${props.user.credentials.lName}`,
    };
    props.commentOnPost(postsid, submitComment);
    setComment('');
  };

  const theme = useTheme();
  const classes = useStyles(props);
  const matches = useMediaQuery(theme.breakpoints.up('md'));

  return (
    <Container maxWidth='lg' className={classes.headerCont}>
      <Grid xs={12} md={12} lg={12} className={classes.gridCont}>
        <div className={classes.paperCont}>
          <span style={{ display: 'flex', alignItems: 'baseline' }}>
            <Typography
              variant='overline'
              style={{ textTransform: 'capitalize', fontSize: 15 }}
            >
              {commentCount} comments
            </Typography>
          </span>

          <span style={{ display: 'flex' }}>
            {props.user.authenticated ? (
              <Typography variant='caption'>
                {props.user.credentials.fName} {props.user.credentials.lName}
              </Typography>
            ) : null}
          </span>
          <div className='my-2'>
            <TextField
              style={{
                width: '100%',
                border: '1px solid #D9D9D9',
                fontSize: 6,
              }}
              id='outlined-textarea'
              placeholder='Enter your Comment'
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              multiline
              rows={7}
              InputProps={{
                classes: {
                  input: classes.resize,
                },
                disableUnderline: true,
              }}
              className={`${classes.textField} h-auto`}
            />
          </div>
          {!props.user.authenticated ? (
            <Button variant='contained' className={classes.button} disabled>
              Login To Post
            </Button>
          ) : (
            <Button
              variant='contained'
              color='secondary'
              disabled={comment.length < 3}
              className={classes.button}
              onClick={handleSubmit}
            >
              Post
            </Button>
          )}
          <Grid
            className='commentGrid'
            style={{
              textAlign: loading ? 'center' : 'left',
              overflowY: loading ? 'hidden' : 'auto',
            }}
          >
            {loading ? (
              <CircularProgress color='secondary' />
            ) : (
              commentCount !== undefined &&
              (commentCount === 0 ? (
                <h5>No comments!</h5>
              ) : (
                comments.map((com, i) => (
                  <span key={i}>
                    <CommentMap comments={com} />
                    {i < commentCount - 1 && (
                      <hr className={classes.commentHr} />
                    )}
                  </span>
                ))
              ))
            )}
          </Grid>
        </div>
      </Grid>
    </Container>
  );
}

const mapStateToProps = (state) => ({
  data: state.data,
  user: state.user,
  UI: state.UI,
});

const mapDispatchToProps = { commentOnPost };

export default connect(mapStateToProps, mapDispatchToProps)(Comments);
