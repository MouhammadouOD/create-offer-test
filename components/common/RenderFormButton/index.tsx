import React from "react";

type Props = {
  isvalid: boolean;
  handleNextStep: () => void;
  handlePrevStep: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

const RenderFormButton = ({isvalid, handleNextStep, handlePrevStep }: Props) => {
  return (
    <div className="flex space-x-3 justify-end">
      <button onClick={handlePrevStep} className="p-3 bg-orange-400">
        Previous Step
      </button>
      <button disabled={!isvalid} onClick={handleNextStep} className="p-3 bg-orange-400">
        Next Step
      </button>
    </div>
  );
};

export default RenderFormButton;
