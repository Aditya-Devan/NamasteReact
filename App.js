import React from "react";
import ReactDOM from "react-dom/client";

 //functional react components
const Title=()=>(
    <h1 className="Heading" tabIndex={5} >
        Namaste React Using JSX
    </h1>
);

const HeadingComponent=()=>(
  <div id="container">
    {Title()}
    <Title />
    <Title></Title>
    <h1 className="heading">Namaste React Functional Component Working</h1>
  </div>
);

const root=ReactDOM.createRoot(document.getElementById("root"));

root.render(<HeadingComponent/>);


