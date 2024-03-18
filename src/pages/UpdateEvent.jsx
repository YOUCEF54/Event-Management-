import { useReducer, useState } from "react";
import Drag from "../components/Drag";
import Dropdown from "../components/Dropdown";
import DropDownV2 from "../components/DropDownV2";
import Success from "../components/Success";
import { getEvent,updateEvent } from "../libs/helper";
import { useQueryClient, useMutation, useQuery } from "react-query";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";


const formReducer = (state, event) => {
  return {
    ...state,
    [event.target.name]:event.target.value
    
  };
};

export default function ModifierEvent() {
  
  const [formData, setFormData] = useReducer(formReducer, {});
  const formId = useSelector(state => state.app.client.formId)
  const Router = useRouter()

  const {isLoading, isError , data , error} =  useQuery(['Events',formId],()=> getEvent(formId))
  const UpdateMutation = useMutation((newData)=>updateEvent(formId,newData),{
    onSuccess : async(data)=>{
      console.log('data updated')
    }
  })
  if(isLoading) return  <div className="mt-[90px]  m-2 px-4 py-2 border rounded-lg border-gray-400 bg-blue-50">Loading...</div>;


  if(isError) return <div>Error</div>


  const {Theme,DateDebut,DateFin,Lieu,descreption,ImageEv,categorie,Organisateur,partenaires,Tele,email,nscRequis} = data
  const handleCategoryChange = (selectedOption) => {
    setFormData({ target: { name: "categorie", value: selectedOption.value } });
  };

  
  const handleAddPair = (selectedPairs) => {
    setFormData({ target: { name: "partenaires", value: [...selectedPairs] } });
};


const submitedData = async (e) => {
  e.preventDefault();
  let updated = {
    Theme,
    DateDebut,
    DateFin,
    Lieu,
    descreption,
    ImageEv,
    categorie,
    Organisateur,
    partenaires,
    Tele,
    email,
    nscRequis,
    ...formData
  };
  console.log(data);
  console.log(updated);
  await UpdateMutation.mutate(updated);
  Router.push(`event/${formId}`)
};


    return (
      <div className="flex mt-[80px] md:w-[calc(100vw-18rem)] w-[100%] flex-col items-center justify-center min-h-screen py-6 border-x-[1px]">
      <h1 className="  text-3xl font-bold mb-8">Nouveau evenement</h1>
<form onSubmit={submitedData} className=" lg:w-[90%] w-[80%] mx-auto bg-white border-[1px] border-gray-300  p-6 rounded-lg">
  <div className="mb-4">
    <label htmlFor="Theme" className="block text-gray-700 font-bold mb-2">Titre</label>
    <input
      name="Theme"
      defaultValue={Theme}
      onChange={setFormData}
      type="text"
      className="w-full px-3 py-2 border border-gray-400 rounded-lg focus:outline-none focus:border-blue-500"
    
    />
  </div>
  <div className="container md:flex float-left ">
  <div className="mb-4 mr-4">
    <label htmlFor="DateDebut" className="block text-gray-700 font-bold mb-2">Date debut</label>
    <input
      id="DateDebut"
      name="DateDebut"
      defaultValue={DateDebut}
      onChange={setFormData}
      type="datetime-local"
      className="w-full px-3 py-2 border border-gray-400 rounded-lg focus:outline-none focus:border-blue-500"
    />
  </div>
  
  <div className="mb-4 mr-4">
    <label htmlFor="DateFin" className="block text-gray-700 font-bold mb-2">Date fin</label>
    <input
      id="DateFin"
      name="DateFin"
      defaultValue={DateFin}
      onChange={setFormData}
      type="datetime-local"
      className="w-full px-3 py-2 border border-gray-400 rounded-lg focus:outline-none focus:border-blue-500"
    />
  </div>
 
  </div>

  <div className="mb-4 ">
    <label htmlFor="Lieu" className="block text-gray-700 font-bold mb-2">Lieu</label>
    <input
      id="Lieu"
      name="Lieu"
      defaultValue={Lieu}
      onChange={setFormData}
      type="text"
      className="w-full px-3 py-2 border border-gray-400 rounded-lg focus:outline-none focus:border-blue-500"
    />
  </div>

   
  <div className="mb-6">
    <label htmlFor="descreption" className="block text-gray-700 font-bold mb-2">Description</label>
    <textarea rows={8}
    className="w-full p-2 border border-gray-400 rounded-lg focus:outline-none focus:border-blue-500"
    onChange={setFormData}
    defaultValue={descreption}
    id="descreption"
    name="descreption"
    />
  </div>

 

  <div className="mb-4">
    <span className="block text-gray-700 font-bold mb-2">Image</span>
    <Drag onSelectImage={setFormData} source={"Up"} />
  </div>

  
  <div className="mb-4">
    <label htmlFor="categorie" className="block text-gray-700 font-bold mb-2">Catégorie </label>
    <div className="w-full mr-2">
    <DropDownV2 onSelectChange={handleCategoryChange} defaultValue={categorie}/>
</div>
  </div>

  <div className="mb-4">
  <span className="block text-gray-700 font-bold mb-2">Partenaires</span>
  <Dropdown onSelectPairs={handleAddPair} defaultValue={partenaires}/>
  </div>
  <div className="mb-4">
    <label htmlFor="Organisateur"  className="block text-gray-700 font-bold mb-2">Organisateur</label>
    <input
      id="Organisateur"
      name="Organisateur"
      defaultValue={Organisateur}
      onChange={setFormData}
      type="text"
      className="w-full px-3 py-2 border border-gray-400 rounded-lg focus:outline-none focus:border-blue-500"
    />
  </div>

  <div className="mb-4">
   <div className="mb-4">
    <label htmlFor="Tele" className="block text-gray-700 font-bold mb-2">Telephone d'organisateur</label>
    <input
      id="Tele"
      name="Tele"
      defaultValue={Tele}
      onChange={setFormData}
      type="tel"
      className="w-full px-3 py-2 border border-gray-400 rounded-lg focus:outline-none focus:border-blue-500"
    />
  </div>
   <div className="mb-4">
    <label htmlFor="email" className="block text-gray-700 font-bold mb-2">E-mail d'organisateur</label>
    <input
      id="email"
      name="email"
      defaultValue={email}
      onChange={setFormData}
      type="email"
      className="w-full px-3 py-2 border border-gray-400 rounded-lg focus:outline-none focus:border-blue-500"
    />
  </div>
  </div>

  <div className="flex">
  <div className="mr-4 mb-4 bg-slate-100 p-2 border-[1px] border-slate-400 rounded-lg">
  <label htmlFor="requis" className="mr-4  text-gray-700 font-bold mb-2">l'inscription requis</label>

    <input 
      type="radio"
      name="nscRequis"
      defaultValue={nscRequis}
      onChange={setFormData}
      id="requis"
      value={true} />
  </div>
  <div className="mr-4 mb-4 bg-slate-100 p-2 border-[1px] border-slate-400 rounded-lg">
  <label htmlFor="notRequis" className="mr-4 text-gray-700 font-bold mb-2">l'inscription non requis</label>
    <input
    type="radio"
    name="nscRequis"
    defaultValue={nscRequis}
    onChange={setFormData}
    id="notRequis"
    value={false} />
  </div>
  </div>

 <div className="flex justify-end">
 <button
    type="submit"
    className=" mr-5 bg-blue-300 duration-100 hover:bg-blue-400  text-slate-900 border-[1px] border-slate-400 font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline-blue"
  >Modifier
  </button>
  <button
    type="reset"
    className=" bg-slate-200 duration-100 hover:bg-slate-300  text-slate-900 border-[1px] border-slate-400 font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline-blue"
  >
    Annuler
  </button>
 </div>
<div>

</div>
 
</form>
  </div> 
    )


}