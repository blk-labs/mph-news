import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

// Comps
import TopicMap from './TopicMap';

export default function TopicGrid(props) {

	const posts = (data) => props.news.filter(n => n.topic === data).splice(0, 4);

	return (
		<Grid container justify="center">
			<TopicMap topic='nigeria' pass={posts('nigeria')} />
			<TopicMap topic='international' pass={posts('international')} />
			<TopicMap topic='security' pass={posts('security')} />
			<TopicMap topic='health' pass={posts('health')} />

			<Grid className="advertSpace" item sm={12}>
				<Typography variant="h5" style={{ cursor: 'pointer', margin: 'auto', width: 'fit-content', letterSpacing: '1px', fontFamily: '"Helvetica Compressed"', textTransform: 'uppercase'}}>
					interested in Buying this space?
				</Typography>
			</Grid>
		</Grid>
	);
}
