import SignaturePad from "react-signature-pad-wrapper";
import React, {useRef, forwardRef, useImperativeHandle} from "react";
import './canvas.css';
const MSignaturePad = forwardRef(({setTouchedSignature,id}, ref) => {
    const refSignaturePad = useRef();

    const clearSignature = () => {
        refSignaturePad.current.clear();
        setTouchedSignature(false);
    }

    useImperativeHandle(ref, () => ({
        getSignature: () =>{
            return refSignaturePad.current.toDataURL();
        },
        clearSignature: () => {
            refSignaturePad.current.clear();
            setTouchedSignature(false);
        }
    }));

    return(
        <div style={{border: '1px solid black'}}>
            <div onClick={() => setTouchedSignature(true)}>
            <SignaturePad
                //width={300} height={175}
                ref={refSignaturePad}
            />
            </div>
            <button onClick={clearSignature}>clear</button>
        </div>
    )
})

export default MSignaturePad;