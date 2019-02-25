import React, { Component } from 'react';
import {BrowserRouter, Route, Link} from 'react-router-dom'
import Form from './components/Form'
import Report from './components/Report'

const uuidv4 = require('uuid/v4');

class App extends Component {
  state = {
    favColors: [],
    
  }

  addFavColor = (color) => {
    color.id = uuidv4();
    const copyColors = [...this.state.favColors, color]
    
    this.setState({
      favColors: copyColors
    })
  }

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Link to='/'> Form </Link>
          {this.state.favColors.length > 0 ? <Link to='/report'> Report </Link> : " Report "}
          

          <Route exact path='/' render={(props) => <Form {...props} addFavColor={this.addFavColor}/>} />
          <Route path='/report' render={(props) => <Report {...props} favColors={this.state.favColors}/>} />
        </div>
      </BrowserRouter>
      
    );
  }
}

export default App;
