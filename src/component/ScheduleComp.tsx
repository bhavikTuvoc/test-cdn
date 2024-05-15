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
  slot: string;
};

const ScheduleComp = ({ register, setValue }: Props) => {
  const slotButtonsArray: slotButtonArrayType[] = [
    { id: "button1", slot: "7:00am - 9:00am" },
    { id: "button2", slot: "1:00am - 3:00am" },
    { id: "button3", slot: "5:00am - 7:00am" },
    { id: "button4", slot: "8:00am - 10:00am" },
  ];

  const [slot, setSlot] = useState<string>();
  const [slotDate, setSlotDate] = useState<any>(new Date());

  const handleSelectedButton = (id: string) => {
    setSlot(id);
    const selectedSlot = slotButtonsArray.find((item) => item.id === id);
    setValue("slotAndDate", {
      date: slotDate.toISOString(),
      slot: selectedSlot?.slot,
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
                style={{ width: "24px", height: "24px" }}
                src={s.id === `${slot}` ? checkCircle : uncheckCircle}
                alt={s.id === `${slot}` ? "checked" : "unchecked"}
              />
              <span>{s.slot}</span>
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
