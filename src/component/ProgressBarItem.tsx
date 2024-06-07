import ActiveIndicator from "../assets/SVGs/ActiveIcon";
import DefaultIndicator from "../assets/SVGs/Default";
import CompletedIndicator from "../assets/SVGs/Completed";
import CompletedIndicatorMobile from "../assets/SVGs/MobileCompleted";
import { UseFormWatch } from "react-hook-form";
type Props = {
  label?: string;
  detail?: string;
  flag?: "Default" | "Active" | "Completed";
  lastItem?: boolean;
  watch: UseFormWatch<any>;
};

const ProgressBarItem = ({
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
  const issueOptions = getSelectedIssues(
    formValue?.Issue ? formValue?.Issue : []
  );
  const detailsOptions = getSelectedOptions(
    formValue?.Details ? formValue?.Details : []
  );

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
                className={`CdnPurpleIndicatorDetail ${"CdnPurpleTextSecondry"}`}
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
          <div className="CdnPurpleIndicatorShadow CdnPurpleRoundedFull CdnPurpleIndicatorWH32">
            <ActiveIndicator className="CdnPurpleIndicatorWH32 CdnPurpleActiveColor" />
          </div>
        );
      case "Completed":
        return (
          <>
            <CompletedIndicator className="CdnPurpleIndicatorWH CdnPurpleCompleteIcon CdnPurpleCompletedColor" />
            <CompletedIndicatorMobile className="CdnPurpleIndicatorWH CdnPurpleCompleteIconNotMobile CdnPurpleCompletedColorMobile" />
          </>
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
              className={`CdnPurplelineBar CdnPurpleBgPrimary CdnPurpleMobileNone`}
              style={{ opacity: lastItem ? "0" : "1" }}
            />
          ) : (
            <div
              className={`CdnPurplelineBar CdnPurpleBgIndicatorColor CdnPurpleMobileNone`}
              style={{ opacity: lastItem ? "0" : "1" }}
            />
          )}
        </div>
      </div>
      {/* right */}
      <div className="CdnPurpleIndicatorRight">
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

export default ProgressBarItem;
