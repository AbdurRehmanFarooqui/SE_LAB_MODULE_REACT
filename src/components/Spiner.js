import React from 'react'
import loading from './Spinner-3.gif'
function Spiner() {
    const center = {
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    };
  return (
    <div style={center}>
    <img src={loading } alt="Loading" />
    </div>
  )
}

export default Spiner