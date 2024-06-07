import ActiveIndicator from "../assets/SVGs/ActiveIcon";
import DefaultIndicator from "../assets/SVGs/Default";
import CompletedIndicator from "../assets/SVGs/Completed";
import { UseFormWatch } from "react-hook-form";
type Props = {
  label?: string;
  detail?: string;
  flag?: "Default" | "Active" | "Completed";
  lastItem?: boolean;
  watch: UseFormWatch<any>;
};

const MobileProgressBarItem = ({
  label = "Services",
  detail = "Select Issues",
  flag = "Default",
  lastItem = false,
  watch,
}: Props) => {
  const formValue = watch();

  interface SubIssue {
    id: number;
    sub_issue_name: string;
    checked: boolean;
  }

  interface Issue {
    id: number;
    issue_name: string;
    sub_issue: SubIssue[];
  }

  interface SelectedIssue {
    item: string;
    selected: string;
  }

  const getSelectedIssues = (issues: Issue[]): SelectedIssue[] => {
    return issues
      .map((issue) => {
        const selectedSubIssues = issue.sub_issue
          .filter((subIssue) => subIssue.checked)
          .map((subIssue) => subIssue.sub_issue_name);

        if (selectedSubIssues.length > 0) {
          return {
            item: issue.issue_name,
            selected: selectedSubIssues.join(", "),
          };
        }
        return null;
      })
      .filter((item) => item !== null) as SelectedIssue[];
  };

  interface Option {
    id: string;
    option_title: string;
    checked: boolean;
  }

  interface Question {
    question: string;
    options: Option[];
  }

  interface Issue {
    id: number;
    issue_name: string;
    questions: Question[];
  }

  interface SelectedOption {
    item: string;
    selected: string;
  }

  const getSelectedOptions = (issues: Issue[]): SelectedOption[] => {
    return issues
      .flatMap((issue) =>
        issue.questions.map((question) => {
          const selectedOptions = question.options
            .filter((option) => option.checked)
            .map((option) => option.option_title);

          if (selectedOptions.length > 0) {
            return {
              item: question.question,
              selected: selectedOptions.join(", "),
            };
          }
          return null;
        })
      )
      .filter((item) => item !== null) as SelectedOption[];
  };
  // console.log(watch("Details"));
  const issueOptions = getSelectedIssues(formValue?.Issue);
  const detailsOptions = getSelectedOptions(formValue?.Details);

  const renderDataofIssueIndicator = () => {
    switch (flag) {
      case "Default":
        return (
          <>
            <div
              className={`CdnPurpleIndicatorDetail ${"CdnPurpleTextNormalSec"}`}
            >
              {detail}
            </div>
          </>
        );
      case "Active":
        return (
          <>
            <div
              className={`CdnPurpleIndicatorDetail ${"CdnPurpleTextSecondry"}`}
            >
              {detail}
            </div>
          </>
        );
      case "Completed":
        return (
          <>
            {issueOptions.length ? (
              <ul className="CdnPurpleulList">
                {issueOptions.map((detail: any) => (
                  <li key={detail.item}>
                    {detail.item}: <span>{detail.selected}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <div
                className={`CdnPurpleIndicatorDetail ${"CdnPurpleTextNormalSec"}`}
              >
                {detail}
              </div>
            )}
          </>
        );
      default:
        return <DefaultIndicator className="CdnPurpleIndicatorWH" />;
    }
  };
  const renderDataofDetailsIndicator = () => {
    switch (flag) {
      case "Default":
        return (
          <>
            <div
              className={`CdnPurpleIndicatorDetail ${"CdnPurpleTextNormalSec"}`}
            >
              {detail}
            </div>
          </>
        );
      case "Active":
        return (
          <>
            <div
              className={`CdnPurpleIndicatorDetail ${"CdnPurpleTextSecondry"}`}
            >
              {detail}
            </div>
          </>
        );
      case "Completed":
        return (
          <>
            {detailsOptions.length ? (
              <ul className="CdnPurpleulList">
                {detailsOptions.map((detail: any) => (
                  <li key={detail.item}>
                    {detail.item}: <span>{detail.selected}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <div
                className={`CdnPurpleIndicatorDetail ${"CdnPurpleTextNormalSec"}`}
              >
                {detail}
              </div>
            )}
          </>
        );
      default:
        return <DefaultIndicator className="CdnPurpleIndicatorWH" />;
    }
  };
  const renderDataofIndicator = () => {
    switch (flag) {
      case "Default":
        return (
          <>
            <div
              className={`CdnPurpleIndicatorDetail ${"CdnPurpleTextNormalSec"}`}
            >
              {detail}
            </div>
          </>
        );
      case "Active":
        return (
          <>
            <div
              className={`CdnPurpleIndicatorDetail ${"CdnPurpleTextSecondry"}`}
            >
              {detail}
            </div>
          </>
        );
      case "Completed":
        return (
          <>
            <div
              className={`CdnPurpleIndicatorDetail ${"CdnPurpleTextNormalSec"}`}
            >
              {detail}
            </div>
          </>
        );
      default:
        return <DefaultIndicator className="CdnPurpleIndicatorWH" />;
    }
  };
  const renderContentBasedOnFlag = () => {
    switch (flag) {
      case "Default":
        return <DefaultIndicator className="CdnPurpleIndicatorWH" />;
      case "Active":
        return (
          <div className="CdnPurpleIndicatorShadow CdnPurpleRoundedFull CdnPurpleIndicatorWH">
            <ActiveIndicator className="CdnPurpleIndicatorWH CdnPurpleActiveColor" />
          </div>
        );
      case "Completed":
        return (
          <CompletedIndicator className="CdnPurpleIndicatorWH CdnPurpleCompletedColor" />
        );
      default:
        return <DefaultIndicator className="CdnPurpleIndicatorWH" />;
    }
  };
  return (
    <div className="CdnPurpleIndiDiv">
      {/* left */}
      <div className="CdnPurpleIndicatorLeft">
        <div className="CdnPurpleInnerDiv">
          {/* indicator rendere */}
          {renderContentBasedOnFlag()}

          {/*line baar*/}
          {flag === "Completed" ? (
            <div
              className={`CdnPurplelineBar CdnPurpleBgPrimary`}
              style={{ display: lastItem ? "none" : "", minHeight: "26px" }}
            />
          ) : (
            <div
              className={`CdnPurplelineBar CdnPurpleBgIndicatorColor`}
              style={{ display: lastItem ? "none" : "", minHeight: "26px" }}
            />
          )}
        </div>
      </div>
      {/* right */}
      <div className="CdnPurpleIndicatorRightMobile">
        <div
          className={`CdnPurpleIndicatorHeader ${
            flag === "Active" ? "CdnPurpleTextPrimary" : "CdnPurpleTextNormal"
          } `}
        >
          {label}
        </div>
        {label === "Issue" && renderDataofIssueIndicator()}
        {label === "Details" && renderDataofDetailsIndicator()}
        {label !== "Issue" && label !== "Details" && renderDataofIndicator()}
      </div>
    </div>
  );
};

export default MobileProgressBarItem;
