import React, { useEffect, useState } from 'react'
import Result from "components/Result/Result";
import useAxios from 'hooks/useAxios';
import { useNavigate } from 'react-router-dom';

function Opportunities() {
    const { getCall } = useAxios()
    const navigate = useNavigate()
    const [opportunities, setOpportunities] = useState([])

    useEffect(()=>{
        (async ()=>{
            const userId = localStorage.getItem("userid");
            if(userId === null || userId === undefined || userId === "" ){
                navigate("/")
            }
            const result = await getCall("fetch-opportunities", {'user-id': userId})
            if(result.success){
                setOpportunities(result.data)
            }
        })()
        // eslint-disable-next-line
    },[])

    return (
        <Result step={1} resultValues={opportunities}/>
    )
}

export default Opportunities