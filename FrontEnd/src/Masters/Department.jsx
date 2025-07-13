 

import MasterlistPage from '../Components/MasterListPage';
import DepartmentFormConfig, { DepartmentListConfig } from '../config/DepartmentFormConfig';
import MasterSubmitForm from '../Components/MasterSubmitForm';
 
export const DepartmentPage = ({ mode }) => {
  const config = DepartmentFormConfig(mode);
  return <MasterSubmitForm config={config} />;
};

export const DepartmentList = () => <MasterlistPage config={DepartmentListConfig} />;


