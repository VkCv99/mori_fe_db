import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import useAxios from 'hooks/useAxios';
import { useApp } from "context/AppContext"
import Result from "components/Result/Result";



function Opportunities() {
    const { getCall } = useAxios()
    const navigate = useNavigate()
    const { getPreviousPath } = useApp();
    const [opportunities, setOpportunities] = useState([])

    useEffect(()=>{
        (async ()=>{
            const userId = localStorage.getItem("userid");
            if(userId === null || userId === undefined || userId === "" ){
                navigate("/")
            }
            const result = await getCall("fetch-opportunities", {'user-id': userId})
            if(result.success){
                if(!result.data.length){
                    getPreviousPath()
                }
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