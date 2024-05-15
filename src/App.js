// import logo from './logo.svg';
import './App.css';
// import Sidebar from './components/Sidebar';
// import ViewTest from './components/ViewTest';
// import Invoice from './components/Invoice';
import EnterID from './components/EnterID';
import Sidebar from './components/Side';
import RightSec from './components/RightSec';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <Routes>

          {/* <Route exact path="/about" element={<About mode={mode}/>}/> */}


          <Route exact path="/testorder/:prescriptionId" element={
          <>
            <Sidebar dash='testorder'/>
            <RightSec right='testorder' />
          </>} />


          <Route exact path="/testorder-id" element={<>
            <Sidebar dash='testorder' />
            <EnterID id='testorder'/>
          </>} />


          <Route exact path="/invoice/:prescriptionId" element={
          <>
            <RightSec right='invoice' />
          </>} />


          <Route exact path="/invoice-id" element={
          <>
            <Sidebar dash='invoice' />
            <EnterID id='invoice'/>
          </>} />


          <Route exact path="/pending" element={
          <>
            <Sidebar dash='pending' />
            <RightSec right='pending' />
          </>} />


          <Route exact path="/inprocess" element={
          <>
            <Sidebar dash='inprocess' />
            <RightSec right='inprocess' />
          </>} />

          <Route exact path="/ai-id" element={
          <>
            <Sidebar dash='ai' />
            <EnterID id='ai'/>
          </>} />

        </Routes>
      </Router>
    </>
  );
}

export default App;
