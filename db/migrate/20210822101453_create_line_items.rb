class CreateLineItems < ActiveRecord::Migration[6.1]
  def change
    create_table :line_items do |t|
      t.integer  :quantity
      t.float  :price
      t.float  :total
      t.references :order
      t.references :product
      t.timestamps
    end
  end
end
