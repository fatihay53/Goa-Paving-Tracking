import React, {useEffect} from "react";
import Footer from "../pages/Footer";
import Header from "../Header";
import LetUsKnow from "../goa-services/LetUsKnow";
import GeneralUtils from "../utils/GeneralUtils";
import MCarousel from "./MCarousel";

export default function HomePage() {
    useEffect(()=>{
        GeneralUtils.reloadJQuery();
        var revapi;
        revapi = jQuery( '#revolution-slider' )
            .revolution( {
                delay: 15000,
                startwidth: 1170,
                startheight: 600,
                onHoverStop: "on",
                thumbWidth: 100,
                thumbHeight: 50,
                thumbAmount: 3,
                stopAtSlide: -1,
                stopAfterLoops: -1,
                touchenabled: "on",
                navigationType: "none",
                dottedOverlay: "",
                fullWidth: "on",
                fullScreen: "on",
                shadow: 0
            } );

        //ply js
        var plyer = jQuery('#player');
        if (plyer.length) {
            const player = new Plyr('#player');
        }
    },[])

    return (
        <React.Fragment>
            <div className="content-wrapper">
                <Header/>
                <div id="home">

                    <section className="fullwidthbanner-container no-bottom no-top" aria-label="section-slider">
                        <div id="revolution-slider">
                            <ul>

                                <li data-transition="parallaxtobottom" data-slotamount="10" data-masterspeed="1200"
                                    data-delay="5000">
                                    <img src="../../images-slider/IMG_2183.jpg" alt="" data-start="0"
                                         data-bgposition="center center" data-kenburns="on" data-duration="10000"
                                         data-ease="Linear.easeNone" data-bgfit="120" data-bgfitend="100"
                                         data-bgpositionend="center center"/>
                                    <div className="tp-caption big-heading sft"
                                         data-x="50"
                                         data-y="200"
                                         data-speed="800"
                                         data-start="400"
                                         data-easing="easeInOutExpo"
                                         data-endspeed="450">
                                        Quality and precision
                                    </div>

                                    <div className="tp-caption sub-heading sft"
                                         data-x="50"
                                         data-y="280"
                                         data-speed="1000"
                                         data-start="800"
                                         data-easing="easeOutExpo"
                                         data-endspeed="400">
                                        is our top priority
                                    </div>

                                    <div className="tp-caption sfb"
                                         data-x="50"
                                         data-y="350"
                                         data-speed="400"
                                         data-start="800"
                                         data-easing="easeInOutExpo">
                                    </div>
                                </li>

                                <li data-transition="parallaxtobottom" data-slotamount="10" data-masterspeed="1200"
                                    data-delay="5000">
                                    <img src="../../images-slider/goa-trucks.jpg" alt="" data-start="0"
                                         data-bgposition="center center" data-kenburns="on" data-duration="10000"
                                         data-ease="Linear.easeNone" data-bgfit="120" data-bgfitend="100"
                                         data-bgpositionend="center center"/>
                                    <div className="tp-caption big-heading sft"
                                         data-x="50"
                                         data-y="200"
                                         data-speed="800"
                                         data-start="400"
                                         data-easing="easeInOutExpo"
                                         data-endspeed="450">
                                        Experience
                                    </div>

                                    <div className="tp-caption sub-heading sft"
                                         data-x="50"
                                         data-y="280"
                                         data-speed="1000"
                                         data-start="800"
                                         data-easing="easeOutExpo"
                                         data-endspeed="400">
                                        with remarkable service
                                    </div>

                                    <div className="tp-caption sfb"
                                         data-x="50"
                                         data-y="350"
                                         data-speed="400"
                                         data-start="800"
                                         data-easing="easeInOutExpo">
                                    </div>
                                </li>

                                <li data-transition="parallaxtobottom" data-slotamount="10" data-masterspeed="1200"
                                    data-delay="5000">
                                    <img src="../../images-slider/IMG_4428.jpg" alt="" data-start="0"
                                         data-bgposition="center center" data-kenburns="on" data-duration="10000"
                                         data-ease="Linear.easeNone" data-bgfit="120" data-bgfitend="100"
                                         data-bgpositionend="center center"/>
                                    <div className="tp-caption big-heading sft"
                                         data-x="50"
                                         data-y="200"
                                         data-speed="800"
                                         data-start="400"
                                         data-easing="easeInOutExpo"
                                         data-endspeed="450">
                                        Paving
                                    </div>

                                    <div className="tp-caption sub-heading sft"
                                         data-x="50"
                                         data-y="280"
                                         data-speed="1000"
                                         data-start="800"
                                         data-easing="easeOutExpo"
                                         data-endspeed="400">
                                        with latest technology
                                    </div>

                                    <div className="tp-caption sfb"
                                         data-x="50"
                                         data-y="350"
                                         data-speed="400"
                                         data-start="800"
                                         data-easing="easeInOutExpo">
                                    </div>
                                </li>

                            </ul>
                            <div className="tp-bannertimer hide"></div>
                        </div>
                    </section>

                </div>


                <section className="color-page">

                    <div className="container-fluid m-5-hor">
                        <div className="row">

                            <div className="col-md-12 onStep" data-animation="fadeInLeft" data-time="0">
                                <h4 className="bg-dots">why choose us?</h4>
                                <p>GOA Paving uses quality materials and industry leading technology to ensure a durable, and long lasting product for our clients.</p>
                                <p>You can count on our 15+ years experience and professional team to complete your project on time and on budget.</p>
                                <span className="devider-left"></span>
                            </div>

                            <div className="space-single"></div>

                            <div className="col-md-4 onStep" data-animation="fadeInUp" data-time="300">
                                <div className="box-icon">
                                    <span className="icon-choose fa fa-building-o"></span>
                                    <div className="text">
                                        <h3><span className="color">MODERN EQUIPMENT</span></h3>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-4 onStep" data-animation="fadeInUp" data-time="300">
                                <div className="box-icon">
                                    <span className="icon-choose fa fa-life-ring"></span>
                                    <div className="text">
                                        <h3><span className="color">LATEST TECHNOLOGY</span></h3>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-4 onStep" data-animation="fadeInUp" data-time="300">
                                <div className="box-icon">
                                    <span className="icon-choose fa fa-lightbulb-o"></span>
                                    <div className="text">
                                        <h3><span className="color">15 YEARS VISION</span></h3>
                                    </div>
                                </div>
                            </div>

                            <div className="spacer-single"></div>

                            <div className="col-md-4 onStep" data-animation="fadeInUp" data-time="600">
                                <div className="box-icon">
                                    <span className="icon-choose fa fa-users"></span>
                                    <div className="text">
                                        <h3><span className="color">EXPERT WORKERS</span></h3>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-4 onStep" data-animation="fadeInUp" data-time="600">
                                <div className="box-icon">
                                    <span className="icon-choose fa fa-cubes"></span>
                                    <div className="text">
                                        <h3><span className="color">QUALITY SERVICE</span></h3>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-4 onStep" data-animation="fadeInUp" data-time="600">
                                <div className="box-icon">
                                    <span className="icon-choose fa fa-headphones"></span>
                                    <div className="text">
                                        <h3><span className="color">7 A.M - 7 P.M Support</span>
                                            <p>(Saturday, Sunday closed)</p></h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>


                <section>
                    <div className="container-fluid m-5-hor">
                        <div className="row">
                            <MCarousel/>
                        </div>
                    </div>
                </section>

                <LetUsKnow/>

                <Footer/>

                <div id="totop" className="init">
                    <span className="ti-angle-up"></span>
                </div>

            </div>
        </React.Fragment>
    )
}