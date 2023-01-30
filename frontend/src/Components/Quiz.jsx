import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import "../Styles/Quiz.css"
import { Link } from 'react-router-dom';

const Quiz = () => {
    const location = useLocation()
    const [quizes, setQuizes] = useState()
    const [currentIndex, setCurrentIndex] = useState(0)
    const [selected, setSelected] = useState('')
    const [answers, setAnswers] = useState([])
    const [score, setScore] = useState(0) 
    const [showAnswer, setShowAnswer] = useState(false)
    const [reset, setReset] = useState(false)

  useEffect(() => {
    const fetchQuizes = async () => {
      const response = await fetch(`http://localhost:3000${location.pathname}`);
      const quizes = await response.json();
      setReset(false)
      setQuizes(quizes)
    }
    fetchQuizes() 
  
  },[reset])

  console.log(score)


  const handleNext = () => {
    if(selected && currentIndex === (quizes?.questions?.length - 1)) {
      const correctAns =  quizes?.questions[currentIndex]?.correctIndex
      if(quizes?.questions[currentIndex]?.answers[correctAns] === selected) {
        setScore((prev) => prev + 1)
      }
      setCurrentIndex(0)
      setSelected('')
      setAnswers([])
      setShowAnswer(true)      
    }
    else if(currentIndex < answers?.length) {
      setCurrentIndex((prev) => prev + 1);
      setSelected("")
      return
    }
    else if (selected) {
      setAnswers((prev) => [...prev, selected])
      const correctAns =  quizes?.questions[currentIndex]?.correctIndex
      if(quizes?.questions[currentIndex]?.answers[correctAns] === selected) {
        setScore((prev) => prev + 1)
      }
      setSelected("")
      setCurrentIndex((prev) => prev + 1);
    }
    return;
  }


  return (
      <div className='container'>
        {showAnswer ? 
        
            <div className='result'>
                <h1>You Scored</h1>
                <p className='score'>{score + "/" + quizes?.questions?.length}</p>
                <div className='resetContainer'>

                <button className='button' onClick={() =>{setShowAnswer(false); setReset(true)}}>
                        Reset
                </button>
                <p>OR</p>
                <Link to='/' className='gohome'>
                        Go home
                </Link>
                </div>
            </div>
    
        :
        
            <div className='quizcontainer'>
                <p className='question'>{quizes?.questions[currentIndex]?.question}</p>
                {quizes?.questions[currentIndex]?.answers?.map((answer) => (
                <p key={answer} className={`${currentIndex < answers?.length && answers?.includes(answer) && 'prevAns'} ${selected === answer && "selected"} options`} onClick={() => setSelected(answer)}>{answer}</p>
                ))}
                <div className='buttons'>
                    {currentIndex > 0 && <button className='button' onClick={() => currentIndex > 0 && setCurrentIndex((prev) => prev - 1)}>Prev</button>}
                    <button className='button' onClick={handleNext}>
                        {currentIndex === (quizes?.questions?.length - 1) ? "Finish" : "Next"}
                    </button>
                </div>
            </div>
        }
        
      </div>
      
  );

}

export default Quiz

