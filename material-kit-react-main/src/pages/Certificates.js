import CertificateService from "../services/CertificateService";
import {useState,useEffect} from 'react';
import UploadCertificate from "./upload/UploadCertificate";
import GeneralUtils from "../utils/GeneralUtils";

export default function Certificates(){

    const certificateService = new CertificateService();
    const[certificates,setCertificates]= useState([])

    useEffect(()=>{
        let userId = JSON.parse(localStorage.getItem('user'))?.userId;

        certificateService.findAll({id:userId}).then(res=>{
            if (res.status == 200){
                let result = [];
                res.data.map(elem => {
                    result.push({
                        name: elem.name,
                        type: elem.type,
                        data: GeneralUtils.arrayBufferToBase64(elem.data.data)
                    })
                })
                setCertificates(result)
            }
        })
    },[])


    return (<UploadCertificate certificates={certificates} isShow={true}/>)
}