export interface UserPanelRestro {
  id: string;
  name: string;
  ratings: string;
  logoUrl: string;
  tags: [string];
  isVeg?:boolean;
}
