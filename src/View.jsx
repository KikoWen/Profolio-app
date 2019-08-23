import React, {Component} from 'react';

class View extends Component{

    render(){

        // var className = this.props.className; //1
        var {className, children,viewName, activeView} = this.props; //shorthand for 1 and 2, called destructer
        // var children = this.props.children; //2

        // true ? whentrue : whennottrue;

    //    var newClassName =  (viewName === activeView) ? 'view active ' + className : 'view ' + className;

  
  // if active ? insert the view : dont insert the viewName

        // var html
        // if(viewName === activeView){
        //     html =(
        //         <div className={newClassName}>
        //         {children}  
        //     </div>
        //     )
        // }else{
        //     null
        // }
       var newClassName = 'view ' + className;

        return (viewName === activeView)? (
       
            <div className={newClassName}>
                {/* {this.props.children}   */}
                {children}  {/* Kiko, this is the shorthand from above */}
            </div>
        ) :null
    }
}


export default View;