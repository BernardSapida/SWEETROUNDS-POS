import Container from "react-bootstrap/Container";
import Offcanvas from "react-bootstrap/Offcanvas";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Image from "next/image";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import Link from "next/link";

import { signoutAccount } from "@/helpers/Admin/Methods";

import styles from "./Navbar.module.css";

export default function Header() {
  const { data: session } = useSession();
  const router = useRouter();
  const links = [
    {
      name: "Dashboard",
      path: "/admin/dashboard/",
    },
    {
      name: "Orders",
      path: "/admin/orders/",
    },
    {
      name: "Transactions",
      path: "/admin/transactions/",
    },
    {
      name: "Product Inventory",
      path: "/admin/products/",
    },
    { name: "Customers", path: "/admin/customers/" },
    { name: "Cashier", path: "/admin/cashier/" },
    { name: "Sales Report", path: "/admin/sales/" },
    { name: "Setting", path: "/admin/setting/" },
    { name: "Employee Management", path: "/admin/employee/" },
  ];

  const signout = async () => {
    signOut({
      redirect: false,
    });

    router.push("/");
    await signoutAccount(session?.user.email!);
  };

  return (
    <>
      {session && (
        <Navbar
          expand={false}
          sticky="top"
          bg="light"
          className={`${styles.navbar} bg-white`}
          style={{ zIndex: 999 }}
        >
          <Container>
            <Navbar.Brand as={Link} href="/admin/dashboard/">
              <Image
                src="/sweetrounds_banner.png"
                height="50"
                width="200"
                alt="SweetRounds Banner"
                priority={true}
              ></Image>
            </Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Offcanvas placement="end">
              <Offcanvas.Header closeButton>
                <Offcanvas.Title>
                  <Image
                    src="/sweetrounds_banner.png"
                    height="50"
                    width="200"
                    alt="SweetRounds Banner"
                  ></Image>
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                  {links.map((link) => (
                    <Nav.Link as={Link} href={link.path} key={link.name}>
                      {link.name}
                    </Nav.Link>
                  ))}
                  <Nav.Link
                    onClick={signout}
                    className={`${session ? "d-block" : "d-none"}`}
                  >
                    Sign Out
                  </Nav.Link>
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      )}
    </>
  );
}
