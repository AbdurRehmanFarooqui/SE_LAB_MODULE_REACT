// import React from 'react'
import React, { useEffect, useState } from 'react';
import ViewTest from './ViewTest'
import Card from './Card';
import Sample from './Sample';

function RightSec(prop) {
    // const hide = {
    //     display: 'none'
    // }
    // const display_it = {
    //     visibility: 'visibile'
    // }
    // const forInvoicePrint = {
    //     width: '85vw',
    //     height: '93vh'
    // }
    let side = prop.right;
    console.log(side)
    // style={(prop.right === "invoice" ? forInvoicePrint : display_it)}

    const [data, setData] = useState([]);
    
    const [noOfSamples, setnoOfSamples] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {

                const response = await fetch('http://localhost:3000/inprogressample');

                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }

                const jsonData = await response.json();
                setData(jsonData);
                console.log(jsonData)
                setnoOfSamples(Object.keys(jsonData).length);
                console.log(noOfSamples)


            } catch (error) {
                console.error('Error fetching data: ', error);
            }
        };

        fetchData();
    }, [noOfSamples]);


    return (

        <section className={`right_sec ${prop.right === "invoice" ? 'main' : ''} `} id="main">
            {
                (prop.right === 'invoice' || prop.right === 'testorder') && <ViewTest right={side}></ViewTest>

            }


            {
                (prop.right === 'pending' || prop.right === 'inprocess') && <><Card noOfSamples={noOfSamples} right={side}></Card>

                    <div className='samples'>
                        {data.map((item, index) => (
                            <Sample key={index} testID={item.SampleID} testName={item.Testname} right={prop.right} />
                        ))}
                    </div>

                </>

            }

        </section>
    )
}

export default RightSec