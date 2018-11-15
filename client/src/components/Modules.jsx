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
  text:""
};

 componentDidMount = () => {
    getModules()
    .then((modules) => {
        this.setState({modules: modules});
     });
  }

  handleChange = (event) =>{
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

  handleUpdate = (idTitle) => {
        updateModule(idTitle).then((updateModule) =>{
          this.setState({
            title: updateModule.title,
            newEditedTitle: updateModule.title
           });
        }); 
  }

  toggleModal = () => {
        this.setState({
          isActive:!this.state.isActive
        })
  }

    handleTextChange = (value) => {
    this.setState({ text: value })
  }

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

     