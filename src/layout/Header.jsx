import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../resourse/logo-color.png'

const Header = () => {
    return (
        <>
            <div className="  flex w-full justify-between h-[10vh] border-t-gray-300 border bottom-2 bg-blue-100 font-thin text-gray-900 ">
                <Link to= '/' className='  text-[20px] leading-[10px]  w-1/4 h-full'>
                    <img  className='aspect h-full' src={logo} />
                    </Link>
                <div className='  flex justify-end items-center px-5 h-full  gap-5 w-3/4  font-semibold'>
                    <Link to="/new" className='text-[20px] leading-[10px]'>New Report</Link>
                    <Link to="/assign" className='text-[20px] leading-[10px]'>Assigned Tasks</Link>
                    <Link to="/show" className='text-[20px] leading-[10px]'>Show Previous</Link>
                    <Link to="/projects" className='text-[20px] leading-[10px]'>Projects</Link>
                </div>
            </div>
        </>
    )
}

export default Header