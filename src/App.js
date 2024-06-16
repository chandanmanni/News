import logo from './logo.svg';
import './App.css';

import React, { useState } from 'react'
import NavBar from './Components/NavBar';
import News from './Components/News';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'

const App = ()=> {
  const [progress, setProgress] = useState(0)
 
    return (
      <div>
       <Router>
        <NavBar></NavBar>
        
        <LoadingBar
        height={3}
        color='#f11946'
        progress={progress} 
      />
        <Routes>
          <Route exact path="/" element={<News setProgress={setProgress}  key="general"  country="in" category="General"/>}></Route> 
          <Route exact path="/business" element={<News setProgress={setProgress}  key="business"  country="in" category="Business"/>}></Route> 
          <Route exact path="/entertainment" element={<News setProgress={setProgress}  key="entertainment"  country="in" category="Entertainment"/>}></Route> 
          <Route exact path="/general" element={<News setProgress={setProgress}  key="general"  country="in" category="General"/>}></Route> 
          <Route exact path="/health" element={<News setProgress={setProgress}  key="health"  country="in" category="Health"/>}></Route> 
          <Route exact path="/science" element={<News setProgress={setProgress}  key="science"  country="in" category="Science"/>}></Route> 
          <Route exact path="/sports" element={<News setProgress={setProgress}  key="sports"  country="in" category="Sports"/>}></Route> 
          <Route exact path="/technology" element={<News setProgress={setProgress}  key="technology"  country="in" category="Technology"/>}></Route> 
        </Routes>
        </Router>
      </div>
    )
 
}

  export default App
