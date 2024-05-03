import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

type Props = {
  className?: string;
  minDate?: Date;
  setStartDate: React.Dispatch<any>;
  startDate: any;
};

const CalenderComp = ({
  className,
  minDate = new Date(),
  setStartDate,
  startDate,
}: Props) => {
  return (
    <DatePicker
      selected={startDate}
      className={className}
      onChange={(date) => setStartDate(date)}
      minDate={minDate}
      calendarStartDay={1}
      inline
      showDisabledMonthNavigation
    />
  );
};

export default CalenderComp;
