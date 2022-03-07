import React, {useEffect} from "react";
import {Link} from "react-router-dom";

export default function Header() {
    useEffect(()=>{
        //GeneralUtils.reloadJQuerySticky();
    },[]);


    return(
        <header className="init">
            <div className="bg-preloader-white"></div>
            <div className="preloader-white">
                <div className="mainpreloader">
                    <span></span>
                </div>
            </div>
            <div className="container-fluid m-5-hor">
                <div className="row">
                    <div className="subnav">

                        <div className="col-md-12">
                            <div className="right">
                                <div className="social-icons-subnav">
                                    <div>Call Us : Tel: (613) 333-9222</div>
                                </div>

                                <div id="sub-icon" className="social-icons-subnav">
                                    <a href="https://www.facebook.com/goapaving/"><span className="ti-facebook"></span></a>
                                    <a href="https://www.instagram.com/accounts/login/?next=/greater_ottawa_area_paving/"><span
                                        className="ti-instagram"></span></a>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            <div className="navbar-default-white navbar-fixed-top">
                <div className="container-fluid m-5-hor">
                    <div className="row">

                        <button className="navbar-toggle" data-target=".navbar-collapse" data-toggle="collapse">
                            <span className="icon icon-bar"></span>
                            <span className="icon icon-bar"></span>
                            <span className="icon icon-bar"></span></button>

                        <a className="navbar-brand white" href="#">
                            <img className="white" alt="logo" src="../../img/GOA_Logo_stroke-1.png"/>
                            <img className="black" alt="logo" src="../../img/GOA_Logo_stroke-1.png"/>
                        </a>

                        <div className="white menu-init" id="main-menu">
                            <nav id="menu-center">
                                <ul>
                                    <li>
                                        <li><Link to="/home">Home</Link></li>
                                    </li>
                                    <li><a>About <i className="fa fa-angle-down"></i></a>
                                        <ul>
                                            <li><Link to="/aboutUs">About Us</Link></li>
                                        </ul>
                                    </li>
                                    <li><a>Works <i className="fa fa-angle-down"></i></a>
                                        <ul>
                                            <li><Link to="/ourWorks">Our Works</Link></li>
                                        </ul>
                                    </li>
                                    <li><a>Services <i className="fa fa-angle-down"></i></a>
                                        <ul>
                                            <li><Link to="/paving">Paving</Link></li>
                                            <li><Link to="/coldMilling">Cold Milling</Link></li>
                                            <li><Link to="/concrete">Concrete</Link></li>
                                            <li><Link to="/equipmentRentals">Equipment Rentals</Link></li>
                                            <li><Link to="/trucking">Trucking</Link></li>
                                        </ul>
                                    </li>
                                    <li><Link to="/contact">Contact</Link></li>

                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );

}