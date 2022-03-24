import React from 'react';
import {Galleria} from 'primereact/galleria';

export default function MGaleria() {

    const images = [
        {itemImageSrc:'../../img/cold_milling2.jpg',thumbnailImageSrc:'../../img/cold_milling2.jpg'},
        {itemImageSrc:'../../img/road_construction.jpg',thumbnailImageSrc:'../../img/road_construction.jpg'},
        {itemImageSrc:'../../img/Residential-Street4-1568x1175.jpg',thumbnailImageSrc:'../../img/Residential-Street4-1568x1175.jpg'},
        {itemImageSrc:'../../img/Driveway2-1568x1117.jpg',thumbnailImageSrc:'../../img/Driveway2-1568x1117.jpg'},
        {itemImageSrc:'../../img/cold_milling2.jpg',thumbnailImageSrc:'../../img/cold_milling2.jpg'},
        {itemImageSrc:'../../img/municipal-work.jpg',thumbnailImageSrc:'../../img/municipal-work.jpg'}
    ]

    const responsiveOptions2 = [
        {
            breakpoint: '768px',
            numVisible: 3
        },
        {
            breakpoint: '560px',
            numVisible: 3
        }
    ];


    const itemTemplate = (item) => {
        return <img src={item.itemImageSrc} style={{width: '100%', display: 'block'}}/>
    }

    const thumbnailTemplate = (item) => {
        return <img src={item.thumbnailImageSrc} style={{width: '50px',height:'50px', display: 'block'}}/>
    }

    return (
        <div>
            <div className="card" style={{display:'flex',justifyContent:'center'}}>
                <Galleria value={images} responsiveOptions={responsiveOptions2} numVisible={5}
                          thumbnailsPosition="left" style={{maxWidth: '60%',minHeight:'50%'}}
                          item={itemTemplate} thumbnail={thumbnailTemplate}/>
            </div>
        </div>
    );

}