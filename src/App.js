import React from 'react';
import Header from './Components/Header'
import PageBackround from './Components/PageBackground'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import routes from './routes';


import './App.css';

function App(props) {
  console.log(props)
  return (
    <div className="App">
      <PageBackround>
      <Header/>
      {routes}
      </PageBackround>
 
    </div>
  );
}
const mapStateToProps=(reduxState) => {
  return reduxState
}
export default withRouter(connect(mapStateToProps)(App));
