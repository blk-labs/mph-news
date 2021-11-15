import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

// Comps
import TopicMap from './TopicMap';

export default function TopicGrid(props) {
  const posts = (data) =>
    props.news.filter((n) => n.topic === data).splice(0, 6);

  return (
    <Grid justify='center'>
      <TopicMap topic='nigeria' pass={posts('nigeria')} />
      <TopicMap topic='international' pass={posts('international')} />
      <TopicMap topic='security' pass={posts('security')} />
    </Grid>
  );
}
