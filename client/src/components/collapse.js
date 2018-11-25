const PRODUCTS = [
	{ id: 1, name: 'Bag of suck', price: 100, details: "You don't want to own this!" },
	{ id: 2, name: 'Bag of luck', price: 200, details: 'You might want to own this!' },
	{ id: 3, name: 'Bag of fuck', price: 300, details: 'You really want to own this!' }
];

var ItemList = React.createClass({
	getInitialState() {
		return { active: null };
	},
	handleClick(i) {
		return (e) => {
			let active = this.state.active === i ? null : i;
			this.setState({ active: active });
		};
	},
	display(i) {
		return this.state.active === i ? 'block' : 'none';
	},
	liClass(i) {
		return this.state.active === i ? 'active' : 'inactive';
	},
	Item(props, i) {
		return (
			<li key={i} onClick={this.handleClick(i)}>
				<span>{props.name + '(' + props.price + ')'}</span>
				<div style={{ display: this.display(i) }}>{props.details}</div>
			</li>
		);
	},
	render() {
		let { products } = this.props;
		return <ul>{products.map(this.Item)}</ul>;
	}
});

const App = React.createClass({
	getInitialState() {
		return { active: null };
	},
	render() {
		return <ItemList products={PRODUCTS} />;
	}
});

ReactDOM.render(<App />, document.getElementById('app'));
