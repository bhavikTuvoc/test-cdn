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
  id: number;
  checked: boolean;
  categoryType: string; // "Accordion" or "Question"
  category: Category[];
  header: string;
};

type FlagType = "Default" | "Active" | "Completed";

export type StepDetail = {
  id: number;
  label: string;
  detail: string;
  flag: FlagType;
};
