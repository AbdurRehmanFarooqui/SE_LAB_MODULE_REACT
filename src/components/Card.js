// import React from 'react'
import React, { useEffect, useState } from 'react';

function Card(prop) {
    const hide = {
        display: 'none'
    }
    const display = {
        visibility: 'visibile'
    }
    const center = {
        textAlign: 'center'
    }
    return (<>
        <h3 style={(prop.right === 'testinput' ? center : display)}>{prop.heading}</h3>
        <div className="card1">

            <p className="c1p1" style={(prop.right === 'inprocess' ? display : hide)} >NO. OF SAMPLES:&nbsp;&nbsp;<span style={{ color: 'white' }} id="noSample">{0 + prop.noOfSamples}</span></p>

            <p className="c1p1" style={(prop.right === 'pending' ? display : hide)}>SHIFT:&nbsp;&nbsp;<span style={{ color: 'white' }} id="shift">1</span></p>
            <p className="c1p2" style={(prop.right === 'pending' ? display : hide)}>SAMPLE:&nbsp;&nbsp;<span style={{ color: 'white' }} id="Samples">{0 + prop.noOfSamples}</span></p>

            {
                prop.right === 'testinput' && <>
                    <p className="c1p1" style={(prop.right === 'testinput' ? display : hide)}>SAMPLE ID:&nbsp;&nbsp;<span style={{ color: 'white' }} id="shift">{prop.id}</span></p>
                    <p className="c1p2" style={(prop.right === 'testinput' ? display : hide)}>TEST NAME:&nbsp;&nbsp;<span style={{ color: 'white' }} id="Samples">{prop.testname}</span></p>
                </>
            }

            {
                prop.right === 'report' && <>
                    <p className="c1p1" >PRESCRIPTION ID:&nbsp;&nbsp;<span style={{ color: 'white' }} id="shift">{prop.presID}</span></p>
                    <p className="c1p2" >PATIENT NAME:&nbsp;&nbsp;<span style={{ color: 'white' }} id="Samples">{prop.pname}</span></p>
                </>
            }

        </div>

        <p className="h2">{prop.subHead}</p>
        {
            prop.right === 'report' && <>
                <div className='askcheck'>
                    <input type="checkbox" id="ai" name="ai" value="1" className="but proceed_but" style={((prop.right === 'report') ? display : hide)} />
                    <label htmlFor="ai">ASK Ai</label>
                </div>
            </>
        }
    </>
    )
}

export default Card