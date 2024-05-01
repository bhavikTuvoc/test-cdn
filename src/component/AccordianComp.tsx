import { SubCategory } from "./types";
import upArrow from "../assets/chevron-up.svg";
import downArrow from "../assets/chevron-down.svg";
import HeatingImg from "../assets/Heating.svg";
import uncheckCircle from "../assets/un-check.svg";
import checkCircle from "../assets/check-circle.svg";

type Props = {
  toggleHandleAccordian: (id: string) => void;
  active: string[];
  icon?: string;
  accTitle: string;
  id: string;
  accChild: SubCategory[];
};

const AccordianComp = ({
  toggleHandleAccordian,
  active,
  icon = HeatingImg,
  accTitle,
  id,
  accChild = [],
}: Props) => {
  return (
    <div className=" accordian-div">
      <div className="accordian-children">
        <div
          className=" accordian-innerdiv "
          onClick={() => toggleHandleAccordian(id)}
        >
          <div className="accordian-icon-div ">
            <img src={icon} alt="img" className="accIcon" />
            <p className="accTitle">{accTitle}</p>
          </div>
          <div className="arrowWrapper">
            {active.includes(id) ? (
              <img src={upArrow} alt="up" />
            ) : (
              <img src={downArrow} alt="dn" />
            )}
          </div>
        </div>
        {active.includes(id) && (
          <div className="accDetailDiv">
            {accChild.map((acc: any) => (
              <button type="button" className={`accBtns accBtnActive`}>
                <img src={checkCircle} alt="checked" />
                {acc.subItem}
              </button>
            ))}{" "}
          </div>
        )}
      </div>
    </div>
  );
};

export default AccordianComp;
