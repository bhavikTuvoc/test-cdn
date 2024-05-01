export type SubCategory = {
  id: string;
  subItem: string;
  checked: boolean;
};

type Category = {
  item: string;
  subCategories: SubCategory[];
};

export type IndividualDetailType = {
  label: string;
  id: string;
  checked: boolean;
  categoryType: string; // "Accordion" or "Question"
  category: Category[];
  header: string;
};

type FlagType = "Default" | "Active" | "Completed";

export type StepDetail = {
  id: string;
  label: string;
  detail: string;
  flag: FlagType;
};
