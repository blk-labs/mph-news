import React from 'react';

import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

//Comps
import Subscribe from '../components/layout/Subscribe'
import Footer from '../components/layout/Footer'

export default class privacy extends React.Component {

	render() {

		document.title = 'Our Terms | News | My Political Hub';

		return (
			<span>
				<Container maxWidth="lg">
				<Grid container style={{ margin: '5% auto 10%' }}>
					<Grid xs={12} lg={8}>
						<Typography variant="h4">Privacy Policy</Typography>
						<br /><br />
						<Typography variant="h6">Last updated: 14th July 2020</Typography>
						<br />
						<Typography variant="body2">
							The information provided by my www.mypoliticalhub.com and our APPs is intended for general awareness only.
							This privacy policy sets out how My Political Hub (MPH) uses and protects any information that you give. We are committed to ensuring that your privacy is protected. Should we ask you to provide certain information by which you can be identified when using this app, then you can be assured that it will only be used in accordance with this privacy statement. MPH may change this policy from time to time by updating this page. You should check this page from time to time to ensure that you are happy with any changes. 
							<br /><br />
							This policy is effective from 14th of July, 2020
						</Typography>
						<br /><br />
						<Typography variant="h6">What we collect</Typography>
						<br/>
						<Typography variant="body2">We may collect the following information, we will always try and ask for the minimum amount of data to give you a good experience. Please check the app Auth Dialog or when you installed, you can go to Setting->Application Manager and then select Our Apps to see exactly what permission the app needs:
						<br/>-Device information(Country, Device version, Language, Network type)</Typography>
						<br /><br />
						<Typography variant="h6">What we do with the information we gather</Typography>
						<br/>
						<Typography variant="body2">We require this information to understand your needs and provide you with a better service, and in particular for the following reasons:</Typography>
						<br/>
						<ul>
							<li>Improve App experience</li>
							<li>Improve our products and services.</li>
							<li>We may periodically send promotional emails about new products, special offers or other information which we think you may find interesting using the email address which you have provided.</li>
						</ul>
						<br /><br />
						<Typography variant="h6">Security</Typography>
						<br/>
						<Typography variant="body2">We are committed to ensuring that your information is secure. In order to prevent unauthorized access or disclosure we have put in place suitable physical, electronic and managerial procedures to safeguard and secure the information we collect online.</Typography>
						<br /><br />
						<Typography variant="h6">How we use cookies</Typography>
						<br/>
						<Typography variant="body2">A cookie is a small file which asks permission to be placed on your phone hard drive. Once you agree, the file is added and the cookie helps analyse web traffic or lets you know when you visit a particular site. Cookies allow web applications to respond to you as an individual. The web application can tailor its operations to your needs, likes and dislikes by gathering and remembering information about your preferences. We use traffic log cookies to identify which pages are being used. This helps us analyze data about webpage traffic and improve our website in order to tailor it to customer needs. We only use this information for statistical analysis purposes and then the data is removed from the system. Overall, cookies help us provide you with a better website, by enabling us to monitor which pages you find useful and which you do not. A cookie in no way gives us access to your computer or any information about you, other than the data you choose to share with us. You can choose to accept or decline cookies. Most web browsers automatically accept cookies, but you can usually modify your browser setting to decline cookies if you prefer. This may prevent you from taking full advantage of the website.</Typography>
						<br /><br />
						<Typography variant="h6">Controlling your personal information</Typography>
						<br/>
						<Typography variant="body2">You may choose to restrict the collection or use of your personal information by not accepting access to your details in the Auth Dialog box. You can also withdraw permissions by the app to access your data by going to the settings. We will not sell, distribute or lease your personal information to third parties unless we have your permission or are required by law to do so. We may use your personal information to send you promotional information about our own content which we think you may find interesting. You may request details of personal information which we hold about you under the Data Protection Act 1998. A small fee will be payable. If you would like a copy of the information held on you please contact us. If you believe that any information we are holding on you is incorrect or incomplete, please contact us as soon as possible. We will promptly correct any information found to be incorrect.</Typography>
					</Grid>
					<Subscribe />
				</Grid>
				</Container>
				<Footer />
			</span>
		);
	}
}
