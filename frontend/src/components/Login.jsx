import axios from "axios";
import google from "../assets/Google.png"
import { useAuthContext } from "../hook/useAuthContext";

export default function Login() {
    const { dispatch } = useAuthContext ()

    const handleLogin = async () => {
        await axios.post(import.meta.env.VITE_BACKEND_URL+"logout")
        dispatch({ type: 'LOGOUT' });
        window.location.href = import.meta.env.VITE_BACKEND_URL+"oauth2/authorization/google";
    }

    return (
        <div className="w-full h-full flex justify-center items-center">
            <div className="h-96 w-96 bg-white p-5 flex justify-center items-center rounded-lg flex-col drop-shadow-lg">
                <h1 className="text-2xl font-bold w-full text-center"> HR Module </h1>
                <button className="h-7 w-1/3 flex justify-around items-center py-5 px-2 border border-black rounded-full my-5 hover:bg-black hover:text-white duration-150" onClick={handleLogin}>
                    <img src={google} className="h-5" />
                    <div>
                        Sign In
                    </div>
                </button>
            </div>
        </div>
    )
}