 
import MasterSubmitForm from '../Components/MasterSubmitForm';
import MasterlistPage from '../Components/MasterListPage';
import EmployeeFormConfig, { EmployeeListConfig } from '../config/EmployeeConfig';

export const EmployeeSubmitPage = ({ mode }) => {
  const config = EmployeeFormConfig(mode);
  return <MasterSubmitForm config={config} />;
};


export const ListEmployeeNew = () => <MasterlistPage config={EmployeeListConfig} />;
