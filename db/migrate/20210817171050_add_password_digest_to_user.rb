class AddPasswordDigestToUser < ActiveRecord::Migration[6.1]
  def up
  	remove_column "users", "password"
  	add_column "users", "password_digest", :string
  end
  def down
  	add_column "users", "password", :string, :limit => 40
  	remove_column "users", "password_digest"
  end
end
