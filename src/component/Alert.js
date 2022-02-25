import React from 'react'

const Alert = (props) => {
     //to capitalize the first letter of the warning
     const capitalize = (word)=>{
        const lower = word.toLowerCase();
        return lower.charAt(0).toUpperCase() + lower.slice(1)
    }
    return (
        <div style={{height:'50px'}}>

        {props.alert && <div>
            <div className={`alert alert-${props.alert.type} alert-dismissible fade show`} role="alert">
                <strong>{capitalize(props.alert.type)}</strong> {props.alert.msg}
                
            </div>
        </div>}
        </div>
    )
}

export default Alert