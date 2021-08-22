class User < ApplicationRecord
    has_secure_password
    has_many :orders

    validates :email, :presence => true, :length => {:within => 8..50}, :uniqueness => true, :format => {:with => /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\Z/i}, :confirmation => true
end
