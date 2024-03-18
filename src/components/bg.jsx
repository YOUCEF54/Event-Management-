import gifI from 'public/grbg.gif'
import Image from 'next/image'

export default function BG(){
    return(
        <>
        <div className=" mx-auto m-2 border  border-slate-200 absolute z-0">
        <div className="bg-gray-50 w-screen h-screen absolute opacity-90"></div>
        <Image height={500} width={500} className='min-sm:bg-gray-200  h-screen w-screen'  src={gifI}/>
        </div>
        </>
    )
}