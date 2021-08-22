import React, { Component } from "react";

class Row extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: this.props.product,
    };
  }

  render() {
    const { product } = this.state;
    return (
      <tr>
        <td className="col-sm-6 col-md-6">
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
                <strong>In Stock</strong>
              </span>
            </div>
          </div>
        </td>
        <td className="col-sm-2 col-md-2" style={{ textAlign: "center" }}>
          <strong>{product.quantity}</strong>
        </td>
        <td className="col-sm-2 col-md-2 text-center">
          <strong>${product.price}</strong>
        </td>
        <td className="col-sm-2 col-md-2 text-center">
          <strong>${product.total}</strong>
        </td>
      </tr>
    );
  }
}

export default Row;
