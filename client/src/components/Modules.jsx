import React, { Component } from "react";
import {
  getModules,
  createModule,
  deleteModule,
  updateModule
} from "../api/modules";
import "../css/Modules.css";
import Modal from "react-modal";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
class Modules extends Component {
  state = {
    title: "",
    modules: [],
    loading: false,
    edit: false,
    newTitle: "",
    active: null
  };

  componentDidMount = () => {
    this.setState({ loading: true });
    getModules().then(modules => {
      this.setState({ modules: modules, loading: false });
    });
  };

  handleTitle = event => {
    this.setState({
      title: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.setState({ loading: true });
    createModule(this.state.title).then(newModule => {
      this.setState({
        modules: [...this.state.modules, newModule],
        title: "",
        loading: false
      });
    });
  };

  handleDelete = id => {
    deleteModule(id);
    const filteredModules = this.state.modules.filter(
      module => module._id !== id
    );
    this.setState({ modules: filteredModules });
  };

  handleTitleEdit = id => {
    this.setState({ active: id, edit: !this.state.edit });
  };

  handleUpdate = id => {
    updateModule(id, this.state.newTitle).then(updatedModules => {
      const modules = [...this.state.modules];
      const index = modules.findIndex(x => x._id === id);
      modules[index].title = updatedModules.title;
      this.setState({
        modules,
        edit: false
      });
    });
  };

  handleTextChange = event => {
    this.setState({ newTitle: event.target.value });
  };

  render() {
    const { modules, text } = this.state;
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
              
            <button className="btn-onadd" onClick={this.handleSubmit}>Add new module +</button>

            </Modal>

            {modules.map(module => <p className="section-modules" key={module._id}>
            {module.title} 
            <button className="btn-update" onClick={this.handleUpdate.bind(this, module._id)}>Update</button>
            <button className="btn-delete" onClick={this.handleDelete.bind(this, module._id)}>delete</button></p>)}  
            
        </div>

     )
     }
}
export default Modules;


// newModalOption: this.state.modules
