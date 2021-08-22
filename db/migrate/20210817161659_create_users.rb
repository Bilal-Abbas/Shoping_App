class CreateUsers < ActiveRecord::Migration[6.1]
  def change
    create_table :users do |t|
      t.string "name", :limit => 50
      t.string "email", :default => "", :null => false
      t.string "password", :limit => 40
      t.string "api_token", :limit => 32
      t.timestamps
    end
  end
end
