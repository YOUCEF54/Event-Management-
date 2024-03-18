import Image from 'next/image'
import Link from 'next/link'
import {useState,useEffect} from 'react'
import { useRef } from "react";
import {useAuthState} from "react-firebase-hooks/auth"
import {auth} from "../../utils/firebase"
import { FaSpinner } from 'react-icons/fa';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDay } from "@fortawesome/free-solid-svg-icons";

// import the icons you need
import { 
    faSearch,
    faManagement,
    faHome,
    faUser,
    faCalendar,
    faManager,
    faCalendarAlt ,
    faAmbulance,
    faAnchor
  } from "@fortawesome/free-regular-svg-icons";
import MenuDropdown from './MenuDropdown';
import { useSelector } from 'react-redux';
  


function MobileNav({open, setOpen}) {
    const isLogOut = useSelector(state => state.app.client.isLogOut)

    const [val ,setVal] = useState(false)
    useEffect(()=>{
        setVal(isLogOut);
    },[isLogOut])


  const clickPoint = useRef();
  const handleFocus = () => {
      clickPoint.current.style.display = "none";
  };

  const handleBlur = () => {
      clickPoint.current.style.display = "block";
  };

  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen)};
    
  return (
    <div className={`absolute top-0 left-0 h-screen w-screen bg-white transform ${open ? "-translate-x-0" : "-translate-x-full"} transition-transform duration-300 ease-in-out filter drop-shadow-md `}>
        <div className="flex items-center justify-center filter border bg-white h-[4.96rem]"> {/*logo container*/}
        {val&&<span className="ml-2 text-white bg-orange-600 rounded-3xl p-2 px-5"></span>}
        <Image href="/" className='w cursor-pointer w-[140px]' src={'/Logo.svg'} width={100} height={100}></Image>
            {/* <Image src={'/Logo.svg'} width={100} height={100}></Image> */}
        </div>
        <div className="flex-1">
                        <ul className="pt-2 pb-4 space-y-1 text-sm">
                            <li className="rounded-sm">
                                <Link
                                    href='/'
                                    className="flex items-center p-2 space-x-3 rounded-md"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-6 h-6"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                                        />
                                    </svg>

                                       

                                   <span>Home</span>
                                </Link>
                            </li>
                            
                            <li className={`rounded-sm ${!val&&`hidden`} `}>
                                <Link
                                    href="/AddGestionnaire"
                                    className="flex items-center p-2 space-x-3 rounded-md"
                                >
                                     <FontAwesomeIcon
                                        icon={faUser}
                                        style={{ fontSize: 20, color: "black" }}
                                    />   
                                    <span>gerer les gestionnaires</span>
                                </Link>
                            </li>
                            <div className="group">
                            
            <button
              className={`flex items-center w-full  ${!val&&`hidden`} focus:outline-none`}
              onClick={handleDropdownToggle}
            >
                
                <div className="flex items-center p-2 space-x-3 rounded-md ml-[.8rem]">
                <FontAwesomeIcon
                                        icon={faCalendar}
                                        style={{ fontSize: 20, color: "black" }}
                                    />   
                <span>gerer les evenements</span>
              
              </div>
            </button>
            {isDropdownOpen && (
              <ul className="w-fit ml-4">
                <li className="m-2 w-fit p-2 border-[1px] rounded-md hover:bg-slate-50">
                  <Link href="/AddEvent" >Ajouter nouveau evenement
                  </Link>
                </li>
                <li className="m-2 w-fit p-2 border-[1px] rounded-md hover:bg-slate-50">
                  <Link href="/events/create" >Modifier un evenement
                  </Link>
                </li>
                <li className="m-2 w-fit p-2 border-[1px] rounded-md hover:bg-slate-50">
                  <Link href="/events/create" >Supprimer un evenement
                  </Link>
                </li>
              </ul>
            )}
          </div>
                            <li className={`rounded-sm  ${!val&&`hidden`}`}>
                                <Link
                                    href="/settings"
                                    className="flex items-center p-2 space-x-3 rounded-md"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-6 h-6"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                                        />
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                        />
                                    </svg>
                                    <span>Settings</span>
                                </Link>
                            </li>
                            <li className={`rounded-sm  ${!val&&`hidden`}`}>
                                <Link
                                    href="/logout"
                                    className="flex items-center p-2 space-x-3 rounded-md"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-6 h-6"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                                        />
                                    </svg>
                                    <span className=''>Logout</span>
                                </Link>
                            </li>
                            <li className="relative border-b hover:scale-105  duration-75   border-gray-500 w-[90vw] px-2 mx-16 right-[2.5rem]">
                        <span className="absolute inset-y-0 left-0 flex items-center py-4">
                            <button
                                type="submit"
                                className="p-2 focus:outline-none  rounded-[50%] "
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-6 h-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                    />
                                </svg>
                            </button>
                        </span>
                        <input
                            type="search"
                            name="Search"
                            placeholder="Search..."
                            className="w-full py-2 pl-10 text-sm bg-inherit rounded-md focus:outline-none"
                        />
                    </li>
                        </ul>
                    </div>
    </div>
)
}

export default function Navbar() {
    const isLogOut = useSelector(state => state.app.client.isLogOut)
    const [user,loading] = useAuthState(auth)


    const [val ,setVal] = useState(false)
    useEffect(()=>{
        setVal(isLogOut);
    },[isLogOut])

  const [open, setOpen] = useState(false)
    const clickPoint = useRef();
    const handleFocus = () => {
        clickPoint.current.style.display = "none";
    };

    const handleBlur = () => {
        clickPoint.current.style.display = "block";
    };

  return (
      <nav className="bg-opacity-30  text-gray-800 backdrop-filter backdrop-blur-lg z-50 fixed w-full flex filter border border-b-[#020f5236] bg-white px-4 py-4 h-20 items-center">
          <MobileNav open={open} setOpen={setOpen}/>
          <Link href={"/"}>

          <div  className="w-fit flex items-center">
              {/* <Link className="text-2xl font-semibold" href="/">LOGO</Link> */}
              {/* <Image  className='w w-[140px]' src={'/Logo.svg'} width={100} height={100}></Image> */}
              <h1 className=' font-bold lg:text-[1.5vw] max-sm:text-[3vw] sm:text-lg ml-8'>COMMUNE<sub>Laâyoune</sub></h1>

            
          </div>
          </Link>
          <div className="w-full flex justify-end  items-center">

              <div className="z-50 flex  relative w-8 h-8 flex-col justify-between items-center md:hidden" onClick={() => {
                  setOpen(!open)
              }}>
                  {/* hamburger button */}
                  <span className={`h-1 w-full bg-black rounded-lg transform transition duration-300 ease-in-out ${open ? "rotate-45 translate-y-3.5" : ""}`} />
                  <span className={`h-1 w-full bg-black rounded-lg transition-all duration-300 ease-in-out ${open ? "w-0" : "w-full"}`} />
                  <span className={`h-1 w-full bg-black rounded-lg transform transition duration-300 ease-in-out ${open ? "-rotate-45 -translate-y-3.5" : ""}`} />
              </div>

              <div className="hidden md:flex justify-between">
                  <ul className="items-center justify-center space-y-8 md:flex md:space-x-6 md:space-y-0">
                  <li className="text-lg">
                    <Link href='/' className="flex items-center p-2 space-x-3 rounded-md" >
                        <span>Accueil</span>
                    </Link>
                    </li>
                    {/* <li>
                        
                        <MenuDropdown/>
                    </li> */}
                    {/* <li className={`relative border hover:scale-105 duration-75 rounded-lg bg-gray-50 border-gray-300 w-[95%] px-2 ${val&&`hidden`} `}>
                        <span className="absolute inset-y-0 left-0 flex items-center py-4">
                            <button
                                type="submit"
                                className="p-2 focus:outline-none focus:ring"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-6 h-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                    />
                                </svg>
                            </button>
                        </span>
                        <input
                            type="search"
                            name="Search"
                            placeholder="Search..."
                            className="w-full py-2 pl-10 text-sm bg-inherit rounded-md focus:outline-none"
                        />
                    </li> */}
                {!user&&(<li>
                <Link href="/auth/SignUp" className="inline-flex items-center justify-center px-3 py-1 text-base font-medium leading-6 text-gray-600 whitespace-no-wrap bg-white border border-gray-200 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:shadow-none">
                s'inscrire
                </Link>
                </li>)}
                {!user&&(<li>
                <Link href="/auth/login" className="inline-flex items-center justify-center px-3 py-1 text-base font-medium leading-6 text-gray-600 whitespace-no-wrap bg-white border border-gray-200 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:shadow-none">
                s'identifier
                </Link>
                </li>)}
                {(!user&&!val)?(<li>
                <Link href="/login" className=" w-[13rem]  inline-flex items-center justify-center px-3 py-1 text-base font-medium leading-6 text-gray-600 whitespace-no-wrap bg-white border border-gray-200 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:shadow-none">
                espace administration
                </Link>
                </li>):null}
                
                {user?(
                        <Link href={"/auth/dashboard"}>
                    <div className='flex items-center space-x-2 border border-slate-300 pr-3 p-1 text-md rounded-3xl'>
                            <Image 
                            className=' w-11 rounded-full '
                            width={500} 
                            height={500} 
                            src={user.photoURL}
                            alt='avatar'
                            />
                      <div>
                      <div>{user.displayName}</div>
                        <div className='text-md text-gray-500'>{user.email}</div>
                        </div>
                    </div>
                        </Link>
                ):(loading&&(<div className="flex justify-center mx-auto items-center h-screen">
                <FaSpinner className="animate-spin text-[2rem] text-gray-500" />
              </div>))}
          </ul>
        </div>

    </div>
</nav>
  )
}