import React from "react";
import { Calendar, Eye, Shield, Sliders, AlertTriangle , LayoutGrid, ChevronsLeftRightEllipsis} from 'lucide-react';

function AIResponsibleUseCard({ currentArea }) {
  const riskColor = (rating) => {
    const colors = [
      "bg-green-500",
      "bg-yellow-400",
      "bg-warm-red",
      "bg-red-500",
      "bg-red-700",
    ];
    return colors[rating - 1] || "bg-gray-500";
  };
  return (
    <div className={`mb-6 rounded-xl shadow-lg overflow-hidden relative`}>
      {/* Header */}
      <div className="p-4 bg-primary">
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
                className="px-2 py-1 bg-warm-red text-light-gray rounded-full text-xs"
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
            <span
              className={`px-2 py-1 rounded-full text-xs text-light-gray ${riskColor(
                currentArea.riskRating
              )}`}
            >
              <AlertTriangle className="w-3 h-3 inline mr-1" />
              {currentArea.riskRating} / 5
            </span>
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
            <span className="px-2 py-1 bg-primary text-light-gray rounded-full text-xs">
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
