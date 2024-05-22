import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function EnterID(props) {

    // CSS
    const containercenter = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    }
    const hide = {
        display: 'none'
    }
    const display = {
        visibility: 'visibile',
        color: 'red',
        padding: '0px 10px 10px 10px',
        // borderRadius: '10px',
        // margin: '0px 0px 10px 0px',
        fontSize: '1.6rem',
        letterSpacing: '4px',
        // backgroundColor: 'red',
        textAlign: 'center',
    }
    // CSS

    // var
    const navigate = useNavigate();
    const [invalid, setInvalid] = useState("false");
    console.log(invalid)
    // var

    // Functions
    const handleProceed = async () => {
        const prescriptionId = document.getElementById('pres_idid').value;

        // Make sure prescriptionId is not empty before proceeding
        if (prescriptionId.trim() === '') {
            alert('Please enter a prescription ID');
            return;
        }

        try {
            if (props.id === 'testorder') {
                var url = `http://localhost:3000/prescription/${prescriptionId}`;
                var nav = `/testorder/${prescriptionId}`;
            }
            else if (props.id === 'invoice') {
                url = `http://localhost:3000/invoicedata/${prescriptionId}`;
                nav = `/invoice/${prescriptionId}`;
            }
            else if (props.id === 'report') {
                url = `http://localhost:3000/getcompeltedtest/${prescriptionId}`;
                nav = `/reports/${prescriptionId}`;
            }
            // navigate(nav)           
            const response = await fetch(url)

 
            console.log(url)
            const data = await response.json()
            console.log(response)     
            console.log(data)
            console.log(data[0].PrescriptionID)

            if (!response.ok) {
                setInvalid("true");
                setTimeout(() => { setInvalid('false') }, 3000);
                throw new Error('Failed to send data to backend');
            }

            if (data[0].PatientName === 'No ID found'){
                setInvalid("true");
                setTimeout(() => { setInvalid('false') }, 3000);
                throw new Error(`No invoice found of this Prescription-ID ${prescriptionId}`);
            }     
            // console.log("hello")
            setInvalid('false');
            (props.id === 'invoice') || (props.id === 'report') ? window.open(nav) : navigate(nav)
                // const data = await response.json();
                // console.log('Data sent successfully:', data);
            // Handle success response from backend
        } catch (error) {
            setInvalid("true");
            console.error('Error:', error);
            // Handle error
        }
    };
    return (
        <div style={containercenter} className="right_sec">
            <section className='sectionid'>

                <div className="prescriptionid">
                    <div className="prescription_idid">
                        <h3 className='h3id'>Prescription ID</h3>
                        <p style={invalid === 'true' ? display : hide}>*Invalid ID</p>
                        <input type="" name="pres_idid" id="pres_idid" />
                    </div>
                    <button className='buttonid' onClick={handleProceed}>PROCEED</button>
                </div>

            </section>
        </div>
    )
}



export default EnterID
