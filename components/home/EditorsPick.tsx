import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

// Material
import Typography from '@material-ui/core/Typography';

import { makeStyles, createStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

// Icons
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { newsService } from '../../lib/services';
import EditorPickItem from '../data-display/EditorPickItem';
import { INewsPost } from '../../lib/models/NewsPostModel';

export default function EditorPicks(props) {
  const [loading, setLoading] = useState(false);
  const [news, setNews] = useState<Array<INewsPost>>([]);
  // const news = props.news.filter((n) => n.topic !== 'video');
  dayjs.extend(relativeTime);
  const recommend = news.filter((n) => n.editors_pick === true).slice(0, 4);
  const liked = news
    .sort((a, b) => b.commentCount - a.commentCount)
    .slice(0, 4);

  const theme = useTheme();

  const initialize = async () => {
    setLoading(true);
    try {
      const posts = await newsService.getEditorPicks();
      console.log({posts})
      setNews(posts);
    } catch(e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    initialize();
  }, [])
  

  return (
    <div className='py-6 lg:py-10'>
      <Typography variant='h4' className={`mb-6 font-mont font-bold tracking-wide text-2xl lg:text-4xl`}>
        Editor&apos;s Pick
      </Typography>
      <div className={"mt-4 flex flex-wrap items-stretch"}>
        {news.map((post, i) => (
          <div className='w-full lg:w-1/4 py-3 lg:py-0' key={post.id}>
            <EditorPickItem id={post.id} index={i+1} title={post.title} viewCount={post.commentCount} publishedOn={`${post.createdAt}`} />
          </div>
        ))}
      </div>
    </div>
  );
}
