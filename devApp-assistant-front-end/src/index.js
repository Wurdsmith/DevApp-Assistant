companyAdd.addEventListener("submit", Company.postCompany)

Company.fetchCompanies()

function jsonToJs(resp){
    return resp.json()
}