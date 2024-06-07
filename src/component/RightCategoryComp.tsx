import { UseFormRegister, UseFormWatch } from "react-hook-form";
import AccordianComp from "./AccordianComp";
import PhotosComp from "./PhotosComp";
import QuestionComp from "./QuestionComp";
import { IndividualDetailType } from "./types";
import CustomerCategoryComp from "./CustomerCategoryComp";
import ScheduleComp from "./ScheduleComp";
import ConfirmationComp from "./ConfirmationComp";
import { useAppSelector } from "../redux/store";
import LoaderComp from "./LoaderComp";

type Props = {
  data?: IndividualDetailType | any;
  control?: any;
  setValue?: any;
  register: UseFormRegister<any>;
  watch: UseFormWatch<any>;
  child: any;
  currentId: number;
};

const RightCategoryComp = ({
  data,
  control,
  setValue,
  register,
  watch,
  child,
  currentId,
}: Props) => {
  const header =
    currentId === 1
      ? "Please select your issue"
      : currentId === 2
      ? "Issue type"
      : currentId === 3
      ? "Uplaod photos"
      : currentId === 4
      ? "Are you current customer ?"
      : currentId === 5
      ? "Schedule"
      : currentId === 6
      ? "Confirmation"
      : "";
  const loading = useAppSelector((state) => state.issue.loading);
  const dataStep1 = useAppSelector((state) => state.issue.formState?.step1); //issue and subissues listing
  const dataStep2 = useAppSelector((state) => state.issue.formState?.step2); //issue and subissues listing
  return (
    <>
      {loading ? (
        <LoaderComp />
      ) : (
        <div className="CdnPurpleRightDetailWrapper ">
          <div
            className={`${
              currentId === 6 && "CdnPurpleBorderB"
            } CdnPurpleShowMobile`}
          >
            {currentId === 6 && <>{child}</>}
          </div>
          <h3
            className={`CdnPurpleRightDetailHeader ${
              data &&
              data?.categoryType === "Confirm" &&
              "CdnPurpleHeaderHideMobileConfirm"
            }`}
          >
            {header}
          </h3>
          {currentId === 1 && (
            <div className="CdnPurpleAccWrpper">
              <AccordianComp
                watch={watch}
                setValue={setValue}
                issueList={dataStep1}
              />
            </div>
          )}
          {currentId === 2 && (
            <div className="CdnPurpleQueMainWrapper">
              <QuestionComp setValue={setValue} questiondata={dataStep2} />
            </div>
          )}

          {currentId === 3 && (
            <div className="CdnPurpleQueMainWrapper">
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

          {currentId === 4 && (
            <div className="CdnPurpleQueMainWrapper">
              <CustomerCategoryComp
                register={register}
                watch={watch}
                setValue={setValue}
              />
            </div>
          )}

          {currentId === 5 && (
            <div className="CdnPurpleQueMainWrapper">
              <ScheduleComp
                register={register}
                watch={watch}
                setValue={setValue}
              />
            </div>
          )}
          {currentId === 6 && (
            <div className="CdnPurpleQueMainWrapper">
              <ConfirmationComp
                register={register}
                watch={watch}
                setValue={setValue}
              />
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default RightCategoryComp;
