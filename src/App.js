import './App.css';
import React, {useState} from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import LoadingBar from 'react-top-loading-bar'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'

const App = () => {

  // name = "datta";
  const pageSize = 3;
  const apiKey = process.env.REACT_APP_NEWS_API

  const [progress, setProgress] = useState(0)

    return (
      <div>
        <Router>
          <Navbar />
          <LoadingBar
            color='#0cfe24'
            progress={progress}
          />
          <Routes>
            <Route exact path='/' element={<News setProgress={setProgress} apiKey={apiKey} key={"world"} pageSize={pageSize} topic='world' />} />
            <Route exact path='/india' element={<News setProgress={setProgress} apiKey={apiKey} key={"india"} pageSize={pageSize} topic='india' />} />
            <Route exact path='/us' element={<News setProgress={setProgress} apiKey={apiKey} key={"us"} pageSize={pageSize} topic='us' />} />
            <Route exact path='/business' element={<News setProgress={setProgress} apiKey={apiKey} key={"business"} pageSize={pageSize} topic='business' />} />
            <Route exact path='/entertainment' element={<News setProgress={setProgress} apiKey={apiKey} key={"entertainment"} pageSize={pageSize} topic='entertainment' />} />
            <Route exact path='/health' element={<News setProgress={setProgress} apiKey={apiKey} key={"health"} pageSize={pageSize} topic='health' />} />
            <Route exact path='/science' element={<News setProgress={setProgress} apiKey={apiKey} key={"science"} pageSize={pageSize} topic='science' />} />
            <Route exact path='/sports' element={<News setProgress={setProgress} apiKey={apiKey} key={"sports"} pageSize={pageSize} topic='sports' />} />
            <Route exact path='/technology' element={<News setProgress={setProgress} apiKey={apiKey} key={"technology"} pageSize={pageSize} topic='technology' />} />
            <Route exact path='/general' element={<News setProgress={setProgress} apiKey={apiKey} key={"general"} pageSize={pageSize} topic='general' />} />
          </Routes>
        </Router>
      </div>
    )
  }

  export default App