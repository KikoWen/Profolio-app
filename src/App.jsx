import React, {Component} from 'react';
import View from './View.jsx';
import Project from './Project.jsx';
import './App.css';
import axios from 'axios';
import AddProjectForm from './AddProjectForm.jsx';
import EditProjectForm from './EditProjectForm.jsx';

// import { url } from 'inspector';

var urlPrefix ='http://localhost:4000/api'; //This can be replace by future localhost if prefer. if use different machine's database, it will be like this 'http://10.2.24.38:4000/api.  But at moment I am using the data from my same machine.


class App extends Component{

  constructor(props){
    super(props)
    this.state={

      activeView: 'projects',
      projects:[{
        id:1,
        name: 'Build a but',
        description: 'Nice project'

      },{
        id:2,
        name: 'Make a basket',
        description: 'Pretty project'

      }],
      types:[],
      currentType:null,
      projectToUpdate:null,

    };
  }

  //Kiko, this is to set which page to be viewed
  setActiveView = (view) =>{
    this.setState({activeView:view});
  }

  setProjectToUpdate =(id) =>{

    var foundProject = this.state.projects.find((project)=>{
      return project.id === id;
    });
    this.setState({projectToUpdate:foundProject});
  }

  //Type
  setCurrentType =(id) =>{

    var foundType = this.state.types.find((type)=>{
      return type.id == id;
    });

    // foundType ? setType : set null 
    foundType ? this.setState({currentType:foundType}): this.setState({currentType:null})
    ;
  }

//Kiko, this is to get the data, have to do componentDidMount() to call the data, otherwise, nothing will show. but this can be check in inspect, $r.getProjects().
  getProjects =()=>{
    axios.get (urlPrefix + '/projects')
    .then(res => {
      this.setState({projects:res.data});
    })
  }

  getTypes =()=>{
    axios.get (urlPrefix + '/types')
    .then(res => {
      this.setState({types:res.data});
    })
  }

  addProjects =(data)=>{
    axios.post(urlPrefix + '/projects',data)
    .then(res => {
      this.getProjects();// Kiko, this is after addProject then reflesh, and reload getProjects
    }) 
  }

  deleteProjects =(id)=>{
    axios.delete(urlPrefix + '/projects/'+ id)
    .then(res =>{
      this.getProjects();
    })

  }

  updateProjects =(id,data)=>{
    axios.put(urlPrefix + '/projects/' + id,data)
    .then(res =>{
      this.getProjects();
    })

  }

  //Kiko, this is to call the data
  componentDidMount(){
    this.getProjects();
    this.getTypes();
  }

  handleProjectTypeClick =(e) =>{
    var link = e.target;

    this.setCurrentType(link.dataset.type);
    this.setActiveView('projects');

  }
 
render(){

  var {currentType, projects}=this.state;

  if(currentType){
    projects = projects.filter(project => {
      return project.type_id == currentType.id
    })

  }
  return(
    <div className="app">
		
     <View className="color1" viewName='projects' activeView={this.state.activeView}>   {/* View here means layer */}

      <div className="header">
      <i className="fas fa-plus" onClick ={() => this.setActiveView('add-project')}></i>
        <i className="fas fa-bars" onClick ={() => this.setActiveView('nav')}></i></div>
      <div className="main">
        <h3>{currentType? currentType.name:'All Projects'}</h3>

        {
          projects.map((project)=>{
            var projectProps ={
              ...project,
              key: project.id,
              deleteProjects: this.deleteProjects,
              setActiveView:this.setActiveView,
              setProjectToUpdate:this.setProjectToUpdate
            }
            
            return  <Project{...projectProps}/>

          })
        }
       
      </div>
     </View>  

     <View className="color2" viewName='add-project' activeView={this.state.activeView}> 
     <div className="header">
       <i className="fas fa-times" onClick ={()=> this.setActiveView('projects')}></i></div>
			<div className="main">
				<h3>Add new project</h3>
        <AddProjectForm addProjects = {this.addProjects} setActiveView={this.setActiveView}/>
			</div>
     </View>   

     <View className="color3" viewName='edit-project' activeView={this.state.activeView}> 
     <div className="header">
       <i className="fas fa-times" onClick ={()=> this.setActiveView('projects')}></i></div>
			<div className="main">
				<h3>Edit a project</h3>
        <EditProjectForm {...this.state.projectToUpdate} updateProjects={this.updateProjects} setActiveView={this.setActiveView}/>
			</div>
     </View>   

     <View className="color4" viewName='nav' activeView={this.state.activeView} > 
     <div className="header"><i className="fas fa-times" onClick ={()=> this.setActiveView('projects')}></i></div>
      <div className="main">
        <ul className="menu">
          <li><a data-type = 'null' href="#" className="color1" onClick ={this.handleProjectTypeClick}>Projects</a></li>
          {
            this.state.types.map(type =>{
              return (
              <li><a data-type = {type.id} href="#" className="color1" onClick ={this.handleProjectTypeClick}>{type.name}</a></li>
              )
            })
          }
          <li><a href="#" className="color2" onClick ={()=> this.setActiveView('add-project')}>Add new project</a></li>
        </ul>
      </div>

     </View> 

     

   </div>
  )
}

}

export default App;
