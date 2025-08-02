 
import MasterSubmitForm from '../Components/MasterSubmitForm';
import MasterlistPage from '../Components/MasterListPage';
import DesignationFormConfig, { DesignationListConfig } from '../config/DesignationForm.Config';
 
export const ModuleSubmitPage = ({ mode }) => {
  const config = DesignationFormConfig(mode);
  return <MasterSubmitForm config={config} />;
};


export const ModuleListPage = () => <MasterlistPage config={DesignationListConfig} />;
 