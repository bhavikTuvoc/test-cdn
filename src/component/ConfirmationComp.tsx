import {
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import uncheckCircle from "../assets/un-check.svg";
import checkCircle from "../assets/check-circle.svg";

type Props = {
  register: UseFormRegister<any>;
  setValue: UseFormSetValue<any>;
  watch: UseFormWatch<any>;
};

const ConfirmationComp = ({ setValue, watch }: Props) => {
  const messageType = watch("messageType");
  const handleSelectedButton = (val: string) => {
    setValue("messageType", val);
  };
  return (
    <div>
      <p className="CdnPurpleConfirmationText">
        Where can we send your confirmation ?
      </p>
      <div className="CdnPurpleCustomerSwitch">
        <button
          type="button"
          className={`CdnPurpleAccBtns CdnPurpleConfirmationButtons ${
            messageType === "email"
              ? "CdnPurpleAccBtnActive"
              : "CdnPurpleAccBtnDefault"
          }`}
          onClick={() => handleSelectedButton("email")}
        >
          <img
            style={{ width: "24px", height: "24px" }}
            src={messageType === "email" ? checkCircle : uncheckCircle}
            alt={messageType === "email" ? "checked" : "unchecked"}
          />
          <span>{"Email Me"}</span>
        </button>
        <button
          type="button"
          className={`CdnPurpleAccBtns CdnPurpleConfirmationButtons ${
            messageType === "text"
              ? "CdnPurpleAccBtnActive"
              : "CdnPurpleAccBtnDefault"
          }`}
          onClick={() => handleSelectedButton("text")}
        >
          <img
            style={{ width: "24px", height: "24px" }}
            src={messageType === "text" ? checkCircle : uncheckCircle}
            alt={messageType === "text" ? "checked" : "unchecked"}
          />
          <span>{"Text Me"}</span>
        </button>
      </div>
    </div>
  );
};

export default ConfirmationComp;
