import React from "react";
import Footer from "../pages/Footer";
import Header from "../Header";

export default function EquipmentRentals() {


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
                                        <img alt="imgservices" class="img-responsive" src="img/Equipement2-1568x1175.jpg"/>
                                            <h2>
                                                MODERN <span class="color">EQUIPMENT</span>
                                            </h2>

                                            <p>
                                                <em></em>
                                            </p>

                                            <p>
                                                At GOA we pride ourselves on our modern fleet of trucks and equipment.

                                                We can provide you with:
                                                Pavers; rollers, skid steers, cold milling machines, shoulder spreaders, tack distributors, excavators, and more!

                                                If you are looking for some extra muscle on your project, give us a call.
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

                                        <li>
                                            <a href="/coldMilling">Cold Milling</a>
                                        </li>

                                        <li>
                                            <a href="/concrete">Concrete</a>
                                        </li>

                                        <li class="active">
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