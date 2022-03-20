import React, {useEffect} from "react";
import Footer from "../pages/Footer";
import Header from "../Header";
import {Link} from "react-router-dom";
import GeneralUtils from "../utils/GeneralUtils";

export default function AsphaltLaborer() {
    useEffect(() => {
        GeneralUtils.reloadJQuery();
    }, []);

    return (
        <React.Fragment>

            <div class="content-wrapper">

                <Header/>
                <section id="subheader">
                    <div class="container-fluid m-5-hor">
                        <div class="row">
                            <div class="col-md-12">
                                <h1>
                                    Positions
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
                                        <h2>
                                            <span class="color">Asphalt Laborer</span>
                                        </h2>

                                        <p>
                                            <em></em>
                                        </p>

                                        <ul>
                                            <li style={{listStyle: "circle", marginLeft: "30px"}}>Full time/Seasonal
                                            </li>
                                            <span style={{fontWeight: 'bold'}}>Responsibilities include, but are not limited to;</span>
                                            <li style={{listStyle: "circle", marginLeft: "30px"}}>Offloading & Loading tools </li>
                                            <li style={{listStyle: "circle", marginLeft: "30px"}}>Shoveling & Raking
                                            </li>
                                            <li style={{listStyle: "circle", marginLeft: "30px"}}>Sweeping and Cleaning
                                            </li>
                                            <li style={{listStyle: "circle", marginLeft: "30px"}}>Work as a Traffic Control Person
                                            </li>
                                            <li style={{listStyle: "circle", marginLeft: "30px"}}>Maintain cleanliness on the jobsite
                                            </li>
                                            <li style={{listStyle: "circle", marginLeft: "30px"}}>Assisting fellow crew members
                                            </li>
                                            <li style={{listStyle: "circle", marginLeft: "30px"}}>Attend regular safety meetings
                                            </li>
                                            <span style={{fontWeight: 'bold'}}>Requirements;</span>
                                            <li style={{listStyle: "circle", marginLeft: "30px"}}>Applicants must have
                                                valid class “G” or higher driver’s license</li>
                                            <li style={{listStyle: "circle", marginLeft: "30px"}}>Construction experience a must (paving experience an asset, but not required)
                                            </li>
                                            <li style={{listStyle: "circle", marginLeft: "30px"}}>Ability to work long hours in all weather conditions
                                            </li>
                                            <li style={{listStyle: "circle", marginLeft: "30px"}}>Ability to stand for extended periods of time
                                            </li>
                                            <li style={{listStyle: "circle", marginLeft: "30px"}}>Must be willing to work away from home
                                            </li>
                                            <li style={{listStyle: "circle", marginLeft: "30px"}}>Must be physically fit
                                            </li>
                                            <li style={{listStyle: "circle", marginLeft: "30px"}}>Must work well in a team setting
                                            </li>
                                            <li style={{listStyle: "circle", marginLeft: "30px"}}>Must be positive and
                                                willing to learn
                                            </li>
                                            <span style={{fontWeight: 'bold'}}>Compensation;</span>
                                            <li style={{listStyle: "circle", marginLeft: "30px"}}>Wage based on experience ($17-$23) hourly rate</li>
                                            <li style={{listStyle: "circle", marginLeft: "30px"}}>Complete benefits package offered after probationary period
                                            </li>
                                            <li style={{listStyle: "circle", marginLeft: "30px"}}>Transportation provided
                                            </li>
                                            <li style={{listStyle: "circle", marginLeft: "30px"}}>Room & board provided
                                                when working away from home
                                            </li>
                                        </ul>
                                        <p>
                                            <em></em>
                                        </p>
                                        <span style={{marginLeft: "10em"}}><h3>If you think you fit the criteria for any of the following positions, send your resume to <span className="color"><a
                                            href="mailto:careers@goapaving.ca"> careers@goapaving.ca</a></span> </h3></span>

                                    </div>
                                </div>
                            </div>


                            <div class="col-md-3 onStep" data-animation="fadeInUp" data-time="600">
                                <div class="widget">
                                    <ul id="services-list">
                                        <li>
                                            <Link to="/grinderOperator">
                                                Grinder Operator (cold milling machine)
                                            </Link>
                                        </li>

                                        <li>
                                            <Link to="/azDriver">AZ Driver</Link>
                                        </li>

                                        <li>
                                            <Link to="/asphaltPaverOperator">Asphalt Paver Operator/Tailender</Link>
                                        </li>
                                        <li className="active">
                                            <Link to="/asphaltLaborer">Asphalt Laborer</Link>
                                        </li>
                                        <li>
                                            <Link to="/siteForeman">Site Foreman</Link>
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