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

//  <form onSubmit={this.handleAddModule}>
//               <input type="text" name="option" placeholder="enter your new module"/>
//               <button>Add Module</button>
//   </form>  

//  if(modules.length >= 0){
  //     return(
  //       <div>
  //        <form onSubmit={this.handleAddModule}>
  //         <input type="text" name="option" />
  //         <button>Add Module</button>
  //       </form>
  //          <p>{this.state.title}</p>
  //         {modules.map((module) => <div key={module._id}>{module.title}</div>)} 
  //       </div>
  //     )
  //   } else {
  //     return (
  //       <p>There are no modules yet</p>
  //     )
  //   }
    
  // }



 

 

  // handleAddModule = (e) => {
  //    e.preventDefault();
  //    let title = e.target.elements.option.value
  //     createModule(this.state.modules).then(module => {
  //     this.setState({
  //       modules: this.state.modules,
  //       title: title
  //     });
  //   });


  //  handleAddModule = event => {
//   event.preventDefault();
//       let module = event.target.elements.option.value.trim();
//         console.log(module)
//       this.setState({
//       modules: module,    
//       }); 
//   if (module) {
//       event.target.elements.option.value = "";
//     }   
//   }