import Logo from "../assets/purple-logo.svg";
import ProgressBarItem from "./ProgressBarItem";
import { useNavigation } from "../Hooks/useNaviagtion";
import RightCategoryComp from "./RightCategoryComp";
import { IndividualDetailType, StepDetail } from "./types";
import ButtonGroup from "./ButtonGroup";
import ArrowIcon from "../assets/RightArrow.svg";
import XImg from "../assets/x-close.svg";
import { handleClose } from "../App";
import { useState } from "react";
type Props = {};

const PopUp = ({}: Props) => {
  const indicatorList: StepDetail[] = [
    {
      id: "Service",
      label: "Service",
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
  const IndividualDetail: IndividualDetailType[] = [
    {
      label: "Service",
      id: "Service",
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
          item: "Heating & Cooling1",
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
  ];

  const { steps, goToNext, goToPrevious, currentId } =
    useNavigation(indicatorList);

  // const detail = IndividualDetail.find((detail) => detail.id === currentId);
  // console.log(detail);
  const [active, setActive] = useState<string[]>([]);

  const toggleHandleAccordian = (targetedId: string) => {
    if (active.includes(targetedId)) {
      setActive(active.filter((item) => item !== targetedId));
    } else {
      setActive([...active, targetedId]);
    }
  };

  return (
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
            <button className="mobileBack" type="button" onClick={goToPrevious}>
              Back
            </button>
            {steps.map((item: StepDetail, index: number) => (
              <ProgressBarItem
                key={item.label}
                detail={item.detail}
                flag={item.flag}
                label={item.label}
                lastItem={steps.length === index + 1}
              />
            ))}
            <button className="mobileNext" type="button" onClick={goToNext}>
              {currentId === indicatorList[indicatorList.length - 1].id
                ? "Confirm"
                : "Next"}
              <img src={ArrowIcon} alt="arrow" className="nextArrowImgMobile" />
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
            active={active}
            data={IndividualDetail.find((detail) => detail.id === currentId)}
            // data={IndividualDetail[0]}
            toggleHandleAccordian={toggleHandleAccordian}
          />
        </div>
      </div>
      <div className="formBodyBottom">
        <ButtonGroup
          currentId={currentId}
          indicatorList={indicatorList}
          goToPrevious={goToPrevious}
          goToNext={goToNext}
          handleCancel={handleClose}
        />
      </div>
    </form>
  );
};

export default PopUp;
