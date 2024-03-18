import { useRouter } from "next/router"


export default function Success(status){
    const router = useRouter()
    return(
        <>
        <div className="mt-[90px]  m-2 p-4 border rounded-lg border-gray-400 bg-green-100">
        Données de formulaire bien ajoutées
        </div>
        {
        // setTimeout(()=>{window.location.href = "/"}, 2000)
        }
      
        </>
    )
}