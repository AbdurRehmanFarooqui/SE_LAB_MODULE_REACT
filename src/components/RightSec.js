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
    const [noOfSamples, setNoOfSamples] = useState(0);

    const inputsRef = useRef({});

    let head = '';
    if (prop.right === 'invoice') {
        head = 'INVOICE';
    } else if (prop.right === 'testorder') {
        head = 'PRESCRIPTION';
    }

    useEffect(() => {
        const fetchData = async () => {
            let url;
            if (prop.right === "inprocess") {
                url = 'http://localhost:3000/inprogressample';
            } else if (prop.right === "pending") {
                url = 'http://localhost:3000/inpendingsample';
            } else if (prop.right === "testinput") {
                url = `http://localhost:3000/testfieldsbysampleID/${id}/${testname}`;
            } else if (prop.right === "report") {
                url = `http://localhost:3000/getcompeltedtest/${id}`;
            }

            if (url) {
                try {
                    const response = await fetch(url);
                    if (!response.ok) {
                        setData([]);
                        throw new Error('Failed to fetch data');
                    }
                    const jsonData = await response.json();
                    console.log('Fetched Data:', jsonData);
                    if (Array.isArray(jsonData)) {
                        setData(jsonData);
                        setNoOfSamples(jsonData.length);
                    } else {
                        setData([]);
                        setNoOfSamples(0);
                    }
                } catch (error) {
                    console.error('Error fetching data: ', error);
                    setData([]);
                    setNoOfSamples(0);
                }
            } else {
                setData([]);
                setNoOfSamples(0);
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

        Object.keys(inputsRef.current).forEach((fieldID) => {
            const inputElement = inputsRef.current[fieldID];
            if (inputElement && inputElement.value !== undefined) {
                if (!inputElement.value.trim()) {
                    isValid = false;
                    console.error(`Field with ID ${fieldID} is empty.`);
                } else {
                    reportData.push({
                        sampleid: parseInt(id),
                        testname: testname,
                        fieldid: parseInt(fieldID),
                        value: inputElement.value
                    });
                }
            }
        });

        if (isValid) {
            console.log('Report Data:', reportData);
            try {
                const response = await fetch("http://localhost:3000/inserttestfield", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(reportData)
                });

                if (!response.ok) {
                    const error = (await response.json()).message || response.status;
                    throw new Error(error);
                }

                const data = await response.json();
                console.log(data);
                cancelHandle();
            } catch (error) {
                console.error('Error saving report:', error);
            }
        } else {
            console.error('Please fill all required fields.');
            alert("Please fill all the fields");
        }
    };

    console.log('Value of noOfSamples:', noOfSamples);

    return (
        <section className={`right_sec ${(prop.right === "invoice" || prop.right === "testinput" || prop.right === "reportprint") ? 'main' : ''}`} id="main">
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

            {prop.right === 'report' && data.length > 0 && <>
                <Card noOfSamples={isNaN(noOfSamples) ? 0 : noOfSamples} pname={data[0]?.PatientName} heading={'REPORTS'} right={prop.right} subHead={'TESTS'} presID={id} />
                <div className='samples'>
                    {Array.isArray(data[0]?.Samples) && data[0].Samples.map((item, index) => (
                        <Sample right={prop.right} key={index} testID={item.SampleID} testName={item.Tests[0]?.TestName} />
                    ))}
                </div>
            </>}

            {prop.right === 'reportprint' && <ReportDetail head={head} right={prop.right}></ReportDetail>}
        </section>
    );
}

export default RightSec;
