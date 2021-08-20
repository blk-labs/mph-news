import React, { useState, useEffect } from "react";
import Link from 'next/link';
import { useRouter } from 'next/router'

// Redux
import { connect } from 'react-redux';
import { getTopic } from '../../redux/actions/dataActions';

// Topic
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { makeStyles, createStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

// Comps
import FirstMap from '../../components/topics/FirstMap'
import SideMap from '../../components/topics/SideMap'
import MoreMap from '../../components/topics/MoreMap'
import SubBox from '../../components/layout/SubBox'
import Loading from '../../components/layout/Loading'
import Footer from '../../components/layout/Footer'
import SEO from '../../components/utils/SEO'

const useStyles = makeStyles((theme) => createStyles({
	...theme.spreadThis,
	background: {
		background: theme.palette.secondary.main,
		position: 'absolute',
		width: '100%',
		height: '50vh',
		top: 0,
		marginTop: '-2rem',
		zIndex: '-10'
	},
	topicCont: {
		marginTop: '2rem',
		background: 'white',
		padding: '2.5% 5%',
		[theme.breakpoints.down('sm')]: {
			paddingTop: '5%'
		}
	},
	gridBtm: {
		marginTop: '3rem',
		[theme.breakpoints.up('lg')]: {
			paddingLeft: '4rem'
		},
		[theme.breakpoints.up('md')]: {
			paddingLeft: '2rem',
			marginTop: 0
		}
	},
	loadingCont: {
		height: '100vh',
		position: 'relative',
		marginTop: '2rem',
		background: 'white'
	}
}))


export function Topics(props) {
    const router = useRouter()

  const theme = useTheme();
  const classes = useStyles(props);
  const matches = useMediaQuery(theme.breakpoints.up('md'));
  const [title, setTitle] = useState(router.query.title)

  const { topic } = props.data;
  const { loading } = props.UI;

  const moreFilter = topic.filter((data, i) => i > 0);

  useEffect(() => {
    if (title !== router.query.title) {
        setTitle(router.query.title)
    }
  })

  useEffect(() => {
  	props.getTopic(router.query.title);
  }, [title]);

	return (
		<div style={{ position: 'relative' }}>
            <SEO
				title={router.query.title}
				description={`${router.query.title} | News | My Political Hub`}
				pathname={router.asPath}
			/>
			<div className={classes.background}></div>
			{
				loading ? <Container className={classes.loadingCont}><Loading /></Container> : (
				<Container className={classes.topicCont} maxWidth="lg">
					<Typography variant="body1" style={{ marginBottom: '2rem', color: 'lightgray', textTransform: 'uppercase', fontWeight: 'bold' }}>{title}</Typography>
					<Grid container>
						<Grid item xs={12} md={7}>
							{ props.data.topic.length !== 0 && <FirstMap topic={topic[0]} /> }
						</Grid>
						<Grid item xs={12} md={5}>
							<div className={classes.gridBtm}>
							{
								topic.filter((data, i) => i > 0).splice(0,4).map((data, i) => (
									<span>
										<SideMap topic={data} key={i} />
										{ topic.filter((data, i) => i > 0).splice(0,4).length !== i + 1 ? <hr className={classes.newsHr} /> : null }
									</span>
								))
							}
							<SubBox />
							</div>
						</Grid>
					</Grid>
					<MoreMap posts={moreFilter.splice(4,4)} title={title} />
				</Container>
				)
			}
			<Footer />
		</div>
	);
}

const mapStateToProps = state => ({
  data: state.data,
  UI: state.UI
});

const mapDispatchToProps = { getTopic };

export default connect(mapStateToProps, mapDispatchToProps)(Topics);