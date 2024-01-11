import React, { useEffect, useState } from 'react'

const Form = ({forms}) => {
    const [inputs,setInputs] = useState({});
    const [error,setError] = useState({});
    const [validation,setValidArr] = useState({})
    useEffect(()=>{
        if(Object.keys(inputs).length == 0){
            let arr = {},arrs={},valid ={}
            forms.length && forms.forEach((v)=>{
                let obja={}
                arr[v.names] = v.value || ''
                arrs[v.names] = false
                if(v.validation){
                    valid[v.names] = v.validation
                    // valid.push(obja)
                }
                // arr={obj, ...arr};
                // arrs={arrs, ...arrs}
                
            })
            setInputs(arr);
            setError(arrs);
            console.log('valid:- ',valid)
            setValidArr(valid)
        }
    },[forms])
    const input = (e) => {
        let inp = inputs, err = error        
        inp[e.target.name] = e.target.value
        err[e.target.name] = false
        console.log(err)
        setError(err)
        setInputs(inp)
    }

    const submit = () => {
        let err = error, valid = validation
        console.log('inputs:- ',inputs);
        console.log('validation:- ',validation);
        Object.keys(inputs).forEach((v)=>{
            if(!valid[v].test(inputs[v])){
                err[v] = true
            }
        })
        setError(err)
        if(Object.keys(err).filter(v=>err[v] === true).length == 0){
            console.log("you can submit now")
        }
    }
  return (
    <>
        {
            forms.length 
            ? <div className='form'>
            {forms.map((f,i)=>(
                <div className="layout" key={i}>
                    <label>{f.label}</label>
                    <input type={f.type} value={input.names} name={f.names} required={f.required} placeholder={f.placeholder} onChange={(e)=>input(e,f.validation)}/>
                    {console.log(f.names + ":- " + error[f.names])}
                    <p className={`text-red-700 ${error[f.names] == true ? "visible" : "invisible"}`}>{f.validationMessage}</p>
                </div>
            ))}
            
            <button onClick={submit} className="bg-blue-700 text-white p-2 rounded-sm">Submit</button>
            </div>
            :<button>Add Field</button>
        }
    </>
  )
}

export default Form