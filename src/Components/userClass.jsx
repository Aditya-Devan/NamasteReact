import React from "react";

class UserClass extends React.Component{
      constructor(props){
        super(props);
        this.state={
            count:0,
        }
      }
    render(){
        return(
     <div>
      <h1>Count:{this.state.count}</h1>
      <button onClick={()=>{
         this.setState({
            count:this.state.count+1,
         })
      }} >Increase Count</button>
      <h2>Name:{this.props.Name}</h2>
      <h3>Location:{this.props.location}</h3>

     </div>
        )
    
    }
}

export default UserClass;