import React from 'react';
import Typist from 'react-typist';
import { Link } from 'react-router-dom';

const Pathnavbar = (props) => {
	return (
		<div className="navbar navbar-default navbar-fixed-top">
			<Typist>
				<h2> HOBO </h2>
				<Typist.Backspace count={15} delay={200} />
				<h2 className="navbar-title container">HOBO</h2> {' '}
			</Typist>

			<Link
				to={'/login'}
				style={{
					textDecoration: 'none',
					color: 'red',
					backgroundColor: 'white',
					borderRadius: '6px',
					padding: '8px'
				}}
			>
				Sign in
			</Link>
		</div>
	);
};

export default Pathnavbar;
