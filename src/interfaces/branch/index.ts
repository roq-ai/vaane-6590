import { EnquiryInterface } from 'interfaces/enquiry';
import { SalesRecordInterface } from 'interfaces/sales-record';
import { ServiceRecordInterface } from 'interfaces/service-record';
import { TestRideInterface } from 'interfaces/test-ride';
import { OrganizationInterface } from 'interfaces/organization';
import { GetQueryInterface } from 'interfaces';

export interface BranchInterface {
  id?: string;
  name: string;
  organization_id?: string;
  created_at?: any;
  updated_at?: any;
  enquiry?: EnquiryInterface[];
  sales_record?: SalesRecordInterface[];
  service_record?: ServiceRecordInterface[];
  test_ride?: TestRideInterface[];
  organization?: OrganizationInterface;
  _count?: {
    enquiry?: number;
    sales_record?: number;
    service_record?: number;
    test_ride?: number;
  };
}

export interface BranchGetQueryInterface extends GetQueryInterface {
  id?: string;
  name?: string;
  organization_id?: string;
}
