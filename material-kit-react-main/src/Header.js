import React from "react";
import {useNavigate} from "react-router";
import {Link} from "react-router-dom";


export default function Header() {

    const navigate = useNavigate();

    const navigateUrl=(url)=>{
        return navigate(url, { replace: true })
    }

    return(
        <header className="init">

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

                        <a className="navbar-brand white" href="index.html">
                            <img className="white" alt="logo" src="../../img/GOA_Logo_stroke-1.png"/>
                            <img className="black" alt="logo" src="../../img/GOA_Logo_stroke-1.png"/>
                        </a>

                        <div className="white menu-init" id="main-menu">
                            <nav id="menu-center">
                                <ul>
                                    <li>
                                        <a className="actived" href="/home">Home</a>
                                    </li>
                                    <li><a href="#">About <i className="fa fa-angle-down"></i></a>
                                        <ul>
                                            <li><a href="/aboutUs">About Us</a></li>
                                        </ul>
                                    </li>
                                    <li><a href="#">Works <i className="fa fa-angle-down"></i></a>
                                        <ul>
                                            <li><a href="/ourWorks">Gallery Column</a></li>
                                            <li><a href="works-carousel.html">Gallery Carousel</a></li>
                                            <li><a href="#">Projects Detail <i
                                                className="fa fa-angle-right"></i></a>
                                                <ul>
                                                    <li><a href="projects-detail.html">Project Detail 1</a></li>
                                                    <li><a href="projects-detail-2.html">Project Detail 2</a>
                                                    </li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </li>
                                    <li><a href="#">Services <i className="fa fa-angle-down"></i></a>
                                        <ul>
                                            <li><Link to="/paving">Paving</Link></li>
                                            <li onClick={()=>navigateUrl('/coldMilling')}><a>Cold Milling</a></li>
                                            <li><a href="/concrete">Concrete</a></li>
                                            <li><a href="/equipmentRentals">Equipment Rentals</a></li>
                                            <li><a href="/trucking">Trucking</a></li>
                                        </ul>
                                    </li>
                                    <li><a href="/Contact">Contact</a></li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );

}