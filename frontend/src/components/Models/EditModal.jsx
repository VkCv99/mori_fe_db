import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import Select from "react-select";
import { X } from "lucide-react";
import {
  HorizonOptions,
  AppTypeOptions,
  RiskRatingOptions,
  DataSensitivityOptions,
  InfoExposureOptions,
  SpecializationInteractionActOptions,
  AppOperationOptions,
  ComplexityOfUsageOptions,
} from "./EditOptions";

const customStyles = {
  option: (base, state) => ({
    ...base,
    backgroundColor: state.isSelected
      ? "#5D4284"
      : state.isFocused
      ? "#9682C8"
      : "white",
    color: state.isSelected ? "white" : "black",
    padding: 10,
  }),
};

const Modal = ({ isOpen, onClose, data, handleCurrentAreaChange }) => {
  const [selectedOptions, setSelectedOptions] = useState({
    applicationTypes: null,
    horizon: null,
    riskRating: [null, null],
    infoExposure: null,
    dataSensitivity: null,
    complexityOfUsage: null,
    level_of_specialisation_interactionact: null,
    app_operation: null,
    reasoning:null,
    name:null,
    description:null
  });

  const handleChange = (val, key, index=0) => {
    setSelectedOptions((prev) => {
      if(key === "reasoning" || key === "riskRating"){
        const updatedValue = [...prev[key]]; 
        updatedValue[index] = val; 
        return { ...prev, [key]: updatedValue };
      } else {
        return {...prev, [key]:val}
      }
    })
  };

  const handleSave = () => {
    const updatedData = {}
    Object.entries(selectedOptions).forEach(([key, value]) => {
      if(key === "riskRating"){
        const newValues = value.map(item => item.value);
        updatedData[key] = newValues
      } else if(key === "name" || key === "description" || key === "reasoning" || key === "id") {
        updatedData[key] = value
      }else {
        updatedData[key] = value.value
      }
    });
    handleCurrentAreaChange(updatedData);
    onClose()
  }

  useEffect(() => {
    if (isOpen) {
      setSelectedOptions({
        id: data.id,
        applicationTypes: {
          label: data.applicationTypes,
          value: data.applicationTypes,
        },
        horizon: { label: data.horizon, value: data.horizon },
        riskRating: data.riskRating.map((rating)=>{
          return { label: rating, value: rating }
        }),
        infoExposure: { label: data.infoExposure, value: data.infoExposure },
        dataSensitivity: {
          label: data.dataSensitivity,
          value: data.dataSensitivity,
        },
        complexityOfUsage: {
          label: data.complexityOfUsage,
          value: data.complexityOfUsage,
        },
        level_of_specialisation_interactionact: {
          label: data.level_of_specialisation_interactionact,
          value: data.level_of_specialisation_interactionact,
        },
        app_operation: { label: data.app_operation, value: data.app_operation },
        reasoning: data.reasoning,
        name: data.name,
        description: data.description
      });
    }
    // eslint-disable-next-line
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  return (
    <Dialog open={isOpen} onClose={() => false} className="relative z-9999">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-slate-500/30 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform  rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 w-full sm:max-w-screen sm:mx-10 lg:max-w-4xl xl:max-w-5xl data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
          >
            <DialogTitle
              as="h3"
              className="text-xl font-semibold text-slate-900 bg-slate-200 px-5 py-3 rounded-t-lg"
            >
              <div className="flex justify-between items-center w-full">
                <span>Edit {data?.name}</span>
                <button onClick={onClose}>
                  <X />
                </button>
              </div>
            </DialogTitle>
            <div className="bg-white px-5 py-4 ">
              <div className="mt-3 grid md:grid-cols-2 grid-cols-1 gap-3">
                <div className="flex flex-col items-start ">
                  <h4 className="text-sm font-semibold text-dusky-teal mb-2">
                    Application Types:
                  </h4>
                  <Select
                    className="w-full"
                    value={selectedOptions.applicationTypes}
                    onChange={(val) => handleChange(val, "applicationTypes")}
                    options={AppTypeOptions}
                    styles={customStyles}
                  />
                </div>
                <div className="flex flex-col items-start ">
                  <h4 className="text-sm font-semibold text-dusky-teal mb-2">
                    Horizon:
                  </h4>
                  <Select
                    className="w-full"
                    value={selectedOptions.horizon}
                    onChange={(val) => handleChange(val, "horizon")}
                    options={HorizonOptions}
                    styles={customStyles}
                  />
                </div>
                <div className="flex flex-col items-start ">
                  <h4 className="text-sm font-semibold text-dusky-teal mb-2">
                    Risk Rating:
                  </h4>
                  <div className="flex items-center w-full gap-5">
                    {selectedOptions.riskRating.map((rating, index)=>(
                      <Select
                        className={`w-1/${selectedOptions.riskRating.length}`}
                        key={`risk-select-${index}`}
                        value={rating}
                        onChange={(val) =>
                          handleChange(
                            val,
                            "riskRating",
                            index
                          )
                        }
                        options={RiskRatingOptions}
                        styles={customStyles}
                      />
                    ))}
                  </div>
                </div>
                <div className="flex flex-col items-start ">
                  <h4 className="text-sm font-semibold text-dusky-teal mb-2">
                    Info Exposure
                  </h4>
                  <Select
                    className="w-full"
                    value={selectedOptions.infoExposure}
                    onChange={(val) => handleChange(val, "infoExposure")}
                    options={InfoExposureOptions}
                    styles={customStyles}
                  />
                </div>
                <div className="flex flex-col items-start ">
                  <h4 className="text-sm font-semibold text-dusky-teal mb-2">
                    Data Sensitivity
                  </h4>
                  <Select
                    className="w-full"
                    value={selectedOptions.dataSensitivity}
                    onChange={(val) => handleChange(val, "dataSensitivity")}
                    options={DataSensitivityOptions}
                    styles={customStyles}
                  />
                </div>
                <div className="flex flex-col items-start ">
                  <h4 className="text-sm font-semibold text-dusky-teal mb-2">
                    Complexity of Usage
                  </h4>
                  <Select
                    className="w-full"
                    value={selectedOptions.complexityOfUsage}
                    onChange={(val) => handleChange(val, "complexityOfUsage")}
                    options={ComplexityOfUsageOptions}
                    styles={customStyles}
                    // isDisabled
                  />
                </div>
                <div className="flex flex-col items-start ">
                  <h4 className="text-sm font-semibold text-dusky-teal mb-2">
                    Specialization Interaction Act
                  </h4>
                  <Select
                    className="w-full"
                    value={selectedOptions.level_of_specialisation_interactionact}
                    onChange={(val) =>
                      handleChange(val, "level_of_specialisation_interactionact")
                    }
                    options={SpecializationInteractionActOptions}
                    styles={customStyles}
                  />
                </div>
                <div className="flex flex-col items-start ">
                  <h4 className="text-sm font-semibold text-dusky-teal mb-2">
                    App Operation
                  </h4>
                  <Select
                    className="w-full"
                    value={selectedOptions.app_operation}
                    onChange={(val) => handleChange(val, "app_operation")}
                    options={AppOperationOptions}
                    styles={customStyles}
                  />
                </div>
              </div>
              <div className="mt-3 grid md:grid-cols-1 grid-cols-1 gap-3">
                  <h4 className="text-sm font-semibold text-dusky-teal">
                    Reasoning
                  </h4>
                  { selectedOptions?.reasoning && selectedOptions?.reasoning.map((reasoning, index)=>(
                    <input type="text" key={`default-input-${index}`} value={reasoning} onChange={(event)=>{handleChange(event.target.value, "reasoning", index)}} className="w-full bg-white text-black border border-gray-300 rounded border-solid box-border min-h-[38px] p-2"/>
                  ))}
              </div>
            </div>
            <div className="pt-2 pb-6 px-4">
              <button 
                    className={`w-full p-2 rounded border transition duration-200 flex items-center justify-center
                        bg-white text-dusky-teal hover:bg-light-gray hover:text-primary 
                        hover:border-2 hover:border-primary 
                        hover:shadow-[0_0_15px_rgba(59,130,246,0.5)] cursor-pointer`}
                    onClick={() => handleSave()}
                >
                  Save
                </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default Modal;
