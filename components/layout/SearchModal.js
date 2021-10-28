import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

// Redux
import { connect } from 'react-redux';
import { getAllPosts } from '../../redux/actions/dataActions';

// Material
import { makeStyles, createStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

// Icons
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles((theme) =>
  createStyles({
    ...theme.spreadThis,

    searchCont: {
      width: '75%',
      height: '75%',
      background: 'white',
      borderRadius: '10px',
      padding: '5%',
      overflowY: 'scroll',
      [theme.breakpoints.down('sm')]: {
        padding: '10%',
      },
    },
    inputCont: {
      display: 'flex',
      alignItems: 'center',
    },
    iconCont: {
      cursor: 'pointer',
      minWidth: '3rem',
      minHeight: '3rem',
      backgroundColor: 'transparent',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      border: '2px solid #D9D9D9',
      [theme.breakpoints.down('sm')]: {
        minWidth: '2rem',
        minHeight: '2rem',
      },
    },
    iconClass: {
      '&:hover': {
        color: theme.palette.secondary.main,
      },
    },
    gridCont: {
      margin: '1rem 0 30px',
      display: 'flex',
    },
    topic: {
      color: '#52C41A',
      fontWeight: 400,
      fontSize: 12,
      textTransform: 'capitalize',
      border: '1.5px solid #B7EB8F',
      width: 'fit-content',
      padding: '5px',
      backgroundColor: '#F6FFED',
    },
    gridImg: {
      maxWidth: 280,
      minWidth: 280,
      height: 200,
      objectFit: 'cover',
      border: '.5px solid rgba(0,0,0,.05)',
      [theme.breakpoints.down('sm')]: {
        width: 75,
        height: 75,
      },
    },
    newsTitle: {
      fontWeight: 900,
      fontSize: 36,
      textTransform: 'initial',
      fontFamily: '"Playfair Display"',
      lineHeight: 1.1,
      padding: '10px 0',
      letterSpacing: -1,
    },
    gridBody: {
      marginLeft: '3rem',
      marginTop: 'auto',
      [theme.breakpoints.down('sm')]: {
        marginLeft: 0,
        marginBottom: '1rem',
      },
    },
  })
);

export function SearchModal(props) {
  dayjs.extend(relativeTime);

  const [search, setSearch] = useState('');
  const [posts, setPosts] = useState([]);
  const [searched, setSearched] = useState(false);

  const theme = useTheme();
  const classes = useStyles(props);
  const matches = useMediaQuery(theme.breakpoints.up('md'));

  const searchFunc = () => {
    // do something
    let updated = props.data.posts.filter((fil) =>
      fil.title.toLowerCase().includes(search.toLowerCase())
    );
    search.length > 2 && setPosts(updated);
    search.length > 2 && setSearched(true);
  };

  useEffect(() => {
    props.getAllPosts();
  }, []);

  return (
    <div className={classes.searchCont}>
      <div>
        <div className={classes.inputCont}>
          <TextField
            id='search'
            label='Search for news, video...'
            fullWidth
            value={search}
            color='#000'
            onChange={(e) => setSearch(e.target.value)}
            InputProps={{ disableUnderline: true }}
            style={{ border: '2px solid #D9D9D9' }}
          />
          <div className={classes.iconCont}>
            <SearchIcon
              style={{ color: '#6B3FA0' }}
              onClick={searchFunc}
              className={classes.iconClass}
            />
          </div>
        </div>
      </div>
      <div className={classes.searchList}>
        {searched && (
          <Typography
            variant='body1'
            style={{
              margin: '2rem 0',
              textAlign: 'right',
              color: '#6B3FA0',
              fontSize: 16,
            }}
          >
            {posts.length} Results
          </Typography>
        )}
        {posts.length !== 0 &&
          posts.map((post, i) => (
            <a
              className={`cursor-pointer ${classes.linkClass}`}
              key={i}
              target='_blank'
              rel='noreferrer'
              href={`/story/${post.id}`}
            >
              <div className={classes.gridCont}>
                <div>
                  <img
                    src={post.postImage}
                    className={classes.gridImg}
                    alt='news'
                  />
                </div>

                <div className={classes.gridBody}>
                  <Typography variant='overline' className={classes.topic}>
                    {post.topic}
                  </Typography>
                  <Typography variant='body1' className={classes.newsTitle}>
                    {post.title}
                  </Typography>
                  <div>
                    <Typography
                      style={{
                        textTransform: 'capitalize',
                        marginRight: 40,
                        marginBotttom: 40,
                        fontSize: 15,
                        color: '#6B3FA0',
                      }}
                      variant='caption'
                    >
                      {post.postedBy}
                    </Typography>
                    <Typography
                      variant='caption'
                      style={{
                        margin: '0 0 1rem',
                        fontSize: 15,
                      }}
                      variant='caption'
                    >
                      {dayjs(post.createdAt).fromNow()}
                    </Typography>
                  </div>
                </div>
              </div>
            </a>
          ))}
      </div>
    </div>
  );
}

const mapDispatchToProps = { getAllPosts };

const mapStateToProps = (state) => ({
  data: state.data,
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchModal);
