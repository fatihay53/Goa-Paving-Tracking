import React from "react";


export default function Footer() {
    return(<footer className="main text-center">
        <div className="container-fluid m-5-hor">
            <div className="row">

                <div className="onStep" data-animation="fadeInUp" data-time="300">
                    <div className="col-md-4 text-left">
                        <span><a href="#">Email: accounting@goapaving.ca</a></span>
                        <span>Copyright - GOA PAVING © {new Date().getFullYear()} All Right Reserved</span>
                    </div>

                    <div className="col-md-4">
                <span className="logo" style={{display:'flex',justifyContent:'center'}}>
                    <img alt="logo" height="80px" src="../../img/GOA_Logo_stroke-1.png"/>
                </span>
                    </div>

                    <div className="col-md-4 text-right">
                        <span>Greater Ottawa Area Paving</span>
                        <span>564 Slate Falls Road</span>
                        <span>Denbigh, Ontario K0H1L0</span>
                        <span>Phone: (613) 333-9222</span>
                    </div>
                </div>


            </div>
        </div>
    </footer>);

}