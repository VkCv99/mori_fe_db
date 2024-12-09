import React from "react";
import { PlusCircle, ArrowRight } from "lucide-react";

function Handlers({ setShowInput, fetchResults }) {
  return (
    <div className="flex justify-between">
      <button
        onClick={() => setShowInput(true)}
        className="bg-primary text-white rounded-full px-4 py-2 flex items-center hover:bg-light-gray hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary"
      >
        <PlusCircle size={20} className="mr-2" />
        Add More Input
      </button>
      <button
        onClick={fetchResults}
        className="bg-warm-red text-white rounded-full px-4 py-2 flex items-center hover:bg-light-gray hover:text-warm-red focus:outline-none focus:ring-2 focus:ring-warm-red"
      >
        Go to Result
        <ArrowRight size={20} className="ml-2" />
      </button>
    </div>
  );
}

export default Handlers;
