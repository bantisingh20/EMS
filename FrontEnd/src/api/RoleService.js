// import axiosInstance from "../axiosInstance";

// // Save a new role
// const SaveNewRole = async (submitRoleData) => {
//   try {
//     const response = await axiosInstance.post(`/role/save-role`, submitRoleData);
//     return response;
//   } catch (error) {
//     console.error("Error saving role:", error);
//     throw error;
//   }
// };

// // Update an existing role
// const UpdateRole = async (submitRoleData) => {
//   try {
//     const response = await axiosInstance.put(`/role/UpdateRole`, submitRoleData);
//     return response;
//   } catch (error) {
//     console.error("Error updating role:", error);
//     throw error;
//   }
// };

// // Get all roles
// const GetAllRoles = async () => {
//   try {
//     const response = await axiosInstance.get(`/role/GetAllRoles`);
//     return response;
//   } catch (error) {
//     console.error("Error fetching roles:", error);
//     throw error;
//   }
// };

// // Get a role by ID
// const GetRoleById = async (id) => {
//   try {
//     const response = await axiosInstance.get(`/role/GetRolesById/${id}`);
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching role by ID:", error);
//     throw error;
//   }
// };

// // Delete a role by ID
// const DeleteRoleById = async (_id) => {
//   const userConfirmed = await confirm("Are you sure?");
//   if (userConfirmed) {
//     try {
//       const response = await axiosInstance.delete(`/role/deleteRoleById/${_id}`);
//       return response;
//     } catch (error) {
//       throw error.response.data;
//     }
//   }
// };

// export {
//   SaveNewRole,
//   UpdateRole,
//   GetAllRoles,
//   GetRoleById,
//   DeleteRoleById
// };


import axiosInstance from "../axiosInstance";

const SaveNewRole = async (data) => {
  return await axiosInstance.post(`/role/save-role`, data);
};

const UpdateRole = async (data) => {
  return await axiosInstance.put(`/role/UpdateRole`, data);
};

const GetAllRoles = async () => {
  return await axiosInstance.get(`/role/GetAllRoles`);
};

const GetRoleById = async (id) => {
  return await axiosInstance.get(`/role/GetRolesById/${id}`);
};

const DeleteRoleById = async (id) => {
  return await axiosInstance.delete(`/role/deleteRoleById/${id}`);
};

export { SaveNewRole, UpdateRole, GetAllRoles, GetRoleById, DeleteRoleById };
