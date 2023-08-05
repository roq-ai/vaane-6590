import * as yup from 'yup';

export const enquiryValidationSchema = yup.object().shape({
  source: yup.string().required(),
  branch_id: yup.string().nullable(),
  user_id: yup.string().nullable(),
});
