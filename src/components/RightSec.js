import React, { useEffect, useState, useRef } from 'react';
import ViewTest from './ViewTest';
import Card from './Card';
import Sample from './Sample';
import TestInput from './TestInput';
import ReportDetail from './ReportDetail';
import { useNavigate, useParams } from 'react-router-dom';

function RightSec(prop) {
    const { id, testname } = useParams();
    const [data, setData] = useState([]);
    const navigate = useNavigate();
    const [noOfSamples, setNoOfSamples] = useState(0); // Renamed setnoOfSamples to setNoOfSamples

    // Ref to store all input fields
    const inputsRef = useRef({});

    if (prop.right === 'invoice'){
        var head = 'INVOICE'
    }
    else if (prop.right === 'testorder'){
        head = 'PRESCRIPTION'
    }

    useEffect(() => {
        const fetchData = async () => {
            let url;
            if (prop.right === "inprocess") {
                url = 'http://localhost:3000/inprogressample';
            } else if (prop.right === "pending") {
                url = 'http://localhost:3000/inpendingsample';
            } else if (prop.right === "testinput") {
                url = `http://localhost:3000/testfieldsbysampleID/${id}/'${testname}'`;
            } else if (prop.right === "askai") {
                url = `http://localhost:3000/ask/${id}`;
            }

            if (url) {
                try {
                    const response = await fetch(url);
                    if (!response.ok) {
                        setData([]);
                        throw new Error('Failed to fetch data');
                    }
                    const jsonData = await response.json();
                    console.log('Fetched Data:', jsonData); // Debugging log
                    if (Array.isArray(jsonData)) {
                        setData(jsonData);
                        setNoOfSamples(jsonData.length); // Updated state variable name
                    } else {
                        setData([]);
                        setNoOfSamples(0); // Updated state variable name
                    }
                } catch (error) {
                    console.error('Error fetching data: ', error);
                    setData([]);
                    setNoOfSamples(0); // Updated state variable name
                }
            } else {
                setData([]);
                setNoOfSamples(0); // Updated state variable name
            }
        };
        fetchData();
    }, [prop.right, id, testname]);

    const cancelHandle = () => {
        navigate(`/inprocess`);
    };

    const saveReportHandle = async () => {
        const reportData = [];
        let isValid = true;

        // Iterate over each input field
        Object.keys(inputsRef.current).forEach((fieldID) => {
            const inputElement = inputsRef.current[fieldID];

            if (inputElement && inputElement.value !== undefined) {
                // Check if the input value is empty
                if (!inputElement.value.trim()) {
                    isValid = false;
                    // Add logic to handle empty field error (e.g., display an error message)
                    console.error(`Field with ID ${fieldID} is empty.`);
                } else {
                    // If the input value is not empty, add it to the reportData array
                    reportData.push({
                        sampleid: parseInt(id),
                        fieldid: parseInt(fieldID),
                        value: inputElement.value
                        // value: `${inputElement.value} ${inputElement.getAttribute('data-unit')}
                    });
                }
            }
        });

        // If all fields are filled, proceed to save the report
        if (isValid) {
            console.log('Report Data:', reportData);
            const response = await fetch("http://localhost:3000/inserttestfield", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(reportData)
            })
            const data = await response.json();
            console.log(response.statusText);
            console.log(data);
            if (!response.ok) {
                const error = (data && data.message) || response.status;
                return Promise.reject(error);
            }

            cancelHandle();
            console.log(response);
            console.log(data);

        } else {
            console.error('Please fill all required fields.');
            alert("fill all the fields")
        }
    };

    // Debugging statement to track the value of noOfSamples
    console.log('Value of noOfSamples:', noOfSamples);

    return (
        <section className={`right_sec ${(prop.right === "invoice") || (prop.right === "testinput") || (prop.right === "reportprint") ? 'main' : ''}`} id="main">
            
            {(prop.right === 'invoice' || prop.right === 'testorder') && <ViewTest head={head} right={prop.right} />}

            {prop.right === 'pending' && <>
                <Card noOfSamples={isNaN(noOfSamples) ? 0 : noOfSamples} heading={'PENDING SAMPLES'} right={prop.right} subHead={'SAMPLES'} />
                <div className='samples'>
                    {Array.isArray(data) && data.map((item, index) => (
                        <Sample key={index} testID={item.SampleID} testName={item.Testname} right={prop.right} />
                    ))}
                </div>
            </>}

            {prop.right === 'inprocess' && <>
                <Card noOfSamples={isNaN(noOfSamples) ? 0 : noOfSamples} heading={'IN PROCESS SAMPLES'} right={prop.right} subHead={'SAMPLES'} />
                <div className='samples'>
                    {Array.isArray(data) && data.map((item, index) => (
                        <Sample key={index} testID={item.SampleID} testName={item.Testname} right={prop.right} />
                    ))}
                </div>
            </>}

            {prop.right === 'testinput' && <>
                <Card noOfSamples={isNaN(noOfSamples) ? 0 : noOfSamples} heading={'ENTER REPORT DATA'} id={id} testname={testname} right={prop.right} subHead={'TEST PARAMETER'} />
                <div className='samples'>
                    {Array.isArray(data) && data.map((item, index) => (
                        <TestInput
                            key={index}
                            fieldID={item.FieldID}
                            fieldName={item.FieldName}
                            normalRange={item.NormalRange}
                            ref={(el) => inputsRef.current[item.FieldID] = el}
                        />
                    ))}
                </div>
                <div className="bottom_but">
                    <button className="sec-but" onClick={cancelHandle}>CANCEL</button>
                    <button className="pri-but" id="SaveReport" onClick={saveReportHandle}>SAVE REPORT</button>
                </div>
            </>}


            {prop.right === 'report' && <>
                <Card noOfSamples={isNaN(noOfSamples) ? 0 : noOfSamples} heading={'REPORTS'} right={prop.right} subHead={'TESTS'} presID={id}/>
                <div className='samples'>
                    {/* {Array.isArray(data) && data.map((item, index) => (
                        <Sample key={index} testID={item.SampleID} testName={item.Testname} right={prop.right} />
                    ))} */}

                    <Sample  right={prop.right} />
                    <Sample  right={prop.right} />
                    <Sample  right={prop.right} />
                    <Sample  right={prop.right} />
                    <Sample  right={prop.right} />
                    <Sample  right={prop.right} />
                    <Sample  right={prop.right} />
                </div>
            </>}

{
    prop.right === 'reportprint' && <ReportDetail></ReportDetail>
}


            {/* {prop.right === 'aitests' && <>
                <Card noOfSamples={isNaN(noOfSamples) ? 0 : noOfSamples} heading={'ASK AI'} right={prop.right} subHead={'TESTS'} />
                <div className='samples'>
                    {Array.isArray(data) && data.map((item, index) => (
                        <Sample key={index} testID={item.SampleID} testName={item.Testname} right={prop.right} />
                    ))}
                </div>
            </>} */}


        </section>
    );
}

export default RightSec;
