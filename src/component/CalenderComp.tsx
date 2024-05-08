import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

type Props = {
  className?: string;
  minDate?: Date;
  setStartDate: React.Dispatch<any>;
  startDate: Date;
  excludeDates?: Date[];
  highlightDates?: Date[];
};

const CalenderComp = ({
  className,
  minDate = new Date(),
  setStartDate,
  startDate,
  excludeDates,
  highlightDates,
}: // excludeDates = [
//   new Date("2024-05-10T10:54:49.000Z"),
//   new Date("2024-05-12T10:54:49.000Z"),
// ],
Props) => {
  // const [startDate, setStartDate] = useState<any>(new Date());
  return (
    <DatePicker
      selected={startDate}
      className={className}
      onChange={(date) => setStartDate(date)}
      excludeDates={excludeDates}
      minDate={minDate}
      calendarStartDay={1}
      inline
      highlightDates={highlightDates}
      showDisabledMonthNavigation
    />
  );
};

export default CalenderComp;
