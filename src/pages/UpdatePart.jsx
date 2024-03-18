
import { useReducer } from "react"
import { useQueryClient, useMutation } from "react-query"
import { useQuery } from 'react-query';
import Success from "../components/Success";
import {getPart,updatePart} from "../libs/helper"
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import Drag from "@/components/Drag";
import Swal from "sweetalert2";


const formReducer = (state, event) => {
    return {
      ...state,
      [event.target.name]:event.target.value
      
    };
  };
  
  
 export default function UpdateAdmin(){
  
    const [formData , setFormData] = useReducer(formReducer,{})
    const router = useRouter()
    const formId = useSelector((state) => state.app.client.formId);

    const {isLoading, isError , data , error} =  useQuery(['part',formId],()=> getPart(formId))
    const UpdateMutation = useMutation((newData)=>updatePart(formId,newData), {
      onSuccess: async(data) => {
        Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Vous avez mis à jour les informations sur le partenaire avec succès",
            showConfirmButton: false,
            timer: 1500
        });
        console.log("data updated");
        router.push("/ListParts")
      }
    });
  
    if(isLoading) return  <div className="mt-[90px]  m-2 px-4 py-2 border rounded-lg border-gray-400 bg-blue-50">Loading...</div>;

    if(isError) return <div>Error</div>

    const {Denomination,Logo} = data

    const submitedData = async(e) => {
      e.preventDefault();
      let updated = {
        Denomination,
        Logo,
        ...formData
      };
      await UpdateMutation.mutate(updated);
    };
    return(
      <div class="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
  
    <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
  
    <div class="fixed inset-0 z-10 overflow-y-auto">
      <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
  
        <div class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
          <div class="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
            <div class="sm:flex sm:items-start">
              {/* <div class="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                <svg class="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                </svg>
              </div> */}
              <div class="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                <h3 class="text-base font-semibold leading-6 text-gray-900" id="modal-title">Modifier un gestionnaire</h3>
                <div class="mt-2">
                <form onSubmit={submitedData} className="w-fit bg-white border-[1px] border-gray-300 max-w-[60vw] p-6 rounded-lg ">
         
         <div className="container flex justify-between">
               <div className="mb-4 w-full mr-4">
                 <label htmlFor="Denomination" className="block text-gray-700 font-bold mb-2">Denomination</label>
               <input
               id="Denomination"
               name="Denomination"
               defaultValue={Denomination}
               onChange={setFormData}
               type="text"
               className="w-full px-3 py-2 border border-gray-400 rounded-lg focus:outline-none focus:border-blue-500"
               />
               </div>
              
         </div>
  
    
       <div className="mb-4">
       <label  className="block text-gray-700 font-bold mb-2">Avatar</label>
  
        <Drag onSelectImage={setFormData}  source={"P"} defaultValue={Logo}/>
        </div>
  
   
       <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
            <button type="submit" class="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 sm:ml-3 sm:w-auto">Modifier</button>
            <button onClick={()=>router.push("ListParts")} class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto">Annuler</button>
          </div>
                </form>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  
  </div>
    )
  }