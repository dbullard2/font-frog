import React, { Component } from 'react';
import './App.css';
import DropArea from './components/dropArea/DropArea';

class App extends Component{
  render(){
    return(
      <div className='App'>
        <div className="drop-container">
          <DropArea />
        </div>
      </div>
    )
  }
}

export default App;
