class Api::V1::UsersController < Api::V1::BaseController
  before_action :set_class_attributes
  before_action :set_params_attributes, only: [:create, :update]

  private

  def set_class_attributes
    set_resource_class_attributes(User)
  end

  def set_params_attributes
    set_resource_params_attributes resource_params
  end

  def resource_params
    params.require(:user).permit(:name, :email, :password)
  end

end
