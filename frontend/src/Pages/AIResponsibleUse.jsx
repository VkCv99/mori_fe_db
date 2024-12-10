import React, { useEffect, useState } from 'react'
import Result from "components/Result/Result";
import Breadcrumb from "components/Breadcrumb/Breadcrumb";
import { useApp } from "context/AppContext";

function AIResponsibleUse() {

  const {
    responsibleAIArea,
  } = useApp();

  return (
    <>
        <Breadcrumb pageName="AI Responsible Use" />
        <Result step={2} resultValues={responsibleAIArea}/>
    </>
  )
}

export default AIResponsibleUse