import React from 'react';

import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

//Comps
import Subscribe from '../components/layout/Subscribe'
import Footer from '../components/layout/Footer'

export default class disclaimer extends React.Component {

	render() {

		document.title = 'Our Terms | News | My Political Hub';

		return (
			<span>
				<Container maxWidth="lg">
				<Grid container style={{ margin: '5% auto 10%' }}>
					<Grid xs={12} lg={8}>
						<Typography variant="h4">Disclaimer</Typography>
						<br /><br />
						<Typography variant="h6">GENERAL DISCLAIMER</Typography>
						<br />
						<Typography variant="body2">
							The information provided by my www.mypoliticalhub.com and our APPs is intended for general awareness only. All information on the site is provided in good faith. However, we make no representation or warranty of any kind, express or implied, regarding the accuracy, adequacy, validity, reliability, availability or completeness of any information on the site.
							<br /><br />UNDER NO CIRCUMSTANCES SHALL WE HAVE ANY LIABILITY TO YOU FOR ANY LOSS OR DAMAGE OF ANY KIND INCURRED AS A RESULT OF THE USE OF THE SITE OR RELIANCE ON ANY INFORMATION PROVIDED ON THE SITE. YOUR USE OF THE SITE AND YOUR RELIANCE ON ANY INFORMATION ON THE SITE IS SOLELY AND IRREVOCABLY AT YOUR OWN RISK.
							<br /><br />The site may contain (or may be sent through the site) links to other websites and features in banners or other advertising. Such external links are not investigated, monitored or checked for accuracy, adequacy, validity, reliability, availability or completeness by us.
							<br /><br />WE DO NOT WARRANT, ENDORSE, GUARANTY OR ASSUME RESPONSIBILITY FOR THE ACCURACY OR RELIABILITY OF ANY INFORMATION OFFERED OR SENT BY US OR BY THIRD-PARTY WEBSITES LINKED THROUGH THE SITE OR ANY WEBSITE OR WILL NOT BE A PARTY TO OR IN ANY WEBSITE OR FEATURE LINKED IN ANY BANNER OR OTHER ADVERTIZING. WE WILL NOT BE A PARTY TO OR IN ANY WAY BE RESPONSIBLE FOR MONITORING ANY TRANSACTION BETWEEN YOU AND THIRD-PARTY PROVIDERS OF CERTAIN PRODUCTS OR SERVICES NEITHER SHALL WE BE A PARTY TO ANY SUIT YOU FILE AGAINST US IN RELATION TO THIS.
							<br /><br />The site cannot and does not contain legal advice. The legal information is provided for general information and educational purposes only and is not a substitute for professional advice. Accordingly, before taking any action based upon such information we encourage you to consult with the appropriate professionals after giving us three months’ notice, failure of which will lead to premature and baseless claim and you agree that you waived the right to file any suit against us and we do not provide any kind of legal advice.
							<br /><br />THE USE OF OR RELIANCE ON ANY INFORMATION CONTAINED IN THIS SITE IS SOLELY AT YOUR OWN RISK.
						</Typography>
						<br /><br />
						<Typography variant="h6">SOURCES OF INFORMATION</Typography>
						<br />
						<Typography variant="body2">
							The information available on this website and MPH Apps may not be most current or true. News summaries and commentaries are editors and and other contributors' opinion while profiles are compiled from multiple sources including published books on politicians biographies, news media both print and online, and other online resources. Bills and and other chambers events are either from the official website of the national assembly, print media, or political programs in radio and TV stations. Politicians may update their profiles themselves or through their employees and advisers.
						</Typography>
						<Typography variant="body2">
							MPH LIMITED is thus completely dissociating it self from any misinformation either intentional or otherwise that may arise from any information published on www.mypoliticalhub.com or MPH APPs.
						</Typography>
						<br /><br />
						<Typography variant="h6">AFFILIATION</Typography>
						<br />
						<Typography variant="body2">
							MPH LIMITED is not affiliated with any government agency or offices and is not officially representing any political body, party or ideology. MPH LIMITED is not representing or authorized to represent the Nigerian government or any official political establishment such as senate,house of representatives, or any government office or political party.
						</Typography>
					</Grid>
					<Subscribe />
				</Grid>
				</Container>
				<Footer />
			</span>
		);
	}
}
