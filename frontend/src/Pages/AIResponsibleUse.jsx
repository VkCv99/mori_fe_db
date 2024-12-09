import React, { useEffect, useState } from 'react'
import Loader from 'common/Loader';
import Result from "components/Result/Result";
import Breadcrumb from "components/Breadcrumb/Breadcrumb";
import useAxios from "hooks/useAxios"
import AIResponsibleUsePPT from "../assets/ppts/ai_responsible_use.pptx";

function AIResponsibleUse() {
  const { getCall } = useAxios();
  const [responsibleAIArea, setResponsibleAIArea] = useState([]);
  useEffect(()=>{
    getCall("fetch-ai-use").then((result)=>{
      setResponsibleAIArea(result.data)
    })
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