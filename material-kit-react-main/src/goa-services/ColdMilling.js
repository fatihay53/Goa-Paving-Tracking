import React from "react";
import Footer from "../pages/Footer";
import Header from "../Header";

export default function ColdMilling() {


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
                                        <img alt="imgservices" class="img-responsive" src="img/cold_milling11.jpg"/>
                                            <h2>
                                                INNOVATIVE, EFFICIENT, ECONOMICAL <span class="color">COLD MILLING</span> MACHINES
                                            </h2>

                                            <p>
                                                <em></em>
                                            </p>

                                            <p>
                                                GOA Paving has the latest technology and skilled crews to handle all your cold milling and profiling requirements.

                                                We can often mill out problem asphalt areas and repave them at a lower cost than excavating.
                                                From parking lots to roadways, our team will get the job done quickly and efficiently.

                                                Give us a call let us take care of all your milling needs.
                                            </p>
                                    </div>
                                </div>
                            </div>


                            <div class="col-md-3 onStep" data-animation="fadeInUp" data-time="600">
                                <div class="widget">
                                    <ul id="services-list">

                                        <li>
                                            <a href="/paving">Paving</a>
                                        </li>

                                        <li class="active">
                                            <a href="/coldMilling">Cold Milling</a>
                                        </li>

                                        <li>
                                            <a href="/concrete">Concrete</a>
                                        </li>

                                        <li>
                                            <a href="/equipmentRentals">Equipment Rentals</a>
                                        </li>

                                        <li>
                                            <a href="/trucking">Trucking</a>
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