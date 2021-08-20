import React from 'react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import DeleteComment from './DeleteComment'

// Material
import Typography from '@material-ui/core/Typography';

export default function CommentMap(props) {

	dayjs.extend(relativeTime);
	const { createdAt, user, body, email, commentsid } = props.comments;

	return (
		<div style={{ margin: '1rem auto', display: 'flex', flexDirection: 'column', paddingRight: '.5rem' }}>
			<span style={{ display: 'flex', alignItems: 'center' }}>
				<Typography variant="caption"><strong>{user}</strong></Typography>
				<DeleteComment email={email} commentsid={commentsid} />
			</span>
			<Typography style={{ color: 'lightgray' }} variant="caption">{dayjs(createdAt).fromNow()}</Typography>
			<p style={{ fontSize: '80%', lineHeight: '20px', marginBottom: 0 }}>{body}</p>
		</div>
	);
}
