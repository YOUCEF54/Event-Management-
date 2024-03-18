
import { useReducer } from "react"
import { useQueryClient, useMutation } from "react-query"
import { useQuery } from 'react-query';
import Success from "../components/Success";
import {getGestio,updateGestio} from "../libs/helper"
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

const formReducer = (state, event) => {
  return {
    ...state,
    [event.target.name]:event.target.value
    
  };
};


export default function ModifierGestionnaire(){

  const [formData , setFormData] = useReducer(formReducer,{})
  const formId = useSelector(state => state.app.client.formId)
  const Router = useRouter()

  const {isLoading, isError , data , error} =  useQuery(['Gestios',formId],()=> getGestio(formId))
  const UpdateMutation = useMutation((newData)=>updateGestio(formId,newData), {
    onSuccess: async(data) => {
      console.log("data updated");
    }
  });

  if(isLoading) return  <div className="mt-[90px]  m-2 px-4 py-2 border rounded-lg border-gray-400 bg-blue-50">Loading...</div>;


  if(isError) return <div>Error</div>

  const {nom,prenom,email,pass} = data

// console.log(data)

  const submitedData = async(e) => {
    e.preventDefault();
    let updated = {
      nom,
      prenom,
      email,
      pass,
      ...formData
    };
    await UpdateMutation.mutate(updated);
    Router.push(`/ListGestio`)
  };
  

    return (

        <div className="flex mt-[80px] md:w-[calc(100vw-18rem)] w-[100%] flex-col items-center justify-center min-h-screen py-6 border-x-[1px]">
            <h1 className="  text-3xl font-bold mb-8">Ajouter nouveau gestionnaire</h1>
      <form onSubmit={submitedData} className="w-fit bg-white border-[1px] border-gray-300 max-w-[60vw] p-6 rounded-lg ">
       
          <div className="container flex justify-between">
                <div className="mb-4 w-full mr-4">
                  <label htmlFor="nom" className="block text-gray-700 font-bold mb-2">Nom</label>
                <input
                id="nom"
                name="nom"
                defaultValue={nom}
                onChange={setFormData}
                type="text"
                className="w-full px-3 py-2 border border-gray-400 rounded-lg focus:outline-none focus:border-blue-500"
                />
                </div>
                <div className="mb-4 w-full">
                  <label htmlFor="prenom" className="block text-gray-700 font-bold mb-2">Prenom</label>
                <input
                id="prenom"
                name="prenom"
                defaultValue={prenom}
                onChange={setFormData}
                type="text"
                className="w-full px-3 py-2 border border-gray-400 rounded-lg focus:outline-none focus:border-blue-500"
                />
                </div>
          </div>
  
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-bold mb-2">E-mail</label>
          <input
            id="email"
            name="email"
            defaultValue={email}
            onChange={setFormData}
            type="Email"
            className="w-full px-3 py-2 border border-gray-400 rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>


        <div className="mb-4">
          <label htmlFor="pass" className="block text-gray-700 font-bold mb-2">Mot de passe</label>
          <input
            id="pass"
            name="pass"
            defaultValue={pass}
            onChange={setFormData}
            type="password"
            className="w-full px-3 py-2 border border-gray-400 rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>


        
     






       <div className="flex justify-end">
       <button
          type="submit"
          className=" mr-5 bg-blue-200 duration-100 hover:bg-blue-300  text-slate-900 border-[1px] border-slate-400 font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline-blue"
        >
          valider
        </button>
        <button
          type="reset"
          className=" bg-slate-200 duration-100 hover:bg-slate-300  text-slate-900 border-[1px] border-slate-400 font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline-blue"
        >
          Annuler
        </button>
       </div>
      </form>
        </div>
    )


}