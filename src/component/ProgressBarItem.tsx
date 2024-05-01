import ActiveIndicator from "../assets/Active.svg";
import DefaultIndicator from "../assets/Default.svg";
import CompletedIndicator from "../assets/Completed.svg";
type Props = {
  label?: string;
  detail?: string;
  flag?: "Default" | "Active" | "Completed";
  lastItem?: boolean;
};

const ProgressBarItem = ({
  label = "Services",
  detail = "Select Issues",
  flag = "Default",
  lastItem = false,
}: Props) => {
  const renderContentBasedOnFlag = () => {
    switch (flag) {
      case "Default":
        return (
          <img src={DefaultIndicator} alt="default" className="indicatorWH" />
        );
      case "Active":
        return (
          <div className="indicatorShadow rounded-full indicatorWH">
            <img src={ActiveIndicator} alt="active" className="indicatorWH " />
          </div>
        );
      case "Completed":
        return (
          <img
            src={CompletedIndicator}
            alt="Completed"
            className="indicatorWH"
          />
        );
      default:
        return (
          <img src={DefaultIndicator} alt="active" className="indicatorWH" />
        );
    }
  };
  return (
    <div className="indiDiv">
      {/* left */}
      <div className="indicatorLeft">
        <div className="innerDiv">
          {/* indicator rendere */}
          {renderContentBasedOnFlag()}

          {/*line baar*/}
          {flag === "Completed" ? (
            <div
              className={`lineBar bgPrimary mobileNone`}
              style={{ display: lastItem ? "none" : "" }}
            />
          ) : (
            <div
              className={`lineBar bgIndicatorColor mobileNone`}
              style={{ display: lastItem ? "none" : "" }}
            />
          )}
        </div>
      </div>
      {/* right */}
      <div className="indicatorRight">
        <div
          className={`indicatorHeader ${
            flag === "Active" || flag === "Completed"
              ? "textPrimary"
              : "textNormal"
          } `}
        >
          {label}
        </div>
        <div
          className={`indicatorDetail ${
            flag === "Active" || flag === "Completed"
              ? "textSecondry"
              : "textNormalSec"
          }`}
        >
          {detail}
        </div>
      </div>
    </div>
  );
};

export default ProgressBarItem;
