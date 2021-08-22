if !Product.exists?
    product_data=[
      {name: "Product 1", price: 10.1, quantity: 100, image: "https://images.unsplash.com/photo-1585155770447-2f66e2a397b5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1189&q=80"}, 
      {name: "Product 2", price: 11.1, quantity: 100, image: "https://images.unsplash.com/photo-1519735777090-ec97162dc266?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1115&q=80"},
      {name: "Product 3", price: 12.1, quantity: 100, image: "https://images.unsplash.com/photo-1522273400909-fd1a8f77637e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80"},
      {name: "Product 4", price: 13.1, quantity: 100, image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"}
    ]
    product_data.map{|data| puts Product.create!(data).inspect }
end


if !User.exists?
  puts User.create!(name: "Bilal", email: "bilalabbas@gmail.com", password: "12345678").inspect
end