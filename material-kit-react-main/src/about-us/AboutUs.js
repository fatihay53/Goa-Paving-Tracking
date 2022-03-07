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
                                    For over 15 years, GOA Paving has been all about quality!

                                    Quality equipment, quality workmanship and quality service. Our experienced team strives to provide you with the best quality workmanship because that is what you invest in.

                                    No job is too big or too small, from driveway construction to streets and roadways.

                                    Give us a call or email us for your free quote today! </p>


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