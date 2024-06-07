import { createContext, useContext, useState, ReactNode } from "react";
import { ImageDataState } from "../component/PhotosComp";
import { StepItem } from "../component/QuestionComp";
import { issueObj } from "../component/AccordianComp";

// Define the shape of the form data and the types for the context operations
interface FormDataContextType {
  formData: Record<string, any>; // Object structure
  updateFormData: (newData: Record<string, any>) => void; // Function to merge new data into existing form data
  imageDataOld: ImageDataState[];
  setimageDataOld: React.Dispatch<React.SetStateAction<ImageDataState[]>>;
  setDetailsOldData: React.Dispatch<React.SetStateAction<StepItem[]>>;
  detailsoldData: StepItem[];
  setIssueDataOld: React.Dispatch<React.SetStateAction<issueObj[]>>;
  issueDataOld: issueObj[];
  setDesc: React.Dispatch<React.SetStateAction<any>>;
  desc: any;
}

// Create the context with a default value matching the type
const FormDataContext = createContext<FormDataContextType | null>(null);

interface FormDataProviderProps {
  children: ReactNode;
}

// Provider component
export const FormDataProvider = ({ children }: FormDataProviderProps) => {
  const [formData, setFormData] = useState<Record<string, any>>({
    isCurrentCustomer: "Yes",
  }); // Initialize state with an empty object
  const [imageDataOld, setimageDataOld] = useState<ImageDataState[]>([]);
  const [detailsoldData, setDetailsOldData] = useState<StepItem[]>([]);
  const [issueDataOld, setIssueDataOld] = useState<issueObj[]>([]);
  const [desc, setDesc] = useState<any>({});

  // Function to update formData
  const updateFormData = (newData: Record<string, any>) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      ...newData,
    }));
  };

  return (
    <FormDataContext.Provider
      value={{
        formData,
        updateFormData,
        setimageDataOld,
        imageDataOld,
        detailsoldData,
        setDetailsOldData,
        setIssueDataOld,
        issueDataOld,
        setDesc,
        desc,
      }}
    >
      {children}
    </FormDataContext.Provider>
  );
};

// Define a hook for easy context consumption
export const useFormData = () => {
  const context = useContext(FormDataContext);
  if (!context) {
    throw new Error("useFormData must be used within a FormDataProvider");
  }
  return context;
};
