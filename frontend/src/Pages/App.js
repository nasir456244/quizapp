import React from 'react'
import '../Styles/App.css';
import { Link } from 'react-router-dom';

const App = () => {
  return (
    <div className='App'>
      <h1 style={{color: 'white' }}>Take a Quiz</h1>
      <div className='Container'>
        <Link to={'/english'} className='child'>
          <p>English</p>
        </Link>
        <Link to={'/math'}className='child'>
          <p>Math</p>
        </Link>
        <Link to={'/science'} className='child'>
          <p>Science</p>
        </Link>

      </div>
      
    </div>
  )
}

export default App