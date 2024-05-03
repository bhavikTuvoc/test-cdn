import { createContext, useContext, useState, ReactNode } from "react";
import { imageData } from "../component/PhotosComp";
import { question } from "../component/QuestionComp";

// Define the shape of the form data and the types for the context operations
interface FormDataContextType {
  formData: Record<string, any>; // Object structure
  updateFormData: (newData: Record<string, any>) => void; // Function to merge new data into existing form data
  imageDataOld: imageData[];
  setimageDataOld: React.Dispatch<React.SetStateAction<imageData[]>>;
  setDetailsOldData: React.Dispatch<React.SetStateAction<question[]>>;
  detailsoldData: question[];
  setIssueDataOld: React.Dispatch<React.SetStateAction<question[]>>;
  issueDataOld: question[];
  setDesc: React.Dispatch<React.SetStateAction<string>>;
  desc: string;
}

// Create the context with a default value matching the type
const FormDataContext = createContext<FormDataContextType | null>(null);

interface FormDataProviderProps {
  children: ReactNode;
}

// Provider component
export const FormDataProvider = ({ children }: FormDataProviderProps) => {
  const [formData, setFormData] = useState<Record<string, any>>({}); // Initialize state with an empty object
  const [imageDataOld, setimageDataOld] = useState<imageData[]>([]);
  const [detailsoldData, setDetailsOldData] = useState<question[]>([]);
  const [issueDataOld, setIssueDataOld] = useState<question[]>([]);
  const [desc, setDesc] = useState<string>("");

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
