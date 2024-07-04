import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFaceGrinTongueWink, faQuoteLeft, faHouse, faLightbulb } from '@fortawesome/free-solid-svg-icons'
import { NavLink } from 'react-router-dom'

function Sidebar() {
    return (

        <ul className='flex flex-col justify-center items-center sideNav text-sm'>
            <li>
                <NavLink className='flex flex-col' to='/' end>
                    <FontAwesomeIcon className='mb-2 text-2xl' icon={faHouse} />
                    Home
                </NavLink>
            </li>
            <li>
                <NavLink className='flex flex-col' to='/jokes' end>
                    <FontAwesomeIcon className='mb-2 text-2xl' icon={faFaceGrinTongueWink} />
                    <p className='text-center'>Random <br /> Jokes</p>
                </NavLink>
            </li>
            <li>
                <NavLink className='flex flex-col' to='/quotes' end>
                    <FontAwesomeIcon className='mb-2 text-2xl' icon={faQuoteLeft} />
                    <p className='text-center'>Random <br /> Quotes</p>
                </NavLink>
            </li>
            <li>
                <NavLink className='flex flex-col' to='/facts' end>
                    <FontAwesomeIcon className='mb-2 text-2xl' icon={faLightbulb} />
                    <p className='text-center'>Random <br /> Facts</p>
                </NavLink>
            </li>
        </ul>
    )
}

export default Sidebar