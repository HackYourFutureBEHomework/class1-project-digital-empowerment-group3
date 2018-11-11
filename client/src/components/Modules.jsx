import React, { Component} from 'react';
import { getModules } from '../api/modules';
import { createModule } from '../api/modules';
class Modules extends Component {
  state = {
  title:"",
  modules: []
};

 componentDidMount = () => {
    getModules()
    .then((modules) => {
        this.setState({modules: modules});
     });
  }

  handleChange = (e) =>{
    this.setState({title: e.target.value});
  }
  handleSubmit = () => {
      createModule(this.state.title)
      .then(newTitle => {
         this.setState({
          title: [...this.state.title, newTitle],
        });
      })
  }
  
  render() {
     return(
        <div>
        <input type="text" 
            value={this.state.title}
            onChange={this.handleChange}/>
            <button onClick={this.handleSubmit}>add todo</button>
        </div>
     )
     }
}
export default Modules;

