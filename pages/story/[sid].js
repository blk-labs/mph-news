import React, { useState, useEffect } from "react";
import Link from 'next/link';
import axios from 'axios';
import { useRouter } from 'next/router'

// Redux
import { connect } from 'react-redux';
import { getTopic, getPost } from '../../redux/actions/dataActions';

// Material
import { makeStyles, createStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

// Comps
import Comments from '../../components/story/Comments'
import BodyMark from '../../components/story/BodyMark'
import MoreMarkup from '../../components/story/MoreMarkup'
import StoryMap from '../../components/story/StoryMap'
import Loading from '../../components/layout/Loading'
import Footer from '../../components/layout/Footer'
import SEO from '../../components/utils/SEO'

// This gets called on every request
export async function getServerSideProps(context) {
	// Fetch data from external API
	const res = await axios.get(`/post/${context.params.sid}`);
	const data = await res.data;

	console.log(data)

	// Pass data to the page via props
	return { props: { post: data } }
}

const useStyles = makeStyles((theme) => createStyles({
	...theme.spreadThis,
	headerCont: {
		marginTop: '2rem'
	},
	linkCont: {
		margin: '2.5rem auto 5rem',
		width: '250px',
		border: `5px solid ${theme.palette.secondary.light}`,
		padding: '10px',
		display: 'flex',
		flexDirection: 'column'
	},
}));


export function Story(props) {
	const router = useRouter()

	//   const [story, setStory] = useState(props.location.pathname.slice(7))

	//   useEffect(() => {
	//   	axios.get(`/post/${story}`)
	//   	.then((res) => {
	//   		props.getTopic(res.data.topic)
	//   	})
	//   	.catch((err) => console.log(err));
	//   	props.getPost(story);
	//   }, []);


	const { postsid, topic, createdAt, postedBy, postImage, id, body, title, important, subTitle, link, commentCount } = props.post;
	const { loading } = props.UI;
	document.title = `${title === undefined ? 'Story' : title} | News | My Political Hub`;

	const theme = useTheme();
	const classes = useStyles(props);
	const matches = useMediaQuery(theme.breakpoints.up('md'));

	const readMarkup = (
		<div className={`${classes.linkCont}`}>
			<p style={{ margin: 0 }}><i>Read the full article <a target="_blank" href={link || ""}>HERE!</a></i></p>
			<p style={{ margin: 0, marginTop: 'auto' }}><i>What do you think? Type in the comments section below.</i></p>
		</div>
	)

	return (
		<div>
			<SEO
				title={props.post.title}
				description={props.post.subtitle || props.post.body}
				image={{ src: props.post.postImage, width: 250, height: 250 }}
				pathname={router.query.sid}
			/>
			<Container maxWidth='lg'>
				<Grid className={classes.headerCont} container>
					<Grid style={{ position: 'relative' }} item xs={12} lg={8}>
						{loading ? <Loading /> : <StoryMap story={props.post} />}
					</Grid>
					<Grid item xs={12} lg={4}>
						{matches ? (
							<span>
								{readMarkup}
								<Comments story={props.post} />
							</span>
						) : null
						}
					</Grid>
					{matches ? (topic !== undefined ? <MoreMarkup topic={topic} title={title} link={router.asPath} topics={props.topic} /> : null) : null}
				</Grid>
			</Container>

			{loading ? null : (!matches ? <BodyMark story={props.post} /> : null)}

			{!matches ? (
				<span>
					{readMarkup}
					<Comments story={props.post} />
				</span>
			) : null
			}

			{!matches ? (topic !== undefined ? <MoreMarkup topic={topic} title={title} link={router.asPath} topics={props.topic} /> : null) : null}
			<Footer />
		</div>
	);
}

const mapStateToProps = state => ({
	data: state.data,
	UI: state.UI
});

const mapDispatchToProps = { getPost, getTopic };

export default connect(mapStateToProps, mapDispatchToProps)(Story);