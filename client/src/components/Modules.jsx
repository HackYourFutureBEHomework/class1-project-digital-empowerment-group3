import React, { Component} from 'react';
import { getModules, createModule, deleteModule, updateModule } from '../api/modules';
import "../css/Modules.css";
import Modal from "react-modal";
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css';
class Modules extends Component {
  state = {
  title:"",
  modules: [],
  newEditedTitle: "",
  isActive:false,
  text:"",
  visibleModules: {},
  explanation:"",
  exercise:"",
  evaluation:"",
  showTextEditorExplanation: true,
  showTextEditorExercice:false,
  showTextEditorEvaluation:false
};
 componentDidMount = () => {
    getModules()
    .then((modules) => {
        this.setState({modules: modules});
     });
  }
  handleChange = (event) => {
        this.setState({title: event.target.value});
  }
  handleSubmit = (event) => {
      createModule(this.state.title, this.state.explanation)
      .then(newModule => {
        this.setState({
          modules: [...this.state.modules, newModule]      
        });
      });
  }
  handleDelete = (id) => {
      const filteredModules = this.state.modules.filter(module => module._id !== id);
      deleteModule(id);
        this.setState({modules: filteredModules})
  }
  handleUpdate = (idTitle) => {
        updateModule(idTitle).then((updateModule) => {
        this.setState({
              title: updateModule.title
           });
        }); 
  }
  toggleModal = () => {
        this.setState({isActive:!this.state.isActive});
  }

    handleTextChange = (value) => {
        this.setState({
        explanation:value,
        exercise:value,
        evaluation:value});
  }
    toggleModule = (id) => {
         this.setState(prevState => ({visibleModules: {...prevState.visibleModules, [id]: !prevState.visibleModules[id]}}));
    }
    showAndHideDescription = () => {
        this.setState({
          showTextEditorExplanation: !this.state.showTextEditorExplanation,
          showTextEditorExercice:!this.state.showTextEditorExercice,
          showTextEditorEvaluation:!this.state.showTextEditorEvaluation
    });
  }
    
  render() {
    const { modules } = this.state;
     return(
        <div>
          <button className="btn-toggle" onClick={this.toggleModal}>add new module +++</button>
          <Modal isOpen={this.state.isActive} onRequestClose={this.toggleModal} contentLabel="content...">
            <input 
              placeholder="Add title"
              type="text" 
              value={this.state.title}
              onChange={this.handleChange}
              className="input-addmodule"/>
         
            <ReactQuill value={this.state.explanation}
              onChange={this.handleTextChange}/>
              <a href="#" onClick={this.state.explanation}>exercise</a> <a href="#">explanation</a>  <a href="#">evaluation</a>
            <button 
              className="btn-onadd" 
              onClick={this.handleSubmit}>Add new module +
            </button>
          </Modal>
        
          {modules.map(module => 
            <div onClick={this.toggleModule.bind(this, module._id)} 
              key={module._id} className={`${!this.state.visibleModules[module._id]  ? "section-modules" : "section-big-modules"}`}>
                <p>{module.title} {module.explanation} {module.exercice} {module.evaluation}
              <Modal isOpen={this.state.isActive} onRequestClose={this.toggleModal} contentLabel="content...">
            <input 
              placeholder="Add title"
              type="text" 
              value={this.state.title}
              onChange={this.handleChange}
              className="input-addmodule"/>
         
            <ReactQuill value={this.state.explanation}
              onChange={this.handleTextChange}/>
              <a href="#" onClick={this.state.explanation}>exercise</a> <a href="#">explanation</a>  <a href="#">evaluation</a>
             <button className="btn-update" onClick={this.handleUpdate.bind(this, module._id)}>Update</button>
          </Modal>
              <button className="btn-delete" onClick={this.handleDelete.bind(this, module._id)}>delete</button></p>
              <button className="btn-toggle" onClick={this.toggleModal}>update</button>
            </div>)}                       
        </div>
     )
     }
}
export default Modules;
