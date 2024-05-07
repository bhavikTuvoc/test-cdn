import ActiveIndicator from "../assets/Active.svg";
import DefaultIndicator from "../assets/Default.svg";
import CompletedIndicator from "../assets/Completed.svg";
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

  function getSelectedOptions(categories: any) {
    return categories
      .map((category: any) => {
        // Filter and map the subCategories that are checked
        const selectedSubItems = category.subCategories
          .filter((subCategory: any) => subCategory.checked)
          .map((subCategory: any) => subCategory.subItem);

        // Only include categories where there is at least one subItem checked
        if (selectedSubItems.length > 0) {
          return {
            item: category.item,
            selected: selectedSubItems.join(", "),
          };
        }
      })
      .filter(Boolean); // Remove undefined entries (where no subItem was checked)
  }

  const issueOptions = getSelectedOptions(formValue?.Issue);
  const detailsOptions = getSelectedOptions(formValue?.Details);

  const renderDataofIssueIndicator = () => {
    switch (flag) {
      case "Default":
        return (
          <>
            <div className={`indicatorDetail ${"textNormalSec"}`}>{detail}</div>
          </>
        );
      case "Active":
        return (
          <>
            <div className={`indicatorDetail ${"textSecondry"}`}>{detail}</div>
          </>
        );
      case "Completed":
        return (
          <>
            {issueOptions.length ? (
              <ul className="ulList">
                {issueOptions.map((detail: any) => (
                  <li key={detail.item}>
                    {detail.item}: <span>{detail.selected}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <div className={`indicatorDetail ${"textSecondry"}`}>
                {detail}
              </div>
            )}
          </>
        );
      default:
        return (
          <img src={DefaultIndicator} alt="active" className="indicatorWH" />
        );
    }
  };
  const renderDataofDetailsIndicator = () => {
    switch (flag) {
      case "Default":
        return (
          <>
            <div className={`indicatorDetail ${"textNormalSec"}`}>{detail}</div>
          </>
        );
      case "Active":
        return (
          <>
            <div className={`indicatorDetail ${"textSecondry"}`}>{detail}</div>
          </>
        );
      case "Completed":
        return (
          <>
            {detailsOptions.length ? (
              <ul className="ulList">
                {detailsOptions.map((detail: any) => (
                  <li key={detail.item}>
                    {detail.item}: <span>{detail.selected}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <div className={`indicatorDetail ${"textSecondry"}`}>
                {detail}
              </div>
            )}
          </>
        );
      default:
        return (
          <img src={DefaultIndicator} alt="active" className="indicatorWH" />
        );
    }
  };
  const renderDataofIndicator = () => {
    switch (flag) {
      case "Default":
        return (
          <>
            <div className={`indicatorDetail ${"textNormalSec"}`}>{detail}</div>
          </>
        );
      case "Active":
        return (
          <>
            <div className={`indicatorDetail ${"textSecondry"}`}>{detail}</div>
          </>
        );
      case "Completed":
        return (
          <>
            <div className={`indicatorDetail ${"textSecondry"}`}>{detail}</div>
          </>
        );
      default:
        return (
          <img src={DefaultIndicator} alt="active" className="indicatorWH" />
        );
    }
  };
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
              className={`lineBar bgPrimary`}
              style={{ display: lastItem ? "none" : "", minHeight: "26px" }}
            />
          ) : (
            <div
              className={`lineBar bgIndicatorColor`}
              style={{ display: lastItem ? "none" : "", minHeight: "26px" }}
            />
          )}
        </div>
      </div>
      {/* right */}
      <div className="indicatorRightMobile">
        <div
          className={`indicatorHeader ${
            flag === "Active" || flag === "Completed"
              ? "textPrimary"
              : "textNormal"
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
