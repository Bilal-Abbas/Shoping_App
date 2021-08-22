class Api::V1::AuthenticationController < ApplicationController
  before_action :is_authenticated, :except => [:login, :signup]

  def signup
    found_user = User.find_by(email: params[:email])
    if found_user
      render :json => {
        message: "User already exist",
        success: false,
      }
    else
      api_token = SecureRandom.hex(16)
      @user = User.new(user_params)
      @user.update(api_token: api_token, password: params[:password])
      render :json => {
        success: true,
        message: "Login sucessfully",
        user: @user.as_json.except("id", "password_digest", "created_at", "updated_at"),
      }
    end
  end

  def login
    if params[:email].present? && params[:password].present?
      found_user = User.find_by(:email => params[:email])
      if found_user
        @user = found_user.authenticate(params[:password])
        if @user
          api_token = SecureRandom.hex(16)
          @user.update(api_token: api_token)
          render :json => {
            success: true,
            message: "Login sucessfully",
            user: @user.as_json.except("id", "password_digest", "created_at", "updated_at"),
          }
        else
          render :json => {
            message: "Password is incorrect.",
            success: false,
          }
        end
      else
        render :json => {
          message: "Invalid email or password",
          success: false,
        }
      end
    end
  end

  private

  def render_unauthenticated 
    self.headers['WWW-Authenticate'] = 'Token realm="Application"'
    render json: {
      :success => false
      }, status: 401
  end

  def is_authenticated
    authenticate_token || render_unauthenticated
  end

  def authenticate_token
    authenticate_with_http_token do |token, options|
      @user = User.find_by(:api_token=> token) rescue nil
    end
    @user
  end

  def render_unauthorized
    render json: {
      :success => false,
      :error => "Un authorized"
    }
  end

  def user_params
    params.permit(:name, :email, :password)
  end
end
