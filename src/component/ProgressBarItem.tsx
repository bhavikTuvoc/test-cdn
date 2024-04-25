import ActiveIndicator from "../assets/Active.svg";
import DefaultIndicator from "../assets/Default.svg";
import CompletedIndicator from "../assets/Completed.svg";
type Props = {
  label?: string;
  detail?: string;
  flag?: "Default" | "Active" | "Completed";
};

const ProgressBarItem = ({
  label = "Services",
  detail = "Select Issues",
  flag = "Default",
}: Props) => {
  const renderContentBasedOnFlag = () => {
    switch (flag) {
      case "Default":
        return (
          <img
            src={DefaultIndicator}
            alt="active"
            className="w-[32px] h-[32px]"
          />
        );
      case "Active":
        return (
          <img
            src={ActiveIndicator}
            alt="active"
            className="w-[32px] h-[32px]"
          />
        );
      case "Completed":
        return (
          <img
            src={CompletedIndicator}
            alt="active"
            className="w-[32px] h-[32px]"
          />
        );
      default:
        return (
          <img
            src={DefaultIndicator}
            alt="active"
            className="w-[32px] h-[32px]"
          />
        );
    }
  };
  return (
    <div className="w-full h-[86px] md:gap-[16px] gap-[10px] flex">
      {/* left */}
      <div className="w-[32px] flex-shrink-0">
        <div className="flex flex-col justify-start items-center">
          {/* indicator rendere */}
          {renderContentBasedOnFlag()}

          {/*line baar*/}
          {flag === "Active" || flag === "Completed" ? (
            <div className={`w-[2px] h-[46px] bgPrimary`} />
          ) : (
            <div className={`w-[2px] h-[46px] bgIndicatorColor`} />
          )}
        </div>
      </div>
      {/* right */}
      <div className="flex-1">
        <div
          className={`text-[16px] font-[600] ${
            flag === "Active" || flag === "Completed"
              ? "textPrimary"
              : "textNormal"
          } `}
        >
          {label}
        </div>
        <div
          className={`text-[16px] font-[400] ${
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
