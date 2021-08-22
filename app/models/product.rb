class Product < ApplicationRecord
    has_many :line_items
    has_many :orders, :through => :line_items
    # has_and_belongs_to_many :orders, join_table: "line_items"
end
