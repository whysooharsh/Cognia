import { Button } from "../components/Button";
import { InputComponent } from "../components/Input";
import { useRef } from "react";
import axios from "axios";
import { BACKEND_URL } from "../components/config";
import { useNavigate } from "react-router-dom";

export function Signin(){
        const usernameRef = useRef<HTMLInputElement>(null);
        const passwordRef = useRef<HTMLInputElement>(null);
        const navigate = useNavigate();
      
        async function signin(){
             const username = usernameRef.current?.value;
             const password = passwordRef.current?.value;
             const response = await axios.post(BACKEND_URL + "/api/v1/signin", {
                    username,
                    password
             })
             const jwt = response.data.token;
             localStorage.setItem("token", jwt);
             navigate("/dashboard");
             
        }
    return (
        <div className="h-screen w-screen bg-gradient-to-br from-purple-100 to-blue-50 flex justify-center items-center p-4">
            <div className="bg-white rounded-2xl shadow-xl border-gray-100 max-w-md p-8">
                <div className="text-center ">
                    <h1 className="text-2xl font-medium p-4 mb-2">Welcome back!</h1>
                </div>
                <div className="space-y-4">
                    <InputComponent ref={usernameRef} placeholder="username"/> 
                    <InputComponent ref={passwordRef} placeholder="password"/> 
                   
                    <Button onClick={signin}varient="primary" text="Signin" fullWidth={true}/>
                     
                    </div>
                </div>
           

        </div>
    )
}