import React, { useState } from 'react'
import Form from './Form'
import img from '../resourse/img.jpg'

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
    <div>
    <section className=" h-screen w-screen   bg-indigo-100" >
	<div className="container grid gap-6 mx-auto text-center lg:grid-cols-2 xl:grid-cols-5">
  <div className="w-full flex justify-center items-center  px-6 py-16 rounded-md sm:px-12 md:px-16 xl:col-span-2">
		
    <div className="w-full  px-6 py-16 rounded-md sm:px-12 md:px-16 xl:col-span-2">
			<span className="block mb-2 ">Project Management system</span>
			<h1 className="text-4xl font-extrabold ">"Your Projects, Our Passion - TDP Excellence."</h1>
			<p className="my-8">
				<span className="font-medium ">TDP. {''}</span>we understand that effective project management is the cornerstone of success in today's dynamic business landscape.
			</p>
			<form novalidate="" action="" className="self-stretch space-y-3">
				<div>
					<label for="name" className="text-sm sr-only">Your name</label>
					<input id="name" type="text" placeholder="Your name" className="w-full p-2 rounded-md focus:ring focus:ri border solid"/>
				</div><br/>
				<div>
					<label for="lastname" className="text-sm sr-only">Email address</label>
					<input id="lastname" type="text" placeholder="Email address" className="w-full mb-2  p-2 rounded-md focus:ring focus:ri "/>
				</div>
        <button className='bg-blue-400 text-white hover:bg-blue-500 rounded-lg p-2 mt-32'>We Are Here</button>
				{/* <button type="button" className="w-full py-2 font-semibold rounded dark:bg-violet-400 dark:text-gray-900">Join the waitlist</button> */}
			</form>
		</div>
    </div>
    
		<img src={img} alt="" className="object-cover w-screen h-screen rounded-md xl:col-span-3 "/>
	</div>
</section>
    </div>
    
    </>
  )
}

export default Home