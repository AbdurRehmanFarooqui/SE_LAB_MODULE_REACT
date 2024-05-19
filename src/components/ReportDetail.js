import React from 'react'

function ReportDetail(prop) {
    const hide = {
        display: 'none'
    }
    const display = {
        visibility: 'visibile'
    }
    const report = {
        display: 'flex', 
        flexDirection: 'column', 
        height: '100%'
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
    function closeHandle() {
        window.close()
    }
    return (
            <div className='container' style={report}>
        <h3 style={center}>REPORT</h3>
        <div className="pres_detail">
            <div className="head_detail">
                <div><span className="head">Patient Name:</span> <span className="detail" id="PName"></span>
                </div>
                <div>
                    <span className="head">Doctor Name:
                    </span> <span className="detail" id="DName"></span>
                </div>
                <div>
                    <span className="head">Prescription ID:</span> <span className="detail" id="PresID"></span>
                </div>
            </div>
            <div className="date">
                <div><span className="head">Date:</span> <span className="detail" id="Date"></span>
                </div>
            </div>
        </div>

        <div className="bottom_but" style={printbut}>
            <button className="sec-but" onClick={closeHandle} id="close_but">CANCEL</button>
            <button className="pri-but"  onClick={printhandle} id="print_but">PRINT</button>
        </div>
</div>
    
    )
}

export default ReportDetail