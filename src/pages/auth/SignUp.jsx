import {FcGoogle} from "react-icons/fc"
import {AiFillFacebook} from "react-icons/ai"
import { GoogleAuthProvider, signInWithPopup ,FacebookAuthProvider , updateProfile} from "firebase/auth"
import {auth} from "../../../utils/firebase"
import { useRouter } from "next/router"
import { useQueryClient, useMutation } from "react-query";
import { useEffect,useState,useReducer } from "react"
import Link from "next/link"
import { addUser } from "@/libs/helper"
import { useAuthState } from "react-firebase-hooks/auth"
import Drag from "@/components/Drag"
import { FaSpinner } from 'react-icons/fa';
import Success from "@/components/Success"
import { createUserWithEmailAndPassword } from 'firebase/auth';
import BG from "@/components/bg"



const formReducer = (state, event) => {
    return {
      ...state,
      [event?.target?.name]:event?.target?.value
    };
  };

export default function Login(){
  const [submitting, setSubmitting] = useState(false);

    const [pass1,setPass1] = useState('')
    const [UID,setUid] = useState('')
    const [pass2,setPass2] = useState(false)

    //Mongodb
    const [formData, setFormData] = useReducer(formReducer, {});
    const addMutation = useMutation(addUser, {
        onSuccess: () => {
          console.log("befor : ",UID)
          console.log(formData)
          console.log("data inserted");
        },
      });
    //Google
    const [user,loading] = useAuthState(auth)
    const router = useRouter()
    const googleProvider = new GoogleAuthProvider();
    const GoogleLogin = async()=>{
        try {
            const result = await signInWithPopup(auth,googleProvider)
            const userData = result.user;

            // router.push("/auth/dashboard")
        } catch (error) {
            console.log(error)
        }
    }

    //Facebook
    const fbProvider = new FacebookAuthProvider()
    const FacebookLogin = async()=>{
        try {
            const result = await signInWithPopup(auth,fbProvider)
            console.log(result)
            // router.push("/auth/dashboard")
        } catch (error) {
            console.log(error)
        }
    }

       //Manually

       useEffect(() => {
        if (submitting) {
           
        if(pass2){
          console.log(formData)
          if (Object.keys(formData).length === 0) return console.log("Fill the form");
          let {
                nom,
                prenom,
                email,
                uid,
                pass,
                avatar,
                userName,
              } = formData;
          const model = {
                nom,
                prenom,
                email,
                uid,
                pass,
                avatar,
                userName,
          };
              addMutation.mutate(model);
        }else{
          alert("invalid password")
        }
      
        }
      }, [submitting]);

       const handleSignUp = async (e) => {
        e?.preventDefault();
    
        try {
          let {pass,email} = formData;
          const{user} = await createUserWithEmailAndPassword(auth,email, pass);
          return user
           
        } catch (error) {
         console.log(error)
        }
        
      };

      const handleSubmit = async(e)=>{
        e?.preventDefault()

        const user = await handleSignUp();

          setFormData({target: { name: "uid", value: user.uid }});

      setSubmitting(true);

      
    }
    
    const handleCH =(e)=>{
      e.preventDefault()
      setPass1(e.target.value)
      
      setFormData({ target: { name: "pass", value: e.target.value } });
      console.log(pass2)
    }
   
    
      const handlepassChange = (e)=>{
        if(pass1 == e.target.value){
            setPass2(true)
            setPass1(e.target.value)
        }else{
            setPass2(false)
        }
        console.log(pass2)
      }

  

    if (addMutation.isError) return <div className="mt-[90px]">Error</div>;
    if (addMutation.isSuccess)return (router.push("/dashboard") );
    if (addMutation.isLoading) return <div className="flex justify-center mx-auto items-center h-screen">
    <FaSpinner className="animate-spin text-[3rem] text-gray-500" />
    </div>;
    return(
      <div className=" mx-auto ">


      <div className="grid  mx-auto h-screen place-items-center z-100">
    
    
      {/* <div className="w-screen h-screen fixed z-0">
        <BG/>
      </div> */}
        <div className=" border mt-[100px] border-zinc-300 shadow-xl bg-white bg-opacity-60  rounded-lg p-10 text-gray-700 z-50 ">
          <div>
          <h2 className="text-3xl text-center font-medium ">Rejoignez notre site</h2>
          </div>
          <form onSubmit={handleSubmit} className="mt-8">
        <input type="hidden" name="remember" value="true" />
        <div className="rounded-md shadow-sm ">
          <div className="flex gap-3">
            <input
              aria-label="prenom"
              name="prenom"
              type="text"
              required
              // value={'email'}
              onChange={setFormData}
              className="block  w-full px-3 py-3 border border-gray-300 placeholder-gray-500 transition duration-150 ease-in-out rounded-md form-input focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5"
              placeholder="prenom"
            />
            <input
              aria-label="nom"
              name="nom"
              type="text"
              required
              // value={'email'}
              onChange={setFormData}
              className="block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 transition duration-150 ease-in-out rounded-md form-input focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5"
              placeholder="nom"
            />
          </div>
          <div className="mt-4">
          <input
              aria-label="userName"
              name="userName"
              type="text"
              required
              // value={'email'}
              onChange={setFormData}
              className="block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 transition duration-150 ease-in-out rounded-md form-input focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5"
              placeholder="Username"
            />
          </div>
          <div className="mt-4">
          <input
              aria-label="email"
              name="email"
              type="email"
              required
              // value={'email'}
              onChange={setFormData}
              className="block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 transition duration-150 ease-in-out rounded-md form-input focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5"
              placeholder="email"
            />
          </div>
          {/* <div className="mt-4">
          <Drag onSelectImage={setFormData}/>
          </div> */}
          <div className="mt-4">
            <input
              aria-label="password"
              name="pass"
              type="password"
              required
              // value={'password'}
              onChange={handleCH}
              className="block w-full p-3 border-gray-300 placeholder-gray-500 transition duration-150 ease-in-out rounded-md border form-input focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5"
              placeholder="mot de passe"
            />
          </div>
          <div className="mt-4">
            <input
              aria-label="conpass"
              name="conpass"
              type="password"
              required
              // value={'password'}
              onChange={handlepassChange}
              className={`block w-full p-3 border-gray-300 placeholder-gray-500 transition ${!pass2&&`border-red-600 focus:border-red-300 `} duration-150 ease-in-out rounded-md border form-input focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5`}
              placeholder="Confirmer le mot de passe"
            />
          </div>
        </div>
        <div className="mt-6">
          <button
            type="submit"
            className="w-full bg-gray-700 py-2 px-4 border border-transparent rounded-md flex items-center justify-center text-base leading-6 font-medium text-white hover:bg-gray-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out"
          >
            S'inscrire
          </button>
        </div>
      </form>
          <div className="py-4">
              <h3 className="py-2 text-center">Connectez-vous avec l'un des fournisseurs</h3>
          </div>
          <div className="flex flex-col gap-4">
              <button onClick={GoogleLogin} className="text-white bg-gray-700 p-4 w-full font-medium flex align-middle gap-4 rounded-lg">
                  <FcGoogle className="text-2xl"/> S'inscrire avec Google
              </button>
              <button onClick={FacebookLogin} className="text-white bg-gray-700 p-4 w-full font-medium flex align-middle gap-4 rounded-lg">
                  <AiFillFacebook className="text-2xl text-blue-400"/> S'inscrire avec Facebook
              </button>
          </div>
          <p className="mt-4 text-center">Vous avez déjà un compte? <Link href={"/auth/login"}><u className="cursor-pointer">S'identifier</u></Link></p>

      </div>

    </div>
    
      </div>
    )
}