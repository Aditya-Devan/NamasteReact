import React from 'react';
import UserFxnl from "./userFxnl"
import UserClass from './userClass';

const About = () => {
  return (
    
    <div>
         
        <UserFxnl  Name="Akshay"
               location="Mumbai"
        />
        <UserClass  Name="Akshay from class"
               location="Mumbai from class"/>
    </div>
      
  );
};

export default About;
