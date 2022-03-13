import React, {useEffect} from "react";
import Footer from "../pages/Footer";
import Header from "../Header";
import {Link} from "react-router-dom";
import GeneralUtils from "../utils/GeneralUtils";

export default function Commercial() {
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
                                        <img alt="imgservices" class="img-responsive" src="img/Equipement3.jpg"/>
                                            <h2>
                                                <span class="color">Commercial</span>
                                            </h2>

                                            <p>
                                                <em></em>
                                            </p>

                                            <ul>
                                                <li style={{listStyle:"circle", marginLeft:"30px"}}>Parking lots</li>

                                                <li style={{listStyle:"circle", marginLeft:"30px"}}>Pathways</li>

                                                <li style={{listStyle:"circle", marginLeft:"30px"}}> Concrete</li>

                                                <li style={{listStyle:"circle", marginLeft:"30px"}}> Drainage</li>

                                                <li style={{listStyle:"circle", marginLeft:"30px"}}> Cold milling</li>

                                                <li style={{listStyle:"circle", marginLeft:"30px"}}>Excavating</li>

                                                <li style={{listStyle:"circle", marginLeft:"30px"}}> Grading</li>

                                            </ul>
                                    </div>
                                </div>
                            </div>


                            <div class="col-md-3 onStep" data-animation="fadeInUp" data-time="600">
                                <div class="widget">
                                    <ul id="services-list">
                                        <li>
                                            <Link to="/residential">Residential</Link>
                                        </li>

                                        <li className="active">
                                            <Link to="/commercial">Commercial</Link>
                                        </li>

                                        <li>
                                            <Link to="/municipal">Municipal</Link>
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