handleUpdate = (moduleId) => {
    updateModule(moduleId, this.state.title).then(updatedModules => {
      const modules = [...this.state.modules];
      const index = modules.findIndex(module => module._id === moduleId);
      modules[index].title = updatedModules.title;
      this.setState({ modules});
        });     
  }