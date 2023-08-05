interface AppConfigInterface {
  ownerRoles: string[];
  customerRoles: string[];
  tenantRoles: string[];
  tenantName: string;
  applicationName: string;
  addOns: string[];
}
export const appConfig: AppConfigInterface = {
  ownerRoles: ['Branch Manager'],
  customerRoles: [],
  tenantRoles: ['Business Owner', 'Branch Manager', 'Sales Representative', 'Service Representative'],
  tenantName: 'Organization',
  applicationName: 'VAANE',
  addOns: ['file upload', 'chat', 'notifications', 'file'],
};
