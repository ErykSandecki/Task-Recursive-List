export interface FormInput {
  condition?: Object;
  question?: string;
  type: string;
  parentType?: string;
  subForm?: Array<FormInput>;
}
