import { useMutation, useQuery } from "@tanstack/react-query";
import axiosConfig from "./index";
import jwtDecode from "jwt-decode";
import { useStore } from "../store";

export const useAdminLogin = () => {
  const updateAdmin = useStore((state) => state.updateAdmin);

  return useMutation({
    mutationKeyKey: ["organizations"],
    mutationFn: async (data) => {
      const response = await axiosConfig.post("/admin/login", {
        email: data.email,
        password: data.password,
        role: data.role,
      });
      return response.data;
    },
    onSuccess: (response) => {
      const { access_id, admin_id, email, role } = jwtDecode(
        response.data.token
      );
      updateAdmin({ access_id, admin_id, email, role });
    },
  });
};

export const useGetDepartments = () => {
  const token = useStore((state) => state.token);

  return useQuery({
    queryKey: ["departments"],
    queryFn: async () => {
      const response = await axiosConfig.get("/organisation/departments/list", {
        headers: {
          Authorization: token,
        },
      });
      return response.data;
    },
  });
};
