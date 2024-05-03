import { useCallback, useEffect, useState } from "react";
import { SubCategory } from "./types";
import checkCircle from "../assets/check-circle.svg";
import uncheckCircle from "../assets/un-check.svg"; // Ensure you have the uncheck image
import { useFormData } from "../Provider/FormDataConext";
import { UseFormSetValue } from "react-hook-form";

type Props = {
  setValue: UseFormSetValue<any>;
  questiondata: any;
};

export interface question {
  item: string;
  subCategories: SubCategory[];
}

const QuestionComp = ({ setValue, questiondata }: Props) => {
  const { updateFormData, setDetailsOldData, detailsoldData } = useFormData();

  const getInitialState = () => {
    const anyChecked = detailsoldData.some((q: question) =>
      q.subCategories.some((sc: SubCategory) => sc.checked)
    );
    return !anyChecked ? questiondata : detailsoldData;
  };

  const [questionData, setQuestionData] = useState<question[]>(getInitialState);

  useEffect(() => {
    updateFormData({ Details: questionData });
    setDetailsOldData(questionData);
    setValue("Details", questionData);
  }, [questionData]);

  const handleSelect = useCallback(
    (questionItem: string, selectedId: string) => {
      setQuestionData((currentData) =>
        currentData.map((question) => ({
          ...question,
          subCategories: question.subCategories.map((subCategory) => ({
            ...subCategory,
            checked:
              question.item === questionItem
                ? subCategory.id === selectedId
                  ? !subCategory.checked
                  : false
                : subCategory.checked,
          })),
        }))
      );
    },
    []
  );

  return (
    <>
      {questionData.map((item: any) => (
        <div className="queWrapper" key={item.item}>
          <div className="queTitleDiv">
            <p className="accTitle">{item.item}</p>
          </div>
          <div className="queDetailDiv">
            {item.subCategories.map((subCategory: any) => (
              <button
                type="button"
                className={`accBtns ${
                  subCategory.checked ? "accBtnActive" : "accBtnDefault"
                }`}
                key={subCategory.id}
                onClick={() => handleSelect(item.item, subCategory.id)}
              >
                <img
                  style={{ width: "24px", height: "24px" }}
                  src={subCategory.checked ? checkCircle : uncheckCircle}
                  alt={subCategory.checked ? "checked" : "unchecked"}
                />
                {subCategory.subItem}
              </button>
            ))}
          </div>
        </div>
      ))}
    </>
  );
};

export default QuestionComp;
