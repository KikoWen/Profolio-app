import React, {Component} from 'react';

class AddProjectForm extends Component{
    constructor(props){
        super(props);

        // this.state={
        //     nameInputValue:''
        // } //this is normal way for only a few input, but if the input will be twenty or more this won't be efficiency.
    }

    handleFormSubmit = (e) =>{
        e.preventDefault();
        var formData = new FormData(this.form);

        var data ={
            name: formData.get('name-input'),
            description:formData.get('description-input'),
            type_id:formData.get('type-input')
        }

        this.props.addProjects(data);
        this.props.setActiveView('projects');

    }

    render(){
        return(
            <form  onSubmit = {this.handleFormSubmit} 
                    ref={(el)=> {this.form = el} }> {/* el means element */}
                <div className="form-group">
                <label htmlFor="name-input">Name</label>
                <input type="text" className="form-control" name="name-input" id="name-input" placeholder="Enter project name"/>
                </div>
                <div className="form-group">
                <label htmlFor="name-input">Description</label>
                <input type="text" className="form-control" name="description-input" id="description-input" placeholder="Enter project description"/>
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
    
                <button type="submit" className="btn btn-primary">Add</button>
          </form>

        )
    }
}

export default AddProjectForm;