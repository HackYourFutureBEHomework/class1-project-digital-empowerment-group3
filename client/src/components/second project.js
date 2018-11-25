import React, { Component } from 'react';
import { getModules, createModule, deleteModule, updateModule } from '../api/modules';
import '../css/Modules.css';
import Modal from 'react-modal';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Accordion, AccordionItem, AccordionItemTitle, AccordionItemBody } from 'react-accessible-accordion';
import 'react-accessible-accordion/dist/fancy-example.css';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

const reorder = (list, startIndex, endIndex) => {
	const result = Array.from(list);
	const [ removed ] = result.splice(startIndex, 1);
	result.splice(endIndex, 0, removed);

	return result;
};

class Modules extends Component {
	state = {
		title: '',
		title2: '',
		title3: '',
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
		moduleActive: false
	};

	componentDidMount = () => {
		getModules().then((modules) => {
			this.setState({ modules: modules, activeModuleId: modules.activeModuleId, isLoading: false });
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
			this.setState({
				isActive: !this.state.isActive
			});
			this.setState({
				title: ''
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
		this.setState({
			isActive: !this.state.isActive
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

	toggleModule = (_id) => {
		this.setState((prevState) => ({
			visibleModules: { ...prevState.visibleModules, [_id]: !prevState.visibleModules[_id] }
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

	onDragEnd = (result) => {
		if (!result.destination) {
			return;
		}
		const modules = reorder(this.state.modules, result.source.index, result.destination.index);
		this.setState({
			modules
		});
	};

	render(module) {
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
				<i className="fas fa-plus-circle" onClick={this.toggleModal}>
					<p className="newletter">add module</p>
				</i>
				<Modal
					isOpen={this.state.isActive}
					onRequestClose={this.toggleModal}
					contentLabel="content..."
					className="modal1"
					visible={this.state.modalVisible}
				>
					{this.state.showTextEditorExplanation ? (
						<span>
							<input
								placeholder="Add title"
								type="text"
								value={this.state.title}
								onChange={this.handleChangeTitle}
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

					<button
						type="button"
						className="btn-onadd"
						onClick={this.handleSubmit}
						disabled={!this.state.title}
					>
						Add new module
					</button>
				</Modal>
				<DragDropContext onDragEnd={this.onDragEnd}>
					<Droppable droppableId="droppable">
						{(provided) => (
							<div ref={provided.innerRef}>
								{modules.map((module, index) => (
									<Draggable
										key={module._id}
										draggableId={module._id}
										index={index}
										className={this.state.active === module._id ? 'active' : null}
									>
										{(provided) => (
											<div
												ref={provided.innerRef}
												{...provided.draggableProps}
												{...provided.dragHandleProps}
											>
												<div
													className="container"
													onClick={this.toggleModule.bind(this, module._id)}
													key={module._id}
												>
													<span className="card card-body mb-5">
														<Accordion>
															<AccordionItem>
																<AccordionItemTitle>
																	<h3>{module.title}</h3>
																	<i
																		onClick={this.toggleModal}
																		className="far fa-edit"
																	/>
																	<i
																		onClick={this.handleDelete.bind(
																			this,
																			module._id
																		)}
																		className="far fa-trash-alt"
																	/>
																	<input
																		className="radio-btn"
																		type="checkbox"
																		name="vehicle2"
																		value="Car"
																	/>
																</AccordionItemTitle>

																<AccordionItemBody>
																	<Accordion>
																		<AccordionItem>
																			<AccordionItemTitle>
																				<p className="list-group-item">
																					{module.title2}
																				</p>
																			</AccordionItemTitle>
																			<AccordionItemBody>
																				<div
																					className="list-group"
																					dangerouslySetInnerHTML={{
																						__html: module.explanation
																					}}
																				/>
																			</AccordionItemBody>
																			<AccordionItemBody />
																		</AccordionItem>
																	</Accordion>
																	<Accordion>
																		<AccordionItem>
																			<AccordionItemTitle>
																				<p className="list-group-item">
																					{module.title3}
																				</p>
																			</AccordionItemTitle>
																			<AccordionItemBody>
																				<div
																					className="list-group"
																					dangerouslySetInnerHTML={{
																						__html: module.exercise
																					}}
																				/>
																			</AccordionItemBody>
																		</AccordionItem>
																	</Accordion>
																	<Accordion>
																		<AccordionItem>
																			<AccordionItemTitle>
																				<p className="list-group-item">
																					{module.title3}
																				</p>
																			</AccordionItemTitle>
																			<AccordionItemBody>
																				<div
																					className="list-group"
																					dangerouslySetInnerHTML={{
																						__html: module.evaluation
																					}}
																				/>
																			</AccordionItemBody>
																		</AccordionItem>
																	</Accordion>
																</AccordionItemBody>
															</AccordionItem>
														</Accordion>
													</span>

													<Modal
														isOpen={this.state.isActive}
														onRequestClose={this.toggleModal}
														contentLabel="content..."
														className="modal2"
													>
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
																	onChange={this.handleTextChange.bind(
																		this,
																		'explanation'
																	)}
																/>
															</span>
														) : null}

														{this.state.showTextEditorExercise ? (
															<span>
																<input
																	placeholder="Add title"
																	type="text"
																	value={this.state.title2}
																	onChange={(event) =>
																		this.handleChangeTitleExercise(event)}
																	className="input-addmodule"
																/>
																exercise
																<ReactQuill
																	value={this.state.exercise}
																	modules={editorOptions}
																	onChange={this.handleTextChange.bind(
																		this,
																		'exercise'
																	)}
																/>
															</span>
														) : null}

														{this.state.showTextEditorEvaluation ? (
															<span>
																<input
																	placeholder="Add title"
																	type="text"
																	value={this.state.title3}
																	onChange={(event) =>
																		this.handleChangeTitleEvaluation(event)}
																	className="input-addmodule"
																/>
																evaluation
																<ReactQuill
																	value={this.state.evaluation}
																	modules={editorOptions}
																	onChange={this.handleTextChange.bind(
																		this,
																		'evaluation'
																	)}
																/>
															</span>
														) : null}

														<button onClick={this.showAndHideExplanation}>
															{' '}
															explanation
														</button>

														<button onClick={this.showAndHideExercise}> exercise</button>

														<button onClick={this.showAndHideEvaluation}>
															{' '}
															evaluation
														</button>

														<button
															className="btn-update"
															onClick={this.handleUpdate.bind(this, module._id)}
														>
															Update
														</button>
														<button
															className="btn-onadd"
															onClick={this.handleSubmit}
															disabled={!this.state.title}
														>
															Add new module
														</button>
													</Modal>
												</div>
											</div>
										)}
									</Draggable>
								))}
								{provided.placeholder}
							</div>
						)}
					</Droppable>
				</DragDropContext>
			</div>
		);
	}
}

export default Modules;
