import './accordion.css'
import {Accordion, AccordionTab} from 'primereact/accordion';
import React, {useEffect} from "react";
import {talks} from './talk_list';
import {JotFormConfig} from "../../JotFormConfig";

export default function Talks() {

    useEffect(() => {
        JotFormConfig();
    }, []);

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