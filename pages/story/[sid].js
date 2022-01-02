import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import axios from 'axios';
import { useRouter } from 'next/router';

// Redux
import { connect } from 'react-redux';
import { getTopic, getPost } from '../../redux/actions/dataActions';

// Material
import { makeStyles, createStyles, useTheme } from '@mui/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

// Comps
import Comments from '../../components/story/Comments';
import BodyMark from '../../components/story/BodyMark';
import RecentTopic from '../../components/story/RecentTopic';
import StoryMap from '../../components/story/StoryMap';
import Loading from '../../components/layout/Loading';
import Footer from '../../components/layout/Footer';
// import SEO from '../../components/utils/SEO'

// This gets called on every request
// export async function getServerSideProps(context) {
//   // Fetch data from external API
//   const res = await axios.get(`/post/${context.params.sid}`);
//   const data = res.data;
//   // console.log("datazz ", data);

//   // Pass data to the page via props
//   return { props: { post: data } };
// }

const useStyles = makeStyles((theme) =>
  createStyles({
    ...theme.spreadThis,
    headerCont: {
      marginTop: '2rem',
    },
    linkCont: {
      margin: '2.5rem auto 5rem',
      width: '250px',
      border: `5px solid ${theme.palette.secondary.light}`,
      padding: '10px',
      display: 'flex',
      flexDirection: 'column',
    },
  })
);

export function Story(props) {
  const router = useRouter();
  const { sid } = router.query;

  console.log(props);

  // const [story, setStory] = useState(props.location.pathname.slice(7))

  useEffect(() => {
    // axios.get(`/post/${story}`)
    // .then((res) => {
    // 	props.getTopic(res.data.topic)
    // })
    // .catch((err) => console.log(err));
    console.log("sid: ", sid)
    props.getPost(sid);
  }, [sid]);

  // const {
  //   postsid,
  //   topic,
  //   createdAt,
  //   postedBy,
  //   postImage,
  //   id,
  //   body,
  //   title,
  //   important,
  //   subTitle,
  //   link,
  //   commentCount,
  // } = props.post;
  const { loading } = props.data;
  // document.title = `${title === undefined ? 'Story' : title} | News | My Political Hub`;

  const theme = useTheme();
  const classes = useStyles(props);
  const matches = useMediaQuery(theme.breakpoints.up('md'));

  return (
    <div>
      {/* <SEO
				title={props.post.title}
				description={props.post.subtitle || props.post.body}
				image={{ src: props.post.postImage, width: 250, height: 250 }}
				pathname={router.query.sid}
			/> */}
      
      <div maxWidth='lg'>
        <div className={classes.headerCont} container>
          <div style={{ position: 'relative' }}>
            {loading ? <Loading /> : <StoryMap story={props.data.post} />}
          </div>
          <div>
            <span>
              <Comments story={props.data.post} />
            </span>
          </div>
          <RecentTopic
            news={props.data.posts}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
}

const mapStateToProps = (state) => ({
  data: state.data,
  UI: state.UI,
});

const mapDispatchToProps = { getPost, getTopic };

export default connect(mapStateToProps, mapDispatchToProps)(Story);
