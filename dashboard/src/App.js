import './App.css';
import Home from './Home';

function App() {
  return (
    <>
      <div className='visualization'>
        <div className='sidenav' >
          <div style={{ fontFamily: "cursive", fontSize: "25px" }}>Main Dashboard</div>

        </div>
        <div className='mainpage' >
          <div style={{ textAlign: "center", fontSize: "30px" }}> Data Visualization</div>
          <br></br>
          <Home />
        </div>
      </div>
    </>
  );
}

export default App;
