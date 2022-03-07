import React, {useEffect} from "react";
import Footer from "../pages/Footer";
import Header from "../Header";
import '../home-page/main.css'
import {Link} from "react-router-dom";
import GeneralUtils from "../utils/GeneralUtils";

export default function Paving() {
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
                                    Services
                                </h1>
                            </div>
                        </div>
                    </div>
                </section>

                <section class="services whitepage">
                    <div class="container-fluid m-5-hor">
                        <div class="row">
                            <div class="col-md-9">
                                <div class="row">
                                    <div class="col-md-12 onStep" data-animation="fadeInUp" data-time="300">
                                        <img alt="imgservices" class="img-responsive" src="img/Highway3-1568x1175.jpg"/>
                                            <h2>
                                                LATEST TECHNOLOGY <span class="color">PAVING</span>
                                            </h2>

                                            <p>
                                                <em></em>
                                            </p>

                                            <p>
                                                At GOA Paving we can handle all your paving projects.
                                                We offer a complete driveway, parking lot, and road construction. We patch roadways, widen them and install asphalt shouldering.
                                                Call us and let us take care of all your asphalt paving needs.
                                            </p>
                                    </div>
                                </div>
                            </div>


                            <div class="col-md-3 onStep" data-animation="fadeInUp" data-time="600">
                                <div class="widget">
                                    <ul id="services-list">

                                        <li class="active">
                                            <Link to="/paving">Paving</Link>
                                        </li>

                                        <li>
                                            <Link to="/coldMilling">Cold Milling</Link>
                                        </li>

                                        <li>
                                            <Link to="/concrete">Concrete</Link>
                                        </li>

                                        <li>
                                            <Link to="/equipmentRentals">Equipment Rentals</Link>
                                        </li>

                                        <li>
                                            <Link to="/trucking">Trucking</Link>
                                        </li>
                                    </ul>
                                </div>

                            </div>
                        </div>
                    </div>
                </section>

                <section>
                    <div className="container-fluid m-5-hor">
                        <div className="row">

                            <div className="onStep" data-animation="fadeInUp" data-time="0">
                                <div id="owl-gal" className="owl-carousel">

                                    <div className="item">
                                        <div className="gal-home big-img">
                                            <a href="../../img/municipal-work.jpg">
                                                <div className="hovereffect">
                                                    <img alt="imageportofolio" className="img-responsive"
                                                         src="../../img/municipal-work.jpg"/>
                                                    <div className="overlay">
                                                        <h3>Municipal
                                                            <span className="devider"></span>
                                                        </h3>
                                                        <p>Patching, Cold Milling/profiling, Concrete curbs, Sidewalks,
                                                            multi use pathways, road construction, excavating,
                                                            shouldering, and iron adjustments.</p>
                                                    </div>
                                                </div>
                                            </a>
                                        </div>
                                    </div>

                                    <div className="item">
                                        <div className="gal-home">
                                            <a href="../../img/cold_milling558.jpg">
                                                <div className="hovereffect">
                                                    <img alt="imageportofolio" className="img-responsive"
                                                         src="../../img/cold_milling558.jpg"/>
                                                    <div className="overlay">
                                                        <h3>Industrial
                                                            <span className="devider"></span>
                                                        </h3>
                                                        <p>Patching, Cold milling, Parking lot construction and repair,
                                                            Drainage repairs, walkways/sidewalks, excavating, grading,and concrete repair</p>
                                                    </div>
                                                </div>
                                            </a>
                                        </div>
                                    </div>

                                    <div className="item">
                                        <div className="gal-home big-img">
                                            <a href=".../../img/road_construction11.jpg">
                                                <div className="hovereffect">
                                                    <img alt="imageportofolio" className="img-responsive"
                                                         src="../../img/road_construction11.jpg"/>
                                                    <div className="overlay">
                                                        <h3>Residential
                                                            <span className="devider"></span>
                                                        </h3>
                                                        <p>Driveway construction, Walkways,
                                                            pulverizing, excavating,
                                                            and grading</p>
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

                <Footer/>
                <div id="totop" class="init">
                    <span class="ti-angle-up"></span>
                </div>
            </div>
        </React.Fragment>);


}