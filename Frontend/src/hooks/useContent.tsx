import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../components/config";

export function useContent() {
    const [contents, setContents] = useState([]);

    function refresh() {
         axios.get(`${BACKEND_URL}/api/v1/content`,{
            headers : {
                "Authorization" : localStorage.getItem("token")
            }
    })
        .then((response) => {
            setContents(response.data.content)
        })
        .catch(error    => {
            console.error('Error', error);
        })
    }
    useEffect(()=> {
           refresh();
           let interval = setInterval(() => {
                refresh()
           }, 10*1000);

           return () => {
                clearInterval(interval);
           }
    }, [])

    return {contents, refresh};
}