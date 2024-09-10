
// 783F8E
import React from 'react'
import {
    FaLinkedin,
    FaInstagram,
    FaTwitterSquare
} from 'react-icons/fa'
import { Link } from 'react-router-dom';


function Footer() {
    return (
        <div className='w-full bg-gray-300'>
            <div className='max-w-[1240px] mx-auto py-16 px-4 grid lg:grid-cols-3 gap-8 '>
                <div>
                        <h1 className='w-full text-3xl font-bold text-red-900'>Blockchain LUC</h1>

                        <div className='flex justify-between md:w-[75%] my-6'>
                            <Link className='cursor-pointer' to="https://www.linkedin.com/company/blockchain-luc">
                                <FaLinkedin size={30} />
                            </Link>
                            <FaInstagram size={30} />
                            <FaTwitterSquare size={30} />
                        </div>
                    </div>
                    <div className='lg:col-span-2 flex justify-between mt-6'>
                    <div >
                        <h6 className='font-medium text-gray-400'>Club</h6>
                        <ul >
                            <CustomLink className='py-2 text-sm' to='/'>Home</CustomLink>
                            <CustomLink className='py-2 text-sm' to='/about'>About</CustomLink>
                            <CustomLink className='py-2 text-sm' to='/events'>Events</CustomLink>
                        </ul>
                    </div>
                    <div>
                        <h6 className='font-medium text-gray-400'>Interest</h6>
                        <ul>
                            <CustomLink className='py-2 text-sm' to='/team'>Team</CustomLink>
                            <CustomLink className='py-2 text-sm' to='/involve'>Get Involved</CustomLink>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
      );
}

function CustomLink({ to, children,  className, ...props }) {
    return(
        <li className={className}>
            <Link to={to} {...props}>
                {children }
            </Link>
        </li>
    );
}

export default Footer
