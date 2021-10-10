import * as yup from "yup";

export const faucetSchema = yup.object({
  // account: yup.string()
  //   .required('Invalid Details')
  //   .matches(/^0x[a-fA-F0-9]{40}$/, 'Invalid Details'),
  // amount: yup.number().positive().integer().required(),
  amount: yup.string()
}).required();
