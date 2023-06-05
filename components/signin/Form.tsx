import Placeholder from "react-bootstrap/Placeholder";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import { useEffect, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { Formik } from "formik";

import { getInitialValues, validationSchema } from "@/helpers/Signin/Form";

import styles from "./form.module.css";
import { Admin } from "@/types/Admin";
import Swal from "sweetalert2";

import Field from "@/components/form/InputField";

export default function Signin() {
  const [pageLoading, setPageLoading] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const initialValues = getInitialValues();
  const router = useRouter();

  useEffect(() => setPageLoading(false), []);

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
        {pageLoading && (
          <Placeholder animation="glow">
            <Placeholder
              xs={4}
              style={{ borderRadius: 5, height: 40 }}
              bg="dark"
            />
          </Placeholder>
        )}
        {!pageLoading && <strong>Welcome Admin!</strong>}
      </h1>
      <div className="p-5 rounded">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ handleSubmit, handleChange, values }) => (
            <Form onSubmit={handleSubmit}>
              {pageLoading && (
                <Placeholder.Button
                  className="w-100 mb-3"
                  variant="secondary"
                  style={{ height: 50 }}
                />
              )}
              {!pageLoading && (
                <Field
                  type="text"
                  name="email"
                  label="Email Address"
                  handleChange={handleChange}
                  value={values.email}
                  loading={loading}
                />
              )}
              {pageLoading && (
                <Placeholder.Button
                  className="w-100 mb-3"
                  variant="secondary"
                  style={{ height: 50 }}
                />
              )}
              {!pageLoading && (
                <Field
                  type="password"
                  name="password"
                  label="Password"
                  handleChange={handleChange}
                  value={values.password}
                  loading={loading}
                />
              )}

              <div className="d-grid gap-2 mt-3">
                {pageLoading && (
                  <Placeholder.Button
                    className="w-100"
                    variant="danger"
                    style={{ height: 50 }}
                  />
                )}
                {!pageLoading && (
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
                )}
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
