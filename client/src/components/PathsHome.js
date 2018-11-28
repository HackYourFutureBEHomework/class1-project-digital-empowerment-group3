import React, { Component } from 'react';
import { createPaths, getPaths, deletePath, updatePathTitle } from '../api/paths';
import Pathnavbar from './Pathnavbar';
import Pathheader from './Pathheader';
import Modal from 'react-modal';
import EditableLabel from 'react-inline-editing';

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
			this.setState({ paths: paths, isLoading: false });
		});
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
		const { paths, isLoading } = this.state;
		let filteredPaths = this.state.paths.filter((pathItem) => {
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
				<Pathheader />
				<input value={this.state.searchField} onChange={this.updateSearch.bind(this)} />
				{filteredPaths.map((pathItem) => (
					<p key={pathItem._id}>
						<p>{pathItem.pathTitle}</p>
						<i
							onClick={() => {
								this.handleDeletePath(pathItem._id);
							}}
							className="far fa-trash-alt"
						/>
						<button className="btn-update" onClick={() => this.handleUpdatePathTitle(pathItem._id)}>
							Update
						</button>
					</p>
				))}{' '}
				<h1>working</h1>
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
				<button className="new-add-module " onClick={this.handleModal}>
					Add path
				</button>
			</div>
		);
	}
}
export default PathsHome;
