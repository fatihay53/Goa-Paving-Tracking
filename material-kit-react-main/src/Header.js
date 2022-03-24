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
                                    <div style={{color:"white",fontWeight: "bold"}}>Call Us : Tel: (613) 333-9222</div>
                                </div>

                                <div id="sub-icon" className="social-icons-subnav">
                                    <a href="https://www.facebook.com/goapaving/"><span className="ti-facebook"style={{color:"white",fontWeight: "bold"}}>Facebook</span></a>
                                    <a href="https://www.instagram.com/accounts/login/?next=/greater_ottafawa_area_paving/"><span
                                        className="ti-instagram" style={{color:"white",fontWeight: "bold"}}> Instagram</span></a>
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

                        <Link className="navbar-brand white" to="/home">
                            <img className="white" alt="logo" src="../../img/GOA_Logo_stroke-1.png"/>
                            <img className="black" alt="logo" src="../../img/GOA_Logo_stroke-1.png"/>
                        </Link>

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
                                    <li><a>Photo Gallery <i className="fa fa-angle-down"></i></a>
                                        <ul>
                                            <li><Link to="/photoGallery">Photo Gallery</Link></li>
                                        </ul>
                                    </li>
                                    <li><a>Services <i className="fa fa-angle-down"></i></a>
                                        <ul>
                                            <li><Link to="/residential">Residential</Link></li>
                                            <li><Link to="/commercial">Commercial</Link></li>
                                            <li><Link to="/municipal">Municipal</Link></li>
                                        </ul>
                                    </li>
                                    <li><Link to="/contact">Contact</Link></li>

                                    <li>
                                        <li><Link to="/careers">Careers</Link></li>
                                    </li>
                                    <li><Link to="/admin"><i className="fa fa-user fa-2x"></i></Link>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );

}