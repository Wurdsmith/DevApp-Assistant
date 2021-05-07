companyAdd.addEventListener("submit", Company.postCompany)

Company.fetchCompanies()

function jsonToJs(resp){
    return resp.json()
}

function returntoHome(){
    const jobAppIndex = document.getElementById("JobAppIndex");
    jobAppIndex.children[2].innerHTML = "";
    Company.showCompanies()
}