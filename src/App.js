// import logo from './logo.svg';
import './App.css';
// import Sidebar from './components/Sidebar';
// import ViewTest from './components/ViewTest';
// import Invoice from './components/Invoice';
import EnterID from './components/EnterID';
import Sidebar from './components/Side';
import RightSec from './components/RightSec';
// import TestInput from './components/TestInput';
// import { Navigate, useNavigate } from 'react-router-dom';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

// const navigate = useNavigate();
function App() {
  return (
    <>
      <Router>
        <Routes>

          {/* <Route exact path="/about" element={<About mode={mode}/>}/> */}


          <Route exact path="/testorder/:prescriptionId" element={
            <>
              <Sidebar dash='testorder' />
              <RightSec right='testorder' />
            </>} />


          <Route exact path="/testorder-id" element={<>
            <Sidebar dash='testorder' />
            <EnterID id='testorder' />
          </>} />


          <Route exact path="/invoice/:prescriptionId" element={
            <>
              <RightSec right='invoice' />
            </>} />


          <Route exact path="/invoice-id" element={
            <>
              <Sidebar dash='invoice' />
              <EnterID id='invoice' />
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

          <Route exact path="/testinput/:id/:testname" element={
            <>
              {/* <Sidebar dash='inprocess' /> */}
              <RightSec right='testinput' />
            </>} />

          <Route exact path="/report-id" element={
            <>
              <Sidebar dash='report' />
              <EnterID id='report' />
            </>} />

            <Route exact path="/reports/:id" element={
            <>
              <Sidebar dash='report' />
              <RightSec right='report' />
            </>} />
            <Route exact path="/reports/:id/:testname" element={
            <>
              {/* <Sidebar dash='report' /> */}
              <RightSec right='reportprint' />
            </>} />
            
          <Route exact path="/issue" element={
            <>
              <Sidebar dash='issue' />
              <RightSec right='' />
            </>} />

          <Route exact path="/" element={<Navigate to="/testorder-id" />} />

        </Routes>

      </Router>
    </>
  );
}

export default App;
