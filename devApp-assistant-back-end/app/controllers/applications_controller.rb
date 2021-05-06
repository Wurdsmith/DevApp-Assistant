class ApplicationsController < ApplicationController

    def index
        render(json: Application.all)
    end

    def show
        application = Application.find_by(id: params[:id])
        render(json: application)
    end

    
end
