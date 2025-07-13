import React from 'react';
import RoleFormConfig, { RoleListConfig } from '../config/role.config';
import MasterSubmitForm from '../Components/MasterSubmitForm';
import MasterlistPage from '../Components/MasterListPage';
 
export const RoleSubmitForm = ({ mode }) => {
  const config = RoleFormConfig(mode);
  return <MasterSubmitForm config={config} />;
};
 
export const ListRole = () => <MasterlistPage config={RoleListConfig} />;

 