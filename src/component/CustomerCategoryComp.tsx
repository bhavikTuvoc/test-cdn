import {
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";

import uncheckCircle from "../assets/un-check.svg";
import checkCircle from "../assets/check-circle.svg";
import Input from "./InputComponent";
import { useFormData } from "../Provider/FormDataConext";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { clearErrorMsg } from "../redux/data/issueSlice";
import { useEffect } from "react";

type Props = {
  setValue: UseFormSetValue<any>;
  register: UseFormRegister<any>;
  watch: UseFormWatch<any>;
};

export function validatePhoneNumberInput(event: {
  which: any;
  keyCode: any;
  ctrlKey: any;
  metaKey: any;
  key: string;
  preventDefault: () => void;
}) {
  // Get the character code of the key pressed
  const charCode = event.which ? event.which : event.keyCode;
  if (
    [
      8, 32, 37, 38, 39, 40, 46, 48, 57, 96, 97, 98, 99, 100, 101, 102, 103,
      104, 105, 107, 109, 123,
    ].includes(charCode)
  ) {
    return;
  }

  if (
    (event.ctrlKey || event.metaKey) &&
    (event.key === "a" || event.key === "A")
  ) {
    return;
  }

  // Allow only numbers and the symbols: + - ( )
  const allowedChars = /[\d()+-]/;
  const char = String.fromCharCode(charCode);
  if (!allowedChars.test(char)) {
    event.preventDefault();
  }
}

const CustomerCategoryComp = ({ setValue, register, watch }: Props) => {
  const currentCustomerStatus = watch("currenCustomerStatus");

  const { updateFormData } = useFormData();
  const dispatch = useAppDispatch();
  const handleSelectedButton = (val: string) => {
    setValue("currenCustomerStatus", val);
    updateFormData({ isCurrentCustomer: `${val}` });
    dispatch(clearErrorMsg());
  };

  const isValidateUser = useAppSelector((state) => state.issue.isValidateUser);
  const errorMsg = useAppSelector((state) => state.issue.errorMsg);

  const yesData = watch("yes");
  useEffect(() => {
    if (currentCustomerStatus === "Yes") {
      updateFormData({ yesData: { phone: yesData?.oldphone || "" } });
    }
  }, [yesData]);
  const noData = watch("no");
  useEffect(() => {
    if (currentCustomerStatus === "No") {
      const dataToUpdate = {
        name: noData?.name,
        email: noData?.email,
        phone: noData?.newphone,
        address: noData?.address,
        tenant: 9,
      };
      updateFormData({
        noData: dataToUpdate,
      });
    }
  }, [noData]);

  return (
    <div className="CdnPurpleCustomerWrapper">
      <div className="CdnPurpleCustomerSwitch">
        <button
          type="button"
          className={`CdnPurpleAccBtns ${
            currentCustomerStatus === "Yes"
              ? "CdnPurpleAccBtnActive"
              : "CdnPurpleAccBtnDefault"
          }`}
          onClick={() => handleSelectedButton("Yes")}
        >
          <img
            style={{ width: "24px", height: "24px" }}
            src={currentCustomerStatus === "Yes" ? checkCircle : uncheckCircle}
            alt={currentCustomerStatus === "Yes" ? "checked" : "unchecked"}
          />
          {"Yes"}
        </button>
        <button
          type="button"
          className={`CdnPurpleAccBtns ${
            currentCustomerStatus === "No"
              ? "CdnPurpleAccBtnActive"
              : "CdnPurpleAccBtnDefault"
          }`}
          onClick={() => handleSelectedButton("No")}
        >
          <img
            style={{ width: "24px", height: "24px" }}
            src={currentCustomerStatus === "No" ? checkCircle : uncheckCircle}
            alt={currentCustomerStatus === "No" ? "checked" : "unchecked"}
          />
          {"No"}
        </button>
      </div>
      {isValidateUser === "No" &&
        currentCustomerStatus === "No" &&
        errorMsg !== "" && (
          <p
            style={{
              color: "red",
              fontSize: "13px",
              fontWeight: "bold",
              paddingTop: "10px",
            }}
          >
            {errorMsg}
          </p>
        )}
      {isValidateUser === "No" &&
        currentCustomerStatus === "Yes" &&
        errorMsg !== "" && (
          <p
            style={{
              color: "red",
              fontSize: "13px",
              fontWeight: "bold",
              paddingTop: "10px",
            }}
          >
            {errorMsg === undefined
              ? "The phone number that you entered is not correct"
              : errorMsg}
          </p>
        )}
      <div className="CdnPurpleCustomerFieldsWrapper">
        {currentCustomerStatus === "Yes" && (
          <>
            <div className="CdnPurpleInputFieldsWrapper">
              <label htmlFor="phone" className="CdnPurpleInputCustomerLabel">
                Phone number*
              </label>
              <Input
                className="CdnPurpleInputCustomerInputTag"
                id="phone"
                name="yes.oldphone"
                type="tel"
                register={register}
                placeholder="Phone number"
                // onKeyDown={validatePhoneNumberInput}
              />
            </div>
          </>
        )}

        {currentCustomerStatus === "No" && (
          <>
            <div className="CdnPurpleInputFieldsWrapper">
              <label htmlFor="name" className="CdnPurpleInputCustomerLabel">
                Name*
              </label>
              <Input
                className="CdnPurpleInputCustomerInputTag"
                id="name"
                name="no.name"
                type="text"
                register={register}
                placeholder="Enter your name"
              />
            </div>
            <div className="CdnPurpleInputFieldsWrapper">
              <label htmlFor="email" className="CdnPurpleInputCustomerLabel">
                Email*
              </label>
              <Input
                className="CdnPurpleInputCustomerInputTag"
                id="email"
                name="no.email"
                type="email"
                register={register}
                placeholder="Enter your email"
              />
            </div>
            <div className="CdnPurpleInputFieldsWrapper">
              <label htmlFor="address" className="CdnPurpleInputCustomerLabel">
                Address*
              </label>
              <Input
                className="CdnPurpleInputCustomerInputTag"
                id="address"
                name="no.address"
                type="text"
                register={register}
                placeholder="Address"
              />
            </div>
            <div className="CdnPurpleInputFieldsWrapper">
              <label htmlFor="phone" className="CdnPurpleInputCustomerLabel">
                Phone number*
              </label>
              <Input
                className="CdnPurpleInputCustomerInputTag"
                id="phone"
                name="no.newphone"
                type="tel"
                register={register}
                placeholder="Phone number"
                pattern="[\d\s()+-]+"
                // onKeyDown={validatePhoneNumberInput}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CustomerCategoryComp;
