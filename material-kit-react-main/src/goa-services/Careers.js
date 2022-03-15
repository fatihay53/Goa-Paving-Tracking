import React, {useEffect} from "react";
import Header from "../Header";
import GeneralUtils from "../utils/GeneralUtils";

export default function Careers() {

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
                                    Join Our Team
                                </h1>
                            </div>
                        </div>
                    </div>
                </section>

                <section>
                    <div class="container-fluid">
                        <div class="row">
                            <div className="col-md-12 col-md-offset-1">
                                <p>We are always looking for professionals to join our growing team, at GOA we hire for work ethics and integrity.</p>
                                    <p>If you think you fit the criteria for any of the following positions, send your resume to <span className="color"><a
                                        href="mailto:careers@goapaving.ca"> careers@goapaving.ca</a></span> </p>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </React.Fragment>);


}