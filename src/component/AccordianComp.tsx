import upArrow from "../assets/chevron-up.svg";
import downArrow from "../assets/chevron-down.svg";
import HeatingImg from "../assets/Heating.svg";
import uncheckCircle from "../assets/un-check.svg";
import checkCircle from "../assets/check-circle.svg";
import { UseFormSetValue, UseFormWatch } from "react-hook-form";
import { useCallback, useEffect, useState } from "react";
import { useFormData } from "../Provider/FormDataConext";
import { useAppSelector } from "../redux/store";

export type issueObj = {
  id: number;
  issue_name: string;
  sub_issue: subIssueObj[];
};

type subIssueObj = {
  id: number;
  sub_issue_name: string;
  checked: boolean;
};

type Props = {
  // issueList: question[];
  issueList: issueObj[];
  setValue: UseFormSetValue<any>;
  watch: UseFormWatch<any>;
};

const AccordianComp = ({ issueList = [], setValue, watch }: Props) => {
  const { updateFormData, setIssueDataOld, issueDataOld } = useFormData();

  const getInitialState = () => {
    const anyChecked =
      issueDataOld &&
      issueDataOld.some((q: issueObj) =>
        q.sub_issue.some((sc: subIssueObj) => sc.checked)
      );
    return !anyChecked ? issueList : issueDataOld;
  };

  const [issueData, setIssueData] = useState<issueObj[]>(getInitialState);
  const apiState = useAppSelector((state) => state.issue.apiState);
  useEffect(() => {
    updateFormData({ Issue: issueData });
    setIssueDataOld(issueData);
    setValue("Issue", issueData);
  }, [issueData]);

  //options are multiselected
  const handleSelect = useCallback(
    (questionItem: number, selectedId: number) => {
      setIssueData((currentData) =>
        currentData.map((question: issueObj) => ({
          ...question,
          sub_issue: question.sub_issue.map((subCategory) => ({
            ...subCategory,
            checked:
              question.id === questionItem && subCategory.id === selectedId
                ? !subCategory.checked // Toggle the checked state
                : subCategory.checked, // Keep the existing state for other subcategories
          })),
        }))
      );
    },
    []
  );

  const active: number[] = watch("accordianState");

  const toggleHandleAccordian = (targetedId: number) => {
    if (active.includes(targetedId)) {
      setValue(
        "accordianState",
        active.filter((item) => item !== targetedId)
      );
    } else {
      setValue("accordianState", [...active, targetedId]);
    }
  };

  return (
    <>
      {issueData &&
        issueData.map((item: issueObj, index: number) => (
          <div className=" CdnPurpleAccordianDiv" key={index}>
            <div className="CdnPurpleAccordianChildren">
              <div
                className=" CdnPurpleAccordianInnerdiv "
                onClick={() => toggleHandleAccordian(item.id)}
              >
                <div className="CdnPurpleAccordianIconDiv ">
                  <img
                    src={HeatingImg}
                    alt="img"
                    className="CdnPurpleAccIcon"
                  />
                  <p className="CdnPurpleAccTitle">{item.issue_name}</p>
                </div>
                <div className="CdnPurpleArrowWrapper">
                  {active.includes(item.id) ? (
                    <img src={upArrow} alt="up" />
                  ) : (
                    <img src={downArrow} alt="dn" />
                  )}
                </div>
              </div>
              {active.includes(item.id) && (
                <div className="CdnPurpleAccDetailDiv">
                  {item?.sub_issue?.length > 0 &&
                    item.sub_issue.map((acc: subIssueObj, index: number) => (
                      <button
                        type="button"
                        className={`CdnPurpleAccBtns ${
                          acc.checked
                            ? "CdnPurpleAccBtnActive"
                            : "CdnPurpleAccBtnDefault"
                        }`}
                        key={index}
                        onClick={() => handleSelect(item.id, acc.id)}
                      >
                        <img
                          style={{ width: "22px", height: "22px" }}
                          src={acc.checked ? checkCircle : uncheckCircle}
                          alt={acc.checked ? "checked" : "unchecked"}
                        />
                        <p>{acc.sub_issue_name}</p>
                      </button>
                    ))}{" "}
                </div>
              )}
            </div>
          </div>
        ))}
      {issueData && issueData.length === 0 && apiState === "succeeded" && (
        <p>No issues to display</p>
      )}
    </>
  );
};

export default AccordianComp;
