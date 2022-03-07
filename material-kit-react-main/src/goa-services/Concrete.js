import React, {useEffect} from "react";
import Footer from "../pages/Footer";
import Header from "../Header";
import {Link} from "react-router-dom";
import GeneralUtils from "../utils/GeneralUtils";

export default function Concrete() {
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
                                                COST-EFFECTIVE, EFFICIENT <span class="color">CONCRETE</span>
                                            </h2>

                                            <p>
                                                <em></em>
                                            </p>

                                            <p>
                                                Asphalt isn’t all we do!

                                                Our experienced team can build or repair concrete sidewalks, curbs, and drainage swales.

                                                We offer iron adjustments and municipal road maintenance.

                                                Give us a call and let us take care of all your concrete projects.
                                            </p>
                                    </div>
                                </div>
                            </div>


                            <div class="col-md-3 onStep" data-animation="fadeInUp" data-time="600">
                                <div class="widget">
                                    <ul id="services-list">
                                        <li>
                                            <Link to="/paving">Paving</Link>
                                        </li>

                                        <li>
                                            <Link to="/coldMilling">Cold Milling</Link>
                                        </li>

                                        <li className="active">
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

                <Footer/>
                <div id="totop" class="init">
                    <span class="ti-angle-up"></span>
                </div>

            </div>
        </React.Fragment>);


}