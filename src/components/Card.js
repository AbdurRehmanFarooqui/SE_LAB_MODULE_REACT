// import React from 'react'
import React, { useEffect, useState } from 'react';

function Card(prop) {
    const hide = {
        display: 'none'
    }
    const display = {
        visibility: 'visibile'
    }
    // const [noSamp, setSamp] = useState([]);
    const [Shift, setShift] = useState([]);
    const [Samples, setSamples] = useState([]);

    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             if (prop.right === 'inprocess') {
    //                 var url="";
    //             } else {
    //                 url="";
    //             }
    //             const response = await fetch(url);
    //             if (!response.ok) {
    //                 throw new Error('Failed to fetch data');
    //             }
    //             const jsonData = await response.json();
    //             if (prop.right === 'inprocess') {
    //                 setSamp(jsonData);
    //             } else {
    //                 setSamples(jsonData);
    //                 setShift(jsonData);
    //             }
    //         } catch (error) {
    //             console.error('Error fetching data: ', error);
    //         }
    //     };
    //     fetchData();
    // }, [prop.right]);


    return (<>
        <h3>Pending Samples</h3>
        <div class="card1">
            <p class="c1p1" style={(prop.right === 'inprocess' ? display : hide)} >NO. OF SAMPLES:&nbsp;&nbsp;<span style={{ color: 'white' }} id="noSample">{prop.noOfSamples}</span></p>
            <p class="c1p1" style={(prop.right === 'pending' ? display : hide)}>SHIFT:&nbsp;&nbsp;<span style={{ color: 'white' }} id="shift">{Shift}</span></p>
            <p class="c1p2" style={(prop.right === 'pending' ? display : hide)}>SAMPLE:&nbsp;&nbsp;<span style={{ color: 'white' }} id="Samples">{prop.noOfSamples}</span></p>
        </div>
        <p class="h2">SAMPLES</p>
    </>
    )
}

export default Card