import React from 'react'
import logo from '../assets/logo_random.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faSortDown, faCloudMoon } from '@fortawesome/free-solid-svg-icons'
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
    document.documentElement.style.setProperty('--skeleton-start', '#ced4da');
    document.documentElement.style.setProperty('--skeleton-end', '#adb5bd');
  }

  let darkTheme = () => {
    document.documentElement.style.setProperty('--primary-bg', '#1b263b');
    document.documentElement.style.setProperty('--secondary-bg', '#0d1b2a');
    document.documentElement.style.setProperty('--primary-text-color', '#c1c3c5');
    document.documentElement.style.setProperty('--secondary-text-color', '#ffffff');
    document.documentElement.style.setProperty('--skeleton-start', '#000814');
    document.documentElement.style.setProperty('--skeleton-end', '#1b263b');
  }

  return (
    <div className='flex lg:justify-center justify-between w-full md:px-8 sm:px-6 px-5'>
      <button onClick={toggleSidebar} className='flex lg:hidden sm:text-3xl text-2xl md:mt-7 sm:mt-6 mt-7'>
        <FontAwesomeIcon icon={faBars} />
      </button>
      <img className='lg:h-32 h-28 lg:ms-auto' src={logo} alt="Logo" />
      <div className='lg:ml-auto md:pt-7 sm:pt-5 pt-6 lg:pr-4'>
        <Menu isLazy>
          <MenuButton className='sm:px-3 px-2 py-1 sm:py-2 bg-secondary rounded border'>
            <FontAwesomeIcon className='me-2' icon={faCloudMoon} />
            <span className='md:inline hidden'>Theme</span>
            <FontAwesomeIcon className='ml-2 mb-1' icon={faSortDown} />
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