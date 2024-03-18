import {useRouter} from 'next/router'

export default function User(){
    const router = useRouter()
    const userName = router.query.user
    let newVal;
    (userName == "user1") ? newVal = "TestValide1 " : newVal = "unknownUser" 

    return(
       <>
       <h2>Hello {newVal}</h2>
       </>
       )

}