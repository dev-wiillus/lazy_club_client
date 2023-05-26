import { useRouter } from "next/router"

const kakaoCallback = () => {
    const router = useRouter()
    console.log(router)
}


export default kakaoCallback