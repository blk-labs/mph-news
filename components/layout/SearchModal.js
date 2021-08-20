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

const useStyles = makeStyles((theme) => createStyles({
	...theme.spreadThis,
	iconClass: {
		marginTop: '3px',
		color: 'gray'
	},
	searchCont: {
		width: '75%',
		height: '75%',
		background: 'white',
		borderRadius: '10px',
		padding: '5%',
		overflowY: 'scroll',
    [theme.breakpoints.down('sm')]: {
      padding: '10%',
		}
	},
	inputCont: {
		display: 'flex',
		alignItems: 'center'
	},
	iconCont: {
		cursor: 'pointer',
		marginLeft: '1rem',
		borderRadius: '50%',
		minWidth: '2.5rem',
		minHeight: '2.5rem',
		backgroundColor: 'lightgray',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		[theme.breakpoints.down('sm')]: {
			minWidth: '2rem',
			minHeight: '2rem',
		}
	},
	iconClass: {
		'&:hover': {
			color: theme.palette.secondary.main
		}
	},
	gridCont: {
		margin: '1rem 0'
	},
	gridImg: {
		width: 100,
		height: 100,
		borderRadius: 20,
		objectFit: 'cover',
		border: '.5px solid rgba(0,0,0,.05)',
		[theme.breakpoints.down('sm')]: {
			width: 75,
			height: 75,
		}
	},
	gridBody: {
		marginLeft: '3rem',
		[theme.breakpoints.down('sm')]: {
			marginLeft: 0,
			marginBottom: '1rem'
		}
	}
}));

export function SearchModal(props) {

	dayjs.extend(relativeTime);

  const [search, setSearch ] = useState('');
  const [posts, setPosts] = useState([]);
  const [searched, setSearched] = useState(false);

  const theme = useTheme();
  const classes = useStyles(props);
  const matches = useMediaQuery(theme.breakpoints.up('md'));

  const searchFunc = () => {
  	// do something
  	let updated = props.data.posts.filter(fil => fil.title.toLowerCase().includes(search.toLowerCase()))
  	search.length > 2 && setPosts(updated);
  	search.length > 2 && setSearched(true);
  }

  useEffect(() => {
  	props.getAllPosts();
  }, []);

	return (
		<div className={classes.searchCont}>
			<div>
				<div className={classes.inputCont}>
					<TextField
						id="search"
						label="Search"
						fullWidth
						value={search}
						color="secondary"
						onChange={e => setSearch(e.target.value)}
					/>
					<div className={classes.iconCont}>
						<SearchIcon onClick={searchFunc} className={classes.iconClass} />
					</div>
				</div>
			</div>
			<div className={classes.searchList}>
				{searched && <Typography variant="body1" style={{ margin: '2rem 0' }}>{posts.length} Results</Typography>}
				{
					posts.length !== 0 && posts.map((post, i) => (
						<a className={classes.linkClass} key={i} target="_blank" href={`/story/${post.id}`}>
						<Grid className={classes.gridCont} container>
							<Grid xs={12} md={1}>
								<img src={post.postImage} className={classes.gridImg} alt="news" />
							</Grid>
							<Grid className={classes.gridBody}>
								<Typography variant="overline">{post.topic} - {dayjs(post.createdAt).fromNow()}</Typography>
								<Typography variant="body1" style={{ fontWeight: 'bold' }}>{post.title}</Typography>
							</Grid>
						</Grid>
						</a>
					))
				}
			</div>
		</div>
	);
}

const mapDispatchToProps = { getAllPosts };

const mapStateToProps = state => ({
  data: state.data
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchModal);