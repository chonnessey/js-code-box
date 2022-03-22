import ReactDOM from 'react-dom';
import { useState } from 'react';

const App = () => {
  const [input, setInput] = useState('');
  const [code, setCode] = useState('');

  const handleClick = () => {
    console.log(input)
  };

  return (
    <div>
      <textarea 
        onChange={(e) => setInput(e.target.value)}></textarea>
      <div>
        <button onClick={handleClick}>Submit</button>
      </div>
      <pre>{code}</pre>
    </div>
  )
};

ReactDOM.render(
  <App />,
  document.querySelector('#root')
);