import * as yup from 'yup';

export const serviceRecordValidationSchema = yup.object().shape({
  amount: yup.number().integer().required(),
  branch_id: yup.string().nullable(),
  user_id: yup.string().nullable(),
});
