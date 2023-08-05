import { BranchInterface } from 'interfaces/branch';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface TestRideInterface {
  id?: string;
  branch_id?: string;
  user_id?: string;
  created_at?: any;
  updated_at?: any;

  branch?: BranchInterface;
  user?: UserInterface;
  _count?: {};
}

export interface TestRideGetQueryInterface extends GetQueryInterface {
  id?: string;
  branch_id?: string;
  user_id?: string;
}
