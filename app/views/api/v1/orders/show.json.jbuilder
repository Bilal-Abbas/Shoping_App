json.order do 
  json.partial! 'api/v1/orders/order', order: @resource
end