import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import { signIn } from "next-auth/react";
import { useRef, useState } from "react";
import { useRouter } from "next/router";
import Swal from "sweetalert2";

export default function Signin() {
  const email = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const handleSignin = async (event: any) => {
    event.preventDefault();

    const emailInput = email.current?.value;
    const passwordInput = password.current?.value;

    if (emailInput != "" && passwordInput != "") {
      const response = await signIn("credentials", {
        redirect: false,
        email: emailInput,
        password: passwordInput,
      });

      if (response?.ok) return router.push("/admin/dashboard");

      const errorMessage = response?.error!;

      Swal.fire({
        icon: "error",
        title: "Incorrect Credential",
        text: errorMessage,
      });
    }
  };

  return (
    <div className="mx-auto" style={{ maxWidth: 800, width: "100%" }}>
      <h1 className="text-center mb-4">
        <strong>Welcome Admin!</strong>
      </h1>
      <div className="bg-white p-5 rounded">
        <Form onSubmit={handleSignin}>
          <Form.Group className="mb-3">
            <Form.Label style={{ fontWeight: "500" }}>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Email Address"
              ref={email}
              autoComplete="username"
              size="lg"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label style={{ fontWeight: "500" }}>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              ref={password}
              autoComplete="current-password"
              size="lg"
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
      </div>
    </div>
  );
}
