import Logo from "../assets/purple-logo.svg";
import ProgressBarItem from "./ProgressBarItem";
import ArrowIcon from "../assets/RightArrow.svg";
type Props = {};

const PopUp = ({}: Props) => {
  const indicatorList = [
    {
      label: "Service",
      detail: "Select issue",
      flag: "Completed" as const,
    },
    {
      label: "Details",
      detail: "Provide details",
      flag: "Completed" as const,
    },
    {
      label: "Photo",
      detail: "Upload photo",
      flag: "Active" as const,
    },
    {
      label: "Customer",
      detail: "Sign in or create account",
      flag: "Default" as const,
    },
    {
      label: "Schedule",
      detail: "Choose date time",
      flag: "Default" as const,
    },
    {
      label: "Confirm",
      detail: "Confirm your request",
      flag: "Default" as const,
    },
  ];

  return (
    <form className="formContainer">
      <div className="flex md:flex-row flex-col w-full h-full justify-center items-center md:gap-[24px] gap-[10px] border-b border-[#D0D5DD] md:pb-[24px]">
        {/* left */}
        <div className="flex-[0.36] h-full w-full flex flex-col border-r border-[#D0D5DD]">
          {/* logo */}
          <div>
            <img src={`${Logo}`} alt="Purple" />
          </div>
          {/* progress bar */}
          <div className="flex flex-col py-[16px]">
            {indicatorList.map((item) => (
              <ProgressBarItem
                key={item.label}
                detail={item.detail}
                flag={item.flag}
                label={item.label}
              />
            ))}
          </div>
        </div>
        {/* right */}
        <div className=" flex-[0.64] h-full w-full">Right</div>
      </div>
      <div className="flex-1 w-full min-h-[60px] flex justify-between items-center ">
        <button
          type="button"
          className="btn textNormal rounded-md border border-[#D0D5DD]"
        >
          Cancel
        </button>
        <button
          type="button"
          className="btn bgPrimary btnPrimary text-white rounded-md flex justify-center items-center gap-[15px]"
        >
          Next{" "}
          <img src={ArrowIcon} alt="arrow" className="w-[14px] h-[14px] " />
        </button>
      </div>
    </form>
  );
};

export default PopUp;
