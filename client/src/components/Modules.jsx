import React, { Component } from 'react';
import { getModules, createModule, deleteModule, updateModule } from '../api/modules';
import '../css/Modules.css';
import Modal from 'react-modal';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
class Modules extends Component {
	state = {
		title: '',
		title2: '',
		title3: '',
		modules: [],
		isActive: false,
		text: '',
		visibleModules: {},
		explanation: 'explanation',
		exercise: 'exercise',
		evaluation: 'evaluation',
		showTextEditorExplanation: true,
		showTextEditorExercise: false,
		showTextEditorEvaluation: false,
		isLoading: true,
		alertShown: false
	};

	componentDidMount = () => {
		getModules().then((modules) => {
			this.setState({ modules: modules, isLoading: false });
		});
	};

	handleChangeTitle = (event) => {
		this.setState({
			title: event.target.value
		});
	};
	handleChangeTitleExercise = (event) => {
		this.setState({
			title2: event.target.value
		});
	};
	handleChangeTitleEvaluation = (event) => {
		this.setState({
			title3: event.target.value
		});
	};

	handleSubmit = () => {
		createModule(
			this.state.title,
			this.state.title2,
			this.state.title3,
			this.state.explanation,
			this.state.exercise,
			this.state.evaluation
		).then((newModule) => {
			this.setState({
				modules: [ ...this.state.modules, newModule ]
			});
		});
	};

	handleDelete = (id) => {
		const filteredModules = this.state.modules.filter((module) => module._id !== id);
		deleteModule(id);
		this.setState({ modules: filteredModules });
	};

	handleUpdate = (moduleId) => {
		updateModule(
			moduleId,
			this.state.title,
			this.state.title2,
			this.state.title3,
			this.state.explanation,
			this.state.exercise,
			this.state.evaluation
		).then((updatedModules) => {
			let modules = [ ...this.state.modules ];
			const index = modules.findIndex((module) => module._id === moduleId);
			modules[index].title = updatedModules.title;
			modules[index].title2 = updatedModules.title2;
			modules[index].title3 = updatedModules.title3;
			modules[index].explanation = updatedModules.explanation;
			modules[index].exercise = updatedModules.exercise;
			modules[index].evaluation = updatedModules.evaluation;
			this.setState({ modules });
		});
	};

	toggleModal = () => {
		this.setState({ isActive: !this.state.isActive });
	};

	handleTextChange = (input, value) => {
		this.setState({
			[input]: value
		});
	};

	toggleModule = (id) => {
		this.setState((prevState) => ({
			visibleModules: { ...prevState.visibleModules, [id]: !prevState.visibleModules[id] }
		}));
	};

	showAndHideExplanation = () => {
		this.setState({
			showTextEditorExplanation: true,
			showTextEditorEvaluation: false,
			showTextEditorExercise: false
		});
	};

	showAndHideExercise = () => {
		this.setState({
			showTextEditorExplanation: false,
			showTextEditorEvaluation: false,
			showTextEditorExercise: true
		});
	};

	showAndHideEvaluation = () => {
		this.setState({
			showTextEditorExplanation: false,
			showTextEditorEvaluation: true,
			showTextEditorExercise: false
		});
	};

	render() {
		const { modules, isLoading } = this.state;
		const editorOptions = {
			toolbar: [
				[ { header: '1' }, { header: '2' } ],
				[ 'bold', 'italic', 'underline', 'strike' ],
				[ { list: 'ordered' }, { list: 'bullet' } ],
				[ 'link', 'image', 'video' ],
				[ 'clean' ]
			]
		};
		if (isLoading) return <p>isloading</p>;
		return (
			<div>
				<button className="btn-toggle" onClick={this.toggleModal}>
					add new module +++
				</button>

				<Modal isOpen={this.state.isActive} onRequestClose={this.toggleModal} contentLabel="content...">
					{this.state.showTextEditorExplanation ? (
						<span>
							<input
								placeholder="Add title"
								type="text"
								value={this.state.title}
								onChange={(event) => this.handleChangeTitle(event)}
								className="input-addmodule"
							/>
							explanation
							<ReactQuill
								value={this.state.explanation}
								modules={editorOptions}
								onChange={this.handleTextChange.bind(this, 'explanation')}
							/>
						</span>
					) : null}

					{this.state.showTextEditorExercise ? (
						<span>
							<input
								placeholder="Add title"
								type="text"
								value={this.state.title2}
								onChange={(event) => this.handleChangeTitleExercise(event)}
								className="input-addmodule"
							/>
							exercise
							<ReactQuill
								value={this.state.exercise}
								modules={editorOptions}
								onChange={this.handleTextChange.bind(this, 'exercise')}
							/>
						</span>
					) : null}

					{this.state.showTextEditorEvaluation ? (
						<span>
							<input
								placeholder="Add title"
								type="text"
								value={this.state.title3}
								onChange={(event) => this.handleChangeTitleEvaluation(event)}
								className="input-addmodule"
							/>
							evaluation
							<ReactQuill
								value={this.state.evaluation}
								modules={editorOptions}
								onChange={this.handleTextChange.bind(this, 'evaluation')}
							/>
						</span>
					) : null}

					<button onClick={this.showAndHideExplanation}> explanation</button>

					<button onClick={this.showAndHideExercise}> exercise</button>

					<button onClick={this.showAndHideEvaluation}> evaluation</button>

					<button className="btn-onadd" onClick={this.handleSubmit}>
						Add new module
					</button>
				</Modal>

				{modules.map((module) => (
					<div
						onClick={this.toggleModule.bind(this, module._id)}
						key={module._id}
						className={`${!this.state.visibleModules[module._id]
							? 'section-modules'
							: 'section-big-modules'}`}
					>
						<span>
							<p>{module.title} </p>
							<div dangerouslySetInnerHTML={{ __html: module.explanation }} />
							<p>{module.title2}</p>
							<div dangerouslySetInnerHTML={{ __html: module.exercise }} />
							<p>{module.title3}</p>
							<div dangerouslySetInnerHTML={{ __html: module.evaluation }} />

							<button className="btn-delete" onClick={this.handleDelete.bind(this, module._id)}>
								delete
							</button>
						</span>
						<button className="btn-toggle" onClick={this.toggleModal}>
							update
						</button>

						<Modal isOpen={this.state.isActive} onRequestClose={this.toggleModal} contentLabel="content...">
							{this.state.showTextEditorExplanation ? (
								<span>
									<input
										placeholder="Add title"
										type="text"
										value={this.state.title}
										onChange={(event) => this.handleChangeTitle(event)}
										className="input-addmodule"
									/>
									explanation
									<ReactQuill
										value={this.state.explanation}
										modules={editorOptions}
										onChange={this.handleTextChange.bind(this, 'explanation')}
									/>
								</span>
							) : null}

							{this.state.showTextEditorExercise ? (
								<span>
									<input
										placeholder="Add title"
										type="text"
										value={this.state.title2}
										onChange={(event) => this.handleChangeTitleExercise(event)}
										className="input-addmodule"
									/>
									exercise
									<ReactQuill
										value={this.state.exercise}
										modules={editorOptions}
										onChange={this.handleTextChange.bind(this, 'exercise')}
									/>
								</span>
							) : null}

							{this.state.showTextEditorEvaluation ? (
								<span>
									<input
										placeholder="Add title"
										type="text"
										value={this.state.title3}
										onChange={(event) => this.handleChangeTitleEvaluation(event)}
										className="input-addmodule"
									/>
									evaluation
									<ReactQuill
										value={this.state.evaluation}
										modules={editorOptions}
										onChange={this.handleTextChange.bind(this, 'evaluation')}
									/>
								</span>
							) : null}

							<button onClick={this.showAndHideExplanation}> explanation</button>

							<button onClick={this.showAndHideExercise}> exercise</button>

							<button onClick={this.showAndHideEvaluation}> evaluation</button>

							<button className="btn-update" onClick={this.handleUpdate.bind(this, module._id)}>
								Update
							</button>
							<button className="btn-onadd" onClick={this.handleSubmit}>
								Add new module
							</button>
						</Modal>
					</div>
				))}
			</div>
		);
	}
}

export default Modules;
