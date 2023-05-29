import Image from "next/image";
import {
  BsFillCartFill,
  BsFillPrinterFill,
  BsFillTrashFill,
  BsPencilSquare,
} from "react-icons/bs";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

import { numberFormat } from "@/helpers/format";
import { createTransaction } from "@/helpers/Cashier/Methods";
import ModalNote from "./ModalNote";

export default function BillRecord(props: any) {
  const [modalShow, setModalShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [note, setNote] = useState<string>("No orders note");
  const {
    order,
    setOrder,
    subTotal,
    setting,
    invoiceId,
    cashierName,
    donutQuantity,
    userRole,
    cashierId,
  } = props;

  const haveAtleastOneDonut = () => {
    return Object.values(order).length > 0;
  };

  const placeOrder = async (event: any) => {
    event.preventDefault();

    setLoading(true);

    if (haveAtleastOneDonut()) await processTransaction();
    else displayAlertMessage(true);

    setLoading(false);
  };

  const processTransaction = async () => {
    const response = await createTransaction(
      setting,
      invoiceId,
      donutQuantity.current,
      subTotal.current,
      order,
      note,
      cashierId
    );

    if (response.success) {
      reduceProductQuantity(response.transaction_id);
      resetOrder();
      displayAlertMessage(false);
    }
  };

  const resetOrder = () => {
    setNote("");
    setOrder({});
    subTotal.current = 0;
  };

  const displayAlertMessage = (error: boolean) => {
    Swal.fire({
      icon: `${error ? "error" : "success"}`,
      title: `${error ? "No Donut" : "Transaction Completed"}`,
      text: `${
        error ? "Please add atleast one donut!" : "Order successfully placed!"
      }`,
    });
  };

  const reduceProductQuantity = (transaction_id: number) => {
    Object.values(order).filter(async (item: any) => {
      await axios.post(
        `${process.env.NEXT_PUBLIC_URL}/api/v1/transaction_items/create`,
        {
          quantity: item.quantity,
          transaction_id: transaction_id,
          product_id: item.id,
        }
      );

      await axios.post(
        `${process.env.NEXT_PUBLIC_URL}/api/v1/products/reduce`,
        {
          id: item.id,
          quantity: item.quantity,
        }
      );
    });
  };

  const removeItem = (id: string) => {
    const newOrder = {};

    delete order[id];
    Object.assign(newOrder, order);

    setOrder(newOrder);
  };

  return (
    <>
      <div className="d-flex align-items-center gap-4">
        <div>
          <Image
            src={`/cashier.jpg`}
            height={80}
            width={80}
            alt="Cashier Image"
            className="my-2"
          ></Image>
        </div>
        <div>
          <p className="text-secondary lh-1 mb-1">{userRole}</p>
          <p className="lh-1 my-0">
            <strong>{cashierName}</strong>
          </p>
        </div>
      </div>
      <hr />
      <div>
        <div className="mb-3 d-flex justify-content-between">
          <p className="fs-4 lh-0 my-0">
            <strong>Bills</strong>
          </p>
          <Button
            variant="outline-dark"
            size="sm"
            onClick={() => setModalShow(true)}
          >
            <BsPencilSquare /> Add Note
          </Button>
        </div>
        <Form onSubmit={placeOrder} id="orderForm">
          <ModalNote
            modalShow={modalShow}
            setModalShow={setModalShow}
            note={note}
            setNote={setNote}
          />
          <div
            style={{
              maxHeight: 470,
              height: "100%",
              overflowY: "scroll",
              overflowX: "hidden",
            }}
          >
            {Object.values(order).length === 0 && <p>Empty</p>}
            {Object.values(order).map((item: any, index: number) => (
              <div key={index} className="d-flex align-items-center gap-3">
                <div>
                  <Image
                    src={`/donuts/${item.image}`}
                    height={100}
                    width={100}
                    alt="Donut Image"
                    className="my-2"
                  ></Image>
                </div>
                <div>
                  <p className="lh-1 fs-6 my-1">
                    <strong>{item.name}</strong>
                  </p>
                  <Form.Group className="mb-3">
                    <Form.Control
                      type="number"
                      name={item.id}
                      placeholder="Quantity"
                      value={+item.quantity}
                      readOnly
                    />
                  </Form.Group>
                </div>
                <Button variant="danger" onClick={() => removeItem(item.id)}>
                  <BsFillTrashFill />
                </Button>
              </div>
            ))}
          </div>
        </Form>
        <div className="mt-5 mb-3 d-flex align-items-center justify-content-between">
          <p className="fs-6 my-0">
            <strong>Subtotal</strong>
          </p>
          <p className="fs-6 my-0">
            <strong>Php {numberFormat(subTotal.current || 0)}</strong>
          </p>
        </div>
        <div className="mb-3 d-flex align-items-center justify-content-between">
          <p className="fs-6 my-0 text-secondary">
            <strong>Tax 10%</strong>
          </p>
          <p className="fs-6 my-0 text-secondary">
            <strong>Php {numberFormat(setting?.tax)}</strong>
          </p>
        </div>
        <div className="mb-3 d-flex align-items-center justify-content-between">
          <p className="fs-6 my-0 text-secondary">
            <strong>Discount</strong>
          </p>
          <p className="fs-6 my-0 text-secondary">
            <strong>Php {numberFormat(setting?.discount)}</strong>
          </p>
        </div>
        <hr />
        <div className="mb-3 d-flex align-items-center justify-content-between">
          <p className="fs-6 my-0">
            <strong>Total</strong>
          </p>
          <p className="fs-6 my-0">
            <strong>
              Php{" "}
              {numberFormat(
                setting?.tax + (subTotal.current || 0) - setting?.discount
              )}
            </strong>
          </p>
        </div>
        <div className="mt-5 d-grid gap-2">
          <Button
            type="submit"
            form="orderForm"
            disabled={loading || userRole === "Order Fulfillment Specialist"}
          >
            <BsFillCartFill />
            &nbsp;
            {!loading && "Place Order"}
            {loading && <span>Placing an order...</span>}
          </Button>
          <Button variant="dark" onClick={() => window.print()}>
            <BsFillPrinterFill /> Print Bills
          </Button>
        </div>
      </div>
    </>
  );
}
