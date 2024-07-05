import React from 'react'
import logo from '../assets/logo_random.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faSortDown } from '@fortawesome/free-solid-svg-icons'
import { Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react'

function Header() {

  let toggleSidebar = () => {
    document.querySelector('.sideBar').classList.toggle('zinda');
    document.querySelector('.overlay').classList.toggle('hidden');
  }

  let lightTheme = () => {
    document.documentElement.style.setProperty('--primary-bg', '#fff');
    document.documentElement.style.setProperty('--secondary-bg', '#ffe5d9');
    document.documentElement.style.setProperty('--primary-text-color', '#000814');
    document.documentElement.style.setProperty('--secondary-text-color', '#023e8a');
  }

  let darkTheme = () => {
    document.documentElement.style.setProperty('--primary-bg', '#1b263b');
    document.documentElement.style.setProperty('--secondary-bg', '#0d1b2a');
    document.documentElement.style.setProperty('--primary-text-color', '#c1c3c5');
    document.documentElement.style.setProperty('--secondary-text-color', '#ffffff');
  }

  return (
    <div className='flex lg:justify-center justify-between w-full md:px-8'>
      <button onClick={toggleSidebar} className='flex lg:hidden text-2xl mt-4'>
        <FontAwesomeIcon icon={faBars} />
      </button>
      <img className='lg:h-32 md:h-28 lg:ms-auto' src={logo} alt="Logo" />
      <div className='lg:ml-auto lg:pt-7 lg:pr-4'>
        <Menu isLazy>
          <MenuButton className='px-3 py-2 bg-secondary rounded border'>
            Theme <FontAwesomeIcon className='ml-2 mb-1' icon={faSortDown} />
          </MenuButton>
          <MenuList zIndex={3} rounded={5} className='bg-secondary w-full text-center px-4 py-2 border'>
            <MenuItem onClick={darkTheme} className='px-3 py-2'>Dark</MenuItem>
            <MenuItem onClick={lightTheme} className='px-3 py-2'>Light</MenuItem>
            <MenuItem className='px-3 py-2'>Other</MenuItem>
          </MenuList>
        </Menu>
      </div>
    </div>
  )
}

export default Header