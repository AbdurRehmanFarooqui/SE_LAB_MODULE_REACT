import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';

function ViewTest(prop) {

    const { prescriptionId } = useParams();
    const [prescriptionData, setPrescriptionData] = useState({});
    const [testData, setTestData] = useState([]);
    const [TotalCost, setTotalCost] = useState([]);

    useEffect(() => {
        // console.log('Prescription ID:', prescriptionId);
        const url = `http://localhost:3000/prescription/${prescriptionId}`;

        const fetchData = async () => {
            try {
                const res = await fetch(url);
                const data = await res.json();
                setPrescriptionData(data[0]);
                setTestData(data[0].Tests);
                console.log(data)
                console.log(testData)
            } catch (error) {
                console.error("Error fetching prescription data:", error);
            }
        };

        fetchData();
    }, [prescriptionId]);

    useEffect(() => {
        
        const url = `http://localhost:3000/cost/${prescriptionId}`;

        const fetchData = async () => {
            try {
                const res = await fetch(url);
                const data = await res.json();
                // setPrescriptionData(data[0]);
                // setTestData(data);
                setTotalCost(data[0]);
                console.log(data)
                console.log(TotalCost)
            } catch (error) {
                console.error("Error fetching prescription data:", error);
            }
        };

        fetchData();
    }, []);
    
    const hide = {
        display: 'none'
    }
    const display = {
        visibility: 'visibile'
    }
    const printbut = {
        justifyContent: 'center'
    }
    const center = {
        textAlign: 'center'
    }
    function printhandle() {
        window.print();
    }
    const openInvoiceHandle = async () => {
        try {
                const response = await fetch(`http://localhost:3000/invoice/${prescriptionId}`, {
                method: 'POST',
            });
            console.log(response);

            if (!response.ok) {
                throw new Error('Failed to send data to backend');
            }

            const data = await response.json();
            console.log('Data sent successfully:', data);
            // navigate(`/testorder/${prescriptionId}`);
            window.open(`/invoice/${prescriptionId}`)

            // Handle success response from backend
        } catch (error) {
            console.error('Error sending data to backend:', error);
        }



    }
    const navigate = useNavigate();

    function cancelHandle() {
        navigate("/testorder-id");
    }

    function closeHandle(){
        window.close()
    }
    // const tests = [
    //     { testName: 'Hemoglobin A1C', testCost: '$15.00' },
    //     { testName: 'Lipid Panel', testCost: '$25.00' },
    //     { testName: 'Thyroid Function Test', testCost: '$50.00' }
    //     // Add more test data as needed
    // ];  
    return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <div className="grow">
            <h3 style={(prop.right === 'invoice' ? center : display)}>{prop.head}</h3>
            <div className="pres_detail">
                <div className="head_detail">
                    <div><span className="head">Patient Name:</span> <span className="detail" id="PName">{prescriptionData.PatientName}</span>
                    </div>
                    <div>
                        <span className="head">Doctor Name:
                        </span> <span className="detail" id="DName">{prescriptionData.DoctorName}</span>
                    </div>
                    <div>
                        <span className="head">Prescription ID:</span> <span className="detail" id="PresID">{prescriptionData.PrescriptionID}</span>
                    </div>
                </div>
                <div className="date">
                    <div><span className="head">Date:</span> <span className="detail" id="Date">{prescriptionData.PrescriptionDate && prescriptionData.PrescriptionDate.slice(0, 10)}</span>
                    </div>
                </div>
            </div>

            <div className="test_detail">
                <div className="test_head">
                    <h4>TESTS</h4>
                    <h4>COST</h4>
                </div>
                <div className="test_over">

                    {testData.map((test, index) => (
                        <div className="test" key={index}>
                            <div className="test_name">{test.TestName}</div>
                            <div className="test_cost">{test.TestCost}</div>
                        </div>
                    ))}

                </div>
            </div>
        </div>
        <div className="total_bottom">
            <div className="break"></div>
            <div className="test_head">
                <h4>TOTAL COST</h4>
                <div className="test_cost" id="totalCost">{TotalCost.TotalCost}</div>
            </div>
            <div style={prop.right === 'invoice' ? printbut : display} className="bottom_but">
                <button style={prop.right === 'testorder' ? display : hide} className="sec-but" onClick={cancelHandle}>CANCEL</button>
                <button style={prop.right === 'testorder' ? display : hide} className="pri-but" onClick={openInvoiceHandle}>GENERATE INVOICE</button>

                <button style={(prop.right === 'invoice' ? display : hide)} className="sec-but " onClick={closeHandle} id="close_but">CANCEL</button>
                <button style={(prop.right === 'invoice' ? display : hide)} className="pri-but " onClick={printhandle} id="print_but">PRINT</button>
            </div>
        </div>
    </div>
    )
}

export default ViewTest 