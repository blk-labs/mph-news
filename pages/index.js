import React, { useEffect } from 'react';

// Redux

import { connect } from 'react-redux';
import { getAllPosts, clearErrors } from '../redux/actions/dataActions';

// Material
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { makeStyles, createStyles, useTheme } from '@mui/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

// Comps
import LatestNews from '../components/home/LatestNews';
import EditorsPick from '../components/home/EditorsPick';
import RecentNews from '../components/home/RecentNews';
import CustomNews from '../components/home/CustomNews';
import TopicGrid from '../components/home/TopicGrid';
import PopularPoliticians from '../components/home/PopularPoliticians';
import VideoNews from '../components/home/VideoNews';
import Loading from '../components/layout/Loading';
import Footer from '../components/layout/Footer';

const useStyles = makeStyles((theme) =>
  createStyles({
    ...theme.spreadThis,
    loader: {
      height: '100vh',
      background: 'white',
      margin: 'auto',
    },
  })
);

export function Home(props) {
  useEffect(() => {
    let nav = document.getElementById('navBar');
    if (nav !== null) {
      nav.style.display = 'block';
    }

    props.getAllPosts();
    document.title = 'MPH News | My Political Hub';
    console.log(props);
  }, []);

  const { loading } = props.data;

  const theme = useTheme();
  const classes = useStyles(props);
  const matches = useMediaQuery(theme.breakpoints.up('md'));

  console.log('loading: ', loading);
  return (
    <span>
      {loading ? (
        <div className={classes.loader}>
          <Loading />
        </div>
      ) : (
        <span>
          <Container maxWidth='lg'>
            <EditorsPick news={props.data.posts} />
          </Container>
          <Grid container>
            <LatestNews news={props.data.posts} />
            <CustomNews news={props.data.posts} />
            <Container maxWidth='lg'>
              <RecentNews news={props.data.posts} />
              <TopicGrid news={props.data.posts} />
            </Container>
          </Grid>
          <VideoNews news={props.data.posts} />
        </span>
      )}
      <Footer />
    </span>
  );
}

const mapStateToProps = (state) => ({
  data: state.data,
  UI: state.UI,
});

const mapDispatchToProps = { getAllPosts, clearErrors };

export default connect(mapStateToProps, mapDispatchToProps)(Home);
