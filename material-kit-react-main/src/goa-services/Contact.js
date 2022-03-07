import React, {useEffect} from "react";
import Header from "../Header";
import GeneralUtils from "../utils/GeneralUtils";

export default function Contact() {

    useEffect(()=>{
        GeneralUtils.reloadJQuery();
    },[]);

    return (
        <React.Fragment>

            <div class="content-wrapper">

                <Header/>
                <section id="subheader">
                    <div class="container-fluid m-5-hor">
                        <div class="row">
                            <div class="col-md-12">
                                <h1>
                                    Contact Us
                                </h1>
                            </div>
                        </div>
                    </div>
                </section>

                <section aria-label="map" class="no-bottom">
                    <div class="container-fluid m-5-hor">
                        <div class="row">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d11250.307200745492!2d-77.2610279!3d45.175419!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xacf66001062ff3f0!2sGOA%20Paving!5e0!3m2!1sen!2str!4v1646066525590!5m2!1sen!2str"
                                width="800" height="400" style={{border:0}} allowFullScreen="" loading="lazy"></iframe>
                            <div className="col-md-3 col-md-offset-1">
                                <h3 className="heading-cont">Contact Information</h3>
                                <address className="cont-1">
                                    <span>Greater Ottawa Area Paving</span>
                                    <span>564 Slate Falls Road</span>
                                    <span>Denbigh, Ontario K0H1L0</span>
                                    <span><strong>PHONE:</strong> (613) 333-9222</span>
                                    <span><strong>EMAIL:</strong><a
                                        href="mailto:accounting@goapaving.ca"> accounting@goapaving.ca</a></span>
                                    <span><strong>WEB:</strong><a href="#"> www.goapaving.ca</a></span>
                                </address>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </React.Fragment>);


}