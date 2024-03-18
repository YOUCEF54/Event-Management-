import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import { getEvent, deleteEvent } from "../../../libs/helper";
import Image from 'next/image'
import { useSelector,useDispatch } from "react-redux";
import {deleteEventRed, updateAction} from "../../redux/reducer"
import { useEffect, useState } from 'react';
import {useAuthState} from "react-firebase-hooks/auth"
import {auth} from "../../../../utils/firebase"
import { LuAlertTriangle } from 'react-icons/lu';
import grbg from 'Public/grbg.gif'
import BG from '@/components/bg';
export default function EventInfos() {
  const [user,loading] = useAuthState(auth)

  const router = useRouter();
  const isLogOut = useSelector(state => state.app.client.isLogOut)

  const [val ,setVal] = useState(false)
  useEffect(()=>{
      setVal(isLogOut);
  },[isLogOut])


  const { eventId } = router.query;
  const [modal, setModal] = useState(false)
  const dispatch = useDispatch()
  const { isLoading, isError, data, error } = useQuery('event', () => getEvent(eventId));
  const deleteId = useSelector(state => state.app.client.deleteId)
  const formId = useSelector(state => state.app.client.formId)

  if (isLoading) {
    return <div className="mt-[90px]  m-2 px-4 py-2 border rounded-lg border-gray-400 bg-blue-50">Loading...</div>;

  }

  if (isError) {
    return <p className='mt-[90px]  m-2 px-4 py-2 border rounded-lg border-gray-400 bg-red-200'>Error: {error.message}</p>; 
  }
  // console.log(data)
  // console.log(data?._id)

  const onDelete = () =>{
    dispatch(deleteEventRed(data?._id))
  }


  const cancelHandler = () =>{
    router.push(`http://localhost:3000/event/${data?._id}`, undefined, { shallow: false })
    setModal(false)
  }

  const deleteHandler = async() =>{
    onDelete()
      await deleteEvent(data?._id)
      // router.push("http://localhost:3000/", undefined, { shallow: false })
      window.location.href = "/"
   } 
   const onUpdate = ()=>{
     dispatch(updateAction(data?._id))
     console.log(formId)
     console.log(eventId)
    router.push("/UpdateEvent")
   }
  
  
  return (
 <div>

<div className=' z-20 '>
      
      {(data?.nscRequis)?<h2 className='  mt-[80px] w-full ${val&&`md:w-[calc(100vw-18rem)]`} bg-rose-600 text-white p-2 font-bold text-center'>L'inscription est requis</h2>:<h2 className=' mt-[80px] wi-full  bg-rose-600 text-white p-2 font-bold text-center'>L'inscription est non requis</h2>}
      <div className=''>
     <Image alt= {`${data.Theme}`} className=" mt-[30px] mx-auto rounded w-[90%] lg:w-[50vw]  max-sm:w-full z-100" width={500} height={500} src={data?.ImageEv} ></Image>
   
     </div>
        <div className={`bg-gray ${val&&`md:w-[calc(100vw-18rem)]`} w-[100vw] `}>
        <div className='mt-10 border-gray-400 border rounded-md drop-shadow-md lg:w-[50vw]  bg-white bg-opacity- p-4  my-[20px] mx-auto w-[90%] '>
       {/* <h1 className='mt-2 text-center text-2xl pb-2'>Détails de l'évènement</h1> */}
       <h2 className='m-2 text-lg'>Publie par : <span className='text-red-900'>{`${data?.editeur}`}</span></h2>
       <h2 className='m-2 text-lg'>{`${data?.categorie}`} sous le Theme : <span className=' font-bold'>{`${data?.Theme}`}</span></h2>
   
       <h2 className='m-2 text-lg'>la date de début de l'événement est <span className=' font-bold'>{`${(data?.DateDebut)&&data?.DateDebut.split("T")[0]}`}</span> à <span className=' font-bold'>{`${(data?.DateDebut)&&data?.DateDebut.split("T")[1].substring(0, 5)}`}</span></h2>
   
       <h2 className='m-2 text-lg'>la date de fin de l'événement est <span className=' font-bold'>{`${(data?.DateFin)&&data?.DateFin.split("T")[0]}`}</span> à <span className=' font-bold'>{`${(data?.DateFin)&&data?.DateFin.split("T")[1].substring(0, 5)}`}</span></h2>
   
       <h2 className='m-2 text-lg'>Les partenaires sont :</h2>
       <div className='grid md:grid-cols-3 gap-2 m-2 '>
       {(data?.partenaires)&&data?.partenaires.map((e, i) => {
          const parts = e.split("|")[0];
          const categorie = e.split("|")[1];
        return <div className='' key={i}>
           <div className="container mt-2 w-fit text-left rounded-md border border-gray-400  ">
             <div className="container p-2 items-center">
               <span>Partenaire numéro: {i + 1}</span>
               <p>Nom de partenaire: {parts}</p>
               <p>
                 Catégorie de partenaire:{" "}
                 {categorie === "Silver" ? (
                   <span className="ml-2 bg-gray-50 px-[3px] border  border-gray-400 rounded-md">
                     {categorie}
                   </span>
                 ) : categorie === "Golden" ? (
                   <span className="ml-2 bg-yellow-50 px-[3px] border  border-gray-400 rounded-md">
                     {categorie}
                   </span>
                 ) : categorie === "Bronze" ? (
                   <span className="ml-2 bg-red-50 px-[3px] border  border-gray-400 rounded-md">
                     {categorie}
                   </span>
                 ) : null}
               </p>
             </div>
           </div>
         </div>
   
   })}
   
       </div>
       
   
     
       <p className='m-2 drop-shadow-sm shadow-sm text-justify border border-gray-400 p-2 rounded-lg '><span className=' font-bold  '>Description :</span> {`${data?.descreption}`}</p>
       <div className='flex w-full justify-end'>
         <button  onClick={onUpdate} className={`m-2 ${!val&&`hidden`} bg-green-600 p-2 rounded-md hover:scale-105 duration-100 hover:bg-green-700 text-white`}>Modifier</button>
         <button  onClick={()=>setModal(true)} className={`m-2 bg-rose-600 p-2 rounded-md hover:scale-105 duration-100 ${!val&&`hidden`} hover:bg-rose-700 text-white`}>Supprimer</button>
       </div>
     </div>
     
     {(modal)&&DeleteCmp({deleteHandler , cancelHandler})}
      </div>
   
     </div>
     <div className={`  mx-auto  ${val&&`md:w-[calc(100vw-18rem)]`} w-[80vw] `}>
   <h1 className=' lg:w-[50vw]   p-3  my-[20px] mx-auto w-[90%] border-l-4 border-x-red-600 font-medium text-xl'>Les participants  </h1>
       {console.log(data?.participants[0])}
      {
        (data?.participants)&&data?.participants.map((e, i) => {
          return(
            <div key={i} className={`border rounded-md drop-shadow-md lg:w-[50vw]  bg-white bg-opacity- p-4  my-[20px] mx-auto w-[90%] `}>
              <h1>{e.split("|")[0]}</h1>
              <h3 className='text-md text-gray-500'>{e.split("|")[1]}</h3>
            </div>
          )
        })
      }
      </div>
 </div>
  );
}

function DeleteCmp({deleteHandler , cancelHandler}){
  return(
    <div class="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">

    <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

    <div class="fixed inset-0 z-10 overflow-y-auto">
    <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">

      <div class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
        <div class="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
          <div class="sm:flex sm:items-start">
            <div class="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
              <svg class="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
              </svg>
            </div>
            <div class="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
              <h3 class="text-base font-semibold leading-6 text-gray-900" id="modal-title">Supprimer un evenement</h3>
              <div class="mt-2">
                <p class="text-sm text-gray-500">Voulez-vous vraiment supprimer cet événement ? cet événement sera définitivement supprimé. Cette action ne peut pas être annulée.</p>
              </div>
            </div>
          </div>
        </div>
        <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
          <button onClick={deleteHandler} type="button" class="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto">Supprimer</button>
          <button onClick={cancelHandler} type="button" class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto">Annuler</button>
        </div>
      </div>
    </div>
  </div>

</div>
  )
}