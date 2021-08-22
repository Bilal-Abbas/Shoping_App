class OrderService
  def self.create_order params
    @order = Order.new()
    @order.number = SecureRandom.hex(4)
    products = params[:products].map{|product| Product.find(product["id"])}
    @order.products << products
    @order.user = params[:user]
    @order.price = params[:products].map{|product| product["price"]}.sum
    @order.sub_total = params[:products].map{|product| product["total"]}.sum
    @order.total = params[:products].map{|product| product["total"]}.sum
    if @order.save
      params[:products].map{|product| LineItem.find_by(product_id: product["id"], order_id: @order.id).update(price: product["price"], total: product["total"], quantity: product["quantity"])}
    end
    @order
  end
end