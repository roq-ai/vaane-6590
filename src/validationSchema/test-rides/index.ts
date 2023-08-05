import * as yup from 'yup';

export const testRideValidationSchema = yup.object().shape({
  branch_id: yup.string().nullable(),
  user_id: yup.string().nullable(),
});
