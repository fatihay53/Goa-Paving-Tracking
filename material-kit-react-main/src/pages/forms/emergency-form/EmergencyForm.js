import React, {useState} from "react";
import './emergency.css';
import SelectEmployee from "../../../components/mcomponents/SelectEmployee";
import MDialog from "../../../components/mcomponents/MDialog";
import { Dropdown } from 'primereact/dropdown';
import {Calendar} from "primereact/calendar";
import GeneralUtils from "../../../utils/GeneralUtils";
import {Button} from "primereact/button";
import SelectHospital from "../../../components/mcomponents/SelectHospital";
import TimePicker from "react-time-picker";
import {toast} from "react-toastify";
import EmergencyService from "../../../services/EmergencyService";
import SelectProject from "../../../components/mcomponents/SelectProject";

const methodOfCommunicationOptions = [
    { name: 'Select', value: '' },
    { name: 'Cell Phones', value: 'Cell Phones' },
    { name: 'CB Radio', value: 'CB Radio' },
    { name: 'Cell Phones/CB Radio', value: 'Cell Phones/CB Radio' }
];

const emergencyMeetingLocationOptions = [
    { name: 'Select', value: '' },
    { name: '200 M Behind Paver', value: '200 M Behind Paver' },
    { name: '200 M Behind Milling Machine', value: 'Milling Machine' }
];

const AM_PM=[
    {name:"AM",value:"AM"},
    {name:"PM",value:"PM"}
]

const LOCATION_OF_EMERGENCY=[
    {name:"In Equipment",value:"IN EQUIPMENT"},
    {name:"On Person",value:"ON PERSON"}
]

const FIRST_AID_KITS=[
    {name:"Trucks",value:"TRUCKS"},
    {name:"Service Truck",value:"SERVICE TRUCK"}
]

const FIRE_EXTINGUISHERS=[
    {name:"Trucks",value:"TRUCKS"},
    {name:"Service Truck",value:"SERVICE TRUCK"}
]

const SPILL_KIDS=[
    {name:"Pick Up Trucks",value:"PICK UP TRUCKS"},
    {name:"Service Truck",value:"SERVICE TRUCK"}
]

export default function EmergencyForm({selectedData, isShow,findAll,setShowSelectedData}) {

    const [showDialog, setShowDialog] = useState(false);
    const [showedHtml, setShowedHtml] = useState({});
    const [taskEmployees,setTaskEmployees] = useState(
        !GeneralUtils.isNullOrEmpty(selectedData)&&!GeneralUtils.isNullOrEmpty(selectedData.employee1Id) ?
            {
                employee1:{id:selectedData.employee1Id,name:selectedData.employee1Name,surname:selectedData.employee1Surname},
                employee2:{id:selectedData.employee2Id,name:selectedData.employee2Name,surname:selectedData.employee2Surname},
                employee3:{id:selectedData.employee3Id,name:selectedData.employee3Name,surname:selectedData.employee3Surname},
                supervisor3:{id:selectedData.supervisor3Id,name:selectedData.supervisor3Name,surname:selectedData.supervisor3Surname},
                employee4:{id:selectedData.employee4Id,name:selectedData.employee4Name,surname:selectedData.employee4Surname},
                employee5:{id:selectedData.employee5Id,name:selectedData.employee5Name,surname:selectedData.employee5Surname},
                employee6:{id:selectedData.employee6Id,name:selectedData.employee6Name,surname:selectedData.employee6Surname},
                employee7:{id:selectedData.employee7Id,name:selectedData.employee7Name,surname:selectedData.employee7Surname},
                employee8:{id:selectedData.employee8Id,name:selectedData.employee8Name,surname:selectedData.employee8Surname}
            }:
            {
                employee1:{id:'',name:'',surname:''},
                employee2:{id:'',name:'',surname:''},
                employee3:{id:'',name:'',surname:''},
                supervisor3:{id:'',name:'',surname:''},
                employee4:{id:'',name:'',surname:''},
                employee5:{id:'',name:'',surname:''},
                employee6:{id:'',name:'',surname:''},
                employee7:{id:'',name:'',surname:''},
                employee8:{id:'',name:'',surname:''}
            });

    const [hospital, setHospital] = useState(
        !GeneralUtils.isNullOrEmpty(selectedData)&&!GeneralUtils.isNullOrEmpty(selectedData.hospitalId) ?
            {id:selectedData.hospitalId,name:selectedData.hospitalName,phone:selectedData.phone,street:selectedData.street,city:selectedData.city,zip:selectedData.zip} : {}
    );

    const [project,setProject] = useState(
        !GeneralUtils.isNullOrEmpty(selectedData)&&!GeneralUtils.isNullOrEmpty(selectedData.projectId) ?
            {id:selectedData.projectId,name:selectedData.project_name} : {}
    )

    const [supervisor, setSupervisor] = useState(
        !GeneralUtils.isNullOrEmpty(selectedData)&&!GeneralUtils.isNullOrEmpty(selectedData.supervisorId) ?
            {id:selectedData.supervisorId,name:selectedData.supervisorName,surname:selectedData.supervisorSurname} : {}
    );

    const [foreman, setForeman] = useState(
        !GeneralUtils.isNullOrEmpty(selectedData)&&!GeneralUtils.isNullOrEmpty(selectedData.foremanId) ?
            {id:selectedData.foremanId,name:selectedData.foremanName,surname:selectedData.foremanSurname} : {}
    );

    const [provincialGoverment, setProvincialGoverment] = useState(
        !GeneralUtils.isNullOrEmpty(selectedData)&&!GeneralUtils.isNullOrEmpty(selectedData.provincialGoverment) ?
            JSON.parse(selectedData.provincialGoverment) :
            {
                localGoverment:'',spillsGoverment:'',healthGoverment:'',
                environmentGoverment:'',transportationGoverment:''
            });

    const [responseCheckList, setResponseCheckList] = useState(
        !GeneralUtils.isNullOrEmpty(selectedData)&&!GeneralUtils.isNullOrEmpty(selectedData.responseCheckList) ?
            JSON.parse(selectedData.responseCheckList) :
            {
                locationOfEmergency:'',firstAidKits:'',fireExtinguishers:'',
                spillKits:'',certified:''
            });
    const emergencyService = new EmergencyService();

    let initialState = isShow ? {...selectedData,date:new Date(selectedData.date)} : {
        supervisorId: '',
        employeeId :'',
        site: '',
        emergencyPhone: '',
        methodOfCommunication : '',
        emergencyMeetingLocation: '',
        date: new Date(),
        officeSiteContact:'',
        siteSupervisor:'',
        hour: '07:00',
        amPm: '',
        location: ''
    };

    const [form, setForm] = useState(initialState);

    const selectHospital = () => {
        setShowDialog(true);
        setShowedHtml(<SelectHospital setShowDialog={(showDialog) => setShowDialog(showDialog)}
                                      setSelections={(selections) => {
                                          setHospital(selections);
                                          setShowDialog(false)
                                      }}/>);
    }

    const selectSupervisor = () => {
        setShowDialog(true);
        setShowedHtml(<SelectEmployee restriction="findAllSupervisors" selectionMode="single"
                                      setSelections={(selections) => {setForm({...form,supervisorId:selections.id}); setSupervisor({...selections}); setShowDialog(false);}}/>);
    }

    const selectForeman = () => {
        setShowDialog(true);
        setShowedHtml(<SelectEmployee restriction="findAllForemans" selectionMode="single"
                                      setSelections={(selections) => {setForm({...form,foremanId:selections.id}); setForeman({...selections}); setShowDialog(false);}}/>);
    }

    const selectEmployee = () => {
        setShowDialog(true);
        setShowedHtml(<SelectEmployee restriction="findAllEmployees" selectionMode="single"
                                      setSelections={(selections) => {setForm({...form,employeeId:selections.id}); setEmployee({...selections}); setShowDialog(false);}}/>);
    }

    const selectEmployee1 = () => {
        setShowDialog(true);
        setShowedHtml(<SelectEmployee restriction="findAllEmployees" selectionMode="single"
                                      setSelections={(selections) => {setTaskEmployees({...taskEmployees,employee1:selections});setShowDialog(false);}}/>);
    }

    const selectEmployee2 = () => {
        setShowDialog(true);
        setShowedHtml(<SelectEmployee restriction="findAllEmployees" selectionMode="single"
                                      setSelections={(selections) => {setTaskEmployees({...taskEmployees,employee2:selections});setShowDialog(false);}}/>);
    }

    const selectEmployee3 = () => {
        setShowDialog(true);
        setShowedHtml(<SelectEmployee restriction="findAllEmployees" selectionMode="single"
                                      setSelections={(selections) => {setTaskEmployees({...taskEmployees,employee3:selections});setShowDialog(false);}}/>);
    }

    const selectSupervisor3 = () => {
        setShowDialog(true);
        setShowedHtml(<SelectEmployee restriction="findAllSupervisors" selectionMode="single"
                                      setSelections={(selections) => {setTaskEmployees({...taskEmployees,supervisor3:selections});setShowDialog(false);}}/>);
    }

    const selectEmployee4 = () => {
        setShowDialog(true);
        setShowedHtml(<SelectEmployee restriction="findAllEmployees" selectionMode="single"
                                      setSelections={(selections) => {setTaskEmployees({...taskEmployees,employee4:selections});setShowDialog(false);}}/>);
    }

    const selectEmployee5 = () => {
        setShowDialog(true);
        setShowedHtml(<SelectEmployee restriction="findAllEmployees" selectionMode="single"
                                      setSelections={(selections) => {setTaskEmployees({...taskEmployees,employee5:selections});setShowDialog(false);}}/>);
    }

    const selectEmployee6 = () => {
        setShowDialog(true);
        setShowedHtml(<SelectEmployee restriction="findAllEmployees" selectionMode="single"
                                      setSelections={(selections) => {setTaskEmployees({...taskEmployees,employee6:selections});setShowDialog(false);}}/>);
    }

    const selectEmployee7 = () => {
        setShowDialog(true);
        setShowedHtml(<SelectEmployee restriction="findAllEmployees" selectionMode="single"
                                      setSelections={(selections) => {setTaskEmployees({...taskEmployees,employee7:selections});setShowDialog(false);}}/>);
    }

    const selectEmployee8 = () => {
        setShowDialog(true);
        setShowedHtml(<SelectEmployee restriction="findAllEmployees" selectionMode="single"
                                      setSelections={(selections) => {setTaskEmployees({...taskEmployees,employee8:selections});setShowDialog(false);}}/>);
    }

    const selectProject = () => {
        setShowDialog(true);
        setShowedHtml(<SelectProject selectionMode="single"
                                     setSelections={(selections) => {setForm({...form,projectId:selections.id}); setProject({...selections}); setShowDialog(false);}}/>);
    }

    const onMethodOfCommunicationChange = (e) => {
        setForm({...form,methodOfCommunication: e.value});
    }

    const onEmergencyMeetingLocationChange = (e) => {
        setForm({...form,emergencyMeetingLocation: e.value});
    }

    const onSiteChange = (e) => {
        setForm({...form,site: e.target.value});
    }

    const onLocationChange = (e) => {
        setForm({...form,location: e.target.value});
    }

    const onPhoneChange = (e) => {
        setForm({...form,emergencyPhone: e.target.value});
    }

    const onSiteSupervisorChange = (e) => {
        setForm({...form,siteSupervisor: e.target.value});
    }

    const onOfficeSiteContactChange = (e) => {
        setForm({...form,officeSiteContact: e.target.value});
    }

    const onChangeHour = (e) => {
        if (!GeneralUtils.isNullOrEmpty(e)){
            setForm({...form, startHour: e});
        }
    }

    const onChangeLocalGoverment=(e)=>{
        setProvincialGoverment({...provincialGoverment,localGoverment: e.target.value});
    }

    const onChangeSpillsGoverment=(e)=>{
        setProvincialGoverment({...provincialGoverment,spillsGoverment: e.target.value});
    }

    const onChangeHealthGoverment=(e)=>{
        setProvincialGoverment({...provincialGoverment,healthGoverment: e.target.value});
    }

    const onChangeEnvirenmentGoverment=(e)=>{
        setProvincialGoverment({...provincialGoverment,environmentGoverment: e.target.value});
    }


    const onChangeTransportationGoverment=(e)=>{
        setProvincialGoverment({...provincialGoverment,transportationGoverment: e.target.value});
    }

    const onChangeAmPm=(e)=>{
        let amPm = e.target.value;
        setForm({...form,amPm});
    }

    const onChangeLocationOfEmergency = (e) => {
        setResponseCheckList({...responseCheckList,locationOfEmergency: e.target.value});
    }

    const onChangeFirstAidKits = (e) => {
        setResponseCheckList({...responseCheckList,firstAidKits: e.target.value});
    }

    const onChangeFireExtinguishers = (e) => {
        setResponseCheckList({...responseCheckList,fireExtinguishers: e.target.value});
    }

    const onChangeSpillKits = (e) => {
        setResponseCheckList({...responseCheckList,spillKits: e.target.value});
    }

    const onChangeCertified = (e) => {
        setResponseCheckList({...responseCheckList,certified: e.target.value});
    }

    const saveForm=()=>{
        if (GeneralUtils.isNullOrEmpty(supervisor.id) ||
            GeneralUtils.isNullOrEmpty(project.id) ||
            GeneralUtils.isNullOrEmpty(foreman.id) ||
            GeneralUtils.isNullOrEmpty(hospital.id) ||
            GeneralUtils.isNullOrEmpty(form.date) ||
            GeneralUtils.isNullOrEmpty(form.site) ||
            GeneralUtils.isNullOrEmpty(form.emergencyPhone ) ||
            GeneralUtils.isNullOrEmpty(form.methodOfCommunication) ||
            GeneralUtils.isNullOrEmpty(form.emergencyMeetingLocation) ||
            GeneralUtils.isNullOrEmpty(form.officeSiteContact) ||
            GeneralUtils.isNullOrEmpty(form.siteSupervisor) ||
            GeneralUtils.isNullOrEmpty(form.hour) ||
            GeneralUtils.isNullOrEmpty(form.amPm)
        ){
            return toast.warning("Please check required fields!");
        }

        if (GeneralUtils.isNullOrEmpty(form.id)) {
            formSave();
        }else{
            formUpdate();
        }

    }

    const formSave=()=>{
        let taskEmp = {
            employee1Id: taskEmployees?.employee1?.id,
            employee2Id: taskEmployees?.employee2.id,
            employee3Id: taskEmployees?.employee3?.id,
            supervisor3Id: taskEmployees?.supervisor3?.id,
            employee4Id: taskEmployees?.employee4?.id,
            employee5Id: taskEmployees?.employee5?.id,
            employee6Id: taskEmployees?.employee6?.id,
            employee7Id: taskEmployees?.employee7?.id,
            employee8Id: taskEmployees?.employee8?.id,
        }
        emergencyService.save({...form,...taskEmp,provincialGoverment,responseCheckList,projectId:project.id,supervisorId:supervisor.id,hospitalId:hospital.id,foremanId:foreman.id}).then(res=>{
            if (res.status == 200){
                setSupervisor({});
                //setEmployee({});
                setHospital({});
                setProject({});
                setProvincialGoverment({
                    localHealthy:'',localEnvironment:'',localTransPortation:'',
                    spillsHealthy:'',spillsEnvironment:'',spillsTransPortation:''
                });
                setForm({
                    supervisorId: '',
                    employeeId :'',
                    site: '',
                    emergencyPhone: '',
                    methodOfCommunication : '',
                    emergencyMeetingLocation: '',
                    date: new Date(),
                    officeSiteContact:'',
                    siteSupervisor:'',
                    hour: '07:00',
                    amPm: '',
                    location: ''
                });
                setResponseCheckList({
                    locationOfEmergency:'',firstAidKits:'',fireExtinguishers:'',
                    spillKits:'',certified:''
                });
                toast.success("Saved succesfully!");
            }
        });
    }

    const formUpdate=()=>{
        let taskEmp = {
            employee1Id: taskEmployees?.employee1?.id,
            employee2Id: taskEmployees?.employee2.id,
            employee3Id: taskEmployees?.employee3?.id,
            supervisor3Id: taskEmployees?.supervisor3?.id,
            employee4Id: taskEmployees?.employee4?.id,
            employee5Id: taskEmployees?.employee5?.id,
            employee6Id: taskEmployees?.employee6?.id,
            employee7Id: taskEmployees?.employee7?.id,
            employee8Id: taskEmployees?.employee8?.id,
        }
        emergencyService.update({...form,...taskEmp,provincialGoverment,responseCheckList,projectId:project.id,supervisorId:supervisor.id,hospitalId:hospital.id,foremanId:foreman.id}).then(res=>{
            if (res.status == 200){
                setSupervisor({});
                //setEmployee({});
                setHospital({});
                setProject({});
                setProvincialGoverment({
                    localHealthy:'',localEnvironment:'',localTransPortation:'',
                    spillsHealthy:'',spillsEnvironment:'',spillsTransPortation:''
                });
                setForm({
                    supervisorId: '',
                    employeeId :'',
                    site: '',
                    emergencyPhone: '',
                    methodOfCommunication : '',
                    emergencyMeetingLocation: '',
                    date: new Date(),
                    officeSiteContact:'',
                    siteSupervisor:'',
                    hour: '07:00',
                    amPm: '',
                    location: ''
                });
                setResponseCheckList({
                    locationOfEmergency:'',firstAidKits:'',fireExtinguishers:'',
                    spillKits:'',certified:''
                });
                findAll();
                setShowSelectedData(false);
                toast.success("Update succesfully!");
            }
        });
    }

    return(
        <form style={{backgroundColor:'#f3f3fe'}} className="jotform-form" autoComplete="on" onSubmit={(event) => event.preventDefault()}>
            <div role="main" className="form-all">
                <ul className="form-section page-section">
                    <li id="cid_1" className="form-input-wide" data-type="control_head">
                        <div className="form-header-group  header-small">
                            <div className="header-text httac htvam">
                                <h3 id="header_1" className="form-header" data-component="header">
                                    Emergency Response and Preparedness Plan
                                </h3>
                            </div>
                        </div>
                    </li>
                    <li className="form-line jf-required" data-type="control_fullname" id="id_3">
                        <label className="form-label form-label-top form-label-auto" id="label_3" htmlFor="first_3">
                            Supervisor
                            <span className="form-required">
            *
          </span>
                        </label>
                        <div id="cid_3" className="form-input-wide jf-required" data-layout="full">
                            <div data-wrapper-react="true">
            <span className="form-sub-label-container" style={{verticalAlign:'top'}} data-input-type="first">
              <input type="text" id="first_3" name="q3_name[first]" className="form-textbox  " disabled={true}
                     data-defaultvalue="" autoComplete="section-input_3 given-name" size="10" value={supervisor?.name ? supervisor.name:''}
                     data-component="first" aria-labelledby="label_3 sublabel_3_first" required=""/>
              <label className="form-sub-label" htmlFor="first_3" id="sublabel_3_first" style={{minHeight:'13px'}}
                     aria-hidden="false"> First Name </label>
            </span>
                                <span className="form-sub-label-container" style={{verticalAlign:'top'}}
                                      data-input-type="last">
              <input type="text" id="last_3" name="q3_name[last]" className="form-textbox  " disabled={true}
                     data-defaultvalue="" autoComplete="section-input_3 family-name" size="15" value={supervisor?.surname ? supervisor?.surname :''}
                     data-component="last" aria-labelledby="label_3 sublabel_3_last" required=""/>
              <label className="form-sub-label" htmlFor="last_3" id="sublabel_3_last" style={{minHeight:'13px'}}
                     aria-hidden="false"> Last Name </label>
            </span>
                                <span className="form-sub-label-container" style={{verticalAlign:'top'}} data-input-type="first">

                        <button id="input_10"
                                onClick={selectSupervisor}
                                className="form-submit-button-simple_orange submit-button jf-form-buttons jsTest-submitField"
                                data-component="button" data-content="">
                                Select Supervisor
                            </button>
            </span>
                            </div>
                        </div>
                    </li>
                    <li className="form-line jf-required" data-type="control_fullname" id="id_3">
                        <label className="form-label form-label-top form-label-auto" id="label_3" htmlFor="first_3">
                            Foreman
                            <span className="form-required">
            *
          </span>
                        </label>
                        <div id="cid_3" className="form-input-wide jf-required" data-layout="full">
                            <div data-wrapper-react="true">
            <span className="form-sub-label-container" style={{verticalAlign:'top'}} data-input-type="first">
              <input type="text" id="first_3" name="q3_name[first]" className="form-textbox  " disabled={true}
                     data-defaultvalue="" autoComplete="section-input_3 given-name" size="10" value={foreman?.name ? foreman.name : ''}
                     data-component="first" aria-labelledby="label_3 sublabel_3_first" required=""/>
              <label className="form-sub-label" htmlFor="first_3" id="sublabel_3_first" style={{minHeight:'13px'}}
                     aria-hidden="false"> First Name </label>
            </span>
                                <span className="form-sub-label-container" style={{verticalAlign:'top'}}
                                      data-input-type="last">
              <input type="text" id="last_3" name="q3_name[last]" className="form-textbox  " disabled={true}
                     data-defaultvalue="" autoComplete="section-input_3 family-name" size="15" value={foreman?.surname ? foreman?.surname :''}
                     data-component="last" aria-labelledby="label_3 sublabel_3_last" required=""/>
              <label className="form-sub-label" htmlFor="last_3" id="sublabel_3_last" style={{minHeight:'13px'}}
                     aria-hidden="false"> Last Name </label>
            </span>
                                <span className="form-sub-label-container" style={{verticalAlign:'top'}} data-input-type="first">

                        <button id="input_10"
                                onClick={selectForeman}
                                className="form-submit-button-simple_orange submit-button jf-form-buttons jsTest-submitField"
                                data-component="button" data-content="">
                                Select Foreman
                            </button>
            </span>
                            </div>
                        </div>
                    </li>
                    <li className="form-line jf-required" data-type="control_fullname" id="id_3">
                        <label className="form-label form-label-top form-label-auto" id="label_3" htmlFor="first_3">
                            Project
                            <span className="form-required">
            *
          </span>
                        </label>
                        <div id="cid_3" className="form-input-wide jf-required" data-layout="full">
                            <div data-wrapper-react="true">
                                <span className="form-sub-label-container" style={{verticalAlign:'top'}}
                                      data-input-type="last">
              <input type="text" id="last_3" name="q3_name[last]" className="form-textbox  " disabled={true}
                     data-defaultvalue="" autoComplete="section-input_3 family-name" size="15" value={project?.name ? project?.name :''}
                     data-component="last" aria-labelledby="label_3 sublabel_3_last" required=""/>
              <label className="form-sub-label" htmlFor="last_3" id="sublabel_3_last" style={{minHeight:'13px'}}
                     aria-hidden="false">Name </label>
            </span>
                                <span className="form-sub-label-container" style={{verticalAlign:'top'}} data-input-type="first">

                        <button id="input_10"
                                onClick={selectProject}
                                className="form-submit-button-simple_orange submit-button jf-form-buttons jsTest-submitField"
                                data-component="button" data-content="">
                                Select Project
                            </button>
            </span>
                            </div>
                        </div>
                    </li>
                    <li className="form-line form-line-column jf-required" data-type="control_textbox" id="id_8">
                        <label className="form-label form-label-top form-label-auto" id="label_8" htmlFor="input_8">
                            Site
                            <span className="form-required">
            *
          </span>
                        </label>
                        <div id="cid_8" className="form-input-wide jf-required" data-layout="half">
                            <input type="text" id="input_8" name="q8_typeA8" data-type="input-textbox"
                                   className="form-textbox  " data-defaultvalue="" style={{width:'310px'}}
                                   size="310" value={form?.site} onChange={onSiteChange} data-component="textbox" aria-labelledby="label_8" required=""/>
                        </div>
                        <label className="form-label form-label-top form-label-auto" id="label_8" htmlFor="input_8">
                            Location
                            <span className="form-required">
            *
          </span>
                        </label>
                        <div id="cid_8" className="form-input-wide jf-required" data-layout="half">
                            <input type="text" id="input_8" name="q8_typeA8" data-type="input-textbox"
                                   className="form-textbox  " data-defaultvalue="" style={{width:'310px'}}
                                   size="310" value={form?.location} onChange={onLocationChange} data-component="textbox" aria-labelledby="label_8" required=""/>
                        </div>
                    </li>
                    <li className="form-line form-line-column form-col-1 jf-required" data-type="control_phone"
                        id="id_4">
                        <label className="form-label form-label-top form-label-auto" id="label_4"
                               htmlFor="input_4_full">
                            Phone Number
                            <span className="form-required">
            *
          </span>
                        </label>
                        <div id="cid_4" className="form-input-wide jf-required" data-layout="half">
          <span className="form-sub-label-container" style={{verticalAlign:'top'}}>
            <input type="text" id="input_4_full" name="q4_phoneNumber[full]"
                   className="mask-phone-number form-textbox validate[required, Fill Mask]" data-defaultvalue=""
                   style={{width:'310px'}} value={form?.emergencyPhone} onChange={onPhoneChange}
                   aria-labelledby="label_4 sublabel_4_masked"/>
          </span>
                        </div>
                    </li>
                    <li className="form-line form-line-column form-col-2 jf-required" data-type="control_textbox"
                        id="id_7">
                        <label className="form-label form-label-top form-label-auto" id="label_7" htmlFor="input_7">
                            Method of Communication
                            <span className="form-required">
            *
          </span>
                        </label>
                        <div id="cid_7" className="form-input-wide jf-required" data-layout="half">
                            <Dropdown value={form?.methodOfCommunication} options={methodOfCommunicationOptions} onChange={onMethodOfCommunicationChange} optionLabel="name" placeholder="Select" />
                        </div>
                    </li>
                    <li className="form-line form-line-column form-col-3 jf-required" data-type="control_textbox"
                        id="id_9">
                        <label className="form-label form-label-top form-label-auto" id="label_9" htmlFor="input_9">
                            Emergency Meeting Location/ Muster:
                            <span className="form-required">
            *
          </span>
                        </label>
                        <div id="cid_9" className="form-input-wide jf-required" data-layout="half">
                            <Dropdown value={form?.emergencyMeetingLocation} options={emergencyMeetingLocationOptions} onChange={onEmergencyMeetingLocationChange} optionLabel="name" placeholder="Select" />
                        </div>
                    </li>
                    <li className="form-line fixed-width jf-required" data-type="control_textbox" id="id_8">
                        <label className="form-label form-label-top form-label-auto" id="label_8" htmlFor="input_8">
                            Nearest Hospital #
                            <span className="form-required">
            *
          </span>
                        </label>
                        <div id="cid_8" style={{display: 'flex'}} className="form-input-wide jf-required"
                             data-layout="half">
                            <input type="text" id="input_8" name="q8_typeA8" data-type="input-textbox"
                                   className="form-textbox  " data-defaultvalue=""
                                   style={{width: '520px'}}
                                   disabled={true}
                                   size="520"
                                   value={hospital.name ? hospital.name : selectedData?.name ? selectedData?.name : ''}
                                   data-component="textbox" aria-labelledby="label_8" required=""/>
                            {!isShow && <Button onClick={selectHospital} icon="pi pi-search"
                                                className="p-button-sm p-button-rounded p-button-text"/>}

                        </div>
                    </li>
                    <li className="form-line form-line-column form-col-5 jf-required" data-type="control_datetime"
                        id="id_5">
                        <label className="form-label form-label-top form-label-auto" id="label_5" htmlFor="lite_mode_5">
                            Date
                            <span className="form-required">
            *
          </span>
                        </label>
                        <div className="p-fluid grid formgrid">
                            <Calendar id="icon" value={form?.date} onChange={(e) => setForm({...form,date:e.value})}
                                      dateFormat={GeneralUtils.DATE_FORMAT_CALENDAR}
                                      showIcon/>
                        </div>
                    </li>
                    <li className="form-line form-line-column form-col-6 jf-required" data-type="control_time"
                        id="id_6">
                        <label className="form-label form-label-top form-label-auto" id="label_6"
                               htmlFor="input_6_hourSelect">
                            Time
                            <span className="form-required">
            *
          </span>
                        </label>
                        <div id="cid_6" className="form-input-wide jf-required" data-layout="half">
                            <div data-wrapper-react="true">
                                <TimePicker
                                    disableClock={true}
                                    onChange={onChangeHour}
                                    value={form.hour}
                                />
                                <div className="time-wrapper">
              <span className="form-sub-label-container" style={{verticalAlign:'top'}}>
                <select onChange={onChangeAmPm} className="time-dropdown form-dropdown  " id="input_6_ampm"
                        name="q6_time[ampm]" data-component="time-ampm" required=""
                        value={selectedData?.amPm}
                        aria-labelledby="label_6 sublabel_6_ampm">
                  <option selected="" value=""> Select </option>
                    {
                        AM_PM.map(elem=>{
                            return <option value={elem.value}> {elem.name} </option>
                        })
                    }
                </select>
                <label className="form-sub-label" htmlFor="input_6_ampm" id="sublabel_6_ampm"
                       style={{border:0,clip:'rect(0 0 0 0)',height:'1px',margin:'-1px',overFlow:'hidden',padding:0,position:'absolute',width:'1px',whiteSpace:'nowrap'}}
                       aria-hidden="false"> AM/PM Option </label>
              </span>
                                </div>
                            </div>
                        </div>
                    </li>
                    <li className="form-line form-line-column form-col-7 jf-required" data-type="control_textbox"
                        id="id_11">
                        <label className="form-label form-label-top form-label-auto" id="label_11" htmlFor="input_11">
                            Office Site Contact:
                            <span className="form-required">
            *
          </span>
                        </label>
                        <div id="cid_11" className="form-input-wide jf-required" data-layout="half">
                            <input type="text" id="input_11" name="q11_typeA11" data-type="input-textbox"
                                   className="form-textbox  " data-defaultvalue="" style={{width:'310px'}}
                                   size="310" value={form?.officeSiteContact} onChange={onOfficeSiteContactChange} data-component="textbox" aria-labelledby="label_11" required=""/>
                        </div>
                    </li>
                    <li className="form-line form-line-column form-col-8 jf-required" data-type="control_textbox"
                        id="id_12">
                        <label className="form-label form-label-top form-label-auto" id="label_12" htmlFor="input_12">
                            Site Supervisor:(Working on someone else site)
                            <span className="form-required">
            *
          </span>
                        </label>
                        <div id="cid_12" className="form-input-wide jf-required" data-layout="half">
                            <input type="text" id="input_12" name="q12_typeA12" data-type="input-textbox"
                                   className="form-textbox  " data-defaultvalue="" style={{width:'310px'}}
                                   size="310" value={form?.siteSupervisor} onChange={onSiteSupervisorChange} data-component="textbox" aria-labelledby="label_12" required=""/>
                        </div>
                    </li>
                    <li id="cid_13" className="form-input-wide" data-type="control_head">
                        <div className="form-header-group  header-default">
                            <div className="header-text httac htvam">
                                <h2 id="header_13" className="form-header" data-component="header">
                                    Purpose
                                </h2>
                                <div id="subHeader_13" className="form-subHeader">
                                    To Provide planning for the identification of potential for incidents and emergency
                                    situations as well as the migration of the environmental impacts that may be
                                    involved with incidents and emergency situations.
                                </div>
                            </div>
                        </div>
                    </li>
                    <li id="cid_14" className="form-input-wide" data-type="control_head">
                        <div className="form-header-group  header-default">
                            <div className="header-text httac htvam">
                                <h2 id="header_14" className="form-header" data-component="header">
                                    Emergency Response Checklist
                                </h2>
                            </div>
                        </div>
                    </li>
                    <li className="form-line" data-type="control_inline" id="id_16">
                        <div id="cid_16" className="form-input-wide" data-layout="full">
                            <div id="FITB_16" className="FITB formRender">
                                <p>Communication method: <span data-type="textbox" data-grouptype="control_textbox"
                                                               className="FITB-inptCont"><input type="text"
                                                                                                className="form-textbox "
                                                                                                name="q16_input16[shorttext-1]"
                                                                                                id="16_shorttext-1"
                                                                                                value={form.methodOfCommunication}
                                /></span> <br/><span
                                    style={{color:'#000000',backgroundColor:'transparent'}}>Location of Emergency Communication Systems:</span>
                                    <span data-type="textbox" data-grouptype="control_textbox"
                                          className="FITB-inptCont">
                                        <select onChange={onChangeLocationOfEmergency} className="time-dropdown form-dropdown  " id="input_6_ampm"
                                                name="q6_time[ampm]" data-component="time-ampm" required=""
                                                value={responseCheckList.locationOfEmergency}
                                                aria-labelledby="label_6 sublabel_6_ampm">
                                          <option selected="" value=""> Select </option>
                                            {
                                                LOCATION_OF_EMERGENCY.map(elem=>{
                                                    return <option value={elem.value}> {elem.name} </option>
                                                })
                                            }
                                        </select>
                                    </span> <br/>First Aid Kits are located in
                                    the following areas:<span data-type="textbox" data-grouptype="control_textbox"
                                                              className="FITB-inptCont">
                                        <select onChange={onChangeFirstAidKits} className="time-dropdown form-dropdown  " id="input_6_ampm"
                                                name="q6_time[ampm]" data-component="time-ampm" required=""
                                                value={responseCheckList.firstAidKits}
                                                aria-labelledby="label_6 sublabel_6_ampm">
                                          <option selected="" value=""> Select </option>
                                            {
                                                FIRST_AID_KITS.map(elem=>{
                                                    return <option value={elem.value}> {elem.name} </option>
                                                })
                                            }
                                        </select>
                                    </span> <br/>Fire Extinguishers
                                    are located in the following areas: <span data-type="textbox"
                                                                              data-grouptype="control_textbox"
                                                                              className="FITB-inptCont">
                                        <select onChange={onChangeFireExtinguishers} className="time-dropdown form-dropdown  " id="input_6_ampm"
                                                name="q6_time[ampm]" data-component="time-ampm" required=""
                                                value={responseCheckList.fireExtinguishers}
                                                aria-labelledby="label_6 sublabel_6_ampm">
                                          <option selected="" value=""> Select </option>
                                            {
                                                FIRE_EXTINGUISHERS.map(elem=>{
                                                    return <option value={elem.value}> {elem.name} </option>
                                                })
                                            }
                                        </select>
                                    </span> <br/>Spill Kits are
                                    located in the following areas:<span data-type="textbox"
                                                                         data-grouptype="control_textbox"
                                                                         className="FITB-inptCont">
                                        <select onChange={onChangeSpillKits} className="time-dropdown form-dropdown  " id="input_6_ampm"
                                                name="q6_time[ampm]" data-component="time-ampm" required=""
                                                value={responseCheckList.spillKits}
                                                aria-labelledby="label_6 sublabel_6_ampm">
                                          <option selected="" value=""> Select </option>
                                            {
                                                SPILL_KIDS.map(elem=>{
                                                    return <option value={elem.value}> {elem.name} </option>
                                                })
                                            }
                                        </select>
                                    </span> <br/>Certified First
                                    Aiders include:<span data-type="textbox" data-grouptype="control_textbox"
                                                         className="FITB-inptCont"><input type="text"
                                                                                          className="form-textbox  validate[]"
                                                                                          name="q16_input16[shorttext-6]"
                                                                                          value={responseCheckList.certified}
                                                                                          onChange={onChangeCertified}
                                                                                          id="16_shorttext-6" /></span> <br/><br/><span
                                        style={{color:'#000000',backgroundColor:'transparent'}}>Emergency Contact Numbers:</span><br/><span
                                        style={{color:'#000000',backgroundColor:'transparent'}}>Fire/Ambulance/Police 911</span><br/><span
                                        style={{color:'#000000',backgroundColor:'transparent'}}>Nearest Hospital:</span><br/><br/><span
                                        style={{color:'#000000',backgroundColor:'transparent'}}>Name</span><span
                                        data-type="textbox" data-grouptype="control_fullname" className="FITB-inptCont"><input
                                        type="text" className="form-textbox  validate[]" name="q16_input16[firstname-7]" value={hospital.name  ? hospital.name : ''}
                                        id="16_firstname-7"/></span>
                                    <span style={{color:'#000000',backgroundColor:'transparent'}}>Phone </span> <span
                                        data-type="textbox" data-grouptype="control_phone"
                                        className="FITB-inptCont"></span> <span data-type="textbox"
                                                                                data-grouptype="control_phone"
                                                                                className="FITB-inptCont"><input
                                        type="tel" className="form-textbox  validate[Numeric]" value={hospital.phone ? hospital.phone :''}
                                        name="q16_input16[phone-8]" id="16_phone-8"/></span> <span
                                        style={{color:'#000000',backgroundColor:'transparent'}}>Address</span> <span
                                        data-type="textbox" data-grouptype="control_address"
                                        className="FITB-inptCont"><input type="text" value={hospital.street ? hospital.street : ''}
                                                                         className="form-textbox  validate[]"
                                                                         name="q16_input16[streetaddress-9]"
                                                                         id="16_streetaddress-9"/></span> <span
                                        data-type="textbox" data-grouptype="control_address"
                                        className="FITB-inptCont"><input type="text" value={hospital.city ? hospital.city :''}
                                                                         className="form-textbox  validate[]"
                                                                         name="q16_input16[city-9]" id="16_city-9"
                                    /></span> <span data-type="textbox"
                                                    data-grouptype="control_address"
                                                    className="FITB-inptCont"><input value={hospital.zip ? hospital.zip :''}
                                                                                     type="text" className="form-textbox  validate[]" name="q16_input16[zip-9]"
                                                                                     id="16_zip-9" /></span></p>
                            </div>
                        </div>
                    </li>
                    <li className="form-line" data-type="control_matrix" id="id_17">
                        <label className="form-label form-label-top form-label-auto" id="label_17"
                               htmlFor="input_17"> Emergency Contact Numbers </label>
                        <div id="cid_17" className="form-input-wide" data-layout="full">
                            <table summary="" aria-labelledby="label_17" cellPadding="4" cellSpacing="0"
                                   className="form-matrix-table" data-component="matrix">
                                <tr className="form-matrix-tr form-matrix-header-tr">
                                    <th className="form-matrix-th" style={{border:'none'}}>

                                    </th>
                                    <th scope="col"
                                        className="form-matrix-headers form-matrix-column-headers form-matrix-column_0">
                                        <label id="label_17_col_0"> Government Office </label>
                                    </th>
                                </tr>
                                <tr className="form-matrix-tr form-matrix-value-tr"
                                    aria-labelledby="label_17 label_17_row_0">
                                    <th scope="row" className="form-matrix-headers form-matrix-row-headers">
                                        <label id="label_17_row_0"> Local Hydro </label>
                                    </th>
                                    <td className="form-matrix-values">
                                        <input type="text" id="input_17_0_0" className="form-textbox" size="5"
                                               name="q17_emergencyContact[0][]" style={{width:'100%',boxSizing:'border-box'}}
                                               value={provincialGoverment.localGoverment}
                                               onChange={onChangeLocalGoverment}
                                               aria-labelledby="label_17_col_0 label_17_row_0"/>
                                    </td>
                                </tr>
                                <tr className="form-matrix-tr form-matrix-value-tr"
                                    aria-labelledby="label_17 label_17_row_1">
                                    <th scope="row" className="form-matrix-headers form-matrix-row-headers">
                                        <label id="label_17_row_1"> Spills Reporting </label>
                                    </th>
                                    <td className="form-matrix-values">
                                        <input type="text" id="input_17_1_0" className="form-textbox" size="5"
                                               name="q17_emergencyContact[1][]" style={{width:'100%',boxSizing:'border-box'}}
                                               value={provincialGoverment.spillsGoverment}
                                               onChange={onChangeSpillsGoverment}
                                               aria-labelledby="label_17_col_0 label_17_row_1"/>
                                    </td>
                                </tr>
                                <tr className="form-matrix-tr form-matrix-value-tr"
                                    aria-labelledby="label_17 label_17_row_2">
                                    <th scope="row" className="form-matrix-headers form-matrix-row-headers">
                                        <label id="label_17_row_2"> Health Safety </label>
                                    </th>
                                    <td className="form-matrix-values">
                                        <input type="text" id="input_17_2_0" className="form-textbox" size="5"
                                               name="q17_emergencyContact[2][]" style={{width:'100%',boxSizing:'border-box'}}
                                               value={provincialGoverment.healthGoverment}
                                               onChange={onChangeHealthGoverment}
                                               aria-labelledby="label_17_col_0 label_17_row_2"/>
                                    </td>
                                </tr>
                                <tr className="form-matrix-tr form-matrix-value-tr"
                                    aria-labelledby="label_17 label_17_row_3">
                                    <th scope="row" className="form-matrix-headers form-matrix-row-headers">
                                        <label id="label_17_row_3"> Environment </label>
                                    </th>
                                    <td className="form-matrix-values">
                                        <input type="text" id="input_17_3_0" className="form-textbox" size="5"
                                               name="q17_emergencyContact[3][]" style={{width:'100%',boxSizing:'border-box'}}
                                               value={provincialGoverment.environmentGoverment}
                                               onChange={onChangeEnvirenmentGoverment}
                                               aria-labelledby="label_17_col_0 label_17_row_3"/>
                                    </td>
                                </tr>
                                <tr className="form-matrix-tr form-matrix-value-tr"
                                    aria-labelledby="label_17 label_17_row_4">
                                    <th scope="row" className="form-matrix-headers form-matrix-row-headers">
                                        <label id="label_17_row_4"> Transportation </label>
                                    </th>
                                    <td className="form-matrix-values">
                                        <input type="text" id="input_17_4_0" className="form-textbox" size="5"
                                               name="q17_emergencyContact[4][]" style={{width:'100%',boxSizing:'border-box'}}
                                               value={provincialGoverment.transportationGoverment}
                                               onChange={onChangeTransportationGoverment}
                                               aria-labelledby="label_17_col_0 label_17_row_4"/>
                                    </td>
                                </tr>
                            </table>
                        </div>
                    </li>
                    <li id="cid_18" className="form-input-wide" data-type="control_head">
                        <div className="form-header-group  header-default">
                            <div className="header-text httac htvam">
                                <h2 id="header_18" className="form-header" data-component="header">
                                    IN THE EVENT OF AN EMERGENCY
                                </h2>
                                <div id="subHeader_18" className="form-subHeader">
                                    Identify and communicate the following individuals to all workers on site.
                                </div>
                            </div>
                        </div>
                    </li>
                    <li className="form-line" data-type="control_inline" id="id_19">
                        <div id="cid_19" className="form-input-wide" data-layout="full">
                            <div id="FITB_19" className="FITB formRender">
                                <p>1. <span data-type="textbox" data-grouptype="control_fullname"
                                            className="FITB-inptCont"><input type="text"
                                                                             className="form-textbox  validate[]"
                                                                             name="q19_input19[firstname-1]" value={taskEmployees?.employee1?.name ? taskEmployees.employee1.name: ''}
                                                                             id="19_firstname-1"/></span> <span data-type="textbox"
                                                                                                                data-grouptype="control_fullname"
                                                                                                                className="FITB-inptCont"><input value={taskEmployees?.employee1?.surname ? taskEmployees.employee1.surname :''}
                                                                                                                                                 type="text" className="form-textbox  validate[]" name="q19_input19[lastname-1]"
                                                                                                                                                 id="19_lastname-1" /></span>
                                    <span style={{color:'#000000',backgroundColor:'transparent'}}> will contact the necessary emergency services and MOL, MOE etc..   </span><span
                                        data-type="textbox" data-grouptype="control_fullname" className="FITB-inptCont"><input
                                        value={taskEmployees?.employee1?.name ? taskEmployees.employee1.name:''}
                                        type="text" className="form-textbox  validate[]" name="q19_input19[firstname-2]"
                                        id="19_firstname-2" /></span>
                                    <span data-type="textbox" data-grouptype="control_fullname"
                                          className="FITB-inptCont"><input type="text" value={taskEmployees?.employee1?.surname ? taskEmployees.employee1.surname :''}
                                                                           className="form-textbox  validate[]"
                                                                           name="q19_input19[lastname-2]"
                                                                           id="19_lastname-2" /></span> <span
                                        style={{color:'#000000',backgroundColor:'transparent'}}> will act as an alternate if the above individual is unavailable. </span>
                                    <Button onClick={selectEmployee1} icon="pi pi-search" style={{borderColor:'#6366F1',height:'0px'}}
                                            className="p-button-sm p-button-rounded p-button-text"/>
                                </p>
                            </div>
                        </div>
                    </li>
                    <li className="form-line" data-type="control_inline" id="id_20">
                        <div id="cid_20" className="form-input-wide" data-layout="full">
                            <div id="FITB_20" className="FITB formRender">
                                <p>2. <span data-type="textbox" data-grouptype="control_fullname"
                                            className="FITB-inptCont"><input type="text"
                                                                             value={taskEmployees?.employee2?.name ? taskEmployees.employee2.name:''}
                                                                             className="form-textbox  validate[]"
                                                                             name="q20_input20[firstname-1]"
                                                                             id="20_firstname-1"/></span> <span data-type="textbox"
                                                                                                                data-grouptype="control_fullname"
                                                                                                                className="FITB-inptCont"><input
                                    value={taskEmployees.employee2?.surname ? taskEmployees.employee2.surname :''}
                                    type="text" className="form-textbox  validate[]" name="q20_input20[lastname-1]"
                                    id="20_lastname-1"/></span>
                                    <span style={{color:'#000000',backgroundColor:'transparent'}}> will provide first aid treatment. The alternate first aid provider will be </span><span
                                        data-type="textbox" data-grouptype="control_fullname" className="FITB-inptCont"><input
                                        value={taskEmployees?.employee2?.name ? taskEmployees.employee2.name:''}
                                        type="text" className="form-textbox  validate[]" name="q20_input20[firstname-2]"
                                        id="20_firstname-2"/></span>
                                    <span data-type="textbox" data-grouptype="control_fullname"
                                          className="FITB-inptCont"><input type="text"
                                                                           className="form-textbox  validate[]"
                                                                           name="q20_input20[lastname-2]"
                                                                           value={taskEmployees?.employee2?.surname ? taskEmployees.employee2.surname :''}
                                                                           id="20_lastname-2"/></span> <span
                                        style={{color:'#000000',backgroundColor:'transparent'}}> in the event that the above named individual is unavailable. </span>
                                    <Button onClick={selectEmployee2} icon="pi pi-search" style={{borderColor:'#6366F1',height:'0px'}}
                                            className="p-button-sm p-button-rounded p-button-text"/>
                                </p>
                            </div>
                        </div>
                    </li>
                    <li className="form-line" data-type="control_inline" id="id_21">
                        <div id="cid_21" className="form-input-wide" data-layout="full">
                            <div id="FITB_21" className="FITB formRender">
                                <p>3. <span data-type="textbox" data-grouptype="control_fullname"
                                            className="FITB-inptCont"><input type="text"
                                                                             className="form-textbox  validate[]"
                                                                             value={taskEmployees?.supervisor3?.name ? taskEmployees.supervisor3.name:''}
                                                                             name="q21_input21[firstname-1]"
                                                                             id="21_firstname-1"/></span> <span data-type="textbox"
                                                                                                                data-grouptype="control_fullname"
                                                                                                                className="FITB-inptCont"><input
                                    value={taskEmployees?.supervisor3?.surname ? taskEmployees.supervisor3.surname:''}
                                    type="text" className="form-textbox  validate[]" name="q21_input21[lastname-1]"
                                    id="21_lastname-1"/></span> <span
                                    style={{color:'#000000',backgroundColor:'transparent'}}> will ensure that the injured worker is provided with adequate transportation to the hospital via   </span><span
                                    data-type="textbox" data-grouptype="control_textbox"
                                    className="FITB-inptCont"><input type="text" className="form-textbox  validate[]"
                                                                     name="q21_input21[shorttext-3]" id="21_shorttext-3"
                                /><label htmlFor="21_shorttext-3"></label></span><span
                                    style={{color:'#000000',backgroundColor:'transparent'}}>    (car, ambulance, etc.). </span><span
                                    data-type="textbox" data-grouptype="control_fullname"
                                    className="FITB-inptCont"><input type="text" className="form-textbox  validate[]"
                                                                     value={taskEmployees?.employee3?.name ? taskEmployees.employee3.name:''}
                                                                     name="q21_input21[firstname-2]" id="21_firstname-2"
                                /></span>
                                    <span data-type="textbox" data-grouptype="control_fullname"
                                          className="FITB-inptCont"><input type="text"
                                                                           className="form-textbox  validate[]"
                                                                           name="q21_input21[lastname-2]"
                                                                           value={taskEmployees?.employee3?.surname ? taskEmployees.employee3.surname :''}
                                                                           id="21_lastname-2" /></span> <span
                                        style={{color:'#000000',backgroundColor:'transparent'}}>will act as an alternate if the above individual is unavailable.</span>
                                    <Button onClick={selectSupervisor3} icon="pi pi-search" style={{borderColor:'#6366F1',height:'0px'}}
                                            className="p-button-sm p-button-rounded p-button-text"/>
                                    <Button onClick={selectEmployee3} icon="pi pi-search" style={{borderColor:'#6366F1',height:'0px'}}
                                            className="p-button-sm p-button-rounded p-button-text"/>
                                </p>
                            </div>
                        </div>
                    </li>
                    <li className="form-line" data-type="control_inline" id="id_22">
                        <div id="cid_22" className="form-input-wide" data-layout="full">
                            <div id="FITB_22" className="FITB formRender">
                                <p>4. <span data-type="textbox" data-grouptype="control_fullname"
                                            className="FITB-inptCont"><input type="text"
                                                                             className="form-textbox  validate[]"
                                                                             name="q22_input22[firstname-1]"
                                                                             value={taskEmployees?.employee4?.name ? taskEmployees.employee4.name:''}
                                                                             id="22_firstname-1" /></span> <span data-type="textbox"
                                                                                                                 data-grouptype="control_fullname"
                                                                                                                 className="FITB-inptCont"><input
                                    value={taskEmployees?.employee4?.surname ? taskEmployees.employee4.surname :''}
                                    type="text" className="form-textbox  validate[]" name="q22_input22[lastname-1]"
                                    id="22_lastname-1" /></span>
                                    <span style={{color:'#000000',backgroundColor:'transparent'}}>  will meet and direct emergency services vehicles to the scene </span><span
                                        data-type="textbox" data-grouptype="control_fullname" className="FITB-inptCont"><input
                                        value={taskEmployees?.employee4?.name ? taskEmployees.employee4.name:''}
                                        type="text" className="form-textbox  validate[]" name="q22_input22[firstname-2]"
                                        id="22_firstname-2" /></span>
                                    <span data-type="textbox" data-grouptype="control_fullname"
                                          className="FITB-inptCont"><input type="text"
                                                                           className="form-textbox  validate[]"
                                                                           name="q22_input22[lastname-2]"
                                                                           value={taskEmployees?.employee4?.surname ? taskEmployees.employee4.surname :''}
                                                                           id="22_lastname-2" /></span> <span
                                        style={{color:'#000000',backgroundColor:'transparent'}}> will act as an alternate if the above individual is unavailable. </span>
                                </p>
                                <Button onClick={selectEmployee4} icon="pi pi-search" style={{borderColor:'#6366F1',height:'0px'}}
                                        className="p-button-sm p-button-rounded p-button-text"/>
                            </div>
                        </div>
                    </li>
                    <li className="form-line" data-type="control_inline" id="id_23">
                        <div id="cid_23" className="form-input-wide" data-layout="full">
                            <div id="FITB_23" className="FITB formRender">
                                <p>5. <span data-type="textbox" data-grouptype="control_fullname"
                                            className="FITB-inptCont"><input type="text"
                                                                             value={taskEmployees?.employee5?.name ? taskEmployees.employee5.name:''}
                                                                             className="form-textbox  validate[]"
                                                                             name="q23_input23[firstname-1]"
                                                                             id="23_firstname-1" /></span> <span data-type="textbox"
                                                                                                                 data-grouptype="control_fullname"
                                                                                                                 className="FITB-inptCont"><input
                                    value={taskEmployees?.employee5?.surname ? taskEmployees.employee5.surname :''}
                                    type="text" className="form-textbox  validate[]" name="q23_input23[lastname-1]"
                                    id="23_lastname-1" /></span>
                                    <span style={{color:'#000000',backgroundColor:'transparent'}}>(name of worker, who is properly trained) will provide emergency traffic control. </span><span
                                        data-type="textbox" data-grouptype="control_fullname" className="FITB-inptCont"><input
                                        type="text" className="form-textbox  validate[]" name="q23_input23[firstname-2]"
                                        value={taskEmployees?.employee5?.name ? taskEmployees.employee5.name:''}
                                        id="23_firstname-2" /></span>
                                    <span data-type="textbox" data-grouptype="control_fullname"
                                          className="FITB-inptCont"><input type="text"
                                                                           className="form-textbox  validate[]"
                                                                           name="q23_input23[lastname-2]"
                                                                           value={taskEmployees?.employee5?.surname ? taskEmployees.employee5.surname :''}
                                                                           id="23_lastname-2" /></span> <span
                                        style={{color:'#000000',backgroundColor:'transparent'}}>  will act as an alternate if the above individual is unavailable. </span>
                                    <Button onClick={selectEmployee5} icon="pi pi-search" style={{borderColor:'#6366F1',height:'0px'}}
                                            className="p-button-sm p-button-rounded p-button-text"/>
                                </p>
                            </div>
                        </div>
                    </li>
                    <li className="form-line" data-type="control_inline" id="id_24">
                        <div id="cid_24" className="form-input-wide" data-layout="full">
                            <div id="FITB_24" className="FITB formRender">
                                <p>6. <span data-type="textbox" data-grouptype="control_fullname"
                                            className="FITB-inptCont"><input type="text"
                                                                             className="form-textbox  validate[]"
                                                                             name="q24_input24[firstname-1]"
                                                                             value={taskEmployees?.employee6?.name ? taskEmployees.employee6.name:''}
                                                                             id="24_firstname-1" /></span> <span data-type="textbox"
                                                                                                                 data-grouptype="control_fullname"
                                                                                                                 className="FITB-inptCont"><input
                                    value={taskEmployees?.employee6?.surname ? taskEmployees.employee6.surname :''}
                                    type="text" className="form-textbox  validate[]" name="q24_input24[lastname-1]"
                                    id="24_lastname-1" /></span>
                                    <span style={{color:'#000000',backgroundColor:'transparent'}}> will make provisions for cordoning off the accident scene to protect workers. </span><span
                                        data-type="textbox" data-grouptype="control_fullname" className="FITB-inptCont"><input
                                        value={taskEmployees?.employee6?.name ? taskEmployees.employee6.name:''}
                                        type="text" className="form-textbox  validate[]" name="q24_input24[firstname-2]"
                                        id="24_firstname-2" /></span>
                                    <span data-type="textbox" data-grouptype="control_fullname"
                                          className="FITB-inptCont"><input type="text"
                                                                           className="form-textbox  validate[]"
                                                                           name="q24_input24[lastname-2]"
                                                                           value={taskEmployees?.employee6?.surname ? taskEmployees.employee6.surname :''}
                                                                           id="24_lastname-2" /></span> <span
                                        style={{color:'#000000',backgroundColor:'transparent'}}>  will act as an alternate if the above individual is unavailable. </span>
                                    <Button onClick={selectEmployee6} icon="pi pi-search" style={{borderColor:'#6366F1',height:'0px'}}
                                            className="p-button-sm p-button-rounded p-button-text"/>
                                </p>
                            </div>
                        </div>
                    </li>
                    <li className="form-line" data-type="control_inline" id="id_25">
                        <div id="cid_25" className="form-input-wide" data-layout="full">
                            <div id="FITB_25" className="FITB formRender">
                                <p>7. <span data-type="textbox" data-grouptype="control_fullname"
                                            className="FITB-inptCont"><input type="text"
                                                                             className="form-textbox  validate[]"
                                                                             value={taskEmployees?.employee7?.name ? taskEmployees.employee7.name:''}
                                                                             name="q25_input25[firstname-1]"
                                                                             id="25_firstname-1" /></span> <span data-type="textbox"
                                                                                                                 data-grouptype="control_fullname"
                                                                                                                 className="FITB-inptCont"><input
                                    value={taskEmployees?.employee7?.surname ? taskEmployees.employee7.surname :''}
                                    type="text" className="form-textbox  validate[]" name="q25_input25[lastname-1]"
                                    id="25_lastname-1" /></span>
                                    <span style={{color:'#000000',backgroundColor:'transparent'}}>  will document where the injured worker has been taken. (Hospital, medical center etc.). </span><span
                                        data-type="textbox" data-grouptype="control_fullname" className="FITB-inptCont"><input
                                        value={taskEmployees?.employee7?.name ? taskEmployees.employee7.name:''}
                                        type="text" className="form-textbox  validate[]" name="q25_input25[firstname-2]"
                                        id="25_firstname-2" /></span>
                                    <span data-type="textbox" data-grouptype="control_fullname"
                                          className="FITB-inptCont"><input type="text"
                                                                           className="form-textbox  validate[]"
                                                                           name="q25_input25[lastname-2]"
                                                                           value={taskEmployees?.employee7?.surname ? taskEmployees.employee7.surname :''}
                                                                           id="25_lastname-2" /></span> <span
                                        style={{color:'#000000',backgroundColor:'transparent'}}>   will act as an alternate if the above individual is unavailable. </span>
                                    <Button onClick={selectEmployee7} icon="pi pi-search" style={{borderColor:'#6366F1',height:'0px'}}
                                            className="p-button-sm p-button-rounded p-button-text"/>
                                </p>
                            </div>
                        </div>
                    </li>
                    <li className="form-line" data-type="control_inline" id="id_26">
                        <div id="cid_26" className="form-input-wide" data-layout="full">
                            <div id="FITB_26" className="FITB formRender">
                                <p>8. <span style={{color:'#000000',backgroundColor:'transparent'}}>In the event that the supervisor has left the site to transport the injured worker to the hospital, </span>
                                    <span data-type="textbox" data-grouptype="control_fullname"
                                          className="FITB-inptCont"><input type="text"
                                                                           className="form-textbox  validate[]"
                                                                           name="q26_input26[firstname-1]"
                                                                           value={taskEmployees?.employee8?.name ? taskEmployees.employee8.name:''}
                                                                           id="26_firstname-1" /></span> <span
                                        data-type="textbox" data-grouptype="control_fullname" className="FITB-inptCont"><input
                                        value={taskEmployees?.employee8?.surname ? taskEmployees.employee8.surname :''}
                                        type="text" className="form-textbox  validate[]" name="q26_input26[lastname-1]"
                                        id="26_lastname-1" />
                                </span> <span
                                        style={{color:'#000000',backgroundColor:'transparent'}}>  will supervise the site.  </span><span
                                        data-type="textbox" data-grouptype="control_fullname" className="FITB-inptCont"><input
                                        value={taskEmployees?.employee8?.name ? taskEmployees.employee8.name:''}
                                        type="text" className="form-textbox  validate[]" name="q26_input26[firstname-2]"
                                        id="26_firstname-2" /></span>
                                    <span data-type="textbox" data-grouptype="control_fullname"
                                          className="FITB-inptCont"><input type="text"
                                                                           className="form-textbox  validate[]"
                                                                           name="q26_input26[lastname-2]"
                                                                           value={taskEmployees?.employee8?.surname ? taskEmployees.employee8.surname :''}
                                                                           id="26_lastname-2" /></span> <span
                                        style={{color:'#000000',backgroundColor:'transparent'}}>will act as an alternate if the above individual is unavailable. </span>
                                    <Button onClick={selectEmployee8} icon="pi pi-search" style={{borderColor:'#6366F1',height:'0px'}}
                                            className="p-button-sm p-button-rounded p-button-text"/>
                                </p>
                            </div>
                        </div>
                    </li>
                    <li className="form-line" data-type="control_button" id="id_2">
                        <div id="cid_2" className="form-input-wide" data-layout="full">
                            <div data-align="auto"
                                 className="form-buttons-wrapper form-buttons-auto   jsTest-button-wrapperField">
                                <button id="input_2" type="submit"
                                        onClick={saveForm}
                                        className="form-submit-button submit-button jf-form-buttons jsTest-submitField"
                                        data-component="button" data-content="">
                                    Submit
                                </button>
                            </div>
                        </div>
                    </li>
                    <li style={{clear:'both'}}>
                    </li>
                    <li style={{display:'none'}}>
                        Should be Empty:
                        <input type="text" name="website" value=""/>
                    </li>
                </ul>
            </div>
            <script>
                JotForm.showJotFormPowered = "new_footer";
            </script>
            <script>
                JotForm.poweredByText = "Powered by Jotform";
            </script>
            <input type="hidden" className="simple_spc" id="simple_spc" name="simple_spc" value="220116394123041"/>

            <div className="formFooter-heightMask">
            </div>
            {showDialog && <MDialog showedHtml={showedHtml} showDialog={showDialog} setShowDialog={setShowDialog}/>}
        </form>
    )
}