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

                                        <li class="filt-projects-w" data-project=".parking">Parkings Lots
                                        </li>

                                        <li class="filt-projects-w" data-project=".driveways">Driveways
                                        </li>

                                        <li class="filt-projects-w" data-project=".coldMilling">Cold Milling
                                        </li>

                                        <li class="filt-projects-w" data-project=".municipal">Municipal Work
                                        </li>

                                        <li className="filt-projects-w" data-project=".roadConstruction">Road
                                            Construction
                                        </li>

                                        <li className="filt-projects-w" data-project=".other">Other
                                        </li>
                                    </ul>


                                    <div id="w-gallery-container" class="w-gallery-container">

                                        <div className="w-gallery driveways">
                                            <div className="projects-grid">
                                                <div className="hovereffect-color">
                                                    <img src="img/projects-w/driveways/img11.JPG" alt=""
                                                         className="w-gallery-image"/>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="w-gallery driveways">
                                            <div className="projects-grid">
                                                <div className="hovereffect-color">
                                                    <img src="img/projects-w/driveways/img12.JPG" alt=""
                                                         className="w-gallery-image"/>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="w-gallery driveways">
                                            <div className="projects-grid">
                                                <div className="hovereffect-color">
                                                    <img src="img/projects-w/driveways/img13.JPG" alt=""
                                                         className="w-gallery-image"/>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="w-gallery driveways">
                                            <div className="projects-grid">
                                                <div className="hovereffect-color">
                                                    <img src="img/projects-w/driveways/img14.JPG" alt=""
                                                         className="w-gallery-image"/>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="w-gallery driveways">
                                            <div className="projects-grid">
                                                <div className="hovereffect-color">
                                                    <img src="img/projects-w/driveways/img15.JPG" alt=""
                                                         className="w-gallery-image"/>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="w-gallery driveways">
                                            <div className="projects-grid">
                                                <div className="hovereffect-color">
                                                    <img src="img/projects-w/driveways/img16.JPG" alt=""
                                                         className="w-gallery-image"/>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="w-gallery driveways">
                                            <div className="projects-grid">
                                                <div className="hovereffect-color">
                                                    <img src="img/projects-w/driveways/img17.JPG" alt=""
                                                         className="w-gallery-image"/>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="w-gallery driveways">
                                            <div className="projects-grid">
                                                <div className="hovereffect-color">
                                                    <img src="img/projects-w/driveways/img18.JPG" alt=""
                                                         className="w-gallery-image"/>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="w-gallery driveways">
                                            <div className="projects-grid">
                                                <div className="hovereffect-color">
                                                    <img src="img/projects-w/driveways/img19.JPG" alt=""
                                                         className="w-gallery-image"/>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="w-gallery driveways">
                                            <div className="projects-grid">
                                                <div className="hovereffect-color">
                                                    <img src="img/projects-w/driveways/img20.JPG" alt=""
                                                         className="w-gallery-image"/>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="w-gallery parking">
                                            <div class="projects-grid">
                                                <div class="hovereffect-color">
                                                    <img src="img/projects-w/parkinlots/img1.jpg" alt=""
                                                         class="w-gallery-image"/>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="w-gallery parking">
                                            <div class="projects-grid">
                                                <div class="hovereffect-color">
                                                    <img src="img/projects-w/parkinlots/img2.JPG" alt=""
                                                         class="w-gallery-image"/>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="w-gallery parking">
                                            <div class="projects-grid">
                                                <div class="hovereffect-color">
                                                    <img src="img/projects-w/parkinlots/img3.jpg" alt=""
                                                         class="w-gallery-image"/>
                                                    <div class="overlay">
                                                        <div class="v-align wrap">
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="w-gallery parking">
                                            <div class="projects-grid onStep" data-animation="fadeInUp" data-time="0">
                                                <div class="hovereffect-color">
                                                    <img src="img/projects-w/parkinlots/img4.jpg" alt=""
                                                         class="w-gallery-image"/>
                                                    <div class="overlay">
                                                        <div class="v-align wrap">
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="w-gallery parking">
                                            <div class="projects-grid onStep" data-animation="fadeInUp" data-time="0">
                                                <div class="hovereffect-color">
                                                    <img src="img/projects-w/parkinlots/img5.JPG" alt=""
                                                         class="w-gallery-image"/>
                                                    <div class="overlay">
                                                        <div class="v-align wrap">
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="w-gallery parking">
                                            <div class="projects-grid onStep" data-animation="fadeInUp" data-time="0">
                                                <div class="hovereffect-color">
                                                    <img src="img/projects-w/parkinlots/img6.jpg" alt=""
                                                         class="w-gallery-image"/>
                                                    <div class="overlay">
                                                        <div class="v-align wrap">
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="w-gallery parking">
                                            <div className="projects-grid onStep" data-animation="fadeInUp"
                                                 data-time="0">
                                                <div className="hovereffect-color">
                                                    <img src="img/projects-w/parkinlots/img7.jpg" alt=""
                                                         className="w-gallery-image"/>
                                                    <div className="overlay">
                                                        <div className="v-align wrap">
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="w-gallery parking">
                                            <div className="projects-grid onStep" data-animation="fadeInUp"
                                                 data-time="0">
                                                <div className="hovereffect-color">
                                                    <img src="img/projects-w/parkinlots/img8.jpg" alt=""
                                                         className="w-gallery-image"/>
                                                    <div className="overlay">
                                                        <div className="v-align wrap">
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="w-gallery parking">
                                            <div className="projects-grid onStep" data-animation="fadeInUp"
                                                 data-time="0">
                                                <div className="hovereffect-color">
                                                    <img src="img/projects-w/parkinlots/img9.jpg" alt=""
                                                         className="w-gallery-image"/>
                                                    <div className="overlay">
                                                        <div className="v-align wrap">
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="w-gallery parking">
                                            <div className="projects-grid onStep" data-animation="fadeInUp"
                                                 data-time="0">
                                                <div className="hovereffect-color">
                                                    <img src="img/projects-w/parkinlots/img10.JPG" alt=""
                                                         className="w-gallery-image"/>
                                                    <div className="overlay">
                                                        <div className="v-align wrap">
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="w-gallery coldMilling">
                                            <div class="projects-grid onStep" data-animation="fadeInUp" data-time="0">
                                                <div class="hovereffect-color">
                                                    <img src="img/projects-w/cold-milling/img11.jpg" alt=""
                                                         class="w-gallery-image"/>
                                                    <div class="overlay">
                                                        <div class="v-align wrap">
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="w-gallery coldMilling">
                                            <div class="projects-grid onStep" data-animation="fadeInUp" data-time="0">
                                                <div class="hovereffect-color">
                                                    <img src="img/projects-w/cold-milling/IMG_1391.jpg" alt=""
                                                         class="w-gallery-image"/>
                                                    <div class="overlay">
                                                        <div class="v-align wrap">
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="w-gallery coldMilling">
                                            <div class="projects-grid onStep" data-animation="fadeInUp" data-time="0">
                                                <div class="hovereffect-color">
                                                    <img src="img/projects-w/cold-milling/IMG_1534.jpg" alt=""
                                                         class="w-gallery-image"/>
                                                    <div class="overlay">
                                                        <div class="v-align wrap">
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="w-gallery coldMilling">
                                            <div className="projects-grid onStep" data-animation="fadeInUp"
                                                 data-time="0">
                                                <div className="hovereffect-color">
                                                    <img src="img/projects-w/cold-milling/IMG_1557.jpg" alt=""
                                                         className="w-gallery-image"/>
                                                    <div className="overlay">
                                                        <div className="v-align wrap">
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="w-gallery coldMilling">
                                            <div className="projects-grid onStep" data-animation="fadeInUp"
                                                 data-time="0">
                                                <div className="hovereffect-color">
                                                    <img src="img/projects-w/cold-milling/IMG_2217.jpg" alt=""
                                                         className="w-gallery-image"/>
                                                    <div className="overlay">
                                                        <div className="v-align wrap">
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="w-gallery coldMilling">
                                            <div className="projects-grid onStep" data-animation="fadeInUp"
                                                 data-time="0">
                                                <div className="hovereffect-color">
                                                    <img src="img/projects-w/cold-milling/IMG_3800.jpg" alt=""
                                                         className="w-gallery-image"/>
                                                    <div className="overlay">
                                                        <div className="v-align wrap">
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="w-gallery coldMilling">
                                            <div className="projects-grid onStep" data-animation="fadeInUp"
                                                 data-time="0">
                                                <div className="hovereffect-color">
                                                    <img src="img/projects-w/cold-milling/IMG_3923.jpg" alt=""
                                                         className="w-gallery-image"/>
                                                    <div className="overlay">
                                                        <div className="v-align wrap">
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="w-gallery coldMilling">
                                            <div className="projects-grid onStep" data-animation="fadeInUp"
                                                 data-time="0">
                                                <div className="hovereffect-color">
                                                    <img src="img/projects-w/cold-milling/IMG_4318.jpg" alt=""
                                                         className="w-gallery-image"/>
                                                    <div className="overlay">
                                                        <div className="v-align wrap">
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="w-gallery coldMilling">
                                            <div className="projects-grid onStep" data-animation="fadeInUp"
                                                 data-time="0">
                                                <div className="hovereffect-color">
                                                    <img src="img/projects-w/cold-milling/IMG_4364.jpg" alt=""
                                                         className="w-gallery-image"/>
                                                    <div className="overlay">
                                                        <div className="v-align wrap">
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="w-gallery coldMilling">
                                            <div className="projects-grid onStep" data-animation="fadeInUp"
                                                 data-time="0">
                                                <div className="hovereffect-color">
                                                    <img src="img/projects-w/cold-milling/IMG_4366.jpg" alt=""
                                                         className="w-gallery-image"/>
                                                    <div className="overlay">
                                                        <div className="v-align wrap">
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="w-gallery coldMilling">
                                            <div className="projects-grid onStep" data-animation="fadeInUp"
                                                 data-time="0">
                                                <div className="hovereffect-color">
                                                    <img src="img/projects-w/cold-milling/IMG_4455.jpg" alt=""
                                                         className="w-gallery-image"/>
                                                    <div className="overlay">
                                                        <div className="v-align wrap">
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="w-gallery coldMilling">
                                            <div className="projects-grid onStep" data-animation="fadeInUp"
                                                 data-time="0">
                                                <div className="hovereffect-color">
                                                    <img src="img/projects-w/cold-milling/IMG_4458.jpg" alt=""
                                                         className="w-gallery-image"/>
                                                    <div className="overlay">
                                                        <div className="v-align wrap">
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="w-gallery coldMilling">
                                            <div className="projects-grid onStep" data-animation="fadeInUp"
                                                 data-time="0">
                                                <div className="hovereffect-color">
                                                    <img src="img/projects-w/cold-milling/IMG_4547.jpg" alt=""
                                                         className="w-gallery-image"/>
                                                    <div className="overlay">
                                                        <div className="v-align wrap">
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="w-gallery municipal">
                                            <div className="projects-grid">
                                                <div className="hovereffect-color">
                                                    <img src="img/projects-w/municipal/img21.jpg" alt=""
                                                         className="w-gallery-image"/>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="w-gallery municipal">
                                            <div className="projects-grid">
                                                <div className="hovereffect-color">
                                                    <img src="img/projects-w/municipal/img22.jpg" alt=""
                                                         className="w-gallery-image"/>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="w-gallery municipal">
                                            <div className="projects-grid">
                                                <div className="hovereffect-color">
                                                    <img src="img/projects-w/municipal/img23.jpg" alt=""
                                                         className="w-gallery-image"/>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="w-gallery municipal">
                                            <div className="projects-grid">
                                                <div className="hovereffect-color">
                                                    <img src="img/projects-w/municipal/img24.jpg" alt=""
                                                         className="w-gallery-image"/>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="w-gallery municipal">
                                            <div className="projects-grid">
                                                <div className="hovereffect-color">
                                                    <img src="img/projects-w/municipal/img25.jpg" alt=""
                                                         className="w-gallery-image"/>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="w-gallery municipal">
                                            <div className="projects-grid">
                                                <div className="hovereffect-color">
                                                    <img src="img/projects-w/municipal/img26.jpg" alt=""
                                                         className="w-gallery-image"/>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="w-gallery municipal">
                                            <div className="projects-grid">
                                                <div className="hovereffect-color">
                                                    <img src="img/projects-w/municipal/img27.jpg" alt=""
                                                         className="w-gallery-image"/>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="w-gallery municipal">
                                            <div className="projects-grid">
                                                <div className="hovereffect-color">
                                                    <img src="img/projects-w/municipal/img28.jpg" alt=""
                                                         className="w-gallery-image"/>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="w-gallery municipal">
                                            <div className="projects-grid">
                                                <div className="hovereffect-color">
                                                    <img src="img/projects-w/municipal/img29.jpg" alt=""
                                                         className="w-gallery-image"/>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="w-gallery municipal">
                                            <div className="projects-grid">
                                                <div className="hovereffect-color">
                                                    <img src="img/projects-w/municipal/img30.jpg" alt=""
                                                         className="w-gallery-image"/>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="w-gallery roadConstruction">
                                            <div className="projects-grid onStep" data-animation="fadeInUp"
                                                 data-time="0">
                                                <div className="hovereffect-color">
                                                    <img src="img/projects-w/road/img31.jpg" alt=""
                                                         className="w-gallery-image"/>
                                                    <div className="overlay">
                                                        <div className="v-align wrap">
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="w-gallery roadConstruction">
                                            <div className="projects-grid onStep" data-animation="fadeInUp"
                                                 data-time="0">
                                                <div className="hovereffect-color">
                                                    <img src="img/projects-w/road/img32.jpg" alt=""
                                                         className="w-gallery-image"/>
                                                    <div className="overlay">
                                                        <div className="v-align wrap">
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="w-gallery roadConstruction">
                                            <div className="projects-grid onStep" data-animation="fadeInUp"
                                                 data-time="0">
                                                <div className="hovereffect-color">
                                                    <img src="img/projects-w/road/img33.jpg" alt=""
                                                         className="w-gallery-image"/>
                                                    <div className="overlay">
                                                        <div className="v-align wrap">
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="w-gallery roadConstruction">
                                            <div className="projects-grid onStep" data-animation="fadeInUp"
                                                 data-time="0">
                                                <div className="hovereffect-color">
                                                    <img src="img/projects-w/road/img34.jpg" alt=""
                                                         className="w-gallery-image"/>
                                                    <div className="overlay">
                                                        <div className="v-align wrap">
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="w-gallery roadConstruction">
                                            <div className="projects-grid onStep" data-animation="fadeInUp"
                                                 data-time="0">
                                                <div className="hovereffect-color">
                                                    <img src="img/projects-w/road/img35.jpg" alt=""
                                                         className="w-gallery-image"/>
                                                    <div className="overlay">
                                                        <div className="v-align wrap">
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="w-gallery roadConstruction">
                                            <div className="projects-grid onStep" data-animation="fadeInUp"
                                                 data-time="0">
                                                <div className="hovereffect-color">
                                                    <img src="img/projects-w/road/img36.jpg" alt=""
                                                         className="w-gallery-image"/>
                                                    <div className="overlay">
                                                        <div className="v-align wrap">
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="w-gallery roadConstruction">
                                            <div className="projects-grid onStep" data-animation="fadeInUp"
                                                 data-time="0">
                                                <div className="hovereffect-color">
                                                    <img src="img/projects-w/road/img37.jpg" alt=""
                                                         className="w-gallery-image"/>
                                                    <div className="overlay">
                                                        <div className="v-align wrap">
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="w-gallery roadConstruction">
                                            <div className="projects-grid onStep" data-animation="fadeInUp"
                                                 data-time="0">
                                                <div className="hovereffect-color">
                                                    <img src="img/projects-w/road/img38.jpg" alt=""
                                                         className="w-gallery-image"/>
                                                    <div className="overlay">
                                                        <div className="v-align wrap">
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="w-gallery roadConstruction">
                                            <div className="projects-grid onStep" data-animation="fadeInUp"
                                                 data-time="0">
                                                <div className="hovereffect-color">
                                                    <img src="img/projects-w/road/img39.jpg" alt=""
                                                         className="w-gallery-image"/>
                                                    <div className="overlay">
                                                        <div className="v-align wrap">
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="w-gallery roadConstruction">
                                            <div className="projects-grid onStep" data-animation="fadeInUp"
                                                 data-time="0">
                                                <div className="hovereffect-color">
                                                    <img src="img/projects-w/road/img40.jpg" alt=""
                                                         className="w-gallery-image"/>
                                                    <div className="overlay">
                                                        <div className="v-align wrap">
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="w-gallery roadConstruction">
                                            <div className="projects-grid onStep" data-animation="fadeInUp"
                                                 data-time="0">
                                                <div className="hovereffect-color">
                                                    <img src="img/projects-w/road/img41.jpg" alt=""
                                                         className="w-gallery-image"/>
                                                    <div className="overlay">
                                                        <div className="v-align wrap">
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="w-gallery other">
                                            <div className="projects-grid onStep" data-animation="fadeInUp"
                                                 data-time="0">
                                                <div className="hovereffect-color">
                                                    <img src="img/projects-w/random/IMG_0146.JPG" alt=""
                                                         className="w-gallery-image"/>
                                                    <div className="overlay">
                                                        <div className="v-align wrap">
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="w-gallery other">
                                            <div className="projects-grid onStep" data-animation="fadeInUp"
                                                 data-time="0">
                                                <div className="hovereffect-color">
                                                    <img src="img/projects-w/random/IMG_0235.JPG" alt=""
                                                         className="w-gallery-image"/>
                                                    <div className="overlay">
                                                        <div className="v-align wrap">
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="w-gallery other">
                                            <div className="projects-grid onStep" data-animation="fadeInUp"
                                                 data-time="0">
                                                <div className="hovereffect-color">
                                                    <img src="img/projects-w/random/IMG_1319.jpg" alt=""
                                                         className="w-gallery-image"/>
                                                    <div className="overlay">
                                                        <div className="v-align wrap">
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="w-gallery other">
                                            <div className="projects-grid onStep" data-animation="fadeInUp"
                                                 data-time="0">
                                                <div className="hovereffect-color">
                                                    <img src="img/projects-w/random/IMG_2811.jpg" alt=""
                                                         className="w-gallery-image"/>
                                                    <div className="overlay">
                                                        <div className="v-align wrap">
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="w-gallery other">
                                            <div className="projects-grid onStep" data-animation="fadeInUp"
                                                 data-time="0">
                                                <div className="hovereffect-color">
                                                    <img src="img/projects-w/random/IMG_E1584.jpg" alt=""
                                                         className="w-gallery-image"/>
                                                    <div className="overlay">
                                                        <div className="v-align wrap">
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="w-gallery other">
                                            <div className="projects-grid onStep" data-animation="fadeInUp"
                                                 data-time="0">
                                                <div className="hovereffect-color">
                                                    <img src="img/projects-w/random/IMG_E1608.jpg" alt=""
                                                         className="w-gallery-image"/>
                                                    <div className="overlay">
                                                        <div className="v-align wrap">
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="w-gallery other">
                                            <div className="projects-grid onStep" data-animation="fadeInUp"
                                                 data-time="0">
                                                <div className="hovereffect-color">
                                                    <img src="img/projects-w/random/IMG_E1741.jpg" alt=""
                                                         className="w-gallery-image"/>
                                                    <div className="overlay">
                                                        <div className="v-align wrap">
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