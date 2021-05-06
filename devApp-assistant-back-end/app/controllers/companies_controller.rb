class CompaniesController < ApplicationController

    def index
        render(json: Company.all)
    end

    def show
        company = Company.find_by(id: params[:id])
        render(json: company)
    end


    def create
        company = Company.create(company_params)
        render(json: company)
    end


    def destroy
        company = Company.find_by(id: params[:id])
        company.destroy
        render json: {message: "Succesfully deleted!"}
    end

    private

    def company_params
        params.require(:company).permit(:name)
    end
end
