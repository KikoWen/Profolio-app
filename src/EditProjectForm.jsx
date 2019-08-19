import React, {Component} from 'react';

class EditProjectForm extends Component{

    handleFormSubmit = (e) =>{
        e.preventDefault();

        
        var formData = new FormData(this.form);

        var data ={
            name: formData.get('name-input'),
            description:formData.get('description-input')
        }

        var {updateProjects, id, setActiveView}= this.props;
        updateProjects(id,data);
        setActiveView('projects');
    }

    render(){
        var {name, description} =this.props
        return(
            <form  onSubmit = {this.handleFormSubmit} 
            ref={(el)=> {this.form = el} }> {/* el means element */}
                <div className="form-group">
                <label htmlFor="name-input">Name</label>
                <input type="text" className="form-control" name="name-input" id="name-input" defaultValue ={name}/> 
                </div>
                <div className="form-group">
                <label htmlFor="name-input">Description</label>
                <input type="text" className="form-control" name="description-input" id="description-input" defaultValue ={description}/>
                </div>

                <div className="form-group">
                <label htmlFor="name-input">Photo</label>
                <input type="text" className="form-control" name="photo-input" id="photo-input" value="project.jpg"/>
                </div>

                <div className="form-group">
                <label htmlFor="type-input">Type</label>
                <select className="form-control" name="type-input" id="type-input">
                    <option value="1">Painting</option>
                    <option value="2">Sculpture</option>
                    <option value="3">Digital</option>
                </select>
                </div>

                <button type="submit" className="btn btn-primary">Update</button>
            </form>
        )
    }
}

export default EditProjectForm;

