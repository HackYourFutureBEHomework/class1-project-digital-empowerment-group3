import React, { Component } from 'react';
import { Button, Modal } from 'react-bootstrap'
import classNames from 'classnames';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const SETP_EXPLANATION ='explanation';
const SETP_EXERCISE ='exercise';
const SETP_EVALUATION ='evaluation';
class Module extends Component{
    constructor(props){
        super(props)
        this.state={
            show:false,
            selectedModule:null,
            title:props.module.tilte,
            showMoreInfo:false,
            activeStep: SETP_EXPLANATION,
        }
    } 
    handleDialoge=(module)=>{
        this.handleSelect(this.props.module)
        this.setState({show:!this.state.show})
    }
    handlechange = (e) =>{
        console.log(this.state.selectedModule)
        let selectedModule = this.state.selectedModule;        
        selectedModule[e.target.name]= e.target.value;
        this.setState({ selectedModule: selectedModule});
    };
    handleSelect = (module) =>{
        console.log(this.props.module)
        console.log(this.state.selectedModule)
        this.setState({ selectedModule: module})
    }
    handleSave=()=>{
        this.props.onSave({...this.props.module})
        this.setState({show:false})
    }
    // handleTextChange= e => {
    // this.setState({explanation:e})
    // console.log(this.state.explanation);
    // };
    openModule = (event) => {
        const previuosState=this.state.showMoreInfo
        this.setState({
            showMoreInfo: true
        })
    }
//
    _renderStep = (title, className, body, expended) => {console.log(body)
        const stepBodyClass = classNames('module__step-body', className, { expended })
        return (
            <div  className="module__step">
                <h3>{title}</h3>
                <div className={stepBodyClass}>
                <div dangerouslySetInnerHTML={{__html: body }}/> 
                 
                <button onClick={this.onNextStep}>Next Step</button>
                </div>
            </div>
        );
    };

    onNextStep = () => {
        const {activeStep } = this.state;
        if (activeStep === SETP_EXPLANATION)  {
            this.setState({ activeStep: SETP_EXERCISE})
        }else if (activeStep === SETP_EXERCISE)  {
            this.setState({ activeStep: SETP_EVALUATION})
        } else if (activeStep === SETP_EVALUATION) {
            this.onNextModule();
        }
    };

    onNextModule = () => {
        const { modules, activeModuleId } = this.state;
        const moduleIndex = modules.findIndex(module => module._id === activeModuleId);
        const nextModule = modules[moduleIndex + 1];
        let newModuleId;
        if (nextModule) {
            newModuleId = nextModule._id;
        }
        this.setState({activeModuleId: newModuleId , activeStep:SETP_EXPLANATION});
    };
//
    render() {
        const module = (<div className="titleEditDelete">
            <div className="title"> {this.props.module.title} </div>
            <nav className="edit">
                <Button className="glyphicon glyphicon-edit"
                    onClick={this.handleDialoge}>
                </Button>
                <Modal
                    show={this.state.show}
                    onHide={this.handleDialoge}
                    aria-labelledby="contained-modal-title"
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title">
                            Update module
                        </Modal.Title>
                        <h3>Title:</h3>
                        <input type={'text'}
                            name='title'
                            value={this.props.module.title}
                            placeholder='title'
                            onChange={this.handlechange}
                        />
                    </Modal.Header>
                    <h3>Contents for the explanation step:</h3>
                    <Modal.Body>
                        <ReactQuill
                            modules={this.props.editorOptions}
                            placeholder="Contents"
                            onChange={this.props.handleTextChange}
                            value={this.props.content}
                        />
                        <div className='content for evaluation'>
                            <button id='saveExplanation' type='button' onClick={this.props.handelContent}>Explanation</button>
                            <button id='saveExercise' type='button' onClick={this.props.handelContent}>Exercise</button>
                            <button id='saveEvaluation' type='button' onClick={this.props.handelContent}>Evaluation</button>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.handleSave}> Update module </Button>
                        <Button onClick={this.handleDialoge}>Close</Button>
                    </Modal.Footer>
                </Modal>
                <Button
                    className='glyphicon glyphicon-trash'
                    onClick={() => {
                        if (window.confirm(`Are you sure you want to delete? `))
                            this.props.onDelete(this.props.module._id);
                    }}>
                </Button>
            </nav>
        </div>)
        return (
            <li className='module' onClick={this.openModule}>
                {(this.state.showMoreInfo) ?
                    <div>
                        {module}
                        {/* <div>
                            <div>Explanation: <div className="module__contents__stage"   dangerouslySetInnerHTML={{ __html: this.props.module.explanation }} /></div>
                            <div>Exercise: <div className="module__contents__stage" dangerouslySetInnerHTML={{ __html: this.props.module.exercise }} /></div>
                            <div>Evaluation: <div className="module__contents__stage" dangerouslySetInnerHTML={{ __html: this.props.module.evaluation }} /></div>
                        </div> */}
                       
                        <div className="module__body">
                            {this._renderStep('Explanation', 'module__explanation', this.props.module.explanation , this.state === SETP_EXPLANATION)}
                            {this._renderStep('Exercise', 'module__exercise', this.props.module.exercise,  this.state === SETP_EXERCISE)}
                            {this._renderStep('Evaluation', 'module__evaluation', this.props.module.evaluation,  this.state === SETP_EVALUATION)}
                        </div>
                    </div>
                    : module
                }
            </li>
        )
    }
}
export default Module
