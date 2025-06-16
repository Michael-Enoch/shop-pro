
import * as Yup from "yup";

export const userSchema = Yup.object().shape({
  fullName: Yup.string()
    .trim()
    .matches(/^[a-zA-Z\s]+$/, "Fullname can only contain letters and spaces")
    .required("Fullname is required"),

  email: Yup.string()
    .trim()
    .email("Invalid email address")
    .required("Email is required"),

  password: Yup.string()
    .trim()
    .min(5, "Password must be at least 5 characters")
    .required("Password is required"),
});

export const loginSchema = Yup.object().shape({
  email: Yup.string()
    .trim()
    .email("Invalid email address")
    .required("Email is required"),

  password: Yup.string()
    .required("Password is required"),
});
