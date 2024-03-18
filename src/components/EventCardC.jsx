
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Fragment } from 'react';
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../utils/firebase";
import { useState, useEffect } from 'react';
import axios from 'axios';
import {  useSelector , useDispatch} from "react-redux";
import { registerAction } from '@/pages/redux/reducer';
import Swal from 'sweetalert2';


export default function Events(props) {

  const [user, loading] = useAuthState(auth);  
  const [isRegistered, setIsRegistered] = useState(false);
  const [onRegistered, setIsOnRegistered] = useState(false);
  const router = useRouter();
  useEffect(()=>{
    if (user) {
      check()
    }
  },[])

    const check = async()=>{
        
        if (props.participants && props.participants.includes(user.displayName+"|"+user.email)) {
        
          setIsRegistered(true)
        } else {
          setIsRegistered(false)
        }
      
    }

    

  const addUser = async () => {
    if (user && !isRegistered) {
      try {
        swl("Vous êtes inscrit à l'événement!")
        const response = await axios.patch(`/api/Events/${props._id}`, {
          participant: (user.displayName+"|"+user.email)
        });
        
        setIsRegistered(true)
        
        console.log('User added to the event successfully.');
        
        console.log(response.data); // Optional: Log the response from the server
      } catch (error) {
        console.error('Error adding user to the event:', error);
      }
    } else if (user && isRegistered ) {
      try {
        swl("Votre inscription à l'événement a été annulée")
        // Perform the logic to remove the user from the event here
        const response = await axios.patch(`/api/Events/${props._id}`, {
          participant: user.displayName+"|"+user.email,
        });
        setIsRegistered(false)
        console.log('User removed from the event successfully.');
        console.log(response.data); // Optional: Log the response from the server
      } catch (error) {
        console.error('Error removing user from the event:', error);
      }
    }
  };
  
  


  const handleDetails = () => {
    router.push(`/event/${props._id}`);
  };
  // let isRegistered =localStorage.getItem('isReg')

const swl = (val)=>{
  if(isRegistered){
    Swal.fire(
      'bon travail!',
      val,
      'success'
    )
  }}

  return (
    <Fragment>
      {
        console.log("local : "+localStorage.getItem(`isReg${props.Theme}`))
        // setIsRegistered(localStorage.getItem('isReg'))
      }
      {console.log("local 2 : "+isRegistered)}
    <div className="w-[80%] border hover:border-rose-700 duration-150 hover:scale-105 text-left shadow-lg mx-auto self-start justify-between rounded-[8px] mb-6 bg-white">
      <div className="comp1"></div>
      <div className="">
        <Image
          alt={props.Theme}
          className="w-full rounded-t-lg"
          width={500}
          height={500}
          src={props.ImageEv}
        />
        <p className="p-2 mb-2 text-red-800"><span>publie par : </span>{props.editeur}</p>
        <h1 className="p-2 mt-2 text-xl">
          Conférence sous le théme :{' '}
          <span className=" text-red-700">{props.Theme}</span>
        </h1>
        <p className="p-2 mb-2 text-slate-500">{props.Lieu}</p>
        <div className='overflow-hidden' >
        <p className=" mx-2 mb-2 max-h-24 line-clamp-3 overflow-hidden">{props.descreption}</p>
        </div>
        <div className="flex justify-end pt-2  ">
          <div className="container inline-flex justify-end">
            {(props.nscRequis && user) && (
              <button
                onClick={addUser}
                className={`p-2 mb-2 mr-4 ${isRegistered ?`bg-red-500 hover:bg-red-600`:`bg-green-500 hover:bg-green-600`}  text-white  rounded-md`}
              >
                {isRegistered?"désinscrire":"S'incrire"}
              </button>
            )}
            <button
              onClick={handleDetails}
              className="p-2 mb-2 mr-2 text-white bg-gray-500 hover:bg-gray-600 rounded-md"
            >
              plus de détails
            </button>
          </div>
        </div>
      </div>
    </div>
  </Fragment>
  );
}
