import './App.css';
import Course from './Course';

function App() {
  return (
    <div className="App">
        <h1>GraphQL Workshop</h1>
        <h2>Presented by ICSSC Projects Committee</h2>
        <Course id={"COMPSCI161"}/>
        <Course id={"COMPSCI141"}/>
    </div>
  );
}

export default App;
