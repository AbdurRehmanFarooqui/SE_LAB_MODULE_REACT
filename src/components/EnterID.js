import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function EnterID(props) {
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
    const navigate = useNavigate();
    const [invalid, setInvalid] = useState("false");
    console.log(invalid)

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
            else {
                url = `http://localhost:3000/invoice/${prescriptionId}`;
                nav = `/invoice/${prescriptionId}`;
            }
            // navigate(nav);
                const response = await fetch(url)
                // headers: {
                //     'Content-Type': 'application/json'
                // },
                // body: JSON.stringify({ prescriptionId })
            console.log(response);

            if (!response.ok) {
                setInvalid("true");
                throw new Error('Failed to send data to backend');
            }
            navigate(nav)
            const data = await response.json();
            console.log('Data sent successfully:', data);
            // Handle success response from backend
        } catch (error) {
            console.error('Error sending data to backend:', error);
            // Handle error
        }
    };

    return (
        <div style={containercenter} className="right_sec">
            <section className='sectionid'>

                <div className="prescriptionid">
                    <div className="prescription_idid">
                        <h3 className='h3id'>Prescription ID</h3>
                        <p style={invalid==='true' ? display : hide}>*Invalid ID</p>
                        <input type="" name="pres_idid" id="pres_idid" />
                    </div>
                    <button className='buttonid' onClick={handleProceed}>PROCEED</button>
                </div>

            </section>
        </div>
    )
}



export default EnterID
