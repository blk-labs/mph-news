import React, { useEffect } from "react";

// Redux
import { connect } from 'react-redux';
import { getAllPosts, clearErrors } from '../redux/actions/dataActions';

// Material
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { makeStyles, createStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

// Comps
import LatestNews from '../components/home/LatestNews'
import RecentNews from '../components/home/RecentNews'
import CustomNews from '../components/home/CustomNews'
import TopicGrid from '../components/home/TopicGrid'
import PopularPoliticians from '../components/home/PopularPoliticians'
import VideoNews from '../components/home/VideoNews'
import Loading from '../components/layout/Loading'
import Footer from '../components/layout/Footer'

const useStyles = makeStyles((theme) => createStyles({
	...theme.spreadThis,
	loader: {
		height: '100vh',
		background: 'white',
		margin: 'auto'
	}
}))

export function Home(props) {

	useEffect(() => {

		let nav = document.getElementById('navBar');
		if (nav !== null) {
			nav.style.display = 'block'
		}

		props.getAllPosts();
		document.title = 'MPH News | My Political Hub';
		console.log(props)
	}, []);

	const { loading } = props.data;

	const theme = useTheme();
	const classes = useStyles(props);
	const matches = useMediaQuery(theme.breakpoints.up('md'));

	console.log("loading: ", loading);
	return (
		<span>
			{
				loading ? (
					<div className={classes.loader}>
						<Loading />
					</div>
				) : (
					<span>
						<Container style={!matches ? { padding: 0 } : null} maxWidth="lg">
							<Grid container>
								<LatestNews news={props.data.posts} />
								<RecentNews news={props.data.posts} />
								<hr className={`${classes.hrTop} ${classes.hrHome}`} />
								<TopicGrid news={props.data.posts} />
								<hr className={`${classes.hrTop} ${classes.hrHome}`} />
								<PopularPoliticians />
								<hr className={`${classes.hrTop} ${classes.hrHome}`} />
								<CustomNews news={props.data.posts} />
							</Grid>
						</Container>
						<VideoNews news={props.data.posts} />
					</span>
				)
			}
			<Footer />
		</span>
	);
}

const mapStateToProps = state => ({
	data: state.data,
	UI: state.UI
});

const mapDispatchToProps = { getAllPosts, clearErrors };

export default connect(mapStateToProps, mapDispatchToProps)(Home);