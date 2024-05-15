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
    // const [url, seturl] = useState([]);
    // style={(prop.right === "invoice" ? forInvoicePrint : display_it)}

    const [data, setData] = useState([]);

    const [noOfSamples, setnoOfSamples] = useState([]);


    useEffect(() => {
        const fetchData = async () => {
            if (prop.right === "inprocess") {
                let url1 = 'http://localhost:3000/inprogressample';
                try {
                    console.log(url1);
                    const response = await fetch(url1);
                    if (!response.ok) {
                        throw new Error('Failed to fetch data');
                    }
                    // console.log(url);
                    const jsonData = await response.json();
                    setData(jsonData);
                    console.log(jsonData)
                    setnoOfSamples(Object.keys(jsonData).length);
                    // console.log(noOfSamples)

                } catch (error) {
                    console.error('Error fetching data: ', error);
                }
            } else if (prop.right === "pending") {
                let url2 = 'http://localhost:3000/inpendingsample';
                try {
                    console.log(url2);
                    const response = await fetch(url2);
                    if (!response.ok) {
                        setData([]);
                        setnoOfSamples([]);
                        throw new Error('Failed to fetch data');
                    }
                    // console.log(url);
                    const jsonData = await response.json();
                    setData(jsonData);
                    console.log(jsonData)
                    setnoOfSamples(Object.keys(jsonData).length);
                    // console.log(noOfSamples)

                } catch (error) {
                    console.error('Error fetching data: ', error);
                }
            }
        };
        fetchData();
    }, [noOfSamples, prop.right]);


    return (

        <section className={`right_sec ${prop.right === "invoice" ? 'main' : ''} `} id="main">
            {
                (prop.right === 'invoice' || prop.right === 'testorder') && <ViewTest right={side}></ViewTest>

            }


            {
                prop.right === 'pending' && <><Card noOfSamples={noOfSamples} heading={'PENDING SAMPLES'} right={side}></Card>
                    <div className='samples'>
                        {data.map((item, index) => (
                            <Sample key={index} testID={item.SampleID} testName={item.Testname} right={prop.right} />
                        ))}
                    </div>
                </>

            }
            {
                prop.right === 'inprocess' && <><Card noOfSamples={noOfSamples} heading={'IN PROCESS SAMPLES'} right={side}></Card>
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