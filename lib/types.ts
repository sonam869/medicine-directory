export interface Medicine {
  id?: string;

  brandName?: string;
  genericName?: string;

  activeIngredient?: string[];
  purpose?: string[];
  warnings?: string[];
  dosageAndAdministration?: string[];
}