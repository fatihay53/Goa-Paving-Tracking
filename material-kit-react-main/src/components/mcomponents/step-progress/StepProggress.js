import './step-progress.css'

export default function StepProggress({status}){

    return(
        <div className="stepper-wrapper">
            <div className={status == 'Pending' ? "stepper-item active completed" : 'stepper-item completed'}>
                <div className="step-counter">1</div>
                <div className="step-name">Pending</div>
            </div>
            <div className={status == 'Active' ? "stepper-item active completed" : status == 'Pending' ? 'stepper-item' : 'stepper-item completed'}>
                <div className="step-counter">2</div>
                <div className="step-name">Active</div>
            </div>
            <div className={status == 'Completed' ? "stepper-item active completed" : 'stepper-item'}>
                <div className="step-counter">3</div>
                <div className="step-name">Completed</div>
            </div>
        </div>
    )
}