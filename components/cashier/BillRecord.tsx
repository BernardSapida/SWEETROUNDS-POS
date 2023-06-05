import Placeholder from "react-bootstrap/Placeholder";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import { Dispatch, MutableRefObject, SetStateAction, useState } from "react";
import Image from "next/image";
import Swal from "sweetalert2";
import {
  BsFillCartFill,
  BsFillPrinterFill,
  BsFillTrashFill,
  BsPencilSquare,
} from "react-icons/bs";

import { numberFormat } from "@/helpers/format";
import {
  fetchProductsList,
  createItem,
  createTransaction,
  reduceProduct,
} from "@/helpers/Cashier/Methods";

import { Product } from "@/types/Product";
import { Setting } from "@/types/Setting";

import ModalNote from "./ModalNote";

export default function BillRecord(props: any) {
  const [modalShow, setModalShow] = useState<boolean>(false);
  const [tableLoading, setTableLoading] = useState<boolean>(false);
  const [note, setNote] = useState<string>("No orders note");
  const {
    order,
    data,
    setData,
    setOrder,
    subTotal,
    setting,
    invoiceId,
    cashierName,
    donutQuantity,
    userRole,
    cashierId,
    pageLoading,
  }: {
    order: Record<string, any>;
    data: Product[];
    setData: Dispatch<SetStateAction<Product[] | undefined>>;
    setOrder: Dispatch<SetStateAction<Record<string, any>>>;
    subTotal: MutableRefObject<number>;
    setting: Setting;
    invoiceId: MutableRefObject<string>;
    cashierName: string;
    donutQuantity: MutableRefObject<number>;
    userRole: string;
    cashierId: number;
    pageLoading: boolean;
  } = props;

  const haveAtleastOneDonut = () => {
    return Object.values(order).length > 0;
  };

  const placeOrder = async (event: any) => {
    event.preventDefault();

    setTableLoading(true);

    if (haveAtleastOneDonut()) await processTransaction();
    else displayAlertMessage(true);

    const productList = await fetchProductsList();
    setData(productList.data);
    setTableLoading(false);
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
      await reduceProductQuantity(response.transaction_id);
      displayAlertMessage(false);
      resetOrder();
    }
  };

  const resetOrder = () => {
    setNote("No orders note");
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

  const reduceProductQuantity = async (transaction_id: number) => {
    let updatedItems: Product[] = [];

    Object.values(order).filter(async (item: Record<string, any>) => {
      createItem(item.id, item.quantity, transaction_id);
      reduceProduct(item.id, item.quantity);
      data[item.id - 1]["quantity"]! -= item.quantity;
    });

    updatedItems = [...data];
    setData(updatedItems);
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
          {pageLoading && (
            <Placeholder animation="glow">
              <Placeholder
                style={{
                  borderRadius: 40,
                  height: 80,
                  width: 80,
                }}
                bg="primary"
              />
            </Placeholder>
          )}
          {!pageLoading && (
            <Image
              src={`/cashier.jpg`}
              height={80}
              width={80}
              alt="Cashier Image"
              className="my-2"
            ></Image>
          )}
        </div>
        <div className="w-100">
          <p className="text-secondary lh-1 mb-1">
            {pageLoading && (
              <Placeholder animation="glow">
                <Placeholder
                  xs={3}
                  style={{ borderRadius: 5 }}
                  bg="secondary"
                />
              </Placeholder>
            )}
            {!pageLoading && userRole}
          </p>
          <p className="lh-1 my-0">
            {pageLoading && (
              <Placeholder animation="glow">
                <Placeholder xs={6} style={{ borderRadius: 5 }} bg="dark" />
              </Placeholder>
            )}
            {!pageLoading && <strong>{cashierName}</strong>}
          </p>
        </div>
      </div>
      <hr />
      <div>
        <div className="mb-3 d-flex align-items-center justify-content-between">
          <p className="fs-4 lh-0 my-0 w-100">
            {pageLoading && (
              <Placeholder animation="glow">
                <Placeholder
                  xs={3}
                  style={{ borderRadius: 5, height: 30 }}
                  bg="secondary"
                />
              </Placeholder>
            )}
            {!pageLoading && <strong>Bills</strong>}
          </p>
          {pageLoading && (
            <Placeholder.Button
              variant="dark"
              style={{ borderRadius: 5, width: 150, height: 30 }}
            ></Placeholder.Button>
          )}
          {!pageLoading && (
            <Button
              style={{ width: 150 }}
              variant="outline-dark"
              size="sm"
              onClick={() => setModalShow(true)}
            >
              <BsPencilSquare /> Add Note
            </Button>
          )}
        </div>
        <Form onSubmit={placeOrder} id="orderForm">
          <ModalNote
            show={modalShow}
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
            {Object.values(order).length === 0 && (
              <>
                {pageLoading && (
                  <Placeholder animation="glow">
                    <Placeholder
                      style={{ borderRadius: 5, height: 20, width: 120 }}
                      bg="dark"
                    />
                  </Placeholder>
                )}
                {!pageLoading && <strong>Empty</strong>}
              </>
            )}
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
            {pageLoading && (
              <Placeholder animation="glow">
                <Placeholder
                  style={{ borderRadius: 5, height: 20, width: 120 }}
                  bg="dark"
                />
              </Placeholder>
            )}
            {!pageLoading && <strong>Subtotal</strong>}
          </p>
          <p className="fs-6 my-0">
            {pageLoading && (
              <Placeholder animation="glow">
                <Placeholder
                  style={{ borderRadius: 5, height: 20, width: 80 }}
                  bg="dark"
                />
              </Placeholder>
            )}
            {!pageLoading && (
              <strong>Php {numberFormat(subTotal.current || 0)}</strong>
            )}
          </p>
        </div>
        <div className="mb-3 d-flex align-items-center justify-content-between">
          <p className="fs-6 my-0 text-secondary">
            {pageLoading && (
              <Placeholder animation="glow">
                <Placeholder
                  style={{ borderRadius: 5, height: 20, width: 120 }}
                  bg="secondary"
                />
              </Placeholder>
            )}
            {!pageLoading && <strong>Tax 10%</strong>}
          </p>
          <p className="fs-6 my-0 text-secondary">
            {pageLoading && (
              <Placeholder animation="glow">
                <Placeholder
                  style={{ borderRadius: 5, height: 20, width: 80 }}
                  bg="secondary"
                />
              </Placeholder>
            )}
            {!pageLoading && <strong>Php {numberFormat(setting?.tax)}</strong>}
          </p>
        </div>
        <div className="mb-3 d-flex align-items-center justify-content-between">
          <p className="fs-6 my-0 text-secondary">
            {pageLoading && (
              <Placeholder animation="glow">
                <Placeholder
                  style={{ borderRadius: 5, height: 20, width: 120 }}
                  bg="secondary"
                />
              </Placeholder>
            )}
            {!pageLoading && <strong>Discount</strong>}
          </p>
          <p className="fs-6 my-0 text-secondary">
            {pageLoading && (
              <Placeholder animation="glow">
                <Placeholder
                  style={{ borderRadius: 5, height: 20, width: 80 }}
                  bg="secondary"
                />
              </Placeholder>
            )}
            {!pageLoading && (
              <strong>Php {numberFormat(setting?.discount)}</strong>
            )}
          </p>
        </div>
        <hr />
        <div className="mb-3 d-flex align-items-center justify-content-between">
          <p className="fs-6 my-0">
            {pageLoading && (
              <Placeholder animation="glow">
                <Placeholder
                  style={{ borderRadius: 5, height: 20, width: 120 }}
                  bg="dark"
                />
              </Placeholder>
            )}
            {!pageLoading && <strong>Total</strong>}
          </p>
          <p className="fs-6 my-0">
            {pageLoading && (
              <Placeholder animation="glow">
                <Placeholder
                  style={{ borderRadius: 5, height: 20, width: 80 }}
                  bg="secondary"
                />
              </Placeholder>
            )}
            {!pageLoading && (
              <strong>
                Php{" "}
                {numberFormat(
                  setting?.tax + (subTotal.current || 0) - setting?.discount
                )}
              </strong>
            )}
          </p>
        </div>
        <div className="mt-5 d-grid gap-2">
          {pageLoading && (
            <Placeholder.Button variant="primary">
              <Placeholder style={{ borderRadius: 5, height: 20 }} />
            </Placeholder.Button>
          )}
          {!pageLoading && (
            <Button
              type="submit"
              form="orderForm"
              disabled={
                tableLoading || userRole === "Order Fulfillment Specialist"
              }
            >
              <BsFillCartFill />
              &nbsp;
              {!tableLoading && "Place Order"}
              {tableLoading && <span>Placing an order...</span>}
            </Button>
          )}
          {pageLoading && (
            <Placeholder.Button variant="dark">
              <Placeholder style={{ borderRadius: 5, height: 20 }} />
            </Placeholder.Button>
          )}
          {!pageLoading && (
            <Button variant="dark" onClick={() => window.print()}>
              <BsFillPrinterFill /> Print Bills
            </Button>
          )}
        </div>
      </div>
    </>
  );
}
