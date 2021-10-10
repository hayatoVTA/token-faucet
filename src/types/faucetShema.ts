import * as yup from "yup";

export const faucetSchema = yup.object({
  // account: yup.string()
  //   .required('Invalid Details')
  //   .matches(/^0x[a-fA-F0-9]{40}$/, 'Invalid Details'),
  amount: yup.number()
    .typeError("Must be a number")
    .positive("Must be a positive number")
    .max(1000, "Too much")
    .required('Invalid Details'),
  // amount: yup.string().required('Invalid Details')
}).required();
