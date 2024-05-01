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
        className="btn textNormal borderOfBtn pointer"
        onClick={handleCancel}
      >
        Cancel
      </button>
      <div className="btnWrapper">
        {currentId !== indicatorList[0].id && (
          <button
            type="button"
            className="btn bgPrimary btnPrimary prevNext pointer"
            onClick={goToPrevious}
          >
            <img src={ArrowIcon} alt="arrow" className="prevArrowimg" />
            Back
          </button>
        )}
        <button
          type="button"
          className="btn bgPrimary btnPrimary prevNext pointer"
          onClick={goToNext}
        >
          {currentId === indicatorList[indicatorList.length - 1].id
            ? "Confirm"
            : "Next"}
          <img src={ArrowIcon} alt="arrow" className="nextArrowimg" />
        </button>
      </div>
    </>
  );
};

export default ButtonGroup;
