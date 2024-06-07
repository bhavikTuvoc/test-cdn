import Logo from "../assets/SVGs/Logo";
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
import { useAppDispatch, useAppSelector } from "../redux/store";
import { useFormData } from "../Provider/FormDataConext";
import { useEffect } from "react";
import { validateTenantFromKey } from "../redux/validate-tenant/authSlice";
import LoaderComp from "./LoaderComp";
import { setThemeColors } from "../utils/setTheme";

type Props = {};

const PopUp = ({}: Props) => {
  const { control, setValue, watch, register } = useForm<any>({
    defaultValues: {
      Details: [],
      Issue: [],
      desc: "",
      currenCustomerStatus: "Yes",
      messageType: "email",
      accordianState: [],
      successMessage: true,
      yes: {},
      no: {},
    },
  });
  // const formValue = watch();

  const indicatorList: StepDetail[] = useAppSelector(
    (state) => state.auth.indicators
  );

  const IndividualDetail: IndividualDetailType[] | any = [
    {
      label: "Issue",
      id: 1,
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
      id: 2,
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
      id: 3,
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
      id: 4,
      checked: false,
      categoryType: "Customer",
      header: "Are you current customer ?",
    },
    {
      label: "Schedule",
      id: 5,
      checked: false,
      categoryType: "Schedule",
      header: "Schedule",
    },
    {
      label: "Confirm",
      id: 6,
      checked: false,
      categoryType: "Confirm",
      header: "Confirmation",
    },
  ];

  const { steps, goToNext, goToPrevious, currentId } = useNavigation({ watch });

  const { issueDataOld, detailsoldData } = useFormData();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const scriptTag = document.querySelector(
      'script[src="https://formbuilder.freeagency.ai/dist/purple.umd.cjs"]'
    );
    const token = scriptTag?.getAttribute("data-free-engine");
    console.log(token);
    dispatch(validateTenantFromKey(token as string)).then((resp) => {
      if (resp.type === "authentication/validateTenantFromKey/fulfilled") {
        // Set CSS variables
        setThemeColors({
          prim_color: resp.payload.prim_color,
          sec_color: resp.payload.sec_color,
          tert_color: resp.payload.tert_color,
        });
      }
    });
  }, []);
  const error = useAppSelector((state) => state.auth.validationError);
  // Example function to map and extract data
  // function prepareDataToSend(data: any) {
  //   const { Details, Issue, desc, slotAndDate, messageType } = data;

  //   let dataToSend = {
  //     tenant: 9,
  //     customer: 11,
  //     referer_website: "example.com",
  //     ip: "192.168.1.1",
  //     is_customer: true,
  //     date: slotAndDate.date,
  //     start_time: slotAndDate.start,
  //     end_time: slotAndDate.end,
  //     verification_type: messageType,
  //     status: "booked",
  //     issues: [],
  //   };

  //   dataToSend.issues = Issue.map((issue: any) => {
  //     // Filtering sub_issues where checked is true
  //     let subIssues = issue.sub_issue
  //       .filter((sub: any) => sub.checked)
  //       .map((sub: any) => ({ sub_issue_id: sub.id }));

  //     let questionAnswers = [];
  //     if (Details) {
  //       let issueDetail = Details.find((detail: any) => detail.id === issue.id);
  //       if (issueDetail && issueDetail.questions) {
  //         questionAnswers = issueDetail.questions
  //           .map((question: any) => {
  //             // Find the option that is checked and return the question ID and answer
  //             let option = question.options.find((opt: any) => opt.checked);
  //             if (option) {
  //               return {
  //                 question_id: question.id,
  //                 answer: [option.option_title],
  //               };
  //             }
  //             return null; // Return null if no option is checked, filter these out later
  //           })
  //           .filter((item: any) => item !== null); // Filter out null entries
  //       }
  //     }

  //     // Get the description from 'desc' using the issue name or use an empty string if not available
  //     let issueDescription = desc[issue.issue_name] || "";

  //     return {
  //       issue_id: issue.id,
  //       sub_issues: subIssues,
  //       question_answers: questionAnswers,
  //       images: { description: issueDescription },
  //     };
  //   });

  //   return dataToSend;
  // }
  const isValidateTenant = useAppSelector(
    (state) => state.auth.isValidateTenant
  );
  const ids =
    isValidateTenant === true
      ? issueDataOld &&
        issueDataOld
          .filter((item) => item.sub_issue.some((sub) => sub.checked))
          .map((item) => item.id)
          .join(",")
      : "";
  const isAnyOptionChecked = (issues: any) => {
    // Iterate over each issue
    for (const issue of issues) {
      // Iterate over each question in the current issue
      for (const question of issue.questions) {
        // Check if any option in the current question is checked
        if (question.options.some((option: any) => option.checked)) {
          return true;
        }
      }
    }
    // If no checked option is found in any question of any issue, return false
    return false;
  };
  // console.log(isAnyOptionChecked(detailsoldData));
  const determineDisabledState = () => {
    switch (currentId) {
      case 1:
        // Disable if ids is an empty string
        return ids === "";
      case 2:
        // Disable if any option is checked in detailsOldData
        return !isAnyOptionChecked(detailsoldData);
      default:
        // Default case, possibly disable under no conditions or add more cases as needed
        return false;
    }
  };

  const determineCursorStyle = () => {
    switch (currentId) {
      case 1:
        return ids === "" ? "not-allowed" : "pointer";
      case 2:
        return !isAnyOptionChecked(detailsoldData) ? "not-allowed" : "pointer";
      default:
        return "pointer";
    }
  };
  const success = useAppSelector((state) => state.auth.success);
  const loading = useAppSelector((state) => state.auth.loading);
  return (
    <>
      {!success && !loading && error === "" && (
        <form className="CdnPurpleFormContainer">
          <div className="CdnPurpleFormBodyContainer">
            {/* left */}
            <div className="CdnPurpleFormBodyLeft">
              {/* logo */}
              <div className="CdnPurpleLogoDiv CdnPurpleGenralLogo">
                {/* <Logo className="CdnPurpleLogoSize" /> */}
                <div
                  className="font-bold text-black "
                  style={{ fontSize: "20px" }}
                >
                  Your Logo
                </div>
              </div>
              {/* progress bar */}
              <div className="CdnPurpleIndicatorWrapper">
                <button
                  className="CdnPurpleMobileBack"
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
                  className="CdnPurpleMobileNext"
                  type={"button"}
                  style={{
                    cursor: determineCursorStyle(),
                  }}
                  disabled={determineDisabledState()}
                  onClick={goToNext}
                >
                  {currentId === 6 ? "Confirm" : "Next"}
                  <img
                    src={ArrowIcon}
                    alt="arrow"
                    className="CdnPurpleNextArrowImgMobile"
                  />
                </button>
              </div>
            </div>
            {/* right */}
            <div className="CdnPurpleFormBodyRight">
              {/* mobile logo */}
              <div className="CdnPurpleMobileLogoDiv">
                <div className="CdnPurpleLogoDiv">
                  <Logo className="CdnPurpleLogoSize" />
                </div>
                <button
                  type="button"
                  className="CdnPurpleXbtn"
                  onClick={handleClose}
                >
                  <img src={XImg} alt="X" />
                </button>
              </div>
              <RightCategoryComp
                currentId={currentId}
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
                data={IndividualDetail?.find(
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
          <div className="CdnPurpleFormBodyBottom">
            <ButtonGroup
              currentId={currentId}
              indicatorList={indicatorList}
              goToPrevious={goToPrevious}
              goToNext={goToNext}
              handleCancel={handleClose}
            />
          </div>
        </form>
      )}
      {success && (
        <div className="CdnPurpleFormContainerSuccesss">
          <div className="CdnPurpleSuccessPageDiv">
            <div className="CdnPurplelogoOfSuccessDiv">
              <Logo className="CdnPurpleLogoSize" />
            </div>
            <div className="CdnPurpleHeroImageWrapper">
              <img src={`${heroImg}`} alt="Purple" />
            </div>
            <div className="CdnPurpleSuccessTextDiv">
              <h2>Succesfull</h2>
              <p>
                Our managers already received your request and will contact you
                soon.
              </p>
            </div>
            <button
              className="CdnPurpleGoToHomePageBtn"
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
      {loading && (
        <div className="CdnPurpleFormContainer">
          <LoaderComp />
        </div>
      )}
      {error !== "" && (
        <div className="CdnPurpleErroWrapper">
          {error}
          <button
            className="CdnPurpleErrorButton"
            type="button"
            style={{ cursor: "pointer" }}
            onClick={handleClose}
          >
            <span>back</span>
            <img src={arrow} alt="arrow" />
          </button>
        </div>
      )}
    </>
  );
};

export default PopUp;
