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
  visibleModules: {}
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
      createModule(this.state.title)
      .then(newModule => {
        this.setState({
          modules: [...this.state.modules, newModule],       
        });
      });
  }

  handleDelete = (id) => {
      const filteredModules = this.state.modules.filter(module => module._id !== id);
      deleteModule(id);
        this.setState({modules: filteredModules})
  }

  handleUpdate = (id) => {
    updateModule(id, this.state.newTitle).then(editedModules => {
      const modules = [...this.state.modules];
      const index = modules.findIndex((t) => t._id === id)
      modules[index].title = editedModules.title
      this.setState({
        modules,
        edit: false
        });
    });
  };

  toggleModal = () => {
        this.setState({isActive:!this.state.isActive})
  }

    handleTextChange = (value) => {
        this.setState({ text: value });
  }

    toggleModule = (id) => {
         this.setState(prevState => ({visibleModules: {...prevState.visibleModules, [id]: !prevState.visibleModules[id]}}));
    }

  render() {
    const { modules } = this.state;
     return(
        <div>  
          <button className="btn-toggle" onClick={this.toggleModal}>add new module +++</button>
          <Modal isOpen={this.state.isActive} onRequestClose={this.toggleModal} contentLabel="I dont know whylol">
            <input 
              placeholder="Add title"
              type="text" 
              value={this.state.title}
              onChange={this.handleChange}
              className="input-addmodule"/>

            <ReactQuill value={this.state.text}
              onChange={this.handleTextChange}/>

            <button 
              className="btn-onadd" 
              onClick={this.handleSubmit}>Add new module +
            </button>
          </Modal>

          {modules.map(module => 
            <div onClick={this.toggleModule.bind(this, module._id)} 
              key={module._id} className={`${!this.state.visibleModules[module._id] ? "section-modules" : "section-big-modules"}`}>
                <p>{module.title}
              <button className="btn-delete" onClick={this.handleDelete.bind(this, module._id)}>delete</button></p>
              <button className="btn-update"
                      onClick={() => this.handleUpdate(module._id)}>
                      Update
                    </button>
            </div>)}                       
        </div>
     )
     }
}

export default Modules;
