import { useQuery, useQueryClient } from 'react-query';
import { deleteGestio,getGestios } from '../libs/helper';
import {updateAction} from "./redux/reducer"
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useSelector,useDispatch } from "react-redux";



export default function ListGestio(){
  const router = useRouter();
  const dispatch = useDispatch()
  

  const queryClient = useQueryClient()
  const handleDelete = async (id) => {
    try {
      const response = await deleteGestio(id);
      await queryClient.prefetchQuery("Gestios",getGestios)
      console.log(response); 
  
      if (response.deleted) {
        // Handle the successful deletion of the Gestionaire
        console.log('Gestionaire deleted successfully');
      } else {
        console.error('Delete error:', response.error);
      }
    } catch (error) {
      console.error('Delete error:', error);
    }
 
  };
  
const { isLoading, isError, data, error } = useQuery('Gestios', getGestios);

if (isLoading) {
  return <div className=' m-auto text-red-950 mt-[90px] text-center font-bold text-xl bg-green-100 w-fit p-2 rounded-lg border-[1px] border-slate-300'>Loading...</div>;
}

if (isError) {
  return <div className=' m-auto text-red-950 mt-[90px] text-center font-bold text-xl bg-red-100 w-fit p-2 rounded-lg border-[1px] border-slate-300'>Error: {error}</div>;
}

if (!data || !data.Gestios || data.Gestios.length === 0) return <div className=' m-auto text-red-950 mt-[90px] text-center font-bold text-xl bg-red-100 w-fit p-2 rounded-lg border-[1px] border-slate-300'>No gestionaires available</div>

const onUpdate = (id)=>{
  dispatch(updateAction(id))
  router.push("/UpdateGestionaire")

}




    return(
<div className="bg-stone-50 h-[100vh]  md:w-[calc(100vw-18rem)] w-[100%]">
<div class="flex bg-white flex-col mt-[8rem] border m-8 shadow-md p-2 ">
  <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
    <div class="inline-block min-w-full py-2 sm:px-6 lg:px-8">
      <div class="overflow-hidden">
        <table class="min-w-full text-left text-sm font-light ">
          <thead class="border-b font-medium dark:border-neutral-500">
            <tr>
              <th scope="col" class="px-6 py-4">Nom</th>
              <th scope="col" class="px-6 py-4">Prenom</th>
              <th scope="col" class="px-6 py-4">Email</th>
              <th scope="col" class="px-6 py-4">Mot de passe</th>
              <th scope="col" class="px-6 py-4">Action</th>
            </tr>
          </thead>
  <tbody>
    {
     
      data.Gestios.map((e,i)=>{
       return <tr key={e._id} class="  border-b dark:border-neutral-500">
      <td class="whitespace-nowrap px-6 py-4">{e.nom}</td>
      <td class="whitespace-nowrap px-6 py-4">{e.prenom}</td>
      <td class="whitespace-nowrap px-6 py-4">{e.email}</td>
      <td class="whitespace-nowrap px-6 py-4">{(e.pass)?e.pass:"----"}</td>
      <td class="whitespace-nowrap px-6 py-4">
        <div>
          <button onClick={()=>handleDelete(e._id)} className="mr-4 bg-red-400 text-white p-2 rounded-md">Supprimer</button>
          <button onClick={()=>onUpdate(e._id)} className=" bg-blue-400 text-white p-2 rounded-md">Modifier</button></div>
        </td>
        
    </tr>
      })
     
    }
  </tbody>
  </table>
      </div>
    </div>
  </div>
</div>
</div>
    )
}