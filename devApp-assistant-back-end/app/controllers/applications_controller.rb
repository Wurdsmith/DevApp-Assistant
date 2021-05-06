class ApplicationsController < ApplicationController

    def index
        render(json: Application.all)
    end

    def show
        application = Application.find_by(id: params[:id])
        render(json: application)
    end

    def create
        application = Application.create(application_params)
        render(json: application)
    end

    def destroy
        application = Application.find_by(id: params[:id])
        application.destroy
        render json: {message: "Succesfully deleted!"}
    end

    private

    def application_params
        params.require(:application).permit(:job_title, :application_date, :status, :notes, :website_link, :email_address, :follow_up_date, :company_id)
    end
end
