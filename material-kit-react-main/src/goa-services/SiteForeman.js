import React, {useEffect} from "react";
import Footer from "../pages/Footer";
import Header from "../Header";
import {Link} from "react-router-dom";
import GeneralUtils from "../utils/GeneralUtils";

export default function SiteForeman() {
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
                                            <span class="color">Site Foreman </span>
                                        </h2>

                                        <p>
                                            <em></em>
                                        </p>

                                        <ul>
                                            <li style={{listStyle: "circle", marginLeft: "30px"}}>Full time/Seasonal
                                            </li>
                                            <span style={{fontWeight: 'bold'}}>Responsibilities include, but are not limited to;</span>
                                            <li style={{listStyle: "circle", marginLeft: "30px"}}>Order Materials as needed</li>
                                            <li style={{listStyle: "circle", marginLeft: "30px"}}>Dispatch crew & equipment accordingly
                                            </li>
                                            <li style={{listStyle: "circle", marginLeft: "30px"}}>Communicate with supervisors and quality control on site
                                            </li>
                                            <li style={{listStyle: "circle", marginLeft: "30px"}}>Ensure company safety policies and quality standards are being practiced
                                            </li>
                                            <li style={{listStyle: "circle", marginLeft: "30px"}}>Ensure projects remain on time & on budget
                                            </li>
                                            <li style={{listStyle: "circle", marginLeft: "30px"}}>Record daily production
                                            </li>
                                            <li style={{listStyle: "circle", marginLeft: "30px"}}>Mark and measure work area
                                            </li>
                                            <li style={{listStyle: "circle", marginLeft: "30px"}}>Oversee training of new employees
                                            </li>
                                            <li style={{listStyle: "circle", marginLeft: "30px"}}>Perform safety inspections
                                            </li>
                                            <li style={{listStyle: "circle", marginLeft: "30px"}}>Attend regular safety meetings
                                            </li>
                                            <span style={{fontWeight: 'bold'}}>Requirements;</span>
                                            <li style={{listStyle: "circle", marginLeft: "30px"}}>Applicants must have valid class “G” or higher driver’s license</li>
                                            <li style={{listStyle: "circle", marginLeft: "30px"}}>Prior supervisory role in asphalt paving
                                            </li>
                                            <li style={{listStyle: "circle", marginLeft: "30px"}}>Ability to understand and execute traffic plans to ON book.7 spec
                                            </li>
                                            <li style={{listStyle: "circle", marginLeft: "30px"}}>Ability to work to strict deadlines
                                            </li>
                                            <li style={{listStyle: "circle", marginLeft: "30px"}}>Ability to follow orders
                                            </li>
                                            <li style={{listStyle: "circle", marginLeft: "30px"}}>Ability to work long hours in all weather conditions
                                            </li>
                                            <li style={{listStyle: "circle", marginLeft: "30px"}}>Must be willing to work away from home
                                            </li>
                                            <li style={{listStyle: "circle", marginLeft: "30px"}}>Must maintain a positive attitude
                                            </li>
                                            <li style={{listStyle: "circle", marginLeft: "30px"}}>Must have excellent leadership & communication skills
                                            </li>
                                            <li style={{listStyle: "circle", marginLeft: "30px"}}>Must have good interpersonal skills
                                            </li>
                                            <span style={{fontWeight: 'bold'}}>Compensation;</span>
                                            <li style={{listStyle: "circle", marginLeft: "30px"}}>Wage based on experience ($50,000-$70,000) starting salary </li>
                                            <li style={{listStyle: "circle", marginLeft: "30px"}}>Complete benefits package offered after probationary period
                                            </li>
                                            <li style={{listStyle: "circle", marginLeft: "30px"}}>Transportation provided
                                            </li>
                                            <li style={{listStyle: "circle", marginLeft: "30px"}}>Room & board provided when working away from home
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
                                        <li>
                                            <Link to="/asphaltLaborer">Asphalt Laborer</Link>
                                        </li>
                                        <li className="active">
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