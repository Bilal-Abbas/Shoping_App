module ApplicationHelper
  def two_decimal(value)
      number_with_precision(value, :precision => 2)
  end
end
