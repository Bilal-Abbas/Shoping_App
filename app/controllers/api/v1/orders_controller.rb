class Api::V1::OrdersController < Api::V1::BaseController
  before_action :set_class_attributes
  before_action :set_params_attributes, only: [:update]

  def create
    order = OrderService.create_order({
      products: params[:products],
      user: is_authenticated
    })
    if order
      render :json => {
        success: true,
        message: "Order created sucessfully",
        order: order,
      }
    else
      render :json => {
        success: false,
        message: "Something went wrong",
      }
    end
  end
  
  private

  def set_class_attributes
    set_resource_class_attributes(Order)
  end

  def set_params_attributes
    set_resource_params_attributes resource_params
  end

  def resource_params
    params.require(:order).permit(:number, :price, :sub_total, :total, :user)
  end

end
