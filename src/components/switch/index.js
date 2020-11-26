import React, {useState} from 'react';
import Switch from "./switch/Switch";

function App() {
  const [value, setValue] = useState(false)
  return (
    <div className="app">
      <Switch
        isOn={value}
        handleToggle={() => setValue(!value)}
      />
    </div>
  );
}

export default App