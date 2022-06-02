import React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

// Comps
import TopicMap from './TopicMap';

export default function TopicGrid(props) {
  const posts = (data) =>
    (props.news || []).filter((n) => n.topic === data).splice(0, 6);

  return (
    <Grid justify='center'>
      <TopicMap topic='nigeria' pass={posts('nigeria')} />
      <TopicMap topic='international' pass={posts('international')} />
      <TopicMap topic='security' pass={posts('security')} />
    </Grid>
  );
}
