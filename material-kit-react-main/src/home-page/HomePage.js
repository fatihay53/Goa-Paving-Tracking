import React from "react";
import Footer from "../pages/Footer";
import Header from "../Header";
import LetUsKnow from "../goa-services/LetUsKnow";

export default function HomePage() {


    return (
        <React.Fragment>
        <div class="bg-preloader-white"></div>
    <div class="preloader-white">
        <div class="mainpreloader">
            <span></span>
        </div>
    </div>

    <div class="content-wrapper">

        <Header/>

        <div id="home">

            <section class="fullwidthbanner-container no-bottom no-top" aria-label="section-slider">
                <div id="revolution-slider">
                    <ul>

                        <li data-transition="parallaxtobottom" data-slotamount="10" data-masterspeed="1200"
                            data-delay="5000">
                            <img src="../../images-slider/Equipement3.jpg" alt="" data-start="0"
                                 data-bgposition="center center" data-kenburns="on" data-duration="10000"
                                 data-ease="Linear.easeNone" data-bgfit="120" data-bgfitend="100"
                                 data-bgpositionend="center center"/>
                            <div class="tp-caption big-heading sft"
                                 data-x="50"
                                 data-y="200"
                                 data-speed="800"
                                 data-start="400"
                                 data-easing="easeInOutExpo"
                                 data-endspeed="450">
                                Experience the Requirements
                            </div>

                            <div class="tp-caption sub-heading sft"
                                 data-x="50"
                                 data-y="280"
                                 data-speed="1000"
                                 data-start="800"
                                 data-easing="easeOutExpo"
                                 data-endspeed="400">
                                with precision
                            </div>

                            <div class="tp-caption sfb"
                                 data-x="50"
                                 data-y="350"
                                 data-speed="400"
                                 data-start="800"
                                 data-easing="easeInOutExpo">
                                <div class="btn-slider"><span class="shine"></span><a href="/aboutUs">More Detail</a>
                                </div>
                            </div>
                        </li>

                        <li data-transition="parallaxtobottom" data-slotamount="10" data-masterspeed="1200"
                            data-delay="5000">
                            <img src="../../images-slider/Equipement2-1568x1175.jpg" alt="" data-start="0"
                                 data-bgposition="center center" data-kenburns="on" data-duration="10000"
                                 data-ease="Linear.easeNone" data-bgfit="120" data-bgfitend="100"
                                 data-bgpositionend="center center"/>
                            <div class="tp-caption big-heading sft"
                                 data-x="50"
                                 data-y="200"
                                 data-speed="800"
                                 data-start="400"
                                 data-easing="easeInOutExpo"
                                 data-endspeed="450">
                                Equipment Rentals
                            </div>

                            <div class="tp-caption sub-heading sft"
                                 data-x="50"
                                 data-y="280"
                                 data-speed="1000"
                                 data-start="800"
                                 data-easing="easeOutExpo"
                                 data-endspeed="400">
                                modern trucks
                            </div>

                            <div class="tp-caption sfb"
                                 data-x="50"
                                 data-y="350"
                                 data-speed="400"
                                 data-start="800"
                                 data-easing="easeInOutExpo">
                                <div class="btn-slider"><span class="shine"></span><a href="/equipmentRentals">More Detail</a>
                                </div>
                            </div>
                        </li>

                        <li data-transition="parallaxtobottom" data-slotamount="10" data-masterspeed="1200"
                            data-delay="5000">
                            <img src="../../images-slider/Equipement4-1568x1175.jpg" alt="" data-start="0"
                                 data-bgposition="center center" data-kenburns="on" data-duration="10000"
                                 data-ease="Linear.easeNone" data-bgfit="120" data-bgfitend="100"
                                 data-bgpositionend="center center"/>
                            <div class="tp-caption big-heading sft"
                                 data-x="50"
                                 data-y="200"
                                 data-speed="800"
                                 data-start="400"
                                 data-easing="easeInOutExpo"
                                 data-endspeed="450">
                                Paving
                            </div>

                            <div class="tp-caption sub-heading sft"
                                 data-x="50"
                                 data-y="280"
                                 data-speed="1000"
                                 data-start="800"
                                 data-easing="easeOutExpo"
                                 data-endspeed="400">
                                with latest technology
                            </div>

                            <div class="tp-caption sfb"
                                 data-x="50"
                                 data-y="350"
                                 data-speed="400"
                                 data-start="800"
                                 data-easing="easeInOutExpo">
                                <div class="btn-slider"><span class="shine"></span><a href="/paving">More Detail</a>
                                </div>
                            </div>
                        </li>

                    </ul>
                    <div class="tp-bannertimer hide"></div>
                </div>
            </section>

        </div>


        <section class="color-page">

            <div class="container-fluid m-5-hor">
                <div class="row">

                    <div class="col-md-12 onStep" data-animation="fadeInLeft" data-time="0">
                        <h4 class="bg-dots">why choose us?</h4>
                        <p>We listen carefully about what clients needed</p>
                        <span class="devider-left"></span>
                    </div>

                    <div class="space-single"></div>

                    <div class="col-md-4 onStep" data-animation="fadeInUp" data-time="300">
                        <div class="box-icon">
                            <span class="icon-choose fa fa-building-o"></span>
                            <div class="text">
                                <h3><span class="color">MODERN EQUIPMENT</span></h3>
                            </div>
                        </div>
                    </div>

                    <div class="col-md-4 onStep" data-animation="fadeInUp" data-time="300">
                        <div class="box-icon">
                            <span class="icon-choose fa fa-life-ring"></span>
                            <div class="text">
                                <h3><span class="color">LATEST TECHNOLOGY</span></h3>
                            </div>
                        </div>
                    </div>

                    <div class="col-md-4 onStep" data-animation="fadeInUp" data-time="300">
                        <div class="box-icon">
                            <span class="icon-choose fa fa-lightbulb-o"></span>
                            <div class="text">
                                <h3><span class="color">15 YEARS VISION</span></h3>
                            </div>
                        </div>
                    </div>

                    <div class="spacer-single"></div>

                    <div class="col-md-4 onStep" data-animation="fadeInUp" data-time="600">
                        <div class="box-icon">
                            <span class="icon-choose fa fa-users"></span>
                            <div class="text">
                                <h3><span class="color">EXPERT WORKERS</span></h3>
                            </div>
                        </div>
                    </div>

                    <div class="col-md-4 onStep" data-animation="fadeInUp" data-time="600">
                        <div class="box-icon">
                            <span class="icon-choose fa fa-cubes"></span>
                            <div class="text">
                                <h3><span class="color">QUALITY SERVICE</span></h3>
                            </div>
                        </div>
                    </div>

                    <div class="col-md-4 onStep" data-animation="fadeInUp" data-time="600">
                        <div class="box-icon">
                            <span class="icon-choose fa fa-headphones"></span>
                            <div class="text">
                                <h3><span class="color">7 A.M - 7 P.M Support</span>
                                <p>(Saturday, Sunday closed)</p></h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>


        <section>
            <div class="container-fluid m-5-hor">
                <div class="row">

                    <div class="onStep" data-animation="fadeInUp" data-time="0">
                        <div id="owl-gal" class="owl-carousel">

                            <div class="item">
                                <div class="gal-home big-img">
                                    <a href="../../img/municipal-work.jpg">
                                        <div class="hovereffect">
                                            <img alt="imageportofolio" class="img-responsive"
                                                 src="../../img/municipal-work.jpg"/>
                                                <div class="overlay">
                                                    <h3>Municipal Works
                                                        <span class="devider"></span>
                                                    </h3>
                                                    <p>More Detail</p>
                                                </div>
                                        </div>
                                    </a>
                                </div>
                            </div>

                            <div class="item">
                                <div class="gal-home">
                                    <a href="../../img/cold_milling2.jpg">
                                        <div class="hovereffect">
                                            <img alt="imageportofolio" class="img-responsive"
                                                 src="../../img/cold_milling2.jpg"/>
                                                <div class="overlay">
                                                    <h3>Cold Milling
                                                        <span class="devider"></span>
                                                    </h3>
                                                    <p>More Detail</p>
                                                </div>
                                        </div>
                                    </a>
                                </div>
                            </div>

                            <div class="item">
                                <div class="gal-home big-img">
                                    <a href="../../img/Driveway2-1568x1117.jpg">
                                        <div class="hovereffect">
                                            <img alt="imageportofolio" class="img-responsive"
                                                 src="../../img/Driveway2-1568x1117.jpg"/>
                                                <div class="overlay">
                                                    <h3>Driveway
                                                        <span class="devider"></span>
                                                    </h3>
                                                    <p>More Detail</p>
                                                </div>
                                        </div>
                                    </a>
                                </div>
                            </div>

                            <div class="item">
                                <div class="gal-home big-img">
                                    <a href="../../img/Residential-Street4-1568x1175.jpg">
                                        <div class="hovereffect">
                                            <img alt="imageportofolio" class="img-responsive"
                                                 src="../../img/Residential-Street4-1568x1175.jpg"/>
                                                <div class="overlay">
                                                    <h3>Residential Street
                                                        <span class="devider"></span>
                                                    </h3>
                                                    <a href="/contact"><p>More Detail</p></a>
                                                </div>
                                        </div>
                                    </a>
                                </div>
                            </div>

                            <div class="item">
                                <div class="gal-home">
                                    <a href="../../img/road_construction.jpg">
                                        <div class="hovereffect">
                                            <img alt="imageportofolio" class="img-responsive"
                                                 src="../../img/road_construction.jpg"/>
                                                <div class="overlay">
                                                    <h3>Road Construction
                                                        <span class="devider"></span>
                                                    </h3>
                                                    <a href="/contact"><p>More Detail</p></a>
                                                </div>
                                        </div>
                                    </a>
                                </div>
                            </div>

                            <div class="item">
                                <div class="gal-home big-img">
                                    <a href="../../img/projects-w/parking555.jpg">
                                        <div class="hovereffect">
                                            <img alt="imageportofolio" class="img-responsive"
                                                 src="../../img/projects-w/parking555.jpg"/>
                                                <div class="overlay">
                                                    <h3>Parking
                                                        <span class="devider"></span>
                                                    </h3>
                                                    <p>More Detail</p>
                                                </div>
                                        </div>
                                    </a>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </section>

        <LetUsKnow/>

        <Footer/>

        <div id="totop" class="init">
            <span class="ti-angle-up"></span>
        </div>

    </div>
        </React.Fragment>
)
}