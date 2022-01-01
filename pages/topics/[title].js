import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

// Redux
import { connect } from 'react-redux';
import { getTopic } from '../../redux/actions/dataActions';

// Topic
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { makeStyles, createStyles, useTheme } from '@mui/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Stack from '@mui/material/Stack';
import Pagination from '@material-ui/lab/Pagination';

// Comps
import FirstMap from '../../components/topics/FirstMap';
import SideMap from '../../components/topics/SideMap';
import MoreMap from '../../components/topics/MoreMap';
import Subscribe from '../../components/layout/Subscribe';
import Loading from '../../components/layout/Loading';
import Footer from '../../components/layout/Footer';
import SEO from '../../components/utils/SEO';

const useStyles = makeStyles((theme) =>
  createStyles({
    ...theme.spreadThis,

    topicCont: {
      marginTop: '2rem',
      [theme.breakpoints.down('sm')]: {
        paddingTop: '5%',
      },
    },
    topicTitle: {
      fontFamily: '"Playfair Display"',
      fontWeight: 900,
      fontSize: 36,
      color: '#5BA66E',
      textTransform: 'capitalize',
      marginBottom: 10,
      [theme.breakpoints.down('sm')]: {
        fontSize: 24,
      },
    },
    topicInfo: {
      fontWeight: 400,
      marginBottom: 50,
      fontFamily: '"Helvetica"',
      fontSize: 18,
      width: 600,
      [theme.breakpoints.down('sm')]: {
        fontSize: 13,
        width: '100%',
      },
    },
    gridBtm: {
      marginTop: '3rem',
      [theme.breakpoints.up('lg')]: {
        paddingLeft: '4rem',
      },
      [theme.breakpoints.up('md')]: {
        paddingLeft: '2rem',
        marginTop: 0,
      },
    },
    loadingCont: {
      height: '100vh',
      position: 'relative',
      marginTop: '2rem',
      background: 'white',
    },
    newsHr: {
      marginBottom: '1rem',
    },
  })
);
const postsPerPage = 4;
const firstIndex = 6;

let arrayForHoldingPosts = [];
export function Topics(props) {
  const router = useRouter();

  const theme = useTheme();
  const classes = useStyles(props);
  const matches = useMediaQuery(theme.breakpoints.up('md'));
  const [title, setTitle] = useState(router.query.title);

  const { topic } = props.data;
  const { loading } = props.UI;

  const moreFilter = topic.filter((data, i) => data > 3);

  useEffect(() => {
    if (title !== router.query.title) {
      setTitle(router.query.title);
    }
  });

  useEffect(() => {
    props.getTopic(router.query.title);
  }, [title]);

  // const [pageSize, setPageSize] = React.useState(6);
  // const [page, setPage] = React.useState(1);
  // const [topicData, setData] = React.useState(
  //   arrayForHoldingPosts.slice(firstIndex, pageSize)
  // );

  // React.useEffect(() => {
  //   setData(arrayForHoldingPosts.slice(0, pageSize));
  // }, [pageSize]);

  // const handleChange = (event, value) => {
  //   setPage(value);
  //   setData(
  //     arrayForHoldingPosts.slice(
  //       firstIndex + pageSize * (value - 1),
  //       pageSize * value
  //     )
  //   );
  // };

  // const loopWithSlice = (next, prev) => {
  //   const slicedPosts = props.posts.slice(next, prev);
  //   arrayForHoldingPosts = [...arrayForHoldingPosts, ...slicedPosts];
  //   setPostsToShow(arrayForHoldingPosts);
  // };

  // useEffect(() => {
  //   loopWithSlice(0, postsPerPage);
  // }, []);

  // const handleShowMorePosts = () => {
  //   loopWithSlice(next, next + postsPerPage);
  //   setNext(next + postsPerPage);
  // };

  // //Change width
  // const changeWidth = (e) => {
  //   setPageSize(parseInt(e.target.value, 10));
  // };
  return (
    <div style={{ position: 'relative' }}>
      <SEO
        title={router.query.title}
        description={`${router.query.title} | News | My Political Hub`}
        pathname={router.asPath}
      />
      <div className={classes.background}></div>
      {loading ? (
        <Container className={`${classes.loadingCont} top-0 left-0 right-0 bottom-0 max-w-full overflow-x-hidden`}>
          <Loading />
        </Container>
      ) : (
        <Container className={classes.topicCont} maxWidth='lg'>
          <Typography variant='body1' className={`${classes.topicTitle} py-2 cinzel font-bold text-xl lg:text-4xl`}>
            {title}
          </Typography>
          <Typography className={`${classes.topicInfo} py-2 mb-4 text-gray-900 text-base font-medium`}>
            Get the latest travel news and hot celeb gossip with exclusive
            stories and pictures to discover more!
          </Typography>
          <hr className="absolute left-0 right-0"/>
          <Grid container className="md:pt-16">
            <Grid item xs={12} md={8}>
              {props.data.topic.length !== 0 && <FirstMap topic={topic[0]} />}
            </Grid>
            <Grid item xs={12} md={4}>
              <div className={classes.gridBtm}>
                {topic
                  .filter((data, i) => i > 0)
                  .splice(0, 2)
                  .map((data, i) => (
                    <span key={i}>
                      <SideMap topic={data} />
                    </span>
                  ))}
              </div>
            </Grid>
          </Grid>
          <Grid item container spacing={5}>
            <Grid item xs={12} md={8}>
              {topic
                .filter((data, i) => i > 0)
                .splice(2, 6)
                .map((data, i) => (
                  <span key={i}>
                    <MoreMap topic={data} />
                  </span>
                ))}
              {/* <Stack spacing={2}>
                <Pagination
                  count={Math.ceil(arrayForHoldingPosts.length / pageSize)}
                  variant='outlined'
                  shape='rounded'
                  onChange={handleChange}
                  className={classes.root}
                />
              </Stack> */}
            </Grid>
            <Grid item xs={12} md={4} className='mt-0 md:mt-16 pt-0'>
              <Subscribe />
            </Grid>
          </Grid>
        </Container>
      )}
      <Footer />
    </div>
  );
}

const mapStateToProps = (state) => ({
  data: state.data,
  UI: state.UI,
});

const mapDispatchToProps = { getTopic };

export default connect(mapStateToProps, mapDispatchToProps)(Topics);
