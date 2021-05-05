class Company {
    constructor(company){
        this.id = company.id
        this.name = company.name
        this.applications = company.applications
    }

    appendCompany(){
        const CompanyDiv = document.getElementById("Companies")
        const li = document.createElement("li");
        li.innerText = this.name;
        CompanyDiv.append(li);
        debugger
        appendApplication(this.applications, li)
    }

    static fetchCompanies(){
        fetch("http://localhost:3000/companies")
        .then(resp => resp.json())
        .then(this.appendCompanies)
    }


    static appendCompanies(companies){
        for (let company of companies){
            let newCompany = new Company(company);
            newCompany.appendCompany();
        }

    }



    
}