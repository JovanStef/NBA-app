// adding more listeners/watchers
// sudo sysctl fs.inotify.max_user_watches=524288
// 

//start json server
// json-server --watch db.json --port 3004


import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import {firebase} from './firebase';

import Routes from './routes';



const App = (props)=>{
  return(
    <BrowserRouter>
    <Routes {...props}/>
    </BrowserRouter>
  )
}

firebase.auth().onAuthStateChanged((user)=>{

  ReactDOM.render(
      <App user={user}/>,
    document.getElementById('root')
  );
})


