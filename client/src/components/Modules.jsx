import React, { Component} from 'react';
import { getModules, createModule, deleteModule, updateModule } from '../api/modules';
import "../css/Modules.css"
class Modules extends Component {
  state = {
  title:"",
  modules: [],
  // editModule:[]
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
          modules: [...this.state.modules, newModule]
        });
      });
  }

  handleDelete = (id) => {
      const filteredModules = this.state.modules.filter(module => module._id !== id);
      deleteModule(id);
        this.setState({modules: filteredModules})
  }

  handleUpdate = () => {
        updateModule(this.state.title, this.state.modules)
           this.setState({
             title: this.state.title,
             modules: this.state.modules //GUYS I NEED SOME HELP HERE, I MANAGED TO DO THE PATCH
           }); 
  }
  
  render() {
    const { modules } = this.state;
     return(
        <div>
        <input 
            type="text" 
            value={this.state.title}
            onChange={this.handleChange}
            className="input-addmodule"
            />
          <button className="btn-onadd" onClick={this.handleSubmit}>Add new module +</button>
            {modules.map(module => <p className="section-modules" key={module._id}>
            {module.title}
            <button className="btn-update" onClick={this.handleUpdate.bind(this, module._id)}>Update</button>
            <button className="btn-delete" onClick={this.handleDelete.bind(this, module._id)}>delete</button></p>)}
        </div>
     )
     }
}
export default Modules;
