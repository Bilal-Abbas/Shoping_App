class Api::V1::BaseController < Api::V1::AuthenticationController
  attr_accessor :resource_class, :resource_params, :custom_url

  def index
    @resources = self.resource_class.all
    render :json => {
      "#{self.resource_class.name.downcase}s": @resources
    }
  end

  def new
    @resource = self.resource_class.new
  end

  def create
    @resource = self.resource_class.new self.resource_params
    if @resource.save
      redirect_to index_path
    else
      redirect_back fallback_location: index_path
    end
  end

  def show
    @resource = self.resource_class.find_by(id: params[:id])
    if @resource.nil?
      render :json => {
        message: "#{self.resource_class.name} not found",
        success: false,
      }
    end
  end

  def edit
  end

  def update
    if @resource.update_attributes! self.resource_params
      redirect_to index_path
    else
      redirect_back fallback_location: index_path
    end
  end

  def destroy
    if @resource.destroy
      redirect_to index_path
    else
      redirect_back fallback_location: index_path
    end
  end

  protected

    def set_resource_class_attributes(klass)
      self.resource_class = klass
    end

    def set_resource_params_attributes(resource_params={})
      self.resource_params = resource_params
    end

    def set_resource
      @resource = self.resource_class.find(params[:id])
    end

    def set_custom_url(custom_url)
      self.custom_url = custom_url
    end

  private

    def index_path
      custom_url || self.send("#{self.resource_class.name.pluralize.downcase}_path")
    end
end
