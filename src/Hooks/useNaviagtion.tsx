import { useEffect, useState } from "react";
import { StepDetail } from "../component/types";
import { useAppDispatch, useAppSelector } from "../redux/store";
import {
  createCustomer,
  fetchIssueAndSubIssues,
  fetchQuestionList,
  validateCustomer,
} from "../redux/data/issueSlice";
import { useFormData } from "../Provider/FormDataConext";
import { masterSubmitApi } from "../redux/validate-tenant/authSlice";
import moment from "moment";

export const useNavigation = ({ watch }: any) => {
  const initialSteps = useAppSelector((state) => state.auth.indicators);
  const [steps, setSteps] = useState(initialSteps);
  const [currentId, setCurrentId] = useState<number>(steps && steps[0].id);
  const [stepData, setStepData] = useState<{ [key: number]: any }>({});
  const { issueDataOld, formData } = useFormData();

  const updateSteps = (currentIndex: number) => {
    const newSteps: StepDetail[] = steps.map((step, index) => {
      if (index < currentIndex) {
        return { ...step, flag: "Completed" };
      } else if (index === currentIndex) {
        return { ...step, flag: "Active" };
      } else {
        return { ...step, flag: "Default" };
      }
    });
    setSteps(newSteps);
  };
  const createdCustomer = useAppSelector(
    (state) => state.issue.createdCustomer
  );

  const tenantId = useAppSelector((state) => state.auth.tenant);
  function prepareDataToSend(data: any) {
    const { Details, Issue, desc, slotAndDate, messageType } = data;

    let dataToSend = {
      tenant: tenantId,
      customer: createdCustomer?.customer,
      referer_website: "example.com",
      ip: "192.168.1.1",
      is_customer: true,
      date: moment(slotAndDate?.date).format("YYYY-MM-DD"),
      // date: slotAndDate.date,
      start_time: moment(slotAndDate?.start, "HH:mm:ss").format("hh:mm"),
      end_time: moment(slotAndDate?.end, "HH:mm:ss").format("hh:mm"),
      verification_type: messageType,
      status: "booked",
      issues: [],
    };

    dataToSend.issues = Issue.map((issue: any) => {
      // Filtering sub_issues where checked is true
      let subIssues = issue.sub_issue
        .filter((sub: any) => sub.checked)
        .map((sub: any) => ({ sub_issue_id: sub.id }));
      let issueObj = issue.issue_name;
      let questionAnswers = [];
      if (Details) {
        let issueDetail = Details.find((detail: any) => detail.id === issue.id);
        if (issueDetail && issueDetail.questions) {
          questionAnswers = issueDetail.questions
            .map((question: any) => {
              // Find the option that is checked and return the question ID and answer
              let option = question.options.find((opt: any) => opt.checked);
              if (option) {
                return {
                  question_id: question.id,
                  answer: [option.option_title],
                };
              }
              return null; // Return null if no option is checked, filter these out later
            })
            .filter((item: any) => item !== null); // Filter out null entries
        }
      }

      // Get the description from 'desc' using the issue name or use an empty string if not available
      let issueDescription = desc[issue.issue_name] || "";
      if (Object.keys(subIssues).length) {
        return {
          issue_id: issue.id,
          sub_issues: subIssues,
          question_answers: questionAnswers,
          images: { description: issueDescription },
          issuename: issueObj,
        };
      }
    });

    return dataToSend;
  }

  const noVal = watch("no");
  const yesVal = watch("yes");
  const fetchStepData = async (stepId: number) => {
    // Check if data for this step is already fetched and stored
    if (stepData[stepId]) {
      return stepData[stepId];
    }
    try {
      let response;
      switch (stepId) {
        case 2:
          // Assuming fetching question list logic here
          const ids =
            issueDataOld &&
            issueDataOld
              .filter((item) => item.sub_issue.some((sub) => sub.checked))
              .map((item) => item.id)
              .join(",");
          response = await dispatch(fetchQuestionList(ids)).unwrap();
          break;
        case 3:
          // Assuming some default data logic for step 3
          response = "Step 3 data";
          break;
        case 4:
          // Assuming some default data logic for step 3
          response = "Step 4 data";
          break;
        case 6:
          // Assuming some default data logic for step 3
          response = "Step 6 data";
          break;
        case 5:
          if (formData.isCurrentCustomer.toLowerCase() === "yes") {
            // Validate existing customer
            response = await dispatch(
              validateCustomer(yesVal?.oldphone)
            ).unwrap();
          } else {
            // Create new customer
            response = await dispatch(
              createCustomer({
                name: noVal?.name || "",
                email: noVal?.email || "",
                phone: noVal?.newphone || "",
                tenant: 9,
                address: noVal?.address || "",
              })
            ).unwrap();

            // Check for specific success message
            if (response.message !== "Customer created successfully") {
              throw new Error("Failed to create customer");
            }
          }
          break;

        case 7:
          // Assuming some default data logic for step 6
          let data = watch();
          let dataTosend = prepareDataToSend(data);
          // let dataTosend = prepareDataToSend(data);
          const bodyData = new FormData();
          bodyData.append("data", JSON.stringify(dataTosend));
          data?.files?.length &&
            dataTosend.issues.forEach((issue: any) => {
              const targetIssueFiles = data.files.find(
                (f: any) => f.issue_name === issue.issuename
              );
              if (targetIssueFiles && targetIssueFiles.image) {
                targetIssueFiles.image.forEach((file: any) => {
                  // Append each file under a specific key for this issue
                  bodyData.append(`issue_${issue.issue_id}_images`, file.file);
                });
              }
            });
          response = await dispatch(masterSubmitApi(bodyData)).unwrap();
          break;
        default:
          response = "Default response data";
          break;
      }

      // Store the result in stepData state on success
      setStepData((prevData) => ({ ...prevData, [stepId]: response }));
      return response;
    } catch (error) {
      console.error("API call failed:", error);
      return null; // Return null to indicate failure
    }
  };
  const isValidateTenant = useAppSelector(
    (state) => state.auth.isValidateTenant
  );
  const dispatch = useAppDispatch();
  useEffect(() => {
    // Perform the initial API call for the first step (currentId 1) when the component mounts
    if (isValidateTenant) {
      const initialFetch = async () => {
        let response: { data: any };
        await dispatch(fetchIssueAndSubIssues(tenantId)).unwrap();
        updateSteps(0); // Initialize the steps state to set the first step as active
        response = { data: issueDataOld };
        setStepData((prevData) => ({ ...prevData, [1]: response.data }));
      };
      initialFetch();
    }
  }, [isValidateTenant]);

  const goToNext = async () => {
    const currentIndex = steps.findIndex((step) => step.id === currentId);
    const nextIndex = currentIndex + 1;
    if (nextIndex < steps.length) {
      const result = await fetchStepData(steps[nextIndex].id);
      if (result) {
        setCurrentId(steps[nextIndex].id);
        updateSteps(nextIndex);
      }
    } else if (nextIndex === steps.length) {
      const result = await fetchStepData(steps.length + 1);
      if (result) {
        setCurrentId(steps[nextIndex].id);
        updateSteps(nextIndex);
      }
    } else {
      console.log("Next index out of range:", nextIndex);
    }
  };

  const goToPrevious = () => {
    const currentIndex = steps.findIndex((step) => step.id === currentId);
    const prevIndex = currentIndex - 1;
    if (prevIndex >= 0) {
      setCurrentId(steps[prevIndex].id);
      updateSteps(prevIndex);
    }
  };

  return { steps, goToNext, goToPrevious, currentId };
};
