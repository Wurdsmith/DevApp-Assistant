class ApplicationsController < ApplicationController

    def index
        render(json: Application.all)
    end
end
