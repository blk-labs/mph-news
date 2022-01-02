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
export async function getServerSideProps(context) {
  // Fetch data from external API
  // const res = await axios.get(`/post/${context.params.sid}`);
  const data = {
    topic: 'nigeria',
    body: 'By Ukeme Udom\n' +
      '\n' +
      'Speaker of the House of Representatives, Femi Gbajabiamila, on Thursday, assured Nigerians that the National Assembly will revisit the Electoral Act amended bill when it resumes from recess.\n' +
      '\n' +
      'Gbajabiamila said during the commissioning of some projects in Surulere, Lagos, that the President refused to sign the bill based on advice he was given but he asserted that the direct primaries clause was meant to ensure Nigerians participate in the electoral process.\n' +
      '\n' +
      'According to the speaker: “If you followed the history of the amendment of the direct and indirect primary bill, I initiated that amendment bill for a good reason and it is for people to participate in elections. These are the people you see around when you campaign every four years come rain, come shine.\n' +
      '\n' +
      '“For me, it does not make sense that these people do not have a voice in who represents them. It is part of being used and I didn’t like that. \n' +
      '\n' +
      '“Most of us are reformers and one of the ways to reform the system is to make more accountable and to make the people have a voice in who represents them as opposed to a few people sitting in the four corners of a wall and writing results.\n' +
      '\n' +
      '“That is what the amendment was all about. Again, there is a process. “The president has, in his wisdom, rejected it and I believe he did it with good intentions based on the advice that he got. He weighed everything. Again, maybe times are different. He has people who advised him and I guess they advised him against the amendment bill."\n' +
      '\n' +
      'Speaking further on what will be done with the bill, the speaker said: “There is a process. When we come back, as I said, the House will look at those amendments. We will sit as the National Assembly, look at the reasons and at that point, consider removing that clause and pass the bill so that we do not do away with the baby and the bath water.\n' +
      '\n' +
      '“But then, it is not my decision to make. It is the decision of the National Assembly. If they determine that the reasons are not good enough, then, there is a process prescribed by the constitution.”\n' +
      '\n' +
      'When asked whether the National Assembly may veto the bill, he said: “Which way the sword is going to fall, I have no idea until that time. I cannot read the minds of the whole National Assembly members.\n' +
      '\n' +
      '“They need 2/3 of the member to override the president, there is a reason the constitution prescribes 2/3, veto is not something you easily override. “If they muster enough and they believe it is in the best interest of Nigerians, then, that is what we will do; otherwise, we will take out the clause and pass the bill so that Nigerians can have a credible electoral act and due process. They must get it.”\n' +
      '\n' +
      'President Mohammadu Buhari recently declined assenting to the electoral act bill as amended by the National Assembly, citing concerns on rights violation as well as cost implication as part of reasons for his refusal to assent to the bill.',
    title: 'Electoral Act: NASS To Revisit Amendments – Gbajabiamila',
    commentCount: 0,
    link: '',
    id: 'electoral-act-nass-to-revisit-amendments-gbajabiamila',
    important: true,
    postedBy: 'News Desk',
    editors_pick: false,
    postImage: 'https://firebasestorage.googleapis.com/v0/b/poli-news-77c19.appspot.com/o/204640571307.jpeg?alt=media',
    subTitle: 'Speaker of the House of Representatives, Femi Gbajabiamila, on Thursday, assured...',
    createdAt: '2021-12-31T05:40:34.252Z',
    postsid: 'U7WCjk4UA83cMIAXe9Xb',
    comments: []
  }
  // console.log("datazz ", data);

  // Pass data to the page via props
  return { props: { post: data } };
}

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

  console.log(props);

  //   const [story, setStory] = useState(props.location.pathname.slice(7))

  //   useEffect(() => {
  //   	axios.get(`/post/${story}`)
  //   	.then((res) => {
  //   		props.getTopic(res.data.topic)
  //   	})
  //   	.catch((err) => console.log(err));
  //   	props.getPost(story);
  //   }, []);

  const {
    postsid,
    topic,
    createdAt,
    postedBy,
    postImage,
    id,
    body,
    title,
    important,
    subTitle,
    link,
    commentCount,
  } = props.post;
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
      <Head>
        <title>{props.post.title}</title>
      </Head>
      <div maxWidth='lg'>
        <div className={classes.headerCont} container>
          <div style={{ position: 'relative' }}>
            {loading ? <Loading /> : <StoryMap story={props.post} />}
          </div>
          <div>
            <span>
              <Comments story={props.post} />
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
