class Order < ApplicationRecord
    has_many :line_items
    has_many :products, :through => :line_items
    # has_and_belongs_to_many :products, join_table: "line_items"
    belongs_to :user
end
