class Api::V1::ApplicationsController < ApplicationController
  before_action :set_application, only: [:show, :edit, :update, :destroy]

  def index
    @applications = Application.all
    render json: JsonBuilder::Application.new(@applications, params).json_hash
  end

  def show
    render json: JsonBuilder::Application.new(@application, params).json_hash
  end

  def create
    @application = Application.new(application_params)
    if @application.save
      render json: @application
    else
      render json: @application.errors, status: :unprocessable_entity
    end
  end

  def update
    respond_to do |format|
      if @application.update(application_params)
        format.html { redirect_to @application, notice: 'Application was successfully updated.' }
        format.json { render :show, status: :ok, location: @application }
      else
        format.html { render :edit }
        format.json { render json: @application.errors, status: :unprocessable_entity }
      end
    end
  end

  def destroy
    @application.destroy
    respond_to do |format|
      format.html { redirect_to applications_url, notice: 'Application was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    def set_application
      @application = Application.find(params[:id])
    end

    def application_params
      params.require(:application).permit(:name)
    end
end
