import { useEffect, useReducer, useState } from "react";
import Drag from "../components/Drag";
import Dropdown from "../components/Dropdown";
import DropDownV2 from "../components/DropDownV2";
import Success from "../components/Success";
import { useQueryClient, useMutation } from "react-query";
import { addEvent,addCategorie } from "../libs/helper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDay,faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FaSpinner } from 'react-icons/fa';
import { useSelector,useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { faPlusSquare} from "@fortawesome/free-regular-svg-icons";
import Testo from "@/components/Testo";
import { statusAction } from "./redux/reducer";

const formReducer = (state, event) => {
  return {
    ...state,
    [event.target.name]:event.target.value
  };
};

export default function AjouterEvent() {

  const [myValue, setMyValue] = useState('');

  useEffect(() => {
    const sv = localStorage.getItem('fullName');
    if (sv) {
      setMyValue(sv);
    }
    setFormData({ target: { name: "editeur", value: sv } });
    setFormData({ target: { name: "participants", value: [] } });

  }, []);


  
  const dispatch = useDispatch()
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useReducer(formReducer, {});
  const [inputData, setinputData] = useReducer(formReducer, {});
const router = useRouter()
const fullName = useSelector(state => state.app.client.fullName)
const isLogOut = useSelector(state => state.app.client.isLogOut)
const[hide,setHide] = useState(false)

useEffect(() => {
  const storedValue = localStorage.getItem('fullName');
  if (storedValue) {
    setHide(false);
  }else{
    setHide(true);
  }
}, []);
  
  

  const [change , setChange] = useState(false)
  const [change1,setChange2] = useState(false)

  const addMutation = useMutation(addEvent, {
    onSuccess: () => {
      console.log("data inserted");
    },
  });
  const addMutationC = useMutation(addCategorie, {
    onSuccess: () => {
      console.log("Categorie inserted");
      setChange2(!change1)
    },
  });

  const handleCategoryChange = (selectedOption) => {

    setFormData({ target: { name: "categorie", value: selectedOption.value } });
  };

  
  const handleAddPair = (selectedPairs) => {
    setFormData({ target: { name: "partenaires", value: [...selectedPairs] } });
};



// useEffect(()=>{
//   setFormData({ target: { name: "editeur", value: myValue } });
// },[fullName])

  const submitedData = (e) => {

    // console.log(fullName)
    e.preventDefault();
    // console.log(formData)
    if (Object.keys(formData).length === 0) return console.log("Fill the form");
    let {
          Theme,
          editeur,
          categorie,
          DateDebut,
          DateFin,
          descreption,
          ImageEv,
          Lieu,
          Organisateur,
          Tele,
          email,
          partenaires,
          nscRequis,
          participants
        } = formData;
    const model = {
          Theme,
          editeur,
          categorie,
          DateDebut,
          DateFin,
          descreption,
          ImageEv,
          Lieu,
          Organisateur,
          Tele,
          email,
          partenaires,
          nscRequis,
          participants
    };
    addMutation.mutate(model);

  };
  const two = (e)=>{
    e.preventDefault()
    submitedInput()
   
  }

  const submitedInput = () => {
    
    localStorage.setItem('def',!change1)
    dispatch(statusAction(true))
    // console.log(inputData)
    if (Object.keys(inputData).length === 0) return console.log("Fill the input");
    
    let categorie = inputData;
    const modelC = categorie
    addMutationC.mutate(modelC);
    setShowModal(false)
    setChange(true)
    
    
    
  };


  if (addMutation.isError) return <div className="mt-[90px]">Error</div>;
  if (addMutation.isSuccess)return (<Success/> );
  if (addMutation.isLoading) return <div className="flex justify-center mx-auto items-center h-screen">
  <FaSpinner className="animate-spin text-[3rem] text-gray-500" />
</div>;

    return (
      <div className="flex mt-[80px] md:w-[calc(100vw-18rem)] bg-gray-50 w-[100%] flex-col items-center justify-center min-h-screen py-6 border-x-[1px]">
      {/* { !hide&&<h1 className=" bg-violet-700 text-white p-2 rounded-lg">{myValue}</h1>} */}
      <h1 className="  text-3xl font-bold mb-8">Nouvel évènement</h1>
<form onSubmit={submitedData} className="lg:w-[50%] bg-white w-[80%] mx-auto drop-shadow-lg border border-gray-400  p-6 rounded-xl">
  <div className="mb-4">
    <label htmlFor="Theme" className="block  text-gray-700 font-bold mb-2">Theme</label>
    <input
      name="Theme"
      onChange={setFormData}
      type="text"
      className="w-full px-3 py-2 border border-gray-400 rounded-lg focus:outline-none focus:border-blue-500"
    
    />
  </div>
  <div className="container md:flex ">
  <div className="mb-4 mr-4 w-full">
    <label htmlFor="DateDebut" className="block text-gray-700 font-bold mb-2">Date debut</label>
    <input
      id="DateDebut"
      name="DateDebut"
      onChange={setFormData}
      type="datetime-local"
      className="w-full px-3 py-2 border border-gray-400 rounded-lg focus:outline-none focus:border-blue-500"
    
    />
  </div>
  
  <div className="mb-4 mr-4 w-full">
    <label htmlFor="DateFin" className="block text-gray-700 font-bold mb-2">Date fin</label>
    <input
      id="DateFin"
      name="DateFin"
      onChange={setFormData}
      type="datetime-local"
      className="w-full px-3 py-2 border border-gray-400 rounded-lg focus:outline-none focus:border-blue-500"
    
    />
  </div>
 
  </div>

  
  <div className="mb-4">
    <label htmlFor="Lieu" className="block text-gray-700 font-bold mb-2">Lieu</label>
    <input
      id="Lieu"
      name="Lieu"
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
    id="descreption"
    name="descreption"
    />
  </div>

 

  <div className="mb-4">
    <span className="block text-gray-700 font-bold mb-2">Image</span>
    <Drag onSelectImage={setFormData}source={"E"} />
  </div>

  
  <div className="mb-4">
    <label htmlFor="categorie" className="block text-gray-700 font-bold mb-2">Catégorie </label>
    <div className="w-full mr-2 flex justify-evenly gap-4 align-middle">
    <div className="w-full"><DropDownV2 onSelectChange={handleCategoryChange} status={change1}/></div>
     
    <button
          className=" w-fit  text-white px-1 active:bg-stone-100 font-bold text-sm rounded  hover:shadow-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
          type="button"
          onClick={() => setShowModal(true)}
        >
          <FontAwesomeIcon
            icon={faPlusSquare}
            style={{ fontSize: 40, color: "gray" }}
          />  
    </button>
  </div>

  </div>
  <div className="mb-4">
  <span className="block text-gray-700 font-bold mb-2">Partenaires</span>
  <Dropdown onSelectPairs={handleAddPair} />
  </div>
  <div className="mb-4">
    <label htmlFor="Organisateur" className="block text-gray-700 font-bold mb-2">Organisateur</label>
    <input
      id="Organisateur"
      name="Organisateur"
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
      onChange={setFormData}
      id="requis"
      value={true} />
  </div>
  <div className="mr-4 mb-4 bg-slate-100 p-2 border-[1px] border-slate-400 rounded-lg">
  <label htmlFor="notRequis" className="mr-4 text-gray-700 font-bold mb-2">l'inscription non requis</label>
    <input
    type="radio"
    name="nscRequis"
    onChange={setFormData}
    id="notRequis"
    value={false} />
  </div>
  </div>

 <div className="flex justify-end">
 <button
    type="submit"
    className=" mr-5 bg-blue-300 duration-100 hover:bg-blue-400  text-slate-900 border-[1px] border-slate-400 font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline-blue"
  >
    publier
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
{showModal ? (
          <>
            <div
              className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
            >
              <div className="relative w-auto my-6 mx-auto max-w-3xl">
                {/*content*/}
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                  {/*header*/}
                  <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                    <h3 className="text-3xl font-semibold">
                      Ajouter une nouvelle categorie 
                    </h3>
                    <button
                      className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                      onClick={() => setShowModal(false)}
                    >
                      <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                        ×
                      </span>
                    </button>
                  </div>
                  {/*body*/}
                  <div className="relative p-6 flex-auto">
                  <div className="mb-4 ">
    <label htmlFor="categorie" className="block text-gray-700 font-bold mb-2">Categorie</label>
    <input
      id="categorie"
      name="categorie"
      onChange={setinputData}
      type="text"
      className="w-full px-3 py-2 border border-gray-400 rounded-lg focus:outline-none focus:border-blue-500"
    />
  </div>
                  </div>
                  {/*footer*/}
                  <div className="flex items-center justify-end p-6 border-t border-solid bg-slate-50 border-slate-200 rounded-b-lg">
                    <button
                      className=" bg-white  active:bg-gray-200 font-bold uppercase text-sm px-6 py-3 rounded-lg hover:bg-stone-50 border border-gray-300 outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => setShowModal(false)}
                    >
                      Annuler
                    </button>
                    <button
                      className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded-lg hover:bg-emerald-400 outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      // onFocus={()=>{setTimeout(()=>{setChange2(!change1);console.log("boom!")}, 1000)}}
                      onClick={two}
                    >
                      Ajouter
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
          </>
        ) : null}
  </div> 
    )


}


