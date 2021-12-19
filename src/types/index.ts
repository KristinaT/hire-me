export interface Child {
  birthday: string | null;
  checkedIn: boolean;
  checkinTime: string | null;
  pickupTime: string | null;
  name: Name;
  childId: string;
}

export interface Name {
  firstName: string;
  fullName: string;
  lastName: string;
  middleName?: string;
}
