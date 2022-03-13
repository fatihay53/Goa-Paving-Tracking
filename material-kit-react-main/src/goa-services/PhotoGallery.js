import React, {useEffect} from "react";
import Footer from "../pages/Footer";
import Header from "../Header";
import LetUsKnow from "./LetUsKnow";
import GeneralUtils from "../utils/GeneralUtils";

export default function PhotoGallery() {
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
                                    Portfolio
                                </h1>
                            </div>
                        </div>
                    </div>
                </section>

                <section aria-label="works" id="projects">
                    <div class="container-fluid">
                        <div class="row">

                            <div class="v-align">
                                <div class="col-md-11 col-xs-12">
                                    <ul id="filter-hide" class="init">
                                        <li class="filtter-icon"><i class="ti-layout-grid3-alt"></i>
                                        </li>
                                    </ul>

                                    <ul id="filter-porto">
                                        <li class="filt-projects-w selected" data-project="*">All Concept
                                        </li>

                                        <li class="filt-projects-w" data-project=".parking">Parkings
                                        </li>

                                        <li class="filt-projects-w" data-project=".paving">Paving
                                        </li>

                                        <li class="filt-projects-w" data-project=".coldMilling">Cold Milling
                                        </li>

                                        <li class="filt-projects-w" data-project=".municipalWork">Municipal Work
                                        </li>

                                        <li className="filt-projects-w" data-project=".roadConstruction">Road
                                            Construction
                                        </li>
                                    </ul>


                                    <div id="w-gallery-container" class="w-gallery-container">

                                        <div class="w-gallery parking">
                                            <div class="projects-grid">
                                                <div class="hovereffect-color">
                                                    <img src="img/projects-w/parking.jpg" alt=""
                                                         class="w-gallery-image"/>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="w-gallery parking">
                                            <div class="projects-grid">
                                                <div class="hovereffect-color">
                                                    <img src="img/projects-w/parking555.jpg" alt=""
                                                         class="w-gallery-image"/>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="w-gallery parking">
                                            <div class="projects-grid">
                                                <div class="hovereffect-color">
                                                    <img src="img/projects-w/parking11.jpg" alt=""
                                                         class="w-gallery-image"/>
                                                    <div class="overlay">
                                                        <div class="v-align wrap">
                      <span class="icon">
                      <a class="big-video" href="http://www.dailymotion.com/video/x612rc9">
                      <i class="fa fa-search"></i>
                      </a>
                      <a href="projects-detail.html">
                      <i class="fa fa-link"></i>
                      </a>
                      </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="w-gallery parking">
                                            <div class="projects-grid onStep" data-animation="fadeInUp" data-time="0">
                                                <div class="hovereffect-color">
                                                    <img src="img/projects-w/parking_11.jpg" alt=""
                                                         class="w-gallery-image"/>
                                                    <div class="overlay">
                                                        <div class="v-align wrap">
                      <span class="icon">
                      <a class="big-youtube" href="https://www.youtube.com/watch?v=fafEHMnFe3g">
                      <i class="fa fa-search"></i>
                      </a>
                      <a href="projects-detail.html">
                      <i class="fa fa-link"></i>
                      </a>
                      </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="w-gallery parking">
                                            <div class="projects-grid onStep" data-animation="fadeInUp" data-time="0">
                                                <div class="hovereffect-color">
                                                    <img src="img/projects-w/parking22.jpg" alt=""
                                                         class="w-gallery-image"/>
                                                    <div class="overlay">
                                                        <div class="v-align wrap">
                      <span class="icon">
                      <a class="vim-video" href="https://vimeo.com/123123">
                      <i class="fa fa-search"></i>
                      </a>
                      <a href="projects-detail.html">
                      <i class="fa fa-link"></i>
                      </a>
                      </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="w-gallery parking">
                                            <div class="projects-grid onStep" data-animation="fadeInUp" data-time="0">
                                                <div class="hovereffect-color">
                                                    <img src="img/projects-w/parkings.jpg" alt=""
                                                         class="w-gallery-image"/>
                                                    <div class="overlay">
                                                        <div class="v-align wrap">
                      <span class="icon">
                      <a class="big-img-1" href="img/projects-w/15.jpg">
                      <i class="fa fa-search"></i>
                      </a>
                      <a href="projects-detail.html">
                      <i class="fa fa-link"></i>
                      </a>
                      </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="w-gallery coldMilling">
                                            <div class="projects-grid onStep" data-animation="fadeInUp" data-time="0">
                                                <div class="hovereffect-color">
                                                    <img src="img/projects-w/cold_millings5.jpg" alt=""
                                                         class="w-gallery-image"/>
                                                    <div class="overlay">
                                                        <div class="v-align wrap">
                      <span class="icon">
                      <a class="big-img-1" href="img/projects-w/10.jpg">
                      <i class="fa fa-search"></i>
                      </a>
                      <a href="projects-detail.html">
                      <i class="fa fa-link"></i>
                      </a>
                      </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="w-gallery coldMilling">
                                            <div class="projects-grid onStep" data-animation="fadeInUp" data-time="0">
                                                <div class="hovereffect-color">
                                                    <img src="img/projects-w/cold_milling11.jpg" alt=""
                                                         class="w-gallery-image"/>
                                                    <div class="overlay">
                                                        <div class="v-align wrap">
                      <span class="icon">
                      <a class="big-img-1" href="img/projects-w/11.jpg">
                      <i class="fa fa-search"></i>
                      </a>
                      <a href="projects-detail.html">
                      <i class="fa fa-link"></i>
                      </a>
                      </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="w-gallery coldMilling">
                                            <div class="projects-grid onStep" data-animation="fadeInUp" data-time="0">
                                                <div class="hovereffect-color">
                                                    <img src="img/projects-w/cold_milling558.jpg" alt=""
                                                         class="w-gallery-image"/>
                                                    <div class="overlay">
                                                        <div class="v-align wrap">
                      <span class="icon">
                      <a class="big-img-1" href="img/projects-w/12.jpg">
                      <i class="fa fa-search"></i>
                      </a>
                      <a href="projects-detail.html">
                      <i class="fa fa-link"></i>
                      </a>
                      </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </div>

                                </div>
                            </div>

                        </div>
                    </div>
                </section>


                <LetUsKnow/>

                <Footer/>
                <div id="totop" class="init">
                    <span class="ti-angle-up"></span>
                </div>

            </div>
        </React.Fragment>);


}