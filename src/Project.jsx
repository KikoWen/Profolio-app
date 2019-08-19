import React, {Component} from 'react';

class Project extends Component{
    
    handleTrashClick =()=>{
        var {id, deleteProjects} =this.props;
        deleteProjects(id);
    }

    handleEditClick = ()=>{
        var {setActiveView,id, setProjectToUpdate} =this.props;
        setProjectToUpdate(id);
        setActiveView('edit-project');

    }
   
    render(){

        var{name, description } =this.props
        return(
            <div className="card project">
                <img className="card-img-top" src="project.jpg" alt="Card image cap" />
                <div className="card-body">
                <h5 className="card-title">{name}</h5>
                <p className="card-text">{description}</p>
                <p>
                    <i className="fas fa-heart"></i>
                    <i className="fas fa-edit" onClick={this.handleEditClick}></i>
                    <i className="fas fa-trash" onClick = {this.handleTrashClick}></i>
                </p>
                
                </div>
          </div>

        )
    }
}

export default Project;