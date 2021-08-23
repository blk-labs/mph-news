import React from 'react';

// Material
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles, createStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

// Comps
import { politicians } from '../../data'

const useStyles = makeStyles((theme) => createStyles({
	...theme.spreadThis,
	imgClass: {
		height: '200px',
		width: '100%',
		objectFit: 'cover'
	},
	hover: {
		position: 'absolute',
		fontSize: '10px',
		color: 'white',
		fontWeight: 'bold',
		marginLeft: '.5rem',
		top: 0,
		left: 0,
		backgroundColor: theme.palette.secondary.main,
		padding: '.5rem 1rem'
	},
	body: {
		padding: '0 .5rem',
		marginBottom: '2rem',
		position: 'relative',
	},
}));

export default function PopularPoliticians(props) {

	let array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 0],
    result = array.slice(0, 4).map(function () { 
        return this.splice(Math.floor(Math.random() * this.length), 1)[0];
    }, array.slice());

  const theme = useTheme();
  const classes = useStyles(props);
  const matchesLG = useMediaQuery(theme.breakpoints.up('lg'));
	
	let poliMap = [];
	result.map(poli => {
		poliMap.push(politicians[poli])
	})

	return (
		<Container>
			<Typography variant="body1" style={{ fontWeight: 'bold', margin: '2rem .5rem' }}>POPULAR POLITICIANS</Typography>
			<Grid container className={classes.gridCont}>
				{
					poliMap[0] !== undefined &&
					poliMap.map((poli, i) => (
						<Grid xs={6} lg={3} key={i}>
							<div className={classes.body}>
								<a target="_blank" rel="noreferrer" className={`cursor-pointer ${classes.linkClass}`} href={`https://mypoliticalhub.com/profile/${poli.link}`}>
									<span className={classes.hover}>{poli.position}</span>
									<img src={poli.img.src} alt="mph-politician" className={classes.imgClass} />
									<Typography variant="body1" style={{ fontWeight: 'bold' }}>{poli.name}</Typography>
									<Typography variant="caption">{poli.position}</Typography>
								</a>
							</div>
						</Grid>
					))
				}
			</Grid>
		</Container>
	);
}
