 
import MasterSubmitForm from '../Components/MasterSubmitForm';
import MasterlistPage from '../Components/MasterListPage';
import DesignationFormConfig, { DesignationListConfig } from '../config/DesignationForm.Config';
 
export const DesignationSubmitPage = ({ mode }) => {
  const config = DesignationFormConfig(mode);
  return <MasterSubmitForm config={config} />;
};


export const DesignationListPage = () => <MasterlistPage config={DesignationListConfig} />;
 