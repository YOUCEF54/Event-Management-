import { useRouter } from "next/router";
import { useReducer } from "react"
import { useMutation } from "react-query"
import Success from "../components/Success";
import Swal from "sweetalert2";

import Drag from "../components/Drag"
import { addPart } from "@/libs/helper"

const formReducer = (state , action) => {
  return {
    ...state,
    [action.target.name] : action.target.value
  }
}
export default function AddPartenaire(){

  
const router = useRouter()
  const [formData , setFormData] = useReducer(formReducer,{})
  const addMutation = useMutation(addPart, {
    onSuccess: () => {
      console.log("data inserted");
    },
  });

 const submitedData = (e) => {
    e.preventDefault();
    console.log(formData)
    if (Object.keys(formData).length === 0) return console.log("Fill the form");
    let {
          Denomination,
          Logo,
         

        } = formData;
    const model = {
          Denomination,
          Logo,
         

    };
    addMutation.mutate(model);}
const swl = ()=>{

  let timerInterval
  Swal.fire({
    title: 'Partenaire ajouté avec succès!',
    html: 'Je fermerai dans <b></b> millisecondes.',
    timer: 2000,
    timerProgressBar: true,
    didOpen: () => {
      Swal.showLoading()
      const b = Swal.getHtmlContainer().querySelector('b')
      timerInterval = setInterval(() => {
        b.textContent = Swal.getTimerLeft()
      }, 100)
    },
    willClose: () => {
      clearInterval(timerInterval)
      router.push("/ListParts")
    }
  }).then((result) => {
    /* Read more about handling dismissals below */
    if (result.dismiss === Swal.DismissReason.timer) {
      console.log('I was closed by the timer')
    }
  })
}  
  if (addMutation.isError) return <div className="mt-[90px]">Error</div>;
  if (addMutation.isSuccess) return (<div className="mt-[90px]" >{swl()}</div>);
  if (addMutation.isLoading) return <div className="mt-[90px]  m-2 px-4 py-2 border rounded-lg border-gray-400 bg-blue-50">Loading...</div>;

  //Drag image

  // const [basket, setBasket] = useState([]);
 
    return (

        <div className="flex mt-[80px] md:w-[calc(100vw-18rem)] w-[100%] flex-col items-center justify-center min-h-screen py-6 border-x-[1px]">
            <h1 className="  text-3xl font-bold mb-8">Ajouter nouveau partenaire</h1>
      <form onSubmit={submitedData} className="w-fit bg-white border-[1px] border-gray-300 max-w-[60vw] p-6 rounded-lg ">
       
          <div className="container flex justify-between">
                <div className="mb-4 w-full">
                  <label htmlFor="Denomination" className="block text-gray-700 font-bold mb-2">Dénomination</label>
                <input
                id="Denomination"
                name="Denomination"
                onChange={setFormData}
                type="text"
                className="w-full px-3 py-2 border border-gray-400 rounded-lg focus:outline-none focus:border-blue-500"
                />
                </div>
          </div>

          <h1 className="block text-gray-700 font-bold mb-2">Logo</h1>
         <div className="mb-4">
         <Drag onSelectImage={setFormData} source={"P"}/>
         </div>

       <div className="flex justify-end">
       <button
          type="submit"
          className=" mr-5 bg-blue-200 duration-100 hover:bg-blue-300  text-slate-900 border-[1px] border-slate-400 font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline-blue"
        >
          valider
        </button>
        <button
          type="submit"
          className=" bg-slate-200 duration-100 hover:bg-slate-300  text-slate-900 border-[1px] border-slate-400 font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline-blue"
        >
          Annuler
        </button>
       </div>
      </form>

      
        </div>
    )


}