import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';



function Sample(prop) {
    const hide = {
        display: 'none'
    }
    const display = {
        visibility: 'visibile'
    }

    const navigate = useNavigate();
    // const [id, setid] = useState();
    // const [testname, setTestname] = useState();

    const proceedHandle = () => {
        navigate(`/testinput/${prop.testID}/${prop.testName}`)

    }

    const pendingSampHandle = async () => {

        const res = await fetch(`http://localhost:3000/inprogressssamplebuttton/${prop.testID}/'${prop.testName}'`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify()
        })
        console.log(res)
        // navigate(`/pending`)
        window.location.reload();
        // /testfieldsbysampleID/:sampleid/:testname
    }
    const printReportHandle = async () => {

        var ch = document.getElementById("ai").checked;
        console.log(ch)
        if (ch === true) {
            var checkbox = 1;
        }
        else {
            checkbox = 0;
        }
        // const res = await fetch(`/${prop.testID}/${prop.testName}`)
        // console.log(res)
        window.open(`/reports/${prop.testID}/${prop.testName}/${checkbox}`)

    }
    return (
        <div className="">
            <div className="sample_list">
                <div className="samp_detail_div">
                    <p className="samp_head">SAMPLE ID:&emsp;<span className="samp_detail" style={{ color: '#74bea4' }} id="testID">{prop.testID}</span></p>
                    <p className="samp_head">TEST NAME:&emsp;<span className="samp_detail" style={{ color: '#74bea4' }} id="testName">{prop.testName}</span></p>
                </div>
                <div className="samp_button" >

                    <button className="but proceed_but" style={((prop.right === 'inprocess') ? display : hide)} onClick={proceedHandle}>CREATE REPORT</button>

                    <button className="but proceed_but" style={((prop.right === 'pending') ? display : hide)} onClick={pendingSampHandle} >SAMPLE COLLECTED</button>

                    <button className="but proceed_but" style={((prop.right === 'report') ? display : hide)} onClick={printReportHandle} >PRINT</button>


                    {/* { prop.right !== 'aitests' && <button className="but delete_but">DELETE</button>} */}
                    {/* style={((prop.right === 'inprocess') || (prop.right === 'pending') ? display : hide)} */}
                </div>
            </div>
        </div>
    )
}

export default Sample