# README

Please follow the below instructions for setting the application up.
This application have following relationships

# Models

- User
- Product
- Order
- LineItem

# Relations

- User `has_many` orders
- Order `has_many` line_items
- Order `has_many` products through line_items
- Product `has_many` line_items
- Product `has_many` orders through line_items

# How to Setup and Run:

- Ruby version `3.0.0`
- Rails Version `6.1.4.1`
- Please clone the above repository
- Run `bundle install` to install gems
- Run `npm install` to install node modules
- Run `rake db:setup ` to setup database
- Run `rails s` to start the application
