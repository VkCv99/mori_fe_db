import React from "react";
import {
  Calendar,
  Eye,
  Shield,
  Sliders,
  LayoutTemplate,
  CheckCircle,
} from "lucide-react";

function ResultCard({
  currentArea,
  step,
  isSelected = false,
  onSelect = () => {},
}) {
  return (
    <div
      className={`mb-6 rounded-xl shadow-lg overflow-hidden relative ${
        isSelected ? "ring-2 ring-primary" : ""
      }`}
      onClick={() => onSelect(currentArea)}
    >
      {/* Selection indicator */}
      <div className="absolute top-6 right-6 z-10">
        <CheckCircle
          className={`w-6 h-6 ${
            isSelected ? "text-green-300 " : "text-light-gray"
          }`}
          fill={isSelected ? "green-400" : "transparent"}
        />
      </div>
      {/* Header */}
      <div className="p-4 bg-primary">
        <div className="flex items-center">
          <div className="w-12 h-12 bg-light-gray bg-opacity-20 rounded-full flex items-center justify-center mr-4">
            {/* <IconComponent className="w-6 h-6 text-light-gray" /> */}
            <span className="text-2xl font-bold text-light-gray">
              {currentArea.new_app_name.charAt(0)}
            </span>
          </div>
          <h2 className="text-2xl font-bold text-light-gray">
            {currentArea.new_app_name}
          </h2>
        </div>
      </div>

      {/* Body */}
      <div className="p-6 bg-white">
        {step > 1 && (
          <>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <h4 className="text-sm font-semibold text-dusky-teal mb-2">
                  Application Types:
                </h4>
                <div className="flex flex-wrap gap-2">
                <span
                      className="px-2 py-1 bg-warm-red text-light-gray rounded-full text-xs"
                    >
                      {currentArea.category_name}
                    </span>
                </div>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-dusky-teal mb-2">
                  Horizon:
                </h4>
                <span className="px-2 py-1 bg-primary text-light-gray rounded-full text-xs">
                  <Calendar className="w-3 h-3 inline mr-1" />
                  {currentArea.ai_use_class}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <h4 className="text-sm font-semibold text-dusky-teal mb-2">
                Quadrant:
                </h4>
                <span className="px-2 py-1 bg-primary text-light-gray rounded-full text-xs">
                  <Eye className="w-3 h-3 inline mr-1" />
                  {currentArea.ai_enablement_quadrant}
                </span>
              </div>
              
              {currentArea?.data_advantage && <div>
                <h4 className="text-sm font-semibold text-dusky-teal mb-2">
                Data Advantage:
                </h4>
                <span className="px-2 py-1 bg-primary text-light-gray rounded-full text-xs">
                  <Shield className="w-3 h-3 inline mr-1" />
                  {currentArea.data_advantage}
                </span>
              </div>}
            </div>

            
            <div className="grid grid-cols-2 gap-4 mb-4">
            {currentArea?.ip_advantage &&  <div>
                <h4 className="text-sm font-semibold text-dusky-teal mb-2">
                IP Advantage:
                </h4>
                <span className="px-2 py-1 bg-primary text-light-gray rounded-full text-xs">
                  <Sliders className="w-3 h-3 inline mr-1" />
                  {currentArea.ip_advantage}
                </span>
              </div>}
              {currentArea?.value_area_name && 
              <div>
                <h4 className="text-sm font-semibold text-dusky-teal mb-2">
                Linked AI Value Area:
                </h4>
                <span className="px-2 py-1 bg-primary text-light-gray rounded-full text-xs">
                  <Sliders className="w-3 h-3 inline mr-1" />
                  {currentArea.value_area_name}
                </span>
              </div>}
            </div>

            

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <h4 className="text-sm font-semibold text-dusky-teal mb-2">
                Suggested Route:
                </h4>
                <span className="px-2 py-1 bg-primary text-light-gray rounded-full text-xs">
                  <LayoutTemplate className="w-3 h-3 inline mr-1" />
                  {currentArea.enablement_route}
                </span>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-dusky-teal mb-2">
                  Suggested Reuse:
                </h4>
                <div className="flex flex-wrap gap-2">
                  {currentArea.potential_app_reuse.map((app) => (
                    <span
                      key={app}
                      className="px-2 py-1 bg-warm-red text-light-gray rounded-full text-xs"
                    >
                      {app}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}
     
        <div>
          <h4 className="text-sm font-semibold text-dusky-teal mb-2">
          Description:
          </h4>
          <p>{currentArea.description}</p>
        </div>
        <div className="mt-4">
          <h4 className="text-sm font-semibold text-dusky-teal mb-2">
            Reasoning:
          </h4>
          <div className="bg-light-gray p-3 rounded-md">
            <p>{currentArea.quadrant_reasoning}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResultCard;
