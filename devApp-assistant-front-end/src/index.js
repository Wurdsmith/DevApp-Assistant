companyAdd.addEventListener("submit", Company.postCompany)

Company.fetchCompanies()

function jsonToJs(resp){
    return resp.json()
}

function returntoHome(){
    const jobAppIndex = document.getElementById("BodyContainer");
    jobAppIndex.children[0].innerHTML = "";
    Company.showCompanies()
}