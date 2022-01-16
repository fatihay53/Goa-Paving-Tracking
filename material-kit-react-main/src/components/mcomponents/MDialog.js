import React from 'react';
import {Dialog} from 'primereact/dialog';
import {Button} from 'primereact/button';
import './dialogdemo.css';

export default function MDialog({showedHtml,showDialog, setShowDialog}) {

    const renderFooter = () => {
        return (
            <div>
                <Button label="No" icon="pi pi-times" onClick={() => setShowDialog(false)} className="p-button-text"/>
                <Button label="Yes" icon="pi pi-check" onClick={() => setShowDialog(false)} autoFocus/>
            </div>
        );
    }


    return (
        <div className="dialog-demo">
            <div className="card">
                <h5>Responsive</h5>
                <Dialog visible={showDialog} onHide={() => setShowDialog(false)}
                        breakpoints={{'960px': '75vw'}} style={{width: '50vw'}}
                        //footer={renderFooter('displayResponsive')}
                    >
                    {showedHtml}
                </Dialog>
            </div>
        </div>
    )


}