import React from "react";
import { withRouter } from "react-router-dom";
import api from "../../helpers/api";
import "./Products.css";
import Row from "./Row";

class Products extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      lineItems: [],
    };
    this.setProducts();
  }

  // componentDidMount() {
  //   this.setProducts();
  // }

  setProducts = async () => {
    const products = await api.getProducts();
    this.setState({ products });
  };

  handleLineItems = async (event, product) => {
    let lineItems = this.state.lineItems;
    if (event === "add") {
      await lineItems.push(product);
      await this.setState({ lineItems });
    } else {
      const productIndex = this.state.lineItems.indexOf(product);
      if (productIndex > -1) {
        await lineItems.splice(productIndex, 1);
        await this.setState({ lineItems });
      }
    }
  };

  handleCheckout = async () => {
    const { lineItems } = this.state;
    if (lineItems.length > 0) {
      const order = await api.createOrder({ products: lineItems });
      if (order) {
        this.props.history.push("/orders/" + order.id);
      }
    }
  };

  render() {
    const { products, lineItems } = this.state;
    return (
      <React.Fragment>
        <div className="container products-page">
          <div className="row products-listing-row">
            <div className="col-sm-12 col-md-offset-1">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Quantity</th>
                    <th className="text-center">Price</th>
                    <th className="text-center">Total</th>
                    <th> </th>
                  </tr>
                </thead>
                <tbody>
                  {products && products.length > 0
                    ? products.map((product) => {
                        return (
                          <Row
                            key={product.id}
                            product={product}
                            lineItems={lineItems}
                            handleLineItems={this.handleLineItems}
                          />
                        );
                      })
                    : null}
                </tbody>
              </table>
              {lineItems.length > 0 ? (
                <div className="checkout">
                  <button
                    type="button"
                    className="btn btn-success"
                    onClick={() => this.handleCheckout()}
                  >
                    Checkout <span className="glyphicon glyphicon-play"></span>
                  </button>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default withRouter(Products);
