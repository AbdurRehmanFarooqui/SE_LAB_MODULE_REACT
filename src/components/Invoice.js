import React from 'react'

function printhandle() {
    window.print();
}

function Invoice() {
  return (
    <section className="right_sec" id="main">
        <div className="grow">
            <h3>INVOICE</h3>
            <div className="pres_detail">
                <div className="head_detail">
                    <div><span className="head">Patient Name:</span> <span className="detail" id="Name">Hamza Ahmed</span>
                    </div>
                    <div>
                        <span className="head">Doctor Name:
                        </span> <span className="detail" id="Doc_Name">Dr. Ali</span>
                    </div>
                    <div>
                        <span className="head">Prescription ID:</span> <span className="detail" id="Pres_ID">145233</span>
                    </div>
                </div>
                <div className="date">
                    <div><span className="head">Date:</span> <span className="detail">05/05/2023</span>
                    </div>
                </div>
            </div>

            <div className="test_detail">
                <div className="test_head">
                    <h4>TESTS</h4>
                    <h4>COST</h4>
                </div>
                <div className="test_over">
                    <div className="test">
                        <div className="test_name">Hemoglobin A1C</div>
                        <div className="test_cost">$15.00</div>
                    </div>
                    <div className="test">
                        <div className="test_name">Lipid Panel</div>
                        <div className="test_cost">$25.00</div>
                    </div>
                    <div className="test">
                        <div className="test_name">Thyroid Function Test</div>
                        <div className="test_cost">$50.00</div>
                    </div>
                </div>
            </div>
        </div>
        <div className="total_bottom">
            <div className="break"></div>
            <div className="test_head">
                <h4>TOTAL COST</h4>
                <div className="test_cost">$90.00</div>
            </div>
            <div className="bottom_but">
                <button onClick={printhandle} id="print_but">PRINT</button>
            </div>
        </div>
    </section>
  )
}

export default Invoice