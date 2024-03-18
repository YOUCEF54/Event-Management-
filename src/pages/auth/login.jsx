import {FcGoogle} from "react-icons/fc"
import {AiFillFacebook} from "react-icons/ai"
import { GoogleAuthProvider, signInWithPopup ,FacebookAuthProvider , updateProfile} from "firebase/auth"
import {auth} from "../../../utils/firebase"
import { useRouter } from "next/router"
import { useEffect } from "react"
import { useAuthState } from "react-firebase-hooks/auth"
export default function Login(){
    
    //Google
    const [user,loading] = useAuthState(auth)
    const router = useRouter()
    const googleProvider = new GoogleAuthProvider();
    const GoogleLogin = async()=>{
        try {
            const result = await signInWithPopup(auth,googleProvider)
            router.push("/auth/dashboard")
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
            router.push("/auth/dashboard")
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        if(user){
            router.push("/auth/dashboard")
        }
    },[user])
    return(
      <div className="grid mx-auto h-screen place-items-center">
          <div className=" border border-zinc-300 shadow-xl  rounded-lg p-10 text-gray-700">
            <h2 className="text-3xl font-medium">rejoignez l'événement</h2>
            <div className="py-4">
                <h3 className="py-4">Connectez-vous avec l'un des fournisseurs</h3>
            </div>
            <div className="rounded-md shadow-sm">
            <div>
              <input
                aria-label="Email address"
                name="email"
                type="email"
                required
                value={''}
                onChange={'handleEmailChange'}
                className="block  border  w-full px-3 py-3 border-zinc-300 placeholder-gray-500 transition duration-150 ease-in-out rounded-lg form-input focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5"
                placeholder="Email address"
              />
            </div>
            <div className="mt-4 mb-5 ">
              <input
              
                aria-label="pass"
                name="pass"
                type="password"
                required
                value={''}
                onChange={'handlepassChange'}
                className="block border  w-full px-3 py-3 border-zinc-300 placeholder-gray-500 transition duration-150 ease-in-out rounded-lg form-input focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5"
                placeholder="mot de pass"
              />
            </div>
          </div>
            <button className=" text-white bg-green-600 font-medium text-lg px-3 py-2 rounded-md w-full">S'incrire</button>
          <hr className="m-4"/>
            <div className="flex flex-col gap-4">
                <button onClick={GoogleLogin} className="text-white bg-gray-700 p-4 w-full font-medium flex align-middle gap-4 rounded-lg">
                    <FcGoogle className="text-2xl"/> S'inscrire avec Google
                </button>
                <button onClick={FacebookLogin} className="text-white bg-gray-700 p-4 w-full font-medium flex align-middle gap-4 rounded-lg">
                    <AiFillFacebook className="text-2xl text-blue-400"/> S'inscrire avec Facebook
                </button>
            </div>
        </div>
      </div>
    )
}