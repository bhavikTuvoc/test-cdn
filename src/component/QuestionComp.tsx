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
interface Option {
  id: string;
  option_title: string;
  checked: boolean;
}

export interface Question {
  question: string;
  options: Option[];
}

export interface StepItem {
  id: number;
  issue_name: string;
  questions: Question[];
}
export interface question {
  item: string;
  subCategories: SubCategory[];
}

const QuestionComp = ({ setValue, questiondata }: Props) => {
  const { updateFormData, setDetailsOldData, detailsoldData } = useFormData();
  const getInitialState = () => {
    // Check if any option in any question in any stepItem is checked
    const anyChecked = detailsoldData.some((stepItem: StepItem) =>
      stepItem.questions.some((question: Question) =>
        question.options.some((option: Option) => {
          const isChecked = option.checked === true;
          return isChecked;
        })
      )
    );

    // Return old data if any option is checked, otherwise return new question data
    return anyChecked ? detailsoldData : questiondata;
  };

  const [questionData, setQuestionData] = useState<StepItem[]>(getInitialState);

  useEffect(() => {
    updateFormData({ Details: questionData });
    setDetailsOldData(questionData);
    setValue("Details", questionData);
  }, [questionData]);

  const handleSelect = useCallback(
    (questionItem: string, selectedId: string) => {
      setQuestionData((currentData) =>
        currentData.map((stepItem) => ({
          ...stepItem,
          questions: stepItem.questions.map((question) => ({
            ...question,
            options: question.options.map((option) => ({
              ...option,
              checked:
                question.question === questionItem
                  ? option.id === selectedId
                    ? !option.checked
                    : false
                  : option.checked,
            })),
          })),
        }))
      );
    },
    []
  );

  return (
    <>
      {questionData.map((stepItem: StepItem) =>
        stepItem.questions.map((item, index) => (
          <div className="CdnPurpleQueWrapper" key={index}>
            <div className="queTitleDiv">
              <p className="CdnPurpleAccTitle">{item.question}</p>
            </div>
            <div className="CdnPurpleQueDetailDiv">
              {item.options.map((subCategory: Option) => (
                <button
                  type="button"
                  className={`CdnPurpleAccBtns ${
                    subCategory.checked
                      ? "CdnPurpleAccBtnActive"
                      : "CdnPurpleAccBtnDefault"
                  }`}
                  key={subCategory.id}
                  onClick={() => handleSelect(item.question, subCategory.id)}
                >
                  <img
                    style={{ width: "24px", height: "24px" }}
                    src={subCategory.checked ? checkCircle : uncheckCircle}
                    alt={subCategory.checked ? "checked" : "unchecked"}
                  />
                  {subCategory.option_title}
                </button>
              ))}
            </div>
          </div>
        ))
      )}
    </>
  );
};

export default QuestionComp;
