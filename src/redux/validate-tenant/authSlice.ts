import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axiosClient from "../../api/axiosClient";

const initialState: TenantState = {
  entity: [],
  apiState: "idle",
  error: null,
  loading: false,
  tenant: 0,
  isValidateTenant: false,
  indicators: [
    {
      id: 1,
      label: "Issue",
      detail: "Select issue",
      flag: "Active",
    },
    {
      id: 2,
      label: "Details",
      detail: "Provide details",
      flag: "Default",
    },
    {
      id: 3,
      label: "Photo",
      detail: "Upload photo",
      flag: "Default",
    },
    {
      id: 4,
      label: "Customer",
      detail: "Sign in or create account",
      flag: "Default",
    },
    {
      id: 5,
      label: "Schedule",
      detail: "Choose date time",
      flag: "Default",
    },
    {
      id: 6,
      label: "Confirm",
      detail: "Confirm your request",
      flag: "Default",
    },
  ],
  success: false,
  validationError: "",
};

interface TenantState {
  entity: any[];
  apiState: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  loading: boolean;
  tenant: number;
  indicators: {
    id: number;
    label: string;
    detail: string;
    flag: "Active" | "Default" | "Completed";
  }[];
  success: boolean;
  isValidateTenant: boolean;
  validationError: string;
}

export const validateTenantFromKey = createAsyncThunk<
  any,
  string,
  { rejectValue: string }
>(
  "authentication/validateTenantFromKey",
  async (
    // key,
    key = "MTIzNDU2cvjcf9ynII4C9dhEPvU3gjdiAiJ74hpwWkpnske4EGc=",
    { rejectWithValue }
  ) => {
    try {
      const response: any = await axiosClient.post(`/identify-tenant/`, {
        encrypted_key: key,
      });
      return response.data.result;
    } catch (err: any) {
      // Error handling: make sure to check existence and structure of err.response.data
      return rejectWithValue(
        err.response?.data?.error || "An unexpected error occurred"
      );
    }
  }
);

export const masterSubmitApi = createAsyncThunk<
  any,
  any,
  { rejectValue: string }
>("authentication/masterSubmitApi", async (data, { rejectWithValue }) => {
  try {
    const response: any = await axiosClient.post(`/appointments/`, data);
    return response.data.result;
  } catch (err: any) {
    // Error handling: make sure to check existence and structure of err.response.data
    return rejectWithValue(
      err.response?.data?.error || "An unexpected error occurred"
    );
  }
});

const tenantQuestionSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(validateTenantFromKey.pending, (state) => {
        state.apiState = "loading";
        state.loading = true;
        state.isValidateTenant = false;
      })
      .addCase(
        validateTenantFromKey.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.apiState = "succeeded";
          state.entity = action.payload;
          state.indicators = action.payload.static_data;
          state.tenant = action?.payload?.tenant_id;
          state.isValidateTenant = true;
          state.validationError = "";
        }
      )
      .addCase(validateTenantFromKey.rejected, (state) => {
        state.loading = false;
        state.apiState = "failed";
        state.validationError =
          "Unable to authencticate you , please check your configuration";
        state.isValidateTenant = false;
      })
      .addCase(masterSubmitApi.pending, (state) => {
        state.apiState = "loading";
        state.loading = true;
      })
      .addCase(
        masterSubmitApi.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.apiState = "succeeded";
          console.log(action.payload);
          state.success = true;
        }
      )
      .addCase(
        masterSubmitApi.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.apiState = "failed";
          state.error = action.payload;
          state.success = false;
        }
      );
  },
});

export default tenantQuestionSlice.reducer;
