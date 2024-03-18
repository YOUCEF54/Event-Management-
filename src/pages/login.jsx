import { useState,useEffect } from 'react';
import { useSelector,useDispatch } from "react-redux";
import {isAdmin,logOutAction} from "./redux/reducer"
import { useRouter } from 'next/router';
const SignIn = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const [email, setEmail] = useState('');
  const [pass, setpass] = useState('');

  const handleEmailChange = (event) => setEmail(event.target.value);
  const handlepassChange = (event) => setpass(event.target.value);
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, pass }),
      });

      if (response.ok) {
        // If login is successful, retrieve the name from the response
        const { name  , prenom } = await response.json();
        const fullName = name +" "+ prenom
        console.log('Logged in as:', fullName );
        dispatch(isAdmin(fullName))
        dispatch(logOutAction(false))
        localStorage.setItem('fullName', fullName);
        router.push("/")
     
      } else {
        const { message } = await response.json();
        console.error('Login error:', message);
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };
  const [val ,setVal] = useState(false)
  useEffect(()=>{
    const storedValue = localStorage.getItem('fullName');
    if (storedValue) {
      setVal(true);
    }else{
      setVal(false)
    }
},[])

  return (
    <div className={`flex z-0 w-[100vw] ${val&&`md:w-[calc(100vw-18rem)]`} flex-col items-center justify-center min-h-screen py-6 bg-gray-50 `}>
      <div className="w-full border p-6 rounded-lg drop-shadow-sm shadow-neutral-400 bg-white max-w-md mx-auto">
        <h2 className="text-3xl font-bold  leading-9 text-center text-gray-900">L'espace d'administration</h2>
        <form onSubmit={handleSubmit} className="mt-8">
          <input type="hidden" name="remember" value="true" />
          <div className="rounded-md shadow-sm">
            <div>
              <input
                aria-label="Email address"
                name="email"
                type="email"
                required
                value={email}
                onChange={handleEmailChange}
                className="block w-full px-3 py-3 border placeholder-gray-500 transition duration-150 ease-in-out rounded-md form-input focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5"
                placeholder="Email address"
              />
            </div>
            <div className="mt-4">
              <input
                aria-label="pass"
                name="pass"
                type="password"
                required
                value={pass}
                onChange={handlepassChange}
                className="block w-full p-3 placeholder-gray-500 transition duration-150 ease-in-out rounded-md border form-input focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5"
                placeholder="pass"
              />
            </div>
          </div>
          {/* <div className="mt-6 flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember_me"
                name="remember_me"
                type="checkbox"
                className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
              />
              <label htmlFor="remember_me" className="ml-2 block text-sm leading-5 text-gray-900">
                Souviens-toi de moi
              </label>
            </div>
            <div className="text-sm leading-5">
              <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:underline transition ease-in-out duration-150">
                Mot de passe oublié?
              </a>
            </div>
          </div> */}
          <div className="mt-6">
            <button
              type="submit"
              className="w-full bg-indigo-600 py-2 px-4 border border-transparent rounded-md flex items-center justify-center text-base leading-6 font-medium text-white hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out"
            >
              Connexion
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
