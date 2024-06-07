import { useFormData } from "../Provider/FormDataConext";
import ArrowIcon from "../assets/RightArrow.svg";
import { StepDetail } from "./types";

type Props = {
  currentId: number;
  indicatorList: StepDetail[];
  goToPrevious: () => void;
  goToNext: (data: any) => void;
  handleCancel?: () => void;
};

const ButtonGroup = ({
  currentId,
  goToPrevious,
  goToNext,
  handleCancel = () => {},
}: Props) => {
  const { issueDataOld, detailsoldData } = useFormData();
  const ids =
    issueDataOld &&
    issueDataOld
      .filter((item) => item.sub_issue.some((sub) => sub.checked))
      .map((item) => item.id)
      .join(",");
  const isAnyOptionChecked = (issues: any) => {
    // Iterate over each issue
    for (const issue of issues) {
      // Iterate over each question in the current issue
      for (const question of issue.questions) {
        // Check if any option in the current question is checked
        if (question.options.some((option: any) => option.checked)) {
          return true;
        }
      }
    }
    // If no checked option is found in any question of any issue, return false
    return false;
  };
  // console.log(isAnyOptionChecked(detailsoldData));
  const determineDisabledState = () => {
    switch (currentId) {
      case 1:
        // Disable if ids is an empty string
        return ids === "";
      case 2:
        // Disable if any option is checked in detailsOldData
        return !isAnyOptionChecked(detailsoldData);
      default:
        // Default case, possibly disable under no conditions or add more cases as needed
        return false;
    }
  };

  const determineCursorStyle = () => {
    switch (currentId) {
      case 1:
        return ids === "" ? "not-allowed" : "pointer";
      case 2:
        return !isAnyOptionChecked(detailsoldData) ? "not-allowed" : "pointer";
      default:
        return "pointer";
    }
  };
  return (
    <>
      <button
        type="button"
        className="CdnPurpleBtn CdnPurpleTextNormal CdnPurpleBorderOfBtn CdnPurplePointer"
        onClick={handleCancel}
      >
        Cancel
      </button>
      <div className="CdnPurpleBtnWrapper">
        {currentId !== 1 && (
          <button
            type="button"
            className="CdnPurpleBtn CdnPurpleBgPrimary CdnPurpleBtnPrimary CdnPurplePrevNext CdnPurplePointer"
            onClick={goToPrevious}
          >
            <img
              src={ArrowIcon}
              alt="arrow"
              className="CdnPurplePrevArrowimg"
            />
            Back
          </button>
        )}
        <button
          type={"button"}
          className="CdnPurpleBtn CdnPurpleBgPrimary CdnPurpleBtnPrimary CdnPurplePrevNext CdnPurplePointer"
          onClick={goToNext}
          style={{
            cursor: determineCursorStyle(),
          }}
          disabled={determineDisabledState()}
        >
          {currentId === 6 ? "Confirm" : "Next"}
          <img src={ArrowIcon} alt="arrow" className="CdnPurpleNextArrowimg" />
        </button>
      </div>
    </>
  );
};

export default ButtonGroup;
