import React from "react";

type Props = {
  isvalid: boolean;
  handleNextStep: () => void;
  handlePrevStep: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  onSubmit: (
    e?: React.BaseSyntheticEvent<object, any, any> | undefined
  ) => Promise<void>;
};

const RenderFormButton = ({
  isvalid,
  handleNextStep,
  handlePrevStep,
  onSubmit
}: Props) => {
  const handleNext = () => {
    onSubmit()
    handleNextStep()
  }
  return (
    <div className="flex space-x-3 justify-end">
      <button onClick={handlePrevStep} className="p-3 bg-orange-400">
        Previous Step
      </button>
      <button
        disabled={!isvalid}
        onClick={handleNext}
        className="p-3 bg-orange-400"
      >
        Next Step
      </button>
    </div>
  );
};

export default RenderFormButton;
