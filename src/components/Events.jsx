import Events from './EventCard';
import { useQuery } from 'react-query';
import { deleteAllEvents, getEvents } from "../libs/helper";
import { FaSpinner } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { AiTwotoneDelete } from 'react-icons/ai';
import { AiFillDelete } from 'react-icons/ai';

// import { logOutAction } from '@/pages/redux/reducer';
import MenuDropdown from './MenuDropdown';
import { useRouter } from 'next/router';
import { AiOutlineDelete } from 'react-icons/ai';
import { AiOutlineUsergroupDelete } from 'react-icons/ai';
export default function Card() {

  const isLogOut = useSelector(state => state.app.client.isLogOut)

  const [theme,setTheme] = useState('')
  const router = useRouter()
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [val ,setVal] = useState(false)
  useEffect(()=>{
    const storedValue = localStorage.getItem('fullName');
    if (storedValue) {
      setVal(true);
    }else{
      setVal(false)
    }
},[])



  const { isLoading, isError, data, error } = useQuery('events', getEvents);


  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
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

  if (!data || !data.events || data.events?.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen bg-red-100">
        <div className="text-red-950 text-center font-bold text-xl p-4 border border-slate-300 rounded-lg">
          No events available
        </div>
      </div>
    );
  }


  const search = (val) =>{
    setTheme(val)
  }
  
  let res = data.events.filter((e) => e.Theme?.toLowerCase().includes(theme?.toLowerCase()));
  console.log(res)

  const  deleteAllDocuments = async()=>{
    try {
      await deleteAllEvents()
      router.reload()
      console.log("all Events have been deleted")
    } catch (error) {
      console.log("error : not deleted")
    }
  }


console.log(selectedCategory)
  return (
    <>
    <div className='mt-[90px]  right-0 z-[1000] mr-[2.2rem] flex justify-end '>
    <MenuDropdown onSelectCategory={setSelectedCategory} />
    
    <button className={`inline-flex ${!val&&`hidden`} items-center justify-center px-3 py-1 text-base font-medium  text-black whitespace-no-wrap  border-gray-300 hover:bg-gray-50 ml-4 h-[2.15rem] rounded-md bg-white border bg-opacity-80  hover:bg-opacity-60 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75`} onClick={deleteAllDocuments}>
      Delete all
    <AiOutlineDelete className='ml-2 align-middle items-baseline text-gray-800'/>
    </button>
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
      <ul className={`mt-[10px] duration-150 grid lg:grid-cols-3${!val&&` min-md:grid-cols-3`} md:grid-cols-2`}>
        {


      res&&res.map((e, i) => (
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
      </ul>
    </>
  );
}
