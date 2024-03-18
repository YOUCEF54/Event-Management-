import Head from 'next/head'
import { Fragment, useState, useEffect} from 'react'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Card from '../components/Events'
import {getEvents} from "../libs/helper"
import Link from 'next/link'
import { useSelector } from 'react-redux'




const inter = Inter({ subsets: ['latin'] })
export default function Home() {
  // console.clear()
  getEvents().then(res => console.log(res))

  const isLogOut = useSelector(state => state.app.client.isLogOut)
  const [val ,setVal] = useState(false)
  useEffect(()=>{
    const storedValue = localStorage.getItem('fullName');
    if (storedValue) {
      setVal(true);
    }else{
      setVal(false)
    }
},[])
console.log("this is Inddex : "+val)

  return (
    <Fragment>

    <Head>
    <Link rel="preconnect" href="https://fonts.googleapis.com"/>
<Link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
<Link href="https://fonts.googleapis.com/css2?family=Lora&display=swap" rel="stylesheet"/>  
  </Head>
   
  <div className={`${val&&`md:w-[calc(100vw-18rem)]`} w-[100%] bg-zinc-100`}>

  <Card />
  
  </div>
    </Fragment>
  )
}
