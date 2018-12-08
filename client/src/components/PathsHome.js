import React, { Component } from 'react';
import { createPaths, getPaths, deletePath, updatePathTitle } from '../api/paths';
import Pathnavbar from './Pathnavbar';
import { Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle } from 'reactstrap';
import Modal from 'react-modal';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

class PathsHome extends Component {
	state = {
		paths: [],
		pathTitle: '',
		selectedModalOption: false,
		searchField: '',
		isLoading: true
	};

	componentDidMount = () => {
		getPaths().then((paths) => {
			if (this.isUnmounted) {
				return;
			}
			this.setState({ paths: paths, isLoading: false });
		});
	};

	componentWillUnmount = () => {
		this.isUnmounted = true;
	};

	handleChangeTitlePath = (event) => {
		this.setState({
			pathTitle: event.target.value
		});
	};

	handlecreateNewPath = (event) => {
		createPaths(this.state.pathTitle).then((newPath) => {
			this.setState({
				paths: [ ...this.state.paths, newPath ],
				selectedModalOption: !this.state.selectedModalOption
			});
		});
	};
	handleDeletePath = (id) => {
		const filteredPath = this.state.paths.filter((titlePath) => titlePath._id !== id);
		deletePath(id);
		this.setState({ paths: filteredPath });
	};
	handleUpdatePathTitle = (pathId) => {
		updatePathTitle(pathId, this.state.pathTitle).then((updatedPaths) => {
			let paths = [ ...this.state.paths ];
			const index = paths.findIndex((pathItem) => pathItem._id === pathId);
			paths[index].titlePath = updatedPaths.titlePath;
			this.setState({ paths });
		});
	};

	handleModal = () => {
		this.setState({
			selectedModalOption: !this.state.selectedModalOption
		});
	};

	updateSearch = (event) => {
		this.setState({
			searchField: event.target.value
		});
	};

	render() {
		const { isLoading } = this.state;
		const { IsloggedIn } = this.props;
		let filteredPaths = this.state.paths.filter((pathItem) => {

			if (!pathItem.pathTitle) {
				return;
			}
			return pathItem.pathTitle.toLowerCase().indexOf(this.state.searchField.toLowerCase()) !== -1;
		});
		if (isLoading)
			return (
				<div className="wrapper">
					<div className="ball ball-1" />
					<div className="ball ball-2" />
					<div className="ball ball-3" />
				</div>
			);

		return (
			<div>
				<Pathnavbar />
				<div className="box">
					<div className="container-2">
						<span className="icon">
							<i className="fa fa-search" />
						</span>
						<input
							value={this.state.searchField}
							onChange={this.updateSearch.bind(this)}
							type="search"
							id="search"
							placeholder="Search..."
						/>

						<Link to={'/login'}>hello</Link>

						{IsloggedIn && (
							<button className="new-add-module add-path" onClick={this.handleModal}>
								Add path
							</button>
						)}
					</div>
				</div>
				{filteredPaths.map((pathItem) => (
					<span key={pathItem._id}>
						<span className="cards">
							<Card className="Card">
								<CardImg
									top
									width="100%"
									src="https://images.unsplash.com/photo-1529302374944-90ecd276bdb8?ixlib=rb-0.3.5&s=dc226da8e1697ad2c2b85fb9ac2b7130&auto=format&fit=crop&w=1969&q=80"
									alt="Card image cap"
								/>

								<CardBody>
									<CardTitle>
										{' '}
										<Link to={`/path/${pathItem._id}`} className="link2">
											{pathItem.pathTitle}
										</Link>
									</CardTitle>
									<CardSubtitle>A good way to sharp your skills</CardSubtitle>
									<CardText>Some quick example to learn how to use a computer</CardText>
									{IsloggedIn && (
										<span>
											<button
												className="btn-update"
												onClick={() => this.handleUpdatePathTitle(pathItem._id)}
											>
												Update
											</button>
											<i
												onClick={() => {
													this.handleDeletePath(pathItem._id);
												}}
												className="far fa-trash-alt"
											/>
										</span>
									)}
								</CardBody>
							</Card>
						</span>
					</span>
				))}{' '}
				<Modal
					isOpen={this.state.selectedModalOption}
					onRequestClose={this.handleModal}
					contentLabel="content..."
					className="modal1"
					closeTimeoutMS={200}
				>
					<input
						placeholder="Add path title"
						type="text"
						value={this.state.pathTitle}
						onChange={(event) => this.handleChangeTitlePath(event)}
						className="input-addmodule"
						onKeyPress={(event) => this.handleChangeTitlePath(event)}
					/>

					<button className="btn-onadd" onClick={this.handlecreateNewPath}>
						Add new path
					</button>
				</Modal>
			</div>
		);
	}
}
export default PathsHome;