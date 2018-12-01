import React, { Component } from 'react';
import { getModules, createModule, deleteModule, updateModule } from '../api/modules';
import '../css/Modules.css';
import Modal from 'react-modal';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Accordion, AccordionItem, AccordionItemTitle, AccordionItemBody } from 'react-accessible-accordion';
import 'react-accessible-accordion/dist/fancy-example.css';
import hobo_1 from '../img/hobo_1.svg';
import SearchInput, { createFilter } from 'react-search-input';

class Modules extends Component {
	state = {
		title: '',
		title2: '',
		title3: '',
		title4: '',
		completed: false,
		modules: [],
		isActive: false,
		text: '',
		visibleModules: {},
		activeModuleId: undefined,
		explanation: 'explanation',
		exercise: 'exercise',
		evaluation: 'evaluation',
		showTextEditorExplanation: true,
		showTextEditorExercise: false,
		showTextEditorEvaluation: false,
		isLoading: true,
		moduleActive: false,
		defaultChecked: '',
		selectedId: null,
		bgColor: 'dcd7dd',
		value: [],
		valueSearch: ''
	};

	handleChangeSearch = (event) => {
		const { valueSearch } = event.target;
		this.setState({ valueSearch });
	};

	onChange1 = (e, i) => {
		let value = this.state.value.slice();
		value[i] = e.target.checked;
		this.setState({ value });
	};

	unCheck1 = (i) => {
		let value = this.state.value.slice();
		value[i] = !value[i];
		this.setState({ value });
	};

	handleClick = (selectedId) => {
		this.setState({
			selectedId,
			bgColor: '#d6d1d1'
		});
	};

	handleChangeCheckBox = () => {
		const test = this.state.defaultChecked;
		this.setState({
			defaultChecked: !test
		});
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
	handleChangeTitle4 = (event) => {
		this.setState({
			title4: event.target.value
		});
	};

	handleSubmit = () => {
		createModule(
			this.state.title,
			this.state.title2,
			this.state.title3,
			this.state.title4,
			this.state.explanation,
			this.state.exercise,
			this.state.evaluation
		).then((newModule) => {
			this.setState({
				modules: [ ...this.state.modules, newModule ]
			});
			this.setState({
				isActive: !this.state.isActive
			});
			this.setState({
				title: '',
				title2: '',
				title3: '',
				title4: '',
				explanation: 'explanation',
				exercise: 'exercise',
				evaluation: 'evaluation'
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
			this.state.title4,
			this.state.explanation,
			this.state.exercise,
			this.state.evaluation,
			this.state.completed
		).then((updatedModules) => {
			let modules = [ ...this.state.modules ];
			const index = modules.findIndex((module) => module._id === moduleId);
			modules[index].title = updatedModules.title;
			modules[index].title2 = updatedModules.title2;
			modules[index].title3 = updatedModules.title3;
			modules[index].title4 = updatedModules.title4;
			modules[index].completed = updatedModules.completed;
			modules[index].explanation = updatedModules.explanation;
			modules[index].exercise = updatedModules.exercise;
			modules[index].evaluation = updatedModules.evaluation;
			this.setState({ modules });
			this.setState({
				isActive: !this.state.isActive
			});
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
		this.setState({
			visibleModules: {
				...this.state.visibleModules,
				[id]: this.state.visibleModules[id]
			}
		});
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

	render(module) {
		const { modules, isLoading, defaultChecked } = this.state;

		const editorOptions = {
			toolbar: [
				[ { header: '1' }, { header: '2' } ],
				[ 'bold', 'italic', 'underline', 'strike' ],
				[ { list: 'ordered' }, { list: 'bullet' } ],
				[ 'link', 'image', 'video' ],
				[ 'clean' ]
			]
		};

		if (isLoading) return <img className="hobo-logo" src={hobo_1} width="100" height="50" />;
		return (
			<div>
				<div className="navbar navbar-default navbar-fixed-top">
					{' '}
					<h2 className="navbar-title container">HOBO</h2>{' '}
				</div>
				<button className="new-add-module " onClick={this.toggleModal}>
					Add module
				</button>

				{modules.map((module) => {
					const isSuperActive = module._id === this.state.selectedId;
					const display = isSuperActive ? 'block' : 'none';
					let changeColor = isSuperActive ? 'red' : 'grey';
					return (
						<div className="container mt-5">
							<div key={module._id} />
							<span className="card card-body mb-5">
								<Accordion onClick={() => this.handleClick(module._id)}>
									<AccordionItem>
										<AccordionItemTitle style={{ backgroundColor: this.state.bgColor }}>
											<h3>{module.title}</h3>
											<i onClick={this.toggleModal} className="far fa-edit" />
											<i
												onClick={this.handleDelete.bind(this, module._id)}
												className="far fa-trash-alt"
											/>

											<input
												className="radio-btn"
												type="checkbox"
												onChange={this.handleChangeCheckBox}
												defaultChecked={false}
											/>
											<Modal
												isOpen={this.state.isActive}
												onRequestClose={this.toggleModal}
												contentLabel="content..."
												className="modal1"
												closeTimeoutMS={200}
											>
												{this.state.showTextEditorExplanation ? (
													<span>
														<input
															placeholder="Edit module title"
															type="text"
															value={this.state.title}
															onChange={(event) => this.handleChangeTitle(event)}
															className="input-addmodule"
														/>
														<input
															placeholder="Edit title explanation"
															type="text"
															value={this.state.title4}
															onChange={(event) => this.handleChangeTitle4(event)}
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
														exercise
														<input
															placeholder="Add exercise title"
															type="text"
															value={this.state.title2}
															onChange={(event) => this.handleChangeTitleExercise(event)}
															className="input-addmodule"
														/>
														<ReactQuill
															value={this.state.exercise}
															modules={editorOptions}
															onChange={this.handleTextChange.bind(this, 'exercise')}
														/>
													</span>
												) : null}

												{this.state.showTextEditorEvaluation ? (
													<span>
														evaluation
														<input
															placeholder="Add title evaluation"
															type="text"
															value={this.state.title3}
															onChange={(event) =>
																this.handleChangeTitleEvaluation(event)}
															className="input-addmodule"
														/>
														<ReactQuill
															value={this.state.evaluation}
															modules={editorOptions}
															onChange={this.handleTextChange.bind(this, 'evaluation')}
														/>
													</span>
												) : null}

												<button className="general-btn" onClick={this.showAndHideExplanation}>
													{' '}
													explanation
												</button>

												<button className="general-btn" onClick={this.showAndHideExercise}>
													{' '}
													exercise
												</button>

												<button className="general-btn" onClick={this.showAndHideEvaluation}>
													{' '}
													evaluation
												</button>

												<button
													className="btn-update"
													onClick={this.handleUpdate.bind(this, module._id)}
												>
													Update
												</button>
												<button className="btn-onadd" onClick={this.handleSubmit}>
													Add new module
												</button>
											</Modal>
										</AccordionItemTitle>

										<AccordionItemBody style={{ display }}>
											<Accordion>
												<AccordionItem>
													<AccordionItemTitle>
														<p className="list-group-item">{module.title4}</p>
													</AccordionItemTitle>
													<AccordionItemBody>
														<div
															className="list-group"
															dangerouslySetInnerHTML={{ __html: module.explanation }}
														/>

														<button className="general-btn">next</button>
													</AccordionItemBody>
													<AccordionItemBody />
												</AccordionItem>
											</Accordion>
											<Accordion>
												<AccordionItem>
													<AccordionItemTitle>
														<p className="list-group-item">{module.title2}</p>
													</AccordionItemTitle>
													<AccordionItemBody>
														<div
															className="list-group"
															dangerouslySetInnerHTML={{ __html: module.exercise }}
														/>

														<button className="general-btn">next</button>
													</AccordionItemBody>
												</AccordionItem>
											</Accordion>
											<Accordion>
												<AccordionItem>
													<AccordionItemTitle>
														<p className="list-group-item">{module.title3}</p>
													</AccordionItemTitle>
													<AccordionItemBody>
														<div
															className="list-group"
															dangerouslySetInnerHTML={{ __html: module.evaluation }}
														/>

														<div>
															<button className="general-btn">finish</button>
														</div>
													</AccordionItemBody>
												</AccordionItem>
											</Accordion>
										</AccordionItemBody>
									</AccordionItem>
								</Accordion>
							</span>
						</div>
					);
				})}

				<Modal
					isOpen={this.state.isActive}
					onRequestClose={this.toggleModal}
					contentLabel="content..."
					className="modal2"
					visible={this.state.modalVisible}
					closeTimeoutMS={200}
				>
					{this.state.showTextEditorExplanation ? (
						<span>
							<input
								placeholder="Add module-title"
								type="text"
								value={this.state.title}
								onChange={(event) => this.handleChangeTitle(event)}
								className="input-addmodule"
							/>
							<input
								placeholder="Add explanation-title"
								type="text"
								value={this.state.title4}
								onChange={(event) => this.handleChangeTitle4(event)}
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
							exercise
							<input
								placeholder="Add exercise title"
								type="text"
								value={this.state.title2}
								onChange={(event) => this.handleChangeTitleExercise(event)}
								className="input-addmodule"
							/>
							<ReactQuill
								value={this.state.exercise}
								modules={editorOptions}
								onChange={this.handleTextChange.bind(this, 'exercise')}
							/>
						</span>
					) : null}

					{this.state.showTextEditorEvaluation ? (
						<span>
							evaluation
							<input
								placeholder="Add evaluation title"
								type="text"
								value={this.state.title3}
								onChange={(event) => this.handleChangeTitleEvaluation(event)}
								className="input-addmodule"
							/>
							<ReactQuill
								value={this.state.evaluation}
								modules={editorOptions}
								onChange={this.handleTextChange.bind(this, 'evaluation')}
							/>
						</span>
					) : null}

					<button className="general-btn" onClick={this.showAndHideExplanation}>
						{' '}
						explanation
					</button>

					<button className="general-btn" onClick={this.showAndHideExercise}>
						{' '}
						exercise
					</button>

					<button className="general-btn" onClick={this.showAndHideEvaluation}>
						{' '}
						evaluation
					</button>

					<button className="btn-onadd" onClick={this.handleSubmit}>
						Add new module
					</button>
				</Modal>
			</div>
		);
	}
}

export default Modules;