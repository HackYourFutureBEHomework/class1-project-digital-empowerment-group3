import React, { Component } 
from 'react';

import { getModules, createModule, deleteModule, updateModule } 
from '../api/modules';
import Module 
from './Module'
import { Button, Modal } 
from 'react-bootstrap'
import ReactQuill 
from 'react-quill';
import 'react-quill/dist/quill.snow.css';

class Modules extends Component {
  state = {
    title: '',
    modules: [],
    show: false,
    explanation: '',
    exercise: '',
    evaluation: '',
    content: '',
    flag: 1
  }
  componentDidMount() {
    this.setState({ loading: true });
    getModules().then((modules) => {
      this.setState({ modules: modules,  loading: false  });
    });
  }
  addModule = e => {
    e.preventDefault();
    this.setState({ loading: true });
    createModule(this.state.title,this.state.explanation,this.state.exercise,this.state.evaluation).then(newModule => {
      this.setState({
        modules: this.state.modules.concat(newModule),
        title: "",
        loading: false
      });
    });
    console.log(this.state.modules)
  };

  handleDelete = (id)=>{
    deleteModule(id)
    this.setState({
      modules:this.state.modules.filter( module=>module._id!== id )
    });
  };
  handlingChange = e => {
    this.setState({
     title: e.target.value
   });
 };
  HandleDialoge=() =>{
    this.setState({ show: !this.state.show });
  };
  handleTextChange=(e)=> {
    switch(this.state.flag){
      case 1:
        this.setState({ explanation: e, content: e })
        break;
      case 2:
        this.setState({ exercise: e, content: e })
        break;
      case 3:
        this.setState({ evaluation: e, content: e })
        break;

    }
    console.log(this.state.content);
  };
  handelContent = (e) => {
    console.log(this.state.flag)
      if (e.target.innerHTML === 'Explanation') {
        this.setState({
          content:this.state.explanation,
          flag: 1
        });
      }
      if (e.target.innerHTML === 'Exercise') {
        this.setState({
          content:this.state.exercise,
          flag: 2
        });
      }
      if (e.target.innerHTML === 'Evaluation') {
        this.setState({
          content:this.state.evaluation,
          flag: 3
        });
      };
  };
  handeleSave = (module) => {
    const {explanation,exercise,evaluation}=this.state
    console.log(this.state.explanation)
    updateModule(module,explanation,exercise,evaluation).then((updatedModule) => {
      this.setState((previousState) => {
        const modules = [...previousState.modules];
        const index = modules.findIndex(mod => mod._id === module._id);
        modules[index] = updatedModule;
        console.log(modules)
        return { modules };

      })
    });
  };
  render() {
    const editorOptions = {
      toolbar:
      [
        [{ header: "1" }, { header: "2" }],
        ["bold", "italic", "underline", "strike"],
        [{ list: "ordered" }, { list: "bullet" }],
        ["link", "image", "video"],
        ["clean"]
      ]
    };
    const { modules } = this.state;
    if (this.state.loading) {
      return <div id="loader-wrapper"><div id="loader"></div></div>;
    } else {
    return (
      <div>
        <h2 >  Title of the active path </h2>
        <fieldset className=''>
          <legend className='' >modules :</legend>
          <div className='container2'>
            <div className="modal-container">
              <Button
                bsStyle="primary"
                bsSize="large"
                onClick={this.HandleDialoge}
              >
                Add module
                  </Button>
              <Modal
                show={this.state.show}
                onHide={this.HandleDialoge}
                aria-labelledby="contained-modal-title"
              >
                <Modal.Header closeButton>
                  <Modal.Title id="contained-modal-title">
                    Add New Module
                          </Modal.Title>
                </Modal.Header>
                <form onSubmit={this.addModule}>
                  <h3>Title:</h3>
                  <input
                    type='text'
                    placeholder='Enter The title'
                    onChange={this.handlingChange}
                    value={this.title}>
                  </input>
                  <Modal.Body>
                    <h3> Contents for the evaluation</h3>
                    <ReactQuill
                      modules={editorOptions}
                      placeholder="Contents"
                      onChange={this.handleTextChange}
                      value={this.state.content}
                    />
                    <div className='content for evaluation'>
                      <button id='saveExplanation' type='button' onClick={this.handelContent}>Explanation</button>
                      <button id='saveExercise' type='button' onClick={this.handelContent}>Exercise</button>
                      <button id='saveEvaluation' type='button' onClick={this.handelContent}>Evaluation</button>
                    </div>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button bsStyle="primary" onClick={this.addModule}>Add module</Button>
                    <Button onClick={this.HandleDialoge}>Close</Button>
                  </Modal.Footer>
                </form>
              </Modal>
            </div>
          </div>
          {modules.length > 0 ? (
            <ul>
              {modules.map(module => {
                return (
                  <Module
                    key={module._id}
                    module={module}
                    onSelect={this.handleSelect}
                    selectedModule={this.state.selectedModule}
                    onDelete={this.handleDelete}
                    onChange={this.handlechange}
                    onSave={this.handeleSave}
                    onCancel={this.handleCancel}
                    editorOptions={this.editorOptions}
                    handleTextChange={this.handleTextChange}
                    handelContent={this.handelContent}
                    content={this.state.content}
                  />)
              })}
            </ul>
          ) : (
              <p>There are no modules yet</p>
            )}
        </fieldset>
      </div>
    )
          }
  }
}
export default Modules;
