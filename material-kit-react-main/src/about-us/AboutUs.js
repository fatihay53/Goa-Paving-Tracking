import React, {useEffect} from "react";
import Footer from "../pages/Footer";
import Header from "../Header";
import GeneralUtils from "../utils/GeneralUtils";

export default function AboutUs() {

    useEffect(()=>{
        GeneralUtils.reloadJQuery();
    },[]);

return(
    <React.Fragment>

        <div className="content-wrapper">

            <Header/>

            <section id="subheader">
                <div className="container-fluid m-5-hor">
                    <div className="row">
                        <div className="col-md-12">
                            <h1>
                                About Us
                            </h1>
                        </div>
                    </div>
                </div>
            </section>

            <section id="about-us-1" className="col-content color-page">
                <div className="container-fluid m-5-hor">
                    <div className="row">

                        <div className="col-md-8">
                            <div className="sp-padding">
                                <h4 className="bg-dots">
                                    Quality
                                    <span className="devider-cont"></span>
                                </h4>

                                <p>
                                    Since 2006 GOA Paving has been a family owned and operated business serving all of eastern Ontario.

                                    Our professional team strives to provide you with some of the best quality workmanship and service in the business.

                                    From driveways, to streets and parking lots, no project is too big or too small for GOA Paving.
                                </p>


                            </div>
                        </div>

                        <div className="col-md-3 col-md-offset-1">
                            <div className="sp-padding">
                                <div className="features">
                                    <div className="bg-img-3">
                                        <div className="bg-overlay">
                                            <span className="number">15</span>
                                            <span className="content">Years of
Experience</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            <section className="whitepage no-bottom no-top no-padding">

                <div className="container-fluid">
                    <div className="row">

                        <div className="no-gutter">

                            <div className="col-md-4">
                                <div className="features no-margin">
                                    <div className="bg-img">
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-4">
                                <div className="features no-margin">
                                    <div className="bg-img-1">
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-4">
                                <div className="features no-margin">
                                    <div className="bg-img-2">
                                    </div>
                                </div>
                            </div>

                        </div>

                    </div>
                </div>
            </section>


            <Footer/>

            <div id="totop" className="init">
                <span className="ti-angle-up"></span>
            </div>

        </div>
    </React.Fragment>
);

}