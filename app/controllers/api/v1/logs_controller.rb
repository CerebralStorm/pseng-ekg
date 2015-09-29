class Api::V1::LogsController < ApplicationController
  before_action :set_log, only: [:show, :edit, :update, :destroy]

  def index
    if params[:task_id].present?
      @logs = Task.find(params[:task_id]).task_logs
    else
      @logs = Log.all
    end
    render json: @logs
  end

  def show
    render json: @log
  end

  def create
    @task = Task.find(params[:task_id])
    @log = @task.task_logs.new(log_params)
    if @log.save
      render json: @log, status: :created
    else
      render json: @log.logs, status: :unprocessable_entity
    end
  end

  def update
    if @log.update(log_params)
      render json: @log, status: :ok
    else
      render json: @log.logs, status: :unprocessable_entity
    end
  end

  def destroy
    @log.destroy
    render json: :no_content, status: :ok
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_log
      @log = Log.find(params[:id])
      @task = Task.find(params[:task_id]) if params[:task_id].present?
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def log_params
      params.require(:log).permit(:task_id, :value)
    end
end
