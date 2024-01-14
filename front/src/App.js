import './App.css';
import Example from './components/example';
import Complexity from './components/complexity';
import Form from './components/form';
import Button from './components/button/button';


function App() {
  const pass = {
    length: 8,
    numbers: true,
    uppercase: true,
    lowercase: true,
    symbols: true,
    delimiter: false,
    delimiter_value: 4,
  }

  return (
    <div className="App">
      
      <Form pass={pass}/>
      {/* <Button /> */}
    </div>
  );
}

export default App;
