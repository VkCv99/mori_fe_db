import React, {useEffect} from "react"
import Result from 'components/Result/Result'
import { useApp } from 'context/AppContext'

function FinalResult() {
  const { FinalresultValues,getPreviousPath } = useApp();
  useEffect(()=>{
    if(!FinalresultValues.length){
      getPreviousPath();
    }
  },[FinalresultValues, getPreviousPath])
  return (
    <Result step={3} resultValues={FinalresultValues}/>
  )
}

export default FinalResult