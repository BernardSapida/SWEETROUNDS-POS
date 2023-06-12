import Placeholder from "react-bootstrap/Placeholder";
import Container from "react-bootstrap/Container";
import Offcanvas from "react-bootstrap/Offcanvas";
import { TbTruckDelivery, TbCurrencyPeso } from "react-icons/tb";
import { HiOutlineDocumentReport } from "react-icons/hi";
import { MdOutlinePointOfSale } from "react-icons/md";
import { AiOutlineShop, AiOutlineSetting } from "react-icons/ai";
import { RiDashboard3Line, RiCustomerService2Line } from "react-icons/ri";
import { FiLogOut } from "react-icons/fi";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

import { useEffect, useState } from "react";
import Image from "next/image";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import Link from "next/link";

import { signoutAccount } from "@/helpers/Admin/Methods";

import styles from "./Navbar.module.css";

export default function Header() {
  const [loading, setLoading] = useState(true);
  const { data: session } = useSession();
  const router = useRouter();
  const page = router.asPath;

  const links = [
    {
      name: "Dashboard",
      path: "/admin/dashboard",
      icon: <RiDashboard3Line className="mb-1" style={{ fontSize: 24 }} />,
    },
    {
      name: "Orders",
      path: "/admin/orders",
      icon: <TbTruckDelivery className="mb-1" style={{ fontSize: 24 }} />,
    },
    {
      name: "Transactions",
      path: "/admin/transactions",
      icon: <TbCurrencyPeso className="mb-1" style={{ fontSize: 24 }} />,
    },
    {
      name: "Product Inventory",
      path: "/admin/products",
      icon: <AiOutlineShop className="mb-1" style={{ fontSize: 24 }} />,
    },
    {
      name: "Customers",
      path: "/admin/customers",
      icon: (
        <RiCustomerService2Line className="mb-1" style={{ fontSize: 24 }} />
      ),
    },
    {
      name: "Point of Sale",
      path: "/admin/cashier",
      icon: <MdOutlinePointOfSale className="mb-1" style={{ fontSize: 24 }} />,
    },
    {
      name: "Sales Report",
      path: "/admin/sales",
      icon: (
        <HiOutlineDocumentReport className="mb-1" style={{ fontSize: 24 }} />
      ),
    },
    {
      name: "Setting",
      path: "/admin/setting",
      icon: <AiOutlineSetting className="mb-1" style={{ fontSize: 24 }} />,
    },
    {
      name: "Employee Management",
      path: "/admin/employee",
      icon: <RiDashboard3Line className="mb-1" style={{ fontSize: 24 }} />,
    },
  ];

  useEffect(() => setLoading(false), []);

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
              {!loading && (
                <Image
                  src="/sweetrounds_banner.png"
                  height="50"
                  width="200"
                  alt="SweetRounds Banner"
                  priority={true}
                ></Image>
              )}
              {loading && (
                <Placeholder animation="glow" variant="dark" xs={7}>
                  <Placeholder
                    xs={12}
                    style={{ height: 35, borderRadius: 5 }}
                  />
                </Placeholder>
              )}
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
                <Nav className="justify-content-end flex-grow-1">
                  {links.map((link) => (
                    <Nav.Link
                      as={Link}
                      href={link.path}
                      key={link.name}
                      style={{
                        color: page === link.path ? "#FF6D6D" : "black",
                        fontSize: 18,
                        fontWeight: 600,
                      }}
                    >
                      {link.icon} {link.name}
                    </Nav.Link>
                  ))}
                  <Nav.Link
                    onClick={signout}
                    className={`${session ? "d-block" : "d-none"}`}
                    style={{
                      fontSize: 18,
                      fontWeight: 600,
                    }}
                  >
                    <FiLogOut
                      className="mb-1"
                      style={{ marginLeft: 2, fontSize: 24 }}
                    />{" "}
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
