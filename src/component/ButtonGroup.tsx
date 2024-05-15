import ArrowIcon from "../assets/RightArrow.svg";
import { StepDetail } from "./types";

type Props = {
  currentId: string;
  indicatorList: StepDetail[];
  goToPrevious: () => void;
  goToNext: () => void;
  handleCancel?: () => void;
};

const ButtonGroup = ({
  currentId,
  indicatorList,
  goToPrevious,
  goToNext,
  handleCancel = () => {},
}: Props) => {
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
        {currentId !== indicatorList[0].id && (
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
          type="button"
          className="CdnPurpleBtn CdnPurpleBgPrimary CdnPurpleBtnPrimary CdnPurplePrevNext CdnPurplePointer"
          onClick={goToNext}
        >
          {currentId === indicatorList[indicatorList.length - 1].id
            ? "Confirm"
            : "Next"}
          <img src={ArrowIcon} alt="arrow" className="CdnPurpleNextArrowimg" />
        </button>
      </div>
    </>
  );
};

export default ButtonGroup;
