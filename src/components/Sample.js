import React from 'react'



function Sample(prop) {
    const hide = {
        display: 'none'
    }
    const display = {
        visibility: 'visibile'
    }


    return (
        // <div class="samples">
        //     <div class="sample_list">
        //         <div class="samp_detail_div">
        //             <p class="samp_head">SAMPLE ID:&emsp;<span class="samp_detail"
        //                 style={{ color: '#74bea4' }} id="testID">5024</span>
        //             </p>
        //             <p class="samp_head">TEST NAME:&emsp;<span class="samp_detail"
        //                 style={{ color: '#74bea4' }} id="testName">Hemoglobin AIC</span>
        //             </p>
        //         </div>
        //         <div class="samp_button" style={(prop.right === 'inprocess' ? display : hide)} >
        //             <button class="but proceed_but">PROCEED</button>
        //             <button class="but delete_but">DELETE</button>
        //         </div>
        //     </div>
        // </div>
        <div className="">
            <div className="sample_list">
                <div className="samp_detail_div">
                    <p className="samp_head">SAMPLE ID:&emsp;<span className="samp_detail" style={{ color: '#74bea4' }} id="testID">{prop.testID}</span></p>
                    <p className="samp_head">TEST NAME:&emsp;<span className="samp_detail" style={{ color: '#74bea4' }} id="testName">{prop.testName}</span></p>
                </div>
                <div className="samp_button" style={(prop.right === 'inprocess' ? display : hide)}>
                    <button className="but proceed_but">PROCEED</button>
                    <button className="but delete_but">DELETE</button>
                </div>
            </div>
        </div>
    )
}

export default Sample