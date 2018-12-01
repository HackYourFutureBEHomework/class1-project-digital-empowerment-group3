import React, { Component } from 'react';
import Typist from 'react-typist';

const Pathnavbar = (props) => {
	return (
		<div className="navbar navbar-default navbar-fixed-top">
			<Typist>
				<h2> HOBO </h2>
				<Typist.Backspace count={15} delay={200} />
				<h2 className="navbar-title container">HOBO</h2> {' '}
			</Typist>
		</div>
	);
};

export default Pathnavbar;
