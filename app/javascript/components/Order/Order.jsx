import React from "react";
import api from "../../helpers/api";
import Row from "./Row";
import "./Order.css";
import { Link } from "react-router-dom";

class Order extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      order: {},
    };
    this.getOrder();
  }

  getOrder = async () => {
    const order_id = this.props.match.params.id;
    if (order_id) {
      const order = await api.getOrder(order_id);
      if (order === undefined) {
        this.props.history.push("/products");
      }
      this.setState({ order });
    } else {
      this.props.history.push("/products");
    }
  };

  render() {
    const { order } = this.state;
    return (
      <div className="container orders-page">
        <div className="row orders-listing-row">
          <div className="col-sm-12 col-md-offset-1">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th className="col-sm-6 col-md-6">Product</th>
                  <th className="col-sm-2 col-md-2">Quantity</th>
                  <th className="col-sm-2 col-md-2 text-center">Price</th>
                  <th className="col-sm-2 col-md-2 text-center">Total</th>
                </tr>
              </thead>
              <tbody>
                {order.products
                  ? order.products.map((product) => {
                      return <Row key={product.id} product={product} />;
                    })
                  : null}
                <tr>
                  <td className="col-sm-6 col-md-6">   </td>
                  <td className="col-sm-2 col-md-2">   </td>
                  <td className="col-sm-2 col-md-2 text-right">
                    <h5>Subtotal</h5>
                  </td>
                  <td className="col-sm-2 col-md-2 text-center">
                    <h5>
                      <strong>${order.sub_total}</strong>
                    </h5>
                  </td>
                </tr>
                <tr>
                  <td className="col-sm-6 col-md-6">   </td>
                  <td className="col-sm-2 col-md-2">   </td>
                  <td className="col-sm-2 col-md-2 text-right">
                    <h5>Estimated shipping</h5>
                  </td>
                  <td className="col-sm-2 col-md-2 text-center">
                    <h5>
                      <strong>$0</strong>
                    </h5>
                  </td>
                </tr>
                <tr>
                  <td className="col-sm-6 col-md-6">   </td>
                  <td className="col-sm-2 col-md-2">   </td>
                  <td className="col-sm-2 col-md-2 text-right">
                    <h3>Total</h3>
                  </td>
                  <td className="col-sm-2 col-md-2 text-center">
                    <h3>
                      <strong>${order.total}</strong>
                    </h3>
                  </td>
                </tr>
                <tr>
                  <td className="col-sm-6 col-md-6">   </td>
                  <td className="col-sm-2 col-md-2">   </td>
                  <td className="col-sm-2 col-md-2 text-right"></td>
                  <td className="col-sm-2 col-md-2 text-center">
                    <Link to="/products">
                      <button
                        type="button"
                        className="btn btn-default continue-shopping"
                      >
                        <span className="glyphicon glyphicon-shopping-cart"></span>
                        Continue Shopping
                      </button>
                    </Link>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default Order;
