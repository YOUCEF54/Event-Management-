import dataG from "../../dataBase/dataG"
import { useQuery, useQueryClient } from 'react-query';
import { useDispatch } from "react-redux";
import { getParts , deletePart } from '../libs/helper';
import Image from "next/image";
import { updateAction } from "./redux/reducer";
import { useRouter } from "next/router";


export default function ListParts(){
  const dispatch = useDispatch()
  const router = useRouter()
  const queryClient = useQueryClient()
  const handleDelete = async (id) => {
    try {
      const response = await deletePart(id);
      await queryClient.prefetchQuery("Parts",getParts)
      console.log(response); 
  
      if (response.deleted) {
        console.log('Partenaires deleted successfully');
      } else {
        console.error('Delete error:', response.error);
      }
    } catch (error) {
      console.error('Delete error:', error);
    }
 
  };
  const onUpdate = (id)=>{
    dispatch(updateAction(id))
    router.push("/UpdatePart")
  }
  
const { isLoading, isError, data, error } = useQuery('Parts', getParts);

if (isLoading) {
    return <div className=' m-auto text-red-950 mt-[90px] text-center font-bold text-xl bg-green-100 w-fit p-2 rounded-lg border-[1px] border-slate-300'>Loading...</div>;
}

if (isError) {
    return <div className=' m-auto text-red-950 mt-[90px] text-center font-bold text-xl bg-red-100 w-fit p-2 rounded-lg border-[1px] border-slate-300'>Error: {error}</div>;
}

if (!data || !data.Parts || data.Parts.length === 0) return <div className=' m-auto text-red-950 mt-[90px] text-center font-bold text-xl bg-red-100 w-fit p-2 rounded-lg border-[1px] border-slate-300'>No partenaires available</div>


console.log(data)
    return(
<div className="bg-stone-50 h-[100vh]  md:w-[calc(100vw-18rem)] w-[100%]">
<div class="flex bg-white w-fit mx-auto flex-col mt-[8rem] border m-8 shadow-md p-2 ">
  <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
    <div class="inline-block min-w-fit py-2 sm:px-6 lg:px-8">
      <div class="overflow-hidden">
        <table class="min-w-full text-left text-sm font-light ">
          <thead class="border-b font-medium dark:border-neutral-500">
            <tr>
              <th scope="col" class="px-6 py-4">Denomination</th>
              <th scope="col" class="px-6 py-4">Logo</th>
              <th scope="col" class="px-6 py-4">Action</th>
            </tr>
          </thead>
  <tbody>
    {
     
      data.Parts.map((e,i)=>{
       return <tr key={e._id} class="  border-b dark:border-neutral-500">
      <td class="whitespace-nowrap px-6 py-4  font-normal text-lg">{e.Denomination}</td>
      <td class="whitespace-nowrap px-6 py-4">
        {e.Logo?<Image 
        className="w-[60px] h-[60px] rounded-[50%] hover:rounded duration-150 "
        width={500} height={500} alt={e.Denomination} src={e.Logo} /> : <div className="bg-gray-100 w-[60px] h-[60px] rounded-[50%] hover:rounded duration-150 text-center inline-block align-baseline">D</div>}
        </td>
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