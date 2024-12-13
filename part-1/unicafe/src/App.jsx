import { useState } from "react";

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
);

const StatisticLine = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
);

const Statistics = ({ good, neutral, bad }) => {
  const all = good + neutral + bad;
  if (all == 0) {
    return <p>No feedback given</p>;
  }
  const avg = (good - bad) / all;
  return (
    <table>
      <tbody>
        <StatisticLine text={"good"} value={good} />
        <StatisticLine text={"neutral"} value={neutral} />
        <StatisticLine text={"bad"} value={bad} />
        <StatisticLine text={"all"} value={all} />
        <StatisticLine text={"average"} value={avg} />
        <StatisticLine text={"positive"} value={`${(good * 100) / all}%`} />
      </tbody>
    </table>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleGoodIncrement = () => {
    setGood(good + 1);
  };
  const handleNeutralIncrement = () => {
    setNeutral(neutral + 1);
  };
  const handleBadIncrement = () => {
    setBad(bad + 1);
  };

  return (
    <div>
      <h1>Give Feedback</h1>
      <br />
      <div>
        <Button text={"good"} handleClick={handleGoodIncrement} />
        <Button text={"neutral"} handleClick={handleNeutralIncrement} />
        <Button text={"bad"} handleClick={handleBadIncrement} />
      </div>
      <br />
      <h1>Statistics</h1>
      <br />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
