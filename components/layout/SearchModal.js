import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

// Redux
import { connect } from 'react-redux';
import { getAllPosts } from '../../redux/actions/dataActions';

// Material
import { makeStyles, createStyles, useTheme } from '@mui/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

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
        padding: '5%',
        width: '95%',
      },
    },
    inputCont: {
      display: 'flex',
    },
    input: {
      color: '#000',
    },
    iconCont: {
      borderTopRightRadius: 2,
      borderBottomRightRadius: 2,
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
        maxWidth: 138,
        minWidth: 138,
        height: 126,
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
      [theme.breakpoints.down('sm')]: {
        fontSize: 15,
      },
    },
    gridBody: {
      marginLeft: '3rem',
      marginTop: 'auto',
      [theme.breakpoints.down('sm')]: {
        marginLeft: '.5rem',
      },
    },
    createBy: {
      fontSize: 15,
      color: '#6B3FA0',
      marginRight: 20,
      fontFamily: '"Helvetica"',
      [theme.breakpoints.down('sm')]: {
        fontSize: '12px!important',
        color: '#000!important',
        marginRight: '10px!important',
      },
    },
    createAt: {
      textTransform: 'capitalize',
      fontFamily: '"Helvetica"',
      [theme.breakpoints.down('sm')]: {
        fontSize: '12px!important',
        marginTop: '0!important',
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
            placeholder='Search for news, video...'
            fullWidth
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            InputProps={{
              disableUnderline: true,
              className: classes.input,
            }}
            style={{
              border: '1px solid #D9D9D9',
              padding: '4px 12px',
              fontFamily: '"Helvetica"',
              marginTop: '0',
              borderTopLeftRadius: 2,
              borderBottomLeftRadius: 2,
            }}
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
              margin: '1rem 0',
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
                  <div className='flex sm:justify-inherit items-center capitalize mt-2'>
                    <Typography className={classes.createBy} variant='caption'>
                      {post.postedBy}
                    </Typography>
                    <Typography className={classes.createAt} variant='caption'>
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
