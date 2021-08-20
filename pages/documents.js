import React, { useEffect } from 'react';

// Redux
import { connect } from 'react-redux';
import { getDocuments, clearErrors } from '../redux/actions/dataActions';

// Material
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import GetAppIcon from '@material-ui/icons/GetApp';

// Comps
import Subscribe from '../components/layout/Subscribe'
import Footer from '../components/layout/Footer'

export function Documents(props) {

  useEffect(() => {
  	props.getDocuments();
		document.title = 'National Assembly | News | My Political Hub';
  }, []);

  const { loading, docs } = props.data;

	const aClass = { color: 'black', textDecoration: 'none', display: 'flex', alignItems: 'center', marginLeft: 'auto', marginTop: '.5rem' };

	return (
		<span>
			<Container maxWidth="lg">
			<Grid container style={{ margin: '5% auto 10%' }}>
				<Grid xs={12} lg={8}>
					<Typography variant="h4">Naitonal Assembly Downloads</Typography>
					<div>
						{
							docs.map((doc, i) => (
								<Grid container>
									<div style={{ display: 'flex', width: '100%', marginTop: '2rem', alignItems: 'flex-start' }}>
										<span style={{ marginRight: '1rem' }}>
											<Typography variant='button' style={{ fontWeight: 'bold' }}>{doc.title}</Typography>
											<Typography variant='body2'>{doc.info}</Typography>
										</span>
										<a style={aClass} href={doc.url || ""} download={doc.url || ""} target="_blank">
											<Typography variant="caption">Download</Typography>
											<GetAppIcon />
										</a>
									</div>
								</Grid>
							))
						}
					</div>
				</Grid>
				<Subscribe />
			</Grid>
			</Container>
			<Footer />
		</span>
	);
}


const mapStateToProps = state => ({
  data: state.data,
  UI: state.UI
});

const mapDispatchToProps = { getDocuments, clearErrors };

export default connect(mapStateToProps, mapDispatchToProps)(Documents);