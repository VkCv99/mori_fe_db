import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Loader from 'common/Loader';
import Result from "components/Result/Result";
import Breadcrumb from "components/Breadcrumb/Breadcrumb";
import useAxios from "hooks/useAxios"
import AIResponsibleUsePPT from "../assets/ppts/ai_responsible_use.pptx";

function AIResponsibleUse() {
  const { getCall } = useAxios();
  const navigate = useNavigate();
  const [responsibleAIArea, setResponsibleAIArea] = useState([]);
  
  useEffect(()=>{
    const userId = localStorage.getItem("userid");
    if(userId === null || userId === undefined || userId === "" ){
      navigate("/")
    }
    getCall("fetch-ai-use", {'user-id': userId}).then((result)=>{
      setResponsibleAIArea(result.data)
    })
    // eslint-disable-next-line
  },[])
  
  if(responsibleAIArea.length > 0){
    return (
      <>
          <Breadcrumb pageName="AI Responsible Use" ppt={AIResponsibleUsePPT}/>
          <Result step={2} resultValues={responsibleAIArea}/>
      </>
    )
  }
  return <Loader />
}

export default AIResponsibleUse