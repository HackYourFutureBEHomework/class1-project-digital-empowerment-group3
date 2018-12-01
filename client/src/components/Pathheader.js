import React, { Component } from 'react';

const Header = (props) => {
	return (
		<div>
			<h1>{props.name}</h1>
			<h2>header</h2>
		</div>
	);
};

export default Header;