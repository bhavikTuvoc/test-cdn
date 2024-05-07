import { UseFormRegister, UseFormWatch } from "react-hook-form";
import AccordianComp from "./AccordianComp";
import PhotosComp from "./PhotosComp";
import QuestionComp from "./QuestionComp";
import { IndividualDetailType } from "./types";
import CustomerCategoryComp from "./CustomerCategoryComp";
import ScheduleComp from "./ScheduleComp";
import ConfirmationComp from "./ConfirmationComp";

type Props = {
  data: IndividualDetailType | any;
  control: any;
  setValue: any;
  register: UseFormRegister<any>;
  watch: UseFormWatch<any>;
  child: any;
};

const RightCategoryComp = ({
  data,
  control,
  setValue,
  register,
  watch,
  child,
}: Props) => {
  const header = data.header;

  return (
    <div className="rightDetailWrapper ">
      <div
        className={`${
          data && data?.categoryType === "Confirm" && "border-b"
        } showMobile`}
      >
        {data && data?.categoryType === "Confirm" && <>{child}</>}
      </div>
      <h3 className="rightDetailHeader">{header}</h3>
      {data && data?.categoryType === "Accordian" && (
        <div className="accWrpper">
          <AccordianComp
            watch={watch}
            setValue={setValue}
            accChild={data.category}
          />
        </div>
      )}
      {data && data?.categoryType === "Question" && (
        <div className="queMainWrapper">
          <QuestionComp setValue={setValue} questiondata={data.category} />
        </div>
      )}

      {data && data?.categoryType === "Photo" && (
        <div className="queMainWrapper">
          {data?.category.map((item: any) => (
            <PhotosComp
              key={item.item}
              accChild={item.subCategories}
              accTitle={item.item}
              control={control}
              setValue={setValue}
              register={register}
              watch={watch}
            />
          ))}
        </div>
      )}

      {data && data?.categoryType === "Customer" && (
        <div className="queMainWrapper">
          <CustomerCategoryComp
            register={register}
            watch={watch}
            setValue={setValue}
          />
        </div>
      )}

      {data && data?.categoryType === "Schedule" && (
        <div className="queMainWrapper">
          <ScheduleComp register={register} watch={watch} setValue={setValue} />
        </div>
      )}
      {data && data?.categoryType === "Confirm" && (
        <div className="queMainWrapper">
          <ConfirmationComp
            register={register}
            watch={watch}
            setValue={setValue}
          />
        </div>
      )}
    </div>
  );
};

export default RightCategoryComp;
