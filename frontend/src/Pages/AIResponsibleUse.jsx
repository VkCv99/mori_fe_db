import React, { useEffect, useState } from 'react'
import Result from "components/Result/Result";
import Breadcrumb from "components/Breadcrumb/Breadcrumb";
import { useApp } from "context/AppContext";

function AIResponsibleUse() {

  const {
    responsibleAIUse,
  } = useApp();

  return (
    <>
        <Breadcrumb pageName="AI Responsible Use" />
        <Result step={2} resultValues={responsibleAIUse}/>
    </>
  )
}

export default AIResponsibleUse