import React, { useState } from 'react'
import Form from './Form'

const forms = [
  {
    names:'email',
    type:'email',
    label:'Email',
    placeholder:'Enter Email',
    required:true,
    value:'email@gmail.com',
    validation:/\S+@\S+\.\S+/,
    validationMessage:'Please Enter Valid email'
  },
  {
    names:'password',
    type:'password',
    label:'Password',
    placeholder:'Enter Password',
    required:true,
    value:'',
    validation:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    validationMessage:'Please enter atleast one uppercase, one lowercase, one number, one special character and length should be 8 or more'
  }
]
const Home = () => {
  const [age,setAge] = useState()
  const setInput = ({target}) => {
    setAge(target.value.replace(/[^0-9]/g, ''))

  }
  return (
    <>
    <div>Home</div>
    {/* <Form forms={forms}/> */}
    {/* <input type="text" value={age} onChange={setInput} placeholder='0' style={{border:'1px solid black', padding: '10px'}}/> */}
    </>
  )
}

export default Home