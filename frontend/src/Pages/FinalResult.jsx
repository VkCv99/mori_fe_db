import Result from 'components/Result/Result'
import { useApp } from 'context/AppContext'
import React from 'react'

function FinalResult() {
  const {FinalresultValues} = useApp()
  return (
    <Result step={3} resultValues={FinalresultValues}/>
  )
}

export default FinalResult