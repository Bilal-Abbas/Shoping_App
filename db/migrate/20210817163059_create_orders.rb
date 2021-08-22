class CreateOrders < ActiveRecord::Migration[6.1]
  def change
    create_table :orders do |t|
      t.string :number
      t.float :price
      t.float :sub_total
      t.float :total
      t.references :user
      t.timestamps
    end
  end
end
