import React from 'react';
import ReactDOM from 'react-dom';
import useAnimation from './use-animation';

function App() {
  // Call hook multiple times to get animated values with different start delays
  const animation1 = useAnimation('elastic', 600, 0);
  const animation2 = useAnimation('elastic', 600, 150);
  const animation3 = useAnimation('elastic', 600, 300);
  
  return (
    <div style={{ display: 'flex', justifyContent: 'center'}}>
      <Ball
        innerStyle={{
          fontSize: '50px',
          marginTop: animation1 * 200 - 100
        }}
      />
      
      <Ball
        innerStyle={{
          fontSize: '50px',
          marginTop: animation2 * 200 - 100
        }}
      />
      
      <Ball
        innerStyle={{
          fontSize: '50px',
          marginTop: animation3 * 200 - 100
        }}
      />
    </div>
  );
}

const Ball = ({ innerStyle }) => (
  <div
    style={{
      width: 100,
      height: 100,
      marginRight: '40px',
      borderRadius: '50px',
      backgroundColor: '#4dd5fa',
      ...innerStyle
    }}
  />
);

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
