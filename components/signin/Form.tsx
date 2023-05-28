import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import * as Yup from "yup";

import Swal from "sweetalert2";
import styles from "./form.module.css";

export default function Signin() {
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email address is required"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: async (values) => {
      const { email, password } = values;

      if (!emptyFields(values)) {
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
      }
    },
  });

  const emptyFields = (fields: Record<string, any>) => {
    const values = Object.values(fields);

    for (let value of values) {
      if (value.length == 0) return true;
    }

    return false;
  };

  return (
    <div className={`${styles.container} mx-auto`}>
      <h1 className="text-center">
        <strong>Welcome Admin!</strong>
      </h1>
      <div className="p-5 rounded">
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label className={`${styles.textBold}`} htmlFor="email">
              Email address <span className="text-danger">*</span>
            </Form.Label>
            <Form.Control
              type="email"
              name="email"
              placeholder="Email Address"
              onChange={formik.handleChange}
              value={formik.values.email}
              autoComplete="username"
              size="lg"
            />
            {formik.touched.email && formik.errors.email ? (
              <p className="text-danger">{formik.errors.email}</p>
            ) : null}
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label className={`${styles.textBold}`} htmlFor="password">
              Password <span className="text-danger">*</span>
            </Form.Label>
            <Form.Control
              type="password"
              name="password"
              placeholder="Password"
              onChange={formik.handleChange}
              value={formik.values.password}
              autoComplete="current-password"
              size="lg"
            />
            {formik.touched.password && formik.errors.password ? (
              <p className="text-danger">{formik.errors.password}</p>
            ) : null}
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
      </div>
    </div>
  );
}
