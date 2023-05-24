import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import {
  BsFillFileEarmarkPersonFill,
  BsFillTelephoneFill,
  BsFillCalendarDateFill,
  BsFillPersonVcardFill,
  BsFillCheckCircleFill,
} from "react-icons/bs";
import { HiLocationMarker } from "react-icons/hi";
import { MdLocationCity } from "react-icons/md";

import { numberFormat } from "@/helpers/format";
import { date } from "@/helpers/date";

function Receipt(props: any) {
  const { order, subTotal, setting, invoiceId, cashierName } = props;

  return (
    <Container>
      <p className="lh-0 my-3 fs-6">
        <strong>Invoice ID:</strong> {invoiceId}
      </p>
      <div className="mb-2 d-flex justify-content-between">
        <div>
          <p className="lh-0 my-3 fs-6">
            <BsFillFileEarmarkPersonFill />
            &nbsp;
            <strong>Cashier Name:</strong> {cashierName}
          </p>
          <p className="lh-0 my-3 fs-6">
            <HiLocationMarker /> <strong>Address:</strong> Malagasang 1-F, City
            of Imus, Cavite
          </p>
          <p className="lh-0 my-3 fs-6">
            <MdLocationCity /> <strong>Zip/Country:</strong> 4107, Philippines
          </p>
          <p className="lh-0 my-3 fs-6">
            <BsFillTelephoneFill /> <strong>Contact:</strong> 0947-212-6029
          </p>
        </div>
        <div>
          <p className="lh-0 my-3 fs-6">
            <strong>Invoice</strong>
          </p>
          <p className="lh-0 my-3 fs-6">
            <BsFillPersonVcardFill />
            &nbsp;
            <strong>ID:</strong> {invoiceId}
          </p>
          <p className="lh-0 my-3 fs-6">
            <BsFillCalendarDateFill />
            &nbsp;
            <strong>Issue Date:</strong> {date()}
          </p>
          <p className="lh-0 my-3 fs-6">
            <BsFillCheckCircleFill />
            &nbsp;
            <strong>Status:</strong> Paid
          </p>
        </div>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Donut Name</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {Object.values(order).length === 0 && (
            <tr>
              <td colSpan={5} className="text-center">
                No Items
              </td>
            </tr>
          )}
          {Object.values(order).map((item: any, index: number) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{item.name}</td>
              <td>{item.quantity}</td>
              <td>Php {item.price}</td>
              <td>Php {item.quantity * item.price}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <div className="d-flex justify-content-end">
        <div className="d-flex justify-content-between gap-3">
          <div className="text-end">
            <p className="lh-0 my-3 fs-6">
              <strong>SubTotal:</strong>
            </p>
            <p className="lh-0 my-3 fs-6">
              <strong>Tax 10%:</strong>
            </p>
            <p className="lh-0 my-3 fs-6">
              <strong>Discount:</strong>
            </p>
            <p className="lh-0 my-3 fs-6">
              <strong>Total Amount:</strong>
            </p>
          </div>
          <div>
            <p className="lh-0 my-3 fs-6">
              Php {numberFormat(subTotal.current)}
            </p>
            <p className="lh-0 my-3 fs-6">Php {numberFormat(setting?.tax)}</p>
            <p className="lh-0 my-3 fs-6">
              Php {numberFormat(setting?.discount)}
            </p>
            <p className="lh-0 my-3 fs-6">
              Php{" "}
              {numberFormat(
                setting?.tax + (subTotal.current || 0) - setting?.discount
              )}
            </p>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default Receipt;
