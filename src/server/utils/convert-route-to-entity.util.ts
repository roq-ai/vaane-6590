const mapping: Record<string, string> = {
  branches: 'branch',
  enquiries: 'enquiry',
  organizations: 'organization',
  'sales-records': 'sales_record',
  'service-records': 'service_record',
  'test-rides': 'test_ride',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
