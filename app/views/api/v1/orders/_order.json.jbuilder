json.id order.id.to_s
json.number order.number
json.sub_total two_decimal(order.sub_total)
json.total two_decimal(order.total)
json.created_at order.created_at

json.user do 
  json.id order.try(:user).try(:to_s)
  json.name order.try(:user).try(:name)
  json.email order.try(:user).try(:email)
end if order.user.present?


json.products order.line_items do |line_item| 
  json.id line_item.product.id.to_s
  json.name line_item.product.name
  json.quantity line_item.quantity
  json.image  line_item.product.image
  json.price two_decimal(line_item.price)
  json.total two_decimal(line_item.total)
  json.created_at_time line_item.created_at.strftime("%d/%m/%Y at %I:%M %p") 
end if order.line_items.present?
