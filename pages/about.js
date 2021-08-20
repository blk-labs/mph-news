import React from 'react';

import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

//Comps
import Subscribe from '../components/layout/Subscribe'
import Footer from '../components/layout/Footer'

const About = (props) => {

	React.useEffect(() => {
		document.title = 'About | News | My Political Hub';
	}, [])

	return (
		<span>
			<Container maxWidth="lg">
				<Grid container style={{ margin: '5% auto 10%' }}>
					<Grid xs={12} lg={8}>
						<Typography variant="h4">About Us</Typography>
						<br /><br />
						<Typography variant="body1">Mypoliticalhub (MPH) is your one-stop platform for everything politics in Nigeria and beyond.
							It is independent, non-governmental and not affiliated with any political, religious or tribal group.
							It is here to change the way we do politics, bringing us a step closer to transparency and trust.</Typography>
						<br /><br />
						<Typography variant="h5">Our Mission:</Typography>

						<ul style={{ listStyle: 'unstyled' }} className="list-inside">
							<li>To have all the up to date and relevant political news under one platform.</li>
							<li>Access to first-hand information from the politicians.</li>
							<li>Opportunity for you to ask questions directly, make comments, agree or disagree, rate and track a politician’s promises and mandates.</li>
							<li>To encourage discussion of political events as they unfold.</li>
						</ul>

						<Typography variant="h5">Vision:</Typography>
						<Typography variant="body1">Politics nowadays is influenced by social media, fake news and outrageous attention-grabbing headlines. It is impossible to separate the grain from the chaff. MPH is here to change the way we do politics; it is here to give you clarity amongst all the noise in a simple, reliable and transparent manner.</Typography>
						<br /><br />
						<Typography variant="h6">As a Citizen and potential vote:</Typography>

						<ul>
							<li>You can have immediate access to the people you voted into office.</li>
							<li>You can make informed, unbiased decisions when it comes to elections; what’s better than having a platform like this to interact directly with your elected politicians?</li>
							<li>You can rate your politicians using digital ratings and promote those politicians that are keeping to their promises.</li>
						</ul>


						<Typography variant="h6">As an elected Politician or aspiring politician</Typography>

						<ul>
							<li>Showcase your activities directly to the people that matter.</li>
							<li>Take conversation about politics to a platform designed for politics alone.</li>
							<li>Reach out easily to your followers and build an effective grass root movement.</li>
							<li>Connect to new audiences and influence new followers particularly among young voters.</li>
						</ul>
						<br />
						<Typography variant="body1">Join us today in this exciting new adventure!!!</Typography>
					</Grid>
					<Subscribe />
				</Grid>
			</Container>
			<Footer />
		</span>
	);
}

export default About;