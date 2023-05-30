import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import { Formik, ErrorMessage } from "formik";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";

import { getInitialValues, validationSchema } from "@/helpers/Signin/Form";

import styles from "./form.module.css";
import { Admin } from "@/types/Admin";
import Swal from "sweetalert2";

import Field from "@/components/form/InputField";

export default function Signin() {
  const [loading, setLoading] = useState(false);
  const initialValues = getInitialValues();
  const router = useRouter();

  const handleSubmit = async (values: Admin) => {
    setLoading(true);
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
    setLoading(false);
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
              <Field
                type="text"
                name="email"
                label="Email Address"
                handleChange={handleChange}
                value={values.email}
                loading={loading}
              />
              <Field
                type="password"
                name="password"
                label="Password"
                handleChange={handleChange}
                value={values.password}
                loading={loading}
              />
              <div className="d-grid gap-2 mt-3">
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
