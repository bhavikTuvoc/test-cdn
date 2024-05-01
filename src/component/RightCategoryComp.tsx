import AccordianComp from "./AccordianComp";
import { IndividualDetailType } from "./types";

type Props = {
  active: string[];
  data: IndividualDetailType;
  toggleHandleAccordian: any;
};

const RightCategoryComp = ({ active, data, toggleHandleAccordian }: Props) => {
  const header = data.header;
  // return <div>{active}</div>;
  return (
    <div className="rightDetailWrapper">
      <h3 className="rightDetailHeader">{header}</h3>
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
    </div>
  );
};

export default RightCategoryComp;
