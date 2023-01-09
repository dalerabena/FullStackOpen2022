import {useState} from 'react'

const Button = ({onClick, text}) => <button onClick={onClick}>{text}</button>

const StatisticLine = ({text, count}) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{count}</td>
    </tr>
  )
}

const Statistics =({good, neutral, bad}) => {
  let all = good + neutral + bad
  let avg = (good - bad) / all
  let pos = (good / all) * 100

  if (all > 0) {
    return (
      <div>    
        <table>
          <tbody>
            <StatisticLine text='good' count={good} />
            <StatisticLine text='neutral' count={neutral} />
            <StatisticLine text='bad' count={bad} />
            <StatisticLine text='all' count={good + neutral + bad} />
            <StatisticLine text='average' count={avg} />
            <StatisticLine text='positive' count={pos} />
          </tbody>
        </table>
      </div>
    )
  } else {
    return (
      <p>no feedbacks given</p>
    )
  }
}

function App() {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const incrementGood = () => {
    setGood(good + 1)
  }
  
  const incrementNeutral = () => {
    setNeutral(neutral + 1)
  }
  
  const incrementBad = () => {
    setBad(bad + 1)
  }

  return (
    <div>
      <h2>give feedback</h2>
      <Button onClick={incrementGood} text='good' />
      <Button onClick={incrementNeutral} text='neutral' />
      <Button onClick={incrementBad} text='bad' />

      <h2>statistics</h2>   
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App;
