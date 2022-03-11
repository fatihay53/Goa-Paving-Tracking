import './accordion.css'
import {Accordion, AccordionTab} from 'primereact/accordion';
import React from "react";
import {talks} from './talk_list';

export default function Talks() {

    return (
        <div className="accordion-demo">
            <div className="card">
                <Accordion>
                    {talks.map(elem => {
                        return (
                            <AccordionTab header={elem.header}>
                                {elem.talk}
                            </AccordionTab>)
                    })}
                </Accordion>
            </div>
        </div>
    )

}