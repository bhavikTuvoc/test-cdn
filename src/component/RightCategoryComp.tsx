import AccordianComp from "./AccordianComp";
import PhotosComp from "./PhotosComp";
import QuestionComp from "./QuestionComp";
import { IndividualDetailType } from "./types";

type Props = {
  active: string[];
  data: IndividualDetailType | any;
  toggleHandleAccordian: any;
};

const RightCategoryComp = ({ active, data, toggleHandleAccordian }: Props) => {
  const header = data.header;
  return (
    <div className="rightDetailWrapper">
      <h3 className="rightDetailHeader">{header}</h3>
      {data && data?.categoryType === "Accordian" && (
        <div className="accWrpper">
          {data?.category.map((item: any) => (
            <AccordianComp
              key={item.item}
              toggleHandleAccordian={toggleHandleAccordian}
              active={active}
              accTitle={item.item}
              id={item.item}
              accChild={item.subCategories}
            />
          ))}
        </div>
      )}
      {data && data?.categoryType === "Question" && (
        <div className="queMainWrapper">
          {data?.category.map((item: any) => (
            <QuestionComp
              key={item.item}
              accChild={item.subCategories}
              accTitle={item.item}
            />
          ))}
        </div>
      )}

      {data && data?.categoryType === "Photo" && (
        <div className="queMainWrapper">
          {data?.category.map((item: any) => (
            <PhotosComp
              key={item.item}
              accChild={item.subCategories}
              accTitle={item.item}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default RightCategoryComp;
