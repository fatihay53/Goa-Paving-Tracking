import React from "react";
import {useNavigate} from "react-router";

export default function HomePage() {
    const navigate = useNavigate();

    const call = () => {
        navigate('/admin', {replace: true});
    }
    return (<div>
        <button onClick={call}>Tıkla</button>
    </div>)
}