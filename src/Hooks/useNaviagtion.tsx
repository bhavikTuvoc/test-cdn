import { useState } from "react";
import { StepDetail } from "../component/types";

export const useNavigation = (initialSteps: StepDetail[]) => {
  const [steps, setSteps] = useState(initialSteps);
  const [currentId, setCurrentId] = useState<string>(steps[0].id);

  const updateSteps = (currentIndex: number) => {
    const newSteps: StepDetail[] = steps.map((step, index) => {
      if (index < currentIndex) {
        return { ...step, flag: "Completed" };
      } else if (index === currentIndex) {
        return { ...step, flag: "Active" };
      } else {
        return { ...step, flag: "Default" };
      }
    });
    setSteps(newSteps);
  };

  const goToNext = () => {
    const currentIndex = steps.findIndex((step) => step.id === currentId);
    const nextIndex = currentIndex + 1;
    if (nextIndex < steps.length) {
      setCurrentId(steps[nextIndex].id);
      updateSteps(nextIndex);
    }
  };

  const goToPrevious = () => {
    const currentIndex = steps.findIndex((step) => step.id === currentId);
    const prevIndex = currentIndex - 1;
    if (prevIndex >= 0) {
      setCurrentId(steps[prevIndex].id);
      updateSteps(prevIndex);
    }
  };

  return { steps, goToNext, goToPrevious, currentId };
};
