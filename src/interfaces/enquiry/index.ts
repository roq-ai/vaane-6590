import { BranchInterface } from 'interfaces/branch';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface EnquiryInterface {
  id?: string;
  source: string;
  branch_id?: string;
  user_id?: string;
  created_at?: any;
  updated_at?: any;

  branch?: BranchInterface;
  user?: UserInterface;
  _count?: {};
}

export interface EnquiryGetQueryInterface extends GetQueryInterface {
  id?: string;
  source?: string;
  branch_id?: string;
  user_id?: string;
}
