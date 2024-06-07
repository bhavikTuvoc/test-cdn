import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axiosClient from "../../api/axiosClient";

const initialState: TenantState = {
  entities: [],
  apiState: "idle",
  error: null,
  loading: false,
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
  formState: {
    step1: null,
    step2: null,
    step3: null,
    step4: null,
    step5: null,
    step6: null,
  },
  errors: {
    1: null,
    2: null,
    3: null,
    4: null,
    5: null,
    6: null,
  },
  isValidateUser: "Default",
  errorMsg: "",
  createdCustomer: null,
};

interface TenantState {
  entities: any[];
  apiState: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  loading: boolean;
  formState: any;
  isValidateUser: "Yes" | "No" | "Default";
  indicators: {
    id: number;
    label: string;
    detail: string;
    flag: "Active" | "Default" | "Completed";
  }[];
  errors: {
    [key: number]: string | null; // Allows for errors keyed by step number
  };
  errorMsg: string;
  createdCustomer: null | any;
}

export const fetchIssueAndSubIssues = createAsyncThunk<
  any,
  number,
  { rejectValue: string }
>(
  "form-wizard/fetchIssueAndSubIssues",
  async (tenantId, { rejectWithValue }) => {
    try {
      const response: any = await axiosClient.get<{ results: any }>(
        `/issue/?tenant_id=${tenantId}`
      );
      return response.data.result;
    } catch (err: any) {
      // Error handling: make sure to check existence and structure of err.response.data
      console.log(err);
      return rejectWithValue(
        err.response?.data?.error || "An unexpected error occurred"
      );
    }
  }
);

export const fetchQuestionList = createAsyncThunk<
  any,
  string,
  { rejectValue: string }
>("form-wizard/fetchQuestionList", async (issueIds, { rejectWithValue }) => {
  try {
    const response: any = await axiosClient.get<{ results: any }>(
      `/questions/?issue_ids=${issueIds}`
    );
    return response.data.result;
  } catch (err: any) {
    // Error handling: make sure to check existence and structure of err.response.data
    console.log(err);
    return rejectWithValue(
      err.response?.data?.error || "An unexpected error occurred"
    );
  }
});
function formatErrorMessages(errorObj: any) {
  let messages = [];
  for (let key in errorObj) {
    if (errorObj.hasOwnProperty(key)) {
      // Add each error message to the array, you can customize the message here
      messages.push(`${errorObj[key].join(" and ")}`);
    }
  }
  // Join all messages with a period and space to separate sentences
  return messages.join(". ") + ".";
}

export const validateCustomer = createAsyncThunk<
  any,
  string,
  { rejectValue: string }
>("form-wizard/validateCustomer", async (phone, { rejectWithValue }) => {
  try {
    const response = await axiosClient.post(`/verify-phone/`, {
      phone: phone,
    });
    return response.data;
  } catch (err: any) {
    // Error handling: make sure to check existence and structure of err.response.data
    let errorMsg = formatErrorMessages(err?.response?.data);

    return rejectWithValue(errorMsg);
  }
});
export interface CustomerData {
  name: string;
  email: string;
  phone: string;
  address: string;
  tenant: number;
}

export const createCustomer = createAsyncThunk<
  any, // Type of the return value on successful execution
  CustomerData, // Type of the argument for the payload creator
  { rejectValue: string } // Type of the value used in rejectWithValue
>("form-wizard/createCustomer", async (data, { rejectWithValue }) => {
  try {
    const response = await axiosClient.post(`/create-customer/`, data);
    return response.data;
  } catch (err: any) {
    let errorMsg = formatErrorMessages(err?.response?.data);

    return rejectWithValue(
      errorMsg === undefined ? "invalid credentials" : errorMsg
    );
  }
});

const tenantQuestionSlice = createSlice({
  name: "form-wizard",
  initialState,
  reducers: {
    setError: (
      state,
      action: PayloadAction<{ step: number; error: string }>
    ) => {
      const { step, error } = action.payload;
      state.errors[step] = error;
    },
    clearError: (state, action: PayloadAction<number>) => {
      const step = action.payload;
      state.errors[step] = null;
    },
    clearAllErrors: (state) => {
      Object.keys(state.errors).forEach((key) => {
        state.errors[parseInt(key)] = null;
      });
    },
    clearErrorMsg: (state) => {
      state.errorMsg = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchIssueAndSubIssues.pending, (state) => {
        state.apiState = "loading";
        state.loading = true;
      })
      .addCase(
        fetchIssueAndSubIssues.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.apiState = "succeeded";
          state.formState.step1 = action.payload;
        }
      )
      .addCase(
        fetchIssueAndSubIssues.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.apiState = "failed";
          state.error = action.payload;
        }
      )
      .addCase(fetchQuestionList.pending, (state) => {
        state.apiState = "loading";
        state.loading = true;
      })
      .addCase(
        fetchQuestionList.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.apiState = "succeeded";
          state.formState.step2 = action.payload;
        }
      )
      .addCase(
        fetchQuestionList.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.apiState = "failed";
          state.error = action.payload;
        }
      )
      .addCase(validateCustomer.pending, (state) => {
        state.apiState = "loading";
        state.loading = true;
      })
      .addCase(
        validateCustomer.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.apiState = "succeeded";
          state.isValidateUser = "Yes";
          state.errorMsg = "";
          state.createdCustomer = action.payload;
        }
      )
      .addCase(
        validateCustomer.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.apiState = "failed";
          state.error = action.payload;
          state.isValidateUser = "No";
          state.errorMsg = action.payload;
        }
      )
      .addCase(createCustomer.pending, (state) => {
        state.apiState = "loading";
        state.loading = true;
      })
      .addCase(createCustomer.fulfilled, (state, action: any) => {
        state.loading = false;
        state.apiState = "succeeded";
        state.isValidateUser = "Yes";
        state.errorMsg = "";
        state.createdCustomer = action.payload;
      })
      .addCase(createCustomer.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.apiState = "failed";
        state.isValidateUser = "No";
        state.errorMsg = action.payload;
      });
  },
});
export const { setError, clearError, clearAllErrors, clearErrorMsg } =
  tenantQuestionSlice.actions;
export default tenantQuestionSlice.reducer;

// const handleError = (step: number, error: string) => {
//   dispatch(setError({ step, error }));
// };

// const handleClearError = (step: number) => {
//   dispatch(clearError(step));
// };

// const handleClearAllErrors = () => {
//   dispatch(clearAllErrors());
// };
