import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import { Formik, ErrorMessage, FormikHelpers } from "formik";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import * as Yup from "yup";

import { Admin } from "@/Types/Admin";
import styles from "./form.module.css";
import Swal from "sweetalert2";

export default function Signin() {
  const router = useRouter();
  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const handleSubmit = async (values: Admin) => {
    const { email, password } = values;

    const response = await signIn("credentials", {
      redirect: false,
      email: email,
      password: password,
    });

    if (response?.ok) return router.push("/admin/dashboard");

    const errorMessage = response?.error!;

    Swal.fire({
      icon: "error",
      title: "Incorrect Credential",
      text: errorMessage,
    });
  };

  return (
    <div className={`${styles.container} mx-auto`}>
      <h1 className="text-center">
        <strong>Welcome Admin!</strong>
      </h1>
      <div className="p-5 rounded">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ handleSubmit, handleChange, values }) => (
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label className={`${styles.textBold}`} htmlFor="email">
                  Email address <span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  name="email"
                  onChange={handleChange}
                  value={values.email}
                  placeholder="Email Address"
                  autoComplete="username"
                  size="lg"
                />
                <ErrorMessage
                  name="email"
                  component="p"
                  className="text-danger"
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label className={`${styles.textBold}`} htmlFor="password">
                  Password <span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  onChange={handleChange}
                  value={values.password}
                  placeholder="Password"
                  autoComplete="current-password"
                  size="lg"
                />
                <ErrorMessage
                  name="password"
                  component="p"
                  className="text-danger"
                />
              </Form.Group>
              <div className="d-grid gap-2">
                <Button
                  type="submit"
                  style={{
                    backgroundImage:
                      "linear-gradient(45deg, rgb(253, 126, 20) 0%, rgb(250, 82, 82) 100%)",
                    border: "none",
                    fontWeight: 500,
                  }}
                  size="lg"
                >
                  Sign In
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
