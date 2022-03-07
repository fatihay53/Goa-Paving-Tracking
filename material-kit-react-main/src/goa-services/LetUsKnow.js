import React, {useEffect} from "react";
import {Link} from "react-router-dom";
import GeneralUtils from "../utils/GeneralUtils";


export default function LetUsKnow(){
    useEffect(()=>{
        GeneralUtils.reloadJQuery();
    },[]);

    return(
        <React.Fragment>
            <section>
                <div className="container-fluid m-5-hor">
                    <div className="row goldpage">

                        <div className="col-lg-9 col-md-12 text-center">
                            <h3>Looking for a quality and cost-effective paving, cold milling, concrete, trucking or
                                equipment rental for your next project?</h3>
                        </div>

                        <div className="col-lg-3 col-md-12">
                            <div className="btn-content">
                                <span className="shine"></span>
                                <Link to="/contact">Let us know</Link>
                            </div>
                        </div>

                    </div>
                </div>
            </section>
        </React.Fragment>
        );
}