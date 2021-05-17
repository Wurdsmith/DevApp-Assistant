const companyAdd = document.getElementById("CompanyForm")
const back = document.createElement("a")
Window.state = true;

companyAdd.addEventListener("submit", Company.postCompany)

Company.fetchCompanies()

function jsonToJs(resp){
    return resp.json()
}

function returntoHome(){
    Window.state = true;
    const jobAppIndex = document.getElementById("BodyContainer");
    jobAppIndex.children[0].innerHTML = "";
    Company.showCompanies()
}