import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Image from "next/image";
import Offcanvas from "react-bootstrap/Offcanvas";
import styles from "./Navbar.module.css";
import { useSession } from "next-auth/react";

import Link from "next/link";

export default function Header() {
  const { data: session } = useSession();
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
    { name: "Sign out", path: "/admin/signout" },
  ];

  return (
    <>
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
          {session && (
            <>
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
                  </Nav>
                </Offcanvas.Body>
              </Navbar.Offcanvas>
            </>
          )}
        </Container>
      </Navbar>
    </>
  );
}
