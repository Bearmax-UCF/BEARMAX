import React from "react";

import NavBar from "./../../Components/LandingNav/LandingNav";

import Logo from "./../../Components/Images/face.png";

export const ContactUs = () => {
	return (
		<div>
			<NavBar />

			<div className="contact">
				<h1>Contact Us</h1>
				<p> Email: BearMaxTeam@BearMax.com</p>
				<p> Call: 1-800-BEAR-MAX</p>
			</div>

			<h1>Meet The Team</h1>
			<div className="meatTeam">
				<img
					src={Logo}
					className="smLandLogo"
					alt="Logo: bear max face"
				/>
				<img
					src={Logo}
					className="smLandLogo"
					alt="Logo: bear max face"
				/>
				<img
					src={Logo}
					className="smLandLogo"
					alt="Logo: bear max face"
				/>
				<img
					src={Logo}
					className="smLandLogo"
					alt="Logo: bear max face"
				/>
				<img
					src={Logo}
					className="smLandLogo"
					alt="Logo: bear max face"
				/>
				<img
					src={Logo}
					className="smLandLogo"
					alt="Logo: bear max face"
				/>
			</div>
		</div>
	);
};

export default ContactUs;
