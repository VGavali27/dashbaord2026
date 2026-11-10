import api from "@/lib/axios";

/* ================= MAP USER ================= */
const mapUser = (item) => {
  const emp = item.primary_employment;

  return {
    id: item.uuid,
    uuid: item.uuid,

    user_name: `${item.first_name || ""} ${item.last_name || ""}`.trim(),
    user_email: item.email,
    user_phone: item.phone || "N/A",

    designation: emp?.designation || "-",

    last_login_at: item.last_login_at,
    created_at: item.created_at,
    updated_at: item.updated_at,

    status: item.status === "active" ? 1 : 0,
  };
};

/* ================= GET USERS ================= */
export const fetchUsers = async (params) => {
  const res = await api.post("/users/list", {
    pagination: {
      page: params.page || 1,
      limit: params.limit || 10,
    },
    search: params.search || "",
    filters: params.filters || {},
  });

  return {
    data: res.data?.data || [],
    total: res.data?.pagination?.total || 0,
    filtered: res.data?.pagination?.filtered || res.data?.pagination?.total || 0,
  };
};

/* ================= GET USER BY ID ================= */
export const getUserById = async (uuid) => {
  try {
    const res = await api.get(`/users/${uuid}`);
    const user = res.data.data;
    const emp = user.primary_employment;

    return {
      uuid: user.uuid,
      first_name: user.first_name || "",
      last_name: user.last_name || "",
      email: user.email || "",
      phone: user.phone || "",
      status: user.status || "active",

      employment_uuid: emp?.uuid || "",
      company_id: emp?.company?.id || "",
      department_id: emp?.department?.id || "",
      employee_code: emp?.employee_code || "",
      work_email: emp?.work_email || "",
      designation: emp?.designation || "",
      joined_at: emp?.joined_at || "",
      role_id: emp?.role_id || "",
    };
  } catch (error) {
    console.error(error);
    return null;
  }
};

/* ================= GET RAW USER ================= */
export const getUserByUuid = async (uuid) => {
  try {
    const res = await api.get(`/users/${uuid}`);
    return res.data.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

/* ================= CREATE USER ================= */
export const createUser = async (data) => {
  const formData = new FormData();

  formData.append("first_name", data.first_name);
  formData.append("last_name", data.last_name);
  formData.append("phone", data.phone || "");
  formData.append("email", data.personal_email);
  formData.append("password", "Default@123");

  formData.append(
    "employments",
    JSON.stringify([
      {
        company_id: data.company_id || 1,
        department_id: data.department_id || 1,
        employee_code: data.employee_code,
        work_email: data.work_email,
        designation: data.designation,
        joined_at: data.joined_at,
        left_at: null,
        role_id: data.role_id || 1,
        status: data.status || "active",
        is_primary_company: true,
      },
    ])
  );

  if (data.profileImage) {
    formData.append("photo_url", data.profileImage);
  }

  return api.post("/users/", formData);
};

/* ================= UPDATE USER ================= */
export const updateUser = async (uuid, data) => {
  const formData = new FormData();

  formData.append("first_name", data.first_name);
  formData.append("last_name", data.last_name);
  formData.append("phone", data.phone || "");
  formData.append("personal_email", data.email);

  formData.append(
    "employments",
    JSON.stringify([
      {
        uuid: data.employment_uuid,
        company_id: data.company_id,
        department_id: data.department_id,
        employee_code: data.employee_code,
        work_email: data.work_email,
        designation: data.designation,
        joined_at: data.joined_at,
        left_at: null,
        role_id: data.role_id,
        status: data.status,
        is_primary_company: true,
      },
    ])
  );

  if (data.profileImage) {
    formData.append("photo_url", data.profileImage);
  }

  return api.put(`/users/${uuid}`, formData);
};

/* ================= DELETE USER ================= */
export const deleteUser = async (uuid, status = "deleted") => {
  return api.delete(`/users/${uuid}`, {
    data: { status },
  });
};

/* ================= EMPLOYMENTS ================= */
export const getUserEmployments = async () => {
  return api.get("/users/employments");
};

/* ================= COMPANIES ================= */
export const fetchUserCompanies = async () => {
  try {
    const res = await getUserEmployments();

    const employments = res?.data?.data?.employments || [];

    return employments.map((e) => ({
      company_id: e.company?.id || "",
      name: e.company?.name || "",
      department_name: e.department?.name || "",
    }));
  } catch (err) {
    console.error("Failed to fetch employments", err);
    return [];
  }
};