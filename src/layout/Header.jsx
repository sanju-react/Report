import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
    return (
        <>
            <div className="flex w-full justify-between py-[10px] border-t border-t-gray-300 shadow-md shadow-gray-400">
                <div className='text-[20px] leading-[10px]'><img src={'/logo.png'} /></div>
                <div className='flex justify-between gap-x-[20px]'>
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