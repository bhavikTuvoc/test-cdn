import { SubCategory } from "./types";
// import uncheckCircle from "../assets/un-check.svg";
import checkCircle from "../assets/check-circle.svg";

type Props = {
  accChild: SubCategory[];
  accTitle: string;
};

const QuestionComp = ({ accChild, accTitle }: Props) => {
  return (
    <div className="queWrapper">
      <div className="queTitleDiv">
        <p className="accTitle">{accTitle}</p>
      </div>
      <div className="queDetailDiv">
        {accChild.map((acc: any, index: number) => (
          <button type="button" className={`accBtns accBtnActive`} key={index}>
            <img src={checkCircle} alt="checked" />
            {acc.subItem}
          </button>
        ))}{" "}
      </div>
    </div>
  );
};

export default QuestionComp;
