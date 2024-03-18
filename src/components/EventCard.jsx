// import Image from 'next/image';
// import Link from 'next/link';
// import { useRouter } from 'next/router';
// import { Fragment } from 'react';
// import {useAuthState} from "react-firebase-hooks/auth"
// import {auth} from "../../utils/firebase"
// import { useState } from 'react';
// import axios from 'axios';
// // import { db } from '../../../../utils/firebase'; // Assuming you have initialized Firebase Firestore
  
//   export default function Events(props) {
//     // Other code...
  
//     const [isRegistered, setIsRegistered] = useState(false); // State to track if the user is already registered
  
//     const addUser = async () => {
//       if (user && !isRegistered) {
//         try {
//           const response = await axios.patch(`/api/Events/${props._id}`, {
//             participant: user.displayName,
//           });
//           setIsRegistered(true); // Set the state to indicate the user is registered
//           console.log('User added to the event successfully.');
//           console.log(response.data); // Optional: Log the response from the server
//         } catch (error) {
//           console.error('Error adding user to the event:', error);
//         }
//       }
//     };
    
  

//   const [user,loading] = useAuthState(auth)

//   const router = useRouter();

//   const Details = () => {
//     router.push(`/${props.Theme}`);
//   };

//   const handleDetails = () => {
//     router.push(`/event/${props._id}`);
//   };
  


//   return (
    // <Fragment>
    //   <div className="w-[80%]  text-left shadow-lg mx-auto self-start justify-between rounded-[8px] mb-6 bg-white">
    //     <div className="comp1"></div>
    //     <div className="">
    //       <Image
    //         alt={props.Theme}
    //         className="w-full rounded-t-lg"
    //         width={500}
    //         height={500}
    //         src={props.ImageEv}
    //       />
    //       <p className="p-2 mb-2 text-red-800"><span>publie par : </span>{props.editeur}</p>
    //       <h1 className="p-2 mt-2 text-xl">
    //         Conférence sous le théme :{' '}
    //         <span className=" text-red-700">{props.Theme}</span>
    //       </h1>
    //       <p className="p-2 mb-2 text-slate-500">{props.Lieu}</p>
    //       <div className='overflow-hidden' >
    //       <p className=" mx-2 mb-2 max-h-24 line-clamp-3 overflow-hidden">{props.descreption}</p>
    //       </div>
    //       <div className="flex justify-end pt-2  ">
    //         <div className="container inline-flex justify-end">
    //           {(props.nscRequis && user) && (
    //             <button
    //               onClick={addUser}
    //               className="p-2 mb-2 mr-4 bg-red-500 text-white hover:bg-red-600 rounded-md"
    //             >
    //               S'incrire
    //             </button>
    //           )}
    //           <button
    //             onClick={handleDetails}
    //             className="p-2 mb-2 mr-2 text-white bg-gray-500 hover:bg-gray-600 rounded-md"
    //           >
    //             plus de détails
    //           </button>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </Fragment>
//   );
// }

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


  return (
    <Fragment>
      {
        console.log("local : "+localStorage.getItem(`isReg${props.Theme}`))
        // setIsRegistered(localStorage.getItem('isReg'))
      }
      {console.log("local 2 : "+isRegistered)}
    <div className="w-[80%] border border-rose-700  0 text-left shadow-lg mx-auto self-start justify-between rounded-[8px] mb-6 bg-white">
      <div className="comp1"></div>
      <div className=" border-rose-700">
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



// import Image from 'next/image';
// import Link from 'next/link';
// import { useRouter } from 'next/router';
// import { Fragment } from 'react';
// import {useAuthState} from "react-firebase-hooks/auth"
// import {auth} from "../../utils/firebase"
// import { useState } from 'react';
// import axios from 'axios';
// // import { db } from '../../../../utils/firebase'; // Assuming you have initialized Firebase Firestore
  
//   export default function Events(props) {
//     // Other code...
  
//     const [isRegistered, setIsRegistered] = useState(false); // State to track if the user is already registered
  
//     const addUser = async () => {
//       if (user && !isRegistered) {
//         try {
//           const response = await axios.patch(`/api/Events/${props._id}`, {
//             participant: user.displayName,
//           });
//           setIsRegistered(true); // Set the state to indicate the user is registered
//           console.log('User added to the event successfully.');
//           console.log(response.data); // Optional: Log the response from the server
//         } catch (error) {
//           console.error('Error adding user to the event:', error);
//         }
//       }
//     };
    
  

//   const [user,loading] = useAuthState(auth)

//   const router = useRouter();

//   const Details = () => {
//     router.push(`/${props.Theme}`);
//   };

//   const handleDetails = () => {
//     router.push(`/event/${props._id}`);
//   };
  


//   return (
    // <Fragment>
    //   <div className="w-[80%]  text-left shadow-lg mx-auto self-start justify-between rounded-[8px] mb-6 bg-white">
    //     <div className="comp1"></div>
    //     <div className="">
    //       <Image
    //         alt={props.Theme}
    //         className="w-full rounded-t-lg"
    //         width={500}
    //         height={500}
    //         src={props.ImageEv}
    //       />
    //       <p className="p-2 mb-2 text-red-800"><span>publie par : </span>{props.editeur}</p>
    //       <h1 className="p-2 mt-2 text-xl">
    //         Conférence sous le théme :{' '}
    //         <span className=" text-red-700">{props.Theme}</span>
    //       </h1>
    //       <p className="p-2 mb-2 text-slate-500">{props.Lieu}</p>
    //       <div className='overflow-hidden' >
    //       <p className=" mx-2 mb-2 max-h-24 line-clamp-3 overflow-hidden">{props.descreption}</p>
    //       </div>
    //       <div className="flex justify-end pt-2  ">
    //         <div className="container inline-flex justify-end">
    //           {(props.nscRequis && user) && (
    //             <button
    //               onClick={addUser}
    //               className="p-2 mb-2 mr-4 bg-red-500 text-white hover:bg-red-600 rounded-md"
    //             >
    //               S'incrire
    //             </button>
    //           )}
    //           <button
    //             onClick={handleDetails}
    //             className="p-2 mb-2 mr-2 text-white bg-gray-500 hover:bg-gray-600 rounded-md"
    //           >
    //             plus de détails
    //           </button>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </Fragment>
//   );
// }
//////////////////////////////////////////////////////////////////////////

// import Image from 'next/image';
// import Link from 'next/link';
// import { useRouter } from 'next/router';
// import { Fragment } from 'react';
// import { useAuthState } from "react-firebase-hooks/auth";
// import { auth } from "../../utils/firebase";
// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import {  useSelector , useDispatch} from "react-redux";
// import { registerAction } from '@/pages/redux/reducer';


// export default function Events(props) {

//   const [user, loading] = useAuthState(auth);
//   const status = (user?true:false)
  
//   const [isRegistered, setIsRegistered] = useState(false);
//   const router = useRouter();
//   useEffect(()=>{
//     if (user) {
//       check()
//     }
//   },[router,null])

//     const check = async()=>{
        
//         if (props.participants && props.participants.includes(user.displayName+"|"+user.email)) {
//           localStorage.setItem(`isReg${props.Theme}`,true)
//         } else {
//           localStorage.setItem(`isReg${props.Theme}`,false)
//         }
//         setIsRegistered(localStorage.getItem(`isReg${props.Theme}`))
      
//     }

//   const addUser = async () => {
//     if (user && !isRegistered) {
//       try {
//         const response = await axios.patch(`/api/Events/${props._id}`, {
//           participant: (user.displayName+"|"+user.email)
//         });
//         localStorage.setItem(`isReg${props.Theme}`,true)
//         setIsRegistered(true)
//         console.log('User added to the event successfully.');
//         console.log(response.data); // Optional: Log the response from the server
//       } catch (error) {
//         console.error('Error adding user to the event:', error);
//       }
//     } else if (user && isRegistered ) {
//       try {
//         // Perform the logic to remove the user from the event here
//         const response = await axios.patch(`/api/Events/${props._id}`, {
//           participant: user.displayName+"|"+user.email,
//         });
//         localStorage.setItem(`isReg${props.Theme}`,false)
//         setIsRegistered(false)
//         console.log('User removed from the event successfully.');
//         console.log(response.data); // Optional: Log the response from the server
//       } catch (error) {
//         console.error('Error removing user from the event:', error);
//       }
//     }
//   };
  
  
//   const Details = () => {
//     router.push(`/${props.Theme}`);
//   };

//   const handleDetails = () => {
//     router.push(`/event/${props._id}`);
//   };
//   // let isRegistered =localStorage.getItem('isReg')


//   return (
//     <Fragment>
//       {
//         console.log("local : "+localStorage.getItem(`isReg${props.Theme}`))
//         // setIsRegistered(localStorage.getItem('isReg'))
//       }
//       {console.log("local 2 : "+isRegistered)}
//     <div className="w-[80%]  text-left shadow-lg mx-auto self-start justify-between rounded-[8px] mb-6 bg-white">
//       <div className="comp1"></div>
//       <div className="">
//         <Image
//           alt={props.Theme}
//           className="w-full rounded-t-lg"
//           width={500}
//           height={500}
//           src={props.ImageEv}
//         />
//         <p className="p-2 mb-2 text-red-800"><span>publie par : </span>{props.editeur}</p>
//         <h1 className="p-2 mt-2 text-xl">
//           Conférence sous le théme :{' '}
//           <span className=" text-red-700">{props.Theme}</span>
//         </h1>
//         <p className="p-2 mb-2 text-slate-500">{props.Lieu}</p>
//         <div className='overflow-hidden' >
//         <p className=" mx-2 mb-2 max-h-24 line-clamp-3 overflow-hidden">{props.descreption}</p>
//         </div>
//         <div className="flex justify-end pt-2  ">
//           <div className="container inline-flex justify-end">
//             {(props.nscRequis && user) && (
//               <button
//                 onClick={addUser}
//                 className={`p-2 mb-2 mr-4 ${isRegistered ?`bg-red-500 hover:bg-red-600`:`bg-green-500 hover:bg-green-600`}  text-white  rounded-md`}
//               >
//                 {isRegistered?"désinscrire":"S'incrire"}
//               </button>
//             )}
//             <button
//               onClick={handleDetails}
//               className="p-2 mb-2 mr-2 text-white bg-gray-500 hover:bg-gray-600 rounded-md"
//             >
//               plus de détails
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   </Fragment>
//   );
// }

