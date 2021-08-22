import React, { Component } from "react";

class Row extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: props.product,
      quantity: 1,
      total: props.product.price,
    };
  }

  handleQuantity = async (event) => {
    if (event.target.value > 0) {
      await this.setState({ quantity: event.target.value });
      let total = this.props.product.price * this.state.quantity;
      await this.setState({ total });
    } else {
      await this.setState({ quantity: 1 });
      let total = this.props.product.price * this.state.quantity;
      await this.setState({ total });
    }
    this.handleAddToCart("remove", this.state.product);
  };

  handleAddToCart = async (event, product) => {
    product.quantity = parseInt(this.state.quantity);
    product.total = this.state.total;
    this.props.handleLineItems(event, product);
  };

  render() {
    const { product, quantity, total } = this.state;
    const { lineItems } = this.props;
    return (
      <tr>
        <td className="col-sm-8 col-md-6">
          <div className="media">
            <a className="thumbnail pull-left" href="#">
              <img
                className="media-object"
                src={product.image}
                style={{ width: "72px", height: "72px" }}
              />
            </a>
            <div className="media-body">
              <h4 className="media-heading">
                <a href="#">{product.name}</a>
              </h4>
              <h5 className="media-heading">
                by <a href="#">Bilal Abbas</a>
              </h5>
              <span>Status: </span>
              <span className="text-success">
                <strong>{quantity > 0 ? "In Stock" : "Out of Stock"}</strong>
              </span>
            </div>
          </div>
        </td>
        <td className="col-sm-1 col-md-1" style={{ textAlign: "center" }}>
          <input
            type="number"
            className="form-control"
            min={1}
            value={quantity}
            onChange={(event) => this.handleQuantity(event)}
          />
        </td>
        <td className="col-sm-1 col-md-1 text-center">
          <strong>${product.price}</strong>
        </td>
        <td className="col-sm-1 col-md-1 text-center">
          <strong>${parseFloat(total).toFixed(2)}</strong>
        </td>
        <td className="col-sm-1 col-md-2 action">
          {lineItems.indexOf(product) > -1 ? (
            <button
              id={product.id}
              name="remove"
              type="button"
              className="btn btn-danger"
              onClick={(event) =>
                this.handleAddToCart(event.target.name, product)
              }
            >
              <span className="glyphicon glyphicon-remove"></span> Remove
            </button>
          ) : (
            <button
              id={product.id}
              name="add"
              type="button"
              className="btn btn-success"
              onClick={(event) =>
                this.handleAddToCart(event.target.name, product)
              }
            >
              <span className="glyphicon glyphicon-remove"></span> Add
            </button>
          )}
        </td>
      </tr>
    );
  }
}

export default Row;
