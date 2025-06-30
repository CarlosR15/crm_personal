export type ContactEntity = {
  id: string;
  name: string;
  image?: string;
  phoneNumbers?: { number: string }[];
  emails?: { email: string }[];
  dates?: { label?: string; date?: string }[];
};