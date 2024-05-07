import Logo from "../assets/purple-logo.svg";
import ProgressBarItem from "./ProgressBarItem";
import { useNavigation } from "../Hooks/useNaviagtion";
import RightCategoryComp from "./RightCategoryComp";
import { IndividualDetailType, StepDetail } from "./types";
import ButtonGroup from "./ButtonGroup";
import ArrowIcon from "../assets/RightArrow.svg";
import XImg from "../assets/x-close.svg";
import { handleClose } from "../App";
import { useForm } from "react-hook-form";
import heroImg from "../assets/successImage.svg";
import arrow from "../assets/arrow-right.svg";
import MobileProgressBarItem from "./MobileProgressBarItem";

type Props = {};

const PopUp = ({}: Props) => {
  const { control, setValue, watch, register } = useForm<any>({
    defaultValues: {
      files: [],
      Details: [],
      Issue: [],
      desc: "",
      currenCustomerStatus: "Yes",
      messageType: "email",
      accordianState: [],
      successMessage: true,
    },
  });

  const formValue = watch();
  console.log(formValue);
  const indicatorList: StepDetail[] = [
    {
      id: "Issue",
      label: "Issue",
      detail: "Select issue",
      flag: "Active",
    },
    {
      id: "Details",
      label: "Details",
      detail: "Provide details",
      flag: "Default",
    },
    {
      id: "Photo",
      label: "Photo",
      detail: "Upload photo",
      flag: "Default",
    },
    {
      id: "Customer",
      label: "Customer",
      detail: "Sign in or create account",
      flag: "Default",
    },
    {
      id: "Schedule",
      label: "Schedule",
      detail: "Choose date time",
      flag: "Default",
    },
    {
      id: "Confirm",
      label: "Confirm",
      detail: "Confirm your request",
      flag: "Default",
    },
  ];
  const IndividualDetail: IndividualDetailType[] | any = [
    {
      label: "Issue",
      id: "Issue",
      checked: false,
      categoryType: "Accordian",
      header: "Please select your issue",
      category: [
        {
          item: "Heating & Cooling",
          subCategories: [
            { id: "No Heat", subItem: "No Heat", checked: false },
            { id: "No Cooling", subItem: "No Cooling", checked: false },
            {
              id: "Unit Leaking Water",
              subItem: "Unit Leaking Water",
              checked: false,
            },
            {
              id: "Unit Making Noise",
              subItem: "Unit Making Noise",
              checked: false,
            },
            { id: "Thermostat", subItem: "Thermostat", checked: false },
          ],
        },
        {
          item: "Plumbing",
          subCategories: [
            { id: "Water Leak", subItem: "Water Leak", checked: false },
            { id: "Water Heater", subItem: "Water Heater", checked: false },
            {
              id: "Toilet",
              subItem: "Toilet",
              checked: false,
            },
            {
              id: "Sink or Faucet",
              subItem: "Sink or Faucet",
              checked: false,
            },
            { id: "Tub or Shower", subItem: "Tub or Shower", checked: false },
          ],
        },
      ],
    },
    {
      label: "Details",
      id: "Details",
      checked: false,
      categoryType: "Question",
      header: "Please select your issue",
      category: [
        {
          item: "What Type of system do you have ?",
          subCategories: [
            { id: "Heat Pump", subItem: "Heat Pump", checked: false },
            {
              id: "Ductless/Mini Split",
              subItem: "Ductless/Mini Split",
              checked: false,
            },
            { id: "Furnance", subItem: "Furnance", checked: false },
            { id: "Radiant", subItem: "Radiant", checked: false },
            { id: "Other/Not Sure", subItem: "Other/Not Sure", checked: false },
          ],
        },
        {
          item: "What is the approximate age of your system ?",
          subCategories: [
            {
              id: "Less than 5 years old",
              subItem: "Less than 5 years old",
              checked: false,
            },
            {
              id: "6 To 9 years old",
              subItem: "6 To 9 years old",
              checked: false,
            },
            {
              id: "10 To 13 years old",
              subItem: "10 To 13 years old",
              checked: false,
            },
            {
              id: "Over 14 years old",
              subItem: "Over 14 years old",
              checked: false,
            },
            { id: "Not Sure", subItem: "Not Sure", checked: false },
          ],
        },
      ],
    },
    {
      label: "Photo",
      id: "Photo",
      checked: false,
      categoryType: "Photo",
      header: "Upload photos",
      category: [
        {
          item: "Upload your photos here!",
          subCategories: [
            { id: "Heat Pump", subItem: "Heat Pump", checked: false },
          ],
        },
      ],
    },
    {
      label: "Customer",
      id: "Customer",
      checked: false,
      categoryType: "Customer",
      header: "Are you current customer",
    },
    {
      label: "Schedule",
      id: "Schedule",
      checked: false,
      categoryType: "Schedule",
      header: "Schedule",
    },
    {
      label: "Confirm",
      id: "Confirm",
      checked: false,
      categoryType: "Confirm",
      header: "Confirmation",
    },
  ];

  const { steps, goToNext, goToPrevious, currentId } =
    useNavigation(indicatorList);

  let success = formValue?.successMessage;
  const handleSuccessPage = () => {
    setValue("successMessage", !success);
  };

  return (
    <>
      {success && (
        <form className="formContainer">
          <div className="formBodyContainer">
            {/* left */}
            <div className="formBodyLeft">
              {/* logo */}
              <div className="logoDiv genralLogo">
                <img src={`${Logo}`} alt="Purple" />
              </div>
              {/* progress bar */}
              <div className="indicatorWrapper">
                <button
                  className="mobileBack"
                  type="button"
                  onClick={goToPrevious}
                >
                  Back
                </button>
                {steps.map((item: StepDetail, index: number) => (
                  <ProgressBarItem
                    key={item.label}
                    detail={item.detail}
                    flag={item.flag}
                    label={item.label}
                    lastItem={steps.length === index + 1}
                    watch={watch}
                  />
                ))}
                <button
                  className="mobileNext"
                  type="button"
                  onClick={
                    currentId === indicatorList[indicatorList.length - 1].id
                      ? handleSuccessPage
                      : goToNext
                  }
                >
                  {currentId === indicatorList[indicatorList.length - 1].id
                    ? "Confirm"
                    : "Next"}
                  <img
                    src={ArrowIcon}
                    alt="arrow"
                    className="nextArrowImgMobile"
                  />
                </button>
              </div>
            </div>
            {/* right */}
            <div className="formBodyRight">
              {/* mobile logo */}
              <div className="mobileLogoDiv">
                <div className="logoDiv">
                  <img src={`${Logo}`} alt="Purple" />
                </div>
                <button type="button" className="Xbtn" onClick={handleClose}>
                  <img src={XImg} alt="X" />
                </button>
              </div>
              <RightCategoryComp
                child={steps.map((item: StepDetail, index: number) => (
                  <MobileProgressBarItem
                    key={item.label}
                    detail={item.detail}
                    flag={item.flag}
                    label={item.label}
                    lastItem={steps.length === index + 1}
                    watch={watch}
                  />
                ))}
                data={IndividualDetail.find(
                  (detail: IndividualDetailType) => detail.id === currentId
                )}
                // data={IndividualDetail[0]}
                control={control}
                setValue={setValue}
                register={register}
                watch={watch}
              />
            </div>
          </div>
          <div className="formBodyBottom">
            <ButtonGroup
              currentId={currentId}
              indicatorList={indicatorList}
              goToPrevious={goToPrevious}
              goToNext={
                currentId === indicatorList[indicatorList.length - 1].id
                  ? handleSuccessPage
                  : goToNext
              }
              handleCancel={handleClose}
            />
          </div>
        </form>
      )}
      {!success && (
        <div className="formContainerSuccesss">
          <div className="successPageDiv">
            <div className="logoOfSuccessDiv">
              <img src={`${Logo}`} alt="Purple" />
            </div>
            <div className="heroImageWrapper">
              <img src={`${heroImg}`} alt="Purple" />
            </div>
            <div className="successTextDiv">
              <h2>Succesfull</h2>
              <p>
                Our managers already received your request and will contact you
                soon.
              </p>
            </div>
            <button
              className="goToHomePageBtn"
              type="button"
              style={{ cursor: "pointer" }}
              onClick={handleClose}
            >
              <span> Go to the home page</span>
              <img src={arrow} alt="arrow" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default PopUp;
