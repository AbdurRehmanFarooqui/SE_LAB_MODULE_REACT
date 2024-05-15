import React from 'react'
import { useNavigate } from 'react-router-dom';

function EnterID(props) {
    const containercenter = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    }
    const navigate = useNavigate();
    if (props.id === 'testorder') {
        var url = "s";
    }
    else {
        var url = "d";
    }
    const handleProceed = async () => {
        const prescriptionId = document.getElementById('pres_idid').value;

        // Make sure prescriptionId is not empty before proceeding
        if (prescriptionId.trim() === '') {
            alert('Please enter a prescription ID');
            return;
        }

        try {
            navigate(`/testorder/${prescriptionId}`);
            const response = await fetch(`http://localhost:3000/prescription/${prescriptionId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ prescriptionId })
            });
            console.console.log(response);

            if (!response.ok) {
                throw new Error('Failed to send data to backend');
            }

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
                        <input type="" name="pres_idid" id="pres_idid" />
                    </div>
                    <button className='buttonid' onClick={handleProceed}>PROCEED</button>
                </div>

            </section>
        </div>
    )
}



export default EnterID
