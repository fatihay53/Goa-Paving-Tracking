import React from "react";
import { Carousel } from 'primereact/carousel';
import './carousel.css';
export default function MCarousel(){

    const images = [
        {image:'cold_milling2.jpg'},
        {image:'road_construction.jpg'},
        {image:'Residential-Street4-1568x1175.jpg'},
        {image:'Driveway2-1568x1117.jpg'},
        {image:'cold_milling2.jpg'},
        {image:'municipal-work.jpg'}
    ]

    const responsiveOptions = [
        {
            breakpoint: '1024px',
            numVisible: 3,
            numScroll: 3
        },
        {
            breakpoint: '600px',
            numVisible: 2,
            numScroll: 2
        },
        {
            breakpoint: '480px',
            numVisible: 1,
            numScroll: 1
        }
    ];

    const productTemplate = (product) => {
        let img = `../../img/${product.image}`;
        return (
            <div className="product-item">
                <div className="product-item-content">
                    <div className="mb-3">
                        <img src={img} onError={(e) => e.target.src='https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} className="product-image" />
                    </div>
                </div>
            </div>
        );
    }

    return(
        <div className="carousel-demo">
            <div className="card">
                <Carousel value={images} numVisible={3} numScroll={1} responsiveOptions={responsiveOptions} className="custom-carousel" circular
                          autoplayInterval={3000} itemTemplate={productTemplate}/>
            </div>
        </div>
    )
}