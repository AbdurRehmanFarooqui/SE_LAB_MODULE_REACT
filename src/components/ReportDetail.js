import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Spiner from './Spiner';
function ReportDetail(prop) {
    const { id, testname, checkbox } = useParams();
    const [data, setData] = useState([]);
    const [loading, setloading] = useState([false]);
    const [ai, setai] = useState([false]);

    useEffect(() => {
        const fetchData = async () => {
            setloading(true)
            const url = `http://localhost:3000/generatereport/${id}/'${testname}'/${checkbox}`;

            if (checkbox == 1) {
                console.log(checkbox);
            }
            if (url) {
                try {
                    const response = await fetch(url);
                    console.log(response)
                    if (!response.ok) {
                        setData([]);
                        throw new Error('Failed to fetch data');
                    }
                    const jsonData = await response.json();
                    console.log('Fetched Data:', jsonData); // Debugging log
                    console.log("hello")
                    if (checkbox == 1) {
                        setData(jsonData.responseArray);
                        setai(jsonData.results)
                        
                        console.log(data);
                    }else if (Array.isArray(jsonData)) {
                        setData(jsonData);
                        console.log(data); // Debugging log
                    }
                    // console.log(check)
                    // console.log(checkbox)
                    setloading(false)
                    console.log(data)
                } catch (error) {
                    console.error('Error fetching data: ', error);
                    setData([]); // Updated state variable name
                }
            } else {
                setData([]);
                // Updated state variable name
            }

        };
        fetchData();
    }, [id, testname, checkbox]);
    const hide = {
        display: 'none'
    };
    const display = {
        visibility: 'visible'
    };
    const report = {
        display: 'flex',
        flexDirection: 'column',
        // height: '100%'
    };
    const printbut = {
        justifyContent: 'center'
    };
    const center = {
        textAlign: 'center'
    };
    function printhandle() {
        window.print();
    }
    function closeHandle() {
        window.close();
    }

    // Check if data[0] is defined and has the required properties
    const hasData = data.length > 0 && data[0].SampleID !== undefined;

    return (
        <>
        <Spiner style={(loading) ? hide : display}></Spiner>
        <div style={(loading) ? hide : display}>
            <div className='container' style={(loading) ? hide : report} >
                <h3 style={center}>REPORT</h3>
                <div className="pres_detail">
                    <div className="head_detail">
                        <div>
                            <span className="head">Patient Name:</span>
                            <span className="detail" id="PName">{hasData ? data[0].SampleID : 'N/A'}</span>
                        </div>
                        <div>
                            <span className="head">Doctor Name:</span>
                            <span className="detail" id="DName">{hasData ? `Dr Pro` : 'N/A'}</span>
                        </div>
                        <div>
                            <span className="head">Prescription ID:</span>
                            <span className="detail" id="PresID">{hasData ? data[0].SampleID : 'N/A'}</span>
                        </div>
                    </div>
                    <div className="date">
                        <div>
                            <span className="head">Date:</span>
                            <span className="detail" id="Date">20/2/2024</span>
                        </div>
                        <div>
                            <span className="head">Test Name:</span>
                            <span className="detail" id="Date">{hasData ? data[0].TestName : 'N/A'}</span>
                        </div>
                        <div>
                            <span className="head">Sample ID:</span>
                            <span className="detail" id="Date">{hasData ? data[0].SampleID : 'N/A'}</span>
                        </div>
                    </div>
                </div>

                <p className="rh2">Test Parameters</p>

                <div className="report_field_head">
                    <div className="fields">
                        <p className="fieldhead">Field</p>
                    </div>
                    <div className="fields">
                        <p className="fieldhead">Result Value</p>
                    </div>
                    <div className="fields">
                        <p className="fieldhead">Normal Range</p>
                    </div>
                </div>

                <div className='scrollable'>
                    {hasData && data[0].fields.map((item, index) => (
                        <div className="report_field_list" key={index}>
                            <div className="fields value leftBorder">
                                <p className="fieldvalue">{item.FieldName}</p>
                            </div>
                            <div className="fields value">
                                <p className="fieldvalue">{item.FieldResult}</p>
                            </div>
                            <div className="fields value">
                                <p className="fieldvalue">{item.NormalRange}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {checkbox === '1' && (
                    <div className='aiopinion'>
                        <p className='aihead'>Ai Opinion</p>
                        <p className='aicaution'>*This is Ai's opinion so it should not be taken seriously</p>
                        <p className='airesponse'>{ai}</p>
                    </div>
                )}
            </div>

            <div className="total_bottom">
                <div className="bottom_but" style={printbut}>
                    <button className="sec-but" onClick={closeHandle} id="close_but">CANCEL</button>
                    <button className="pri-but" onClick={printhandle} id="print_but">PRINT</button>
                </div>
            </div>
            </div>
        </>

    );
}

export default ReportDetail;
