class Api::V1::ErrorsController < ApplicationController
  before_action :set_error, only: [:show, :edit, :update, :destroy]

  def index
    if params[:task_id].present?
      @errors = Task.find(params[:task_id]).task_errors
    else
      @errors = Error.all
    end
    render json: @errors
  end

  def show
    render json: @error
  end

  def create
    @task = Task.find(params[:task_id])
    @error = @task.task_errors.new(error_params)
    if @error.save
      render json: @error, status: :created
    else
      render json: @error.errors, status: :unprocessable_entity
    end
  end

  def update
    if @error.update(error_params)
      render json: @error, status: :ok
    else
      render json: @error.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @error.destroy
    render json: :no_content, status: :ok
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_error
      @error = Error.find(params[:id])
      @task = Task.find(params[:task_id]) if params[:task_id].present?
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def error_params
      params.require(:error).permit(:task_id, :message, :backtrace)
    end
end
