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
      const { access_id, admin_id, email, role } = jwtDecode(response.data);
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

export const useGetDepartmentDetails = (id) => {
  const token = useStore((state) => state.token);

  return useQuery({
    queryKey: ["patients", id],
    queryFn: async () => {
      const response = await axiosConfig.get("/organisation/department", {
        params: {
          department_id: id,
        },
        headers: {
          Authorization: token,
        },
      });
      return response.data;
    },
    enabled: !!id,
  });
};

export const usePriorityPush = () => {
  const token = useStore((state) => state.token);

  return useMutation({
    mutationKeyKey: ["priority"],
    mutationFn: async (data) => {
      const response = await axiosConfig.put(
        "/admin/order/priority/push",
        {
          order_id: data.id,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      return response.data;
    },
  });
};

export const useSchedulePush = () => {
  const token = useStore((state) => state.token);

  return useMutation({
    mutationKeyKey: ["schedule"],
    mutationFn: async (data) => {
      const response = await axiosConfig.put(
        "/admin/order/schedule/push",
        {
          test_id: data.id,
          time_to_schedule: data.time,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      return response.data;
    },
  });
};
