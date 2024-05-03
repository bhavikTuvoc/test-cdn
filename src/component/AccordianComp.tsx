import upArrow from "../assets/chevron-up.svg";
import downArrow from "../assets/chevron-down.svg";
import HeatingImg from "../assets/Heating.svg";
import uncheckCircle from "../assets/un-check.svg";
import checkCircle from "../assets/check-circle.svg";
import { UseFormSetValue } from "react-hook-form";
import { useCallback, useEffect, useState } from "react";
import { question } from "./QuestionComp";
import { useFormData } from "../Provider/FormDataConext";
import { SubCategory } from "./types";

type Props = {
  accChild: question[];
  setValue: UseFormSetValue<any>;
};

const AccordianComp = ({ accChild = [], setValue }: Props) => {
  const { updateFormData, setIssueDataOld, issueDataOld } = useFormData();

  const getInitialState = () => {
    const anyChecked = issueDataOld.some((q: question) =>
      q.subCategories.some((sc: SubCategory) => sc.checked)
    );
    return !anyChecked ? accChild : issueDataOld;
  };

  const [issueData, setIssueData] = useState<question[]>(getInitialState);

  useEffect(() => {
    updateFormData({ Details: issueData });
    setIssueDataOld(issueData);
    setValue("Issues", issueData);
  }, [issueData]);

  //options are multiselected
  const handleSelect = useCallback(
    (questionItem: string, selectedId: string) => {
      setIssueData((currentData) =>
        currentData.map((question) => ({
          ...question,
          subCategories: question.subCategories.map((subCategory) => ({
            ...subCategory,
            checked:
              question.item === questionItem && subCategory.id === selectedId
                ? !subCategory.checked // Toggle the checked state
                : subCategory.checked, // Keep the existing state for other subcategories
          })),
        }))
      );
    },
    []
  );

  const [active, setActive] = useState<string[]>([]);

  const toggleHandleAccordian = (targetedId: string) => {
    if (active.includes(targetedId)) {
      setActive(active.filter((item) => item !== targetedId));
    } else {
      setActive([...active, targetedId]);
    }
  };
  return (
    <>
      {issueData &&
        issueData.map((item: question) => (
          <div className=" accordian-div" key={item.item}>
            <div className="accordian-children">
              <div
                className=" accordian-innerdiv "
                onClick={() => toggleHandleAccordian(item.item)}
              >
                <div className="accordian-icon-div ">
                  <img src={HeatingImg} alt="img" className="accIcon" />
                  <p className="accTitle">{item.item}</p>
                </div>
                <div className="arrowWrapper">
                  {active.includes(item.item) ? (
                    <img src={upArrow} alt="up" />
                  ) : (
                    <img src={downArrow} alt="dn" />
                  )}
                </div>
              </div>
              {active.includes(item.item) && (
                <div className="accDetailDiv">
                  {item.subCategories.map((acc: any, index: number) => (
                    <button
                      type="button"
                      className={`accBtns ${
                        acc.checked ? "accBtnActive" : "accBtnDefault"
                      }`}
                      key={index}
                      onClick={() => handleSelect(item.item, acc.id)}
                    >
                      <img
                        style={{ width: "24px", height: "24px" }}
                        src={acc.checked ? checkCircle : uncheckCircle}
                        alt={acc.checked ? "checked" : "unchecked"}
                      />
                      {acc.subItem}
                    </button>
                  ))}{" "}
                </div>
              )}
            </div>
          </div>
        ))}
    </>
  );
};

export default AccordianComp;
