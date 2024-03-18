import {auth} from "../../../utils/firebase"
import { useAuthState } from "react-firebase-hooks/auth"
import { FaSpinner } from 'react-icons/fa';
import Events from "../../components/EventCardC";
import { deleteAllEvents, getEvents } from "../../libs/helper";
import { useSelector } from 'react-redux';
import { useRouter } from "next/router";
import { useQuery } from 'react-query';
import MenuDropdown from '../../components/MenuDropdown';
import { AiOutlineDelete } from 'react-icons/ai';
import { useState } from "react";
import Calendar from "react-calendar";

export default function dashboard(){
    const[user,loading] = useAuthState(auth)
    const router = useRouter()

    
  const [theme,setTheme] = useState('')
  const [selectedCategory, setSelectedCategory] = useState(null);


    const { isLoading, isError, data, error } = useQuery('events', getEvents);
    
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen mx-auto">
        <FaSpinner className="animate-spin text-4xl text-gray-500" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center h-screen bg-red-100">
        <div className="text-red-950 text-center font-bold text-xl p-4 border border-slate-300 rounded-lg">
          Error: {error}
        </div>
      </div>
    );
  }

  if (!data || !data.events || data.events.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen bg-red-100">
        <div className="text-red-950 text-center font-bold text-xl p-4 border border-slate-300 rounded-lg">
          No events available
        </div>
      </div>
    );
  }
//   let res = data.events.filter((e) => e.participants.includes(user?.displayName+"|"+user?.email));

   
    if(loading) return(<div className="flex justify-center mx-auto items-center h-screen">
    <FaSpinner className="animate-spin text-[3rem] text-gray-500" />
  </div>)
  if(!user) router.push("/auth/login")



  const search = (val) =>{
    setTheme(val)
  }
  
  let result = data.events?.filter((e) => e.Theme?.toLowerCase().includes(theme?.toLowerCase()) && e.participants?.includes(user?.displayName+"|"+user?.email) );


  if(user)
    return(

        <div className="m-4  gap-2 text-center  justify-center">
          <div className="mx-auto rounded-md  text-center  bg-gray-100 p-2 border border-gray-200 mt-[75px]">
            <h2 className="mt-[10px]  font-medium text-lg align-middle">bienvenue <span className="text-gray-800 bg-zinc-100 px-2 rounded border">{user.displayName}</span> dans votre tableau de bord </h2>
            <button className="p-2 mt-5 bg-blue-700 text-white rounded-md hover:bg-blue-600" onClick={()=>{auth.signOut();}}>Se déconnecter</button>
            </div>
            {/* <span className=" text-zinc-500 text-[3rem] rounded-full m-4">.</span> */}
           
       <div className="mt-[10px]">
        <div className=' w-full max-sm:w-full rounded-md p-2 duration-150 bg-gray-100 border right-0 z-[1000] mr-[2.2rem] flex justify-end '>
    <MenuDropdown onSelectCategory={setSelectedCategory} />
    
    <div className={`w-fit ml-6 mr-[1.18rem] relative border hover:scale-105 duration-75 rounded-lg bg-gray-50 border-gray-300  px-2  `}>
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
                            onChange={(event) => search(event.target.value)}
                            placeholder="Search..."
                            className="w-full py-2 pl-10 text-sm bg-inherit rounded-md focus:outline-none"
                        />
                    </div>
      </div>
        </div>
            <ul className={`mt-[10px] rounded-md duration-150  max-sm:w-full justify-start  border border-gray-200 pt-4  bg-stone-100`}>
                <h1 className="border-l-2 border-l-blue-700 text-left mx-4 mb-4 font-medium text-lg ">{(result.length > 0)?"Événements auxquels vous êtes inscrit":"Il n'y a aucun événement auquel vous êtes inscrit"}</h1>
                <div className="grid lg:grid-cols-3 ">
  
  {result&&result.map((e, i) => (
    <>
    {(selectedCategory == "all" || !selectedCategory)? (<Events
    key={i}
    _id={e._id}
    Theme={e.Theme}
    participants = {e.participants}
    editeur={e.editeur}
    Date={e.Date}
    ImageEv={e.ImageEv}
    nscRequis={e.nscRequis}
    Lieu={e.Lieu}
    descreption={e.descreption}
  />): (e.categorie == selectedCategory)&& <Events
  key={i}
  _id={e._id}
  Theme={e.Theme}
  participants = {e.participants}
  editeur={e.editeur}
  Date={e.Date}
  ImageEv={e.ImageEv}
  nscRequis={e.nscRequis}
  Lieu={e.Lieu}
  descreption={e.descreption}
/>}

</>
   
  ))}
  </div>
</ul>
       {/* <div >
       <Calendar/>
       </div> */}

        </div>
        
    )
}