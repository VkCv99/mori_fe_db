import React from "react";
import { Calendar, Eye, Shield, Sliders, AlertTriangle , LayoutGrid, ChevronsLeftRightEllipsis, Pencil } from 'lucide-react';

function AIResponsibleUseCard({ currentArea, handleEditModal}) {
  const riskColor = (rating) => {
    const colors = [
      "bg-green-500 text-white",
      "bg-yellow-400 text-black",
      "bg-warm-red text-white",
      "bg-red-500 text-white",
      "bg-red-700 text-white",
    ];
    return colors[rating - 1] || "text-black bg-gray-500";
  };

  const getDataSenstivityColor = (sensitivity) => {
    if ((sensitivity.includes('Protected')) ||  (sensitivity.includes('Highly Protected'))) {
      return 'bg-green-500 text-white'
    };
    if (sensitivity.includes('Internal')) {
      return 'bg-yellow-400 text-black'
    };
    return 'bg-red-500 text-white';
  };

  return (
    <div className={`mb-6 rounded-xl shadow-lg overflow-hidden relative`}>
      {/* Header */}
      <div className="p-4 bg-primary flex items-center justify-between">
        <div className="flex items-center">
          <div className="w-12 h-12 bg-light-gray bg-opacity-20 rounded-full flex items-center justify-center mr-4">
            {/* <IconComponent className="w-6 h-6 text-light-gray" /> */}
            <span className="text-2xl font-bold text-light-gray">
              {currentArea.name.charAt(0)}
            </span>
          </div>
          <h2 className="text-2xl font-bold text-light-gray">
            {currentArea.name}
          </h2>
        </div>
        <div className="flex items-center text-white">
          <Pencil className="cursor-pointer" onClick={()=>handleEditModal(currentArea)} /> ̰
        </div>
        
      </div>

      {/* Body */}
      <div className="p-6 bg-white">
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div>
            <h4 className="text-sm font-semibold text-dusky-teal mb-2">
              Application Types:
            </h4>
            <div className="flex flex-wrap gap-2">
              {/* {currentArea.applicationTypes.map((type) => ( */}
              <span
                key={currentArea.applicationTypes}
                className="px-2 py-1 bg-primary text-light-gray rounded-full text-xs"
              >
                {currentArea.applicationTypes}
              </span>
              {/*  ))} */}
            </div>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-dusky-teal mb-2">
              Horizon:
            </h4>
            <span className="px-2 py-1 bg-primary text-light-gray rounded-full text-xs">
              <Calendar className="w-3 h-3 inline mr-1" />
              {currentArea.horizon}
            </span>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-dusky-teal mb-2">
              Risk Rating:
            </h4>
            {Array.isArray(currentArea.riskRating) ? 
              currentArea.riskRating.map((rating, index)=>(
                <span
                  key={`index_${index}_${rating}`}
                  className={`px-2 py-1 mx-1 rounded-full text-xs ${riskColor(
                    rating
                  )}`}
                >
                  <AlertTriangle className="w-3 h-3 inline mr-1" />
                  {rating} / 5
                </span>
              ))
              :
              <span
                className={`px-2 py-1 rounded-full text-xs ${riskColor(
                  currentArea.riskRating
                )}`}
              >
                <AlertTriangle className="w-3 h-3 inline mr-1" />
                {currentArea.riskRating} / 5
              </span>
            }
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-4">
          <div>
            <h4 className="text-sm font-semibold text-dusky-teal mb-2">
              Info Exposure:
            </h4>
            <span className="px-2 py-1 bg-primary text-light-gray rounded-full text-xs">
              <Eye className="w-3 h-3 inline mr-1" />
              {currentArea.infoExposure}
            </span>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-dusky-teal mb-2">
              Data Sensitivity:
            </h4>
            <span className={`px-2 py-1 rounded-full text-xs ${getDataSenstivityColor(
                  currentArea.dataSensitivity
                )}`}>
              <Shield className="w-3 h-3 inline mr-1" />
              {currentArea.dataSensitivity}
            </span>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-dusky-teal mb-2">
              Complexity of Usage:
            </h4>
            <span className="px-2 py-1 bg-primary text-light-gray rounded-full text-xs">
              <Sliders className="w-3 h-3 inline mr-1" />
              {currentArea.complexityOfUsage}
            </span>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div>
            <h4 className="text-sm font-semibold text-dusky-teal mb-2">
              Specialisation Interaction Act:
            </h4>
            <span className="px-2 py-1 bg-primary text-light-gray rounded-full text-xs">
              <ChevronsLeftRightEllipsis className="w-3 h-3 inline mr-1" />
              {currentArea.level_of_specialisation_interactionact}
            </span>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-dusky-teal mb-2">
              App Operation:
            </h4>
            <span className="px-2 py-1 bg-primary text-light-gray rounded-full text-xs">
              <LayoutGrid className="w-3 h-3 inline mr-1" />
              {currentArea.app_operation}
            </span>
          </div>
        </div>
        <h4 className="text-sm font-semibold text-dusky-teal mb-2">
          Reasoning:
        </h4>
        <ul className="list-disc list-inside text-primary space-y-1 text-sm">
          {currentArea.reasoning.map((opportunity, index) => (
            <li key={index}>{opportunity}</li>
          ))}
        </ul>
      </div>
    </div>
    // </div>
  );
}

export default AIResponsibleUseCard;
