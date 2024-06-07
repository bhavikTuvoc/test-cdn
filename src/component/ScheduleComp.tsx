import { useState } from "react";
import CalenderComp from "./CalenderComp";
import uncheckCircle from "../assets/un-check.svg";
import checkCircle from "../assets/check-circle.svg";
import Input from "./InputComponent";
import {
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
type Props = {
  setValue: UseFormSetValue<any>;
  register: UseFormRegister<any>;
  watch: UseFormWatch<any>;
};
export type slotButtonArrayType = {
  id: string;
  start: string;
  end: string;
};

const ScheduleComp = ({ register, setValue }: Props) => {
  const slotButtonsArray: slotButtonArrayType[] = [
    { id: "button1", start: "07:00:00", end: "09:00:00" },
    { id: "button2", start: "01:00:00", end: "03:00:00" },
    { id: "button3", start: "05:00:00", end: "07:00:00" },
    { id: "button4", start: "08:00:00", end: "10:00:00" },
  ];

  const [slot, setSlot] = useState<string>();
  const [slotDate, setSlotDate] = useState<any>(new Date());

  const handleSelectedButton = (id: string) => {
    setSlot(id);
    const selectedSlot = slotButtonsArray.find((item) => item.id === id);
    setValue("slotAndDate", {
      date: slotDate.toISOString(),
      start: selectedSlot?.start,
      end: selectedSlot?.end,
    });
  };

  return (
    <div className="CdnPurpleScheduleWrapper">
      <CalenderComp setStartDate={setSlotDate} startDate={slotDate} />
      <div className="CdnPurpleSlotButtonWrapper">
        {slotButtonsArray &&
          slotButtonsArray.map((s: slotButtonArrayType) => (
            <button
              key={s.id}
              type="button"
              className={`CdnPurpleAccBtns CdnPurpleSlotBtn ${
                s.id === `${slot}`
                  ? "CdnPurpleAccBtnActive"
                  : "CdnPurpleAccBtnDefault"
              }`}
              onClick={() => handleSelectedButton(`${s.id}`)}
            >
              <img
                style={{ width: "22px", height: "22px" }}
                src={s.id === `${slot}` ? checkCircle : uncheckCircle}
                alt={s.id === `${slot}` ? "checked" : "unchecked"}
              />
              <span>{`${s.start} - ${s.end}`}</span>
            </button>
          ))}
      </div>
      <div className="CdnPurpleTermsCheckBoxWrapper">
        <Input
          id="termsAccept"
          type="checkbox"
          register={register}
          name="termsCheckbox"
        />
        <label htmlFor="termsAccept">I accept the terms of booking</label>
      </div>
    </div>
  );
};

export default ScheduleComp;
