import React from 'react';
//import { Row, Col, InputGroup, InputGroupAddon, Input, Button } from 'reactstrap';
import {Switch, Route, BrowserRouter as Router} from 'react-router-dom';
import routes from './routes.js';

class App extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    return(
      <div className="wrapper">
        <Router>
          <Switch>
            {routes.map((prop, key)=>{
              return (
                  <Route
                    path={prop.path}
                    render={props => <prop.component {...props}/>}
                    key={key}
                  />
                );
            })}
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
