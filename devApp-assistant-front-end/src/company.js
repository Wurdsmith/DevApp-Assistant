const companyAdd = document.getElementById("CompanyForm")

class Company {
    constructor(company){
        this.id = company.id;
        this.name = company.name;
        this.applications = company.applications;
        this.state = true;
    }

    swapButtonState(){
        this.state = !this.state //This method changes the state of the object, and thus the visible state of the buttons when clicked.
    }

    appendCompany(){
        //Defines document elements for both the main page and company page.
        const CompanyDiv = document.getElementById("Companies"),
                      li = document.createElement("li"),
                  button = document.createElement("button"),
               linebreak = document.createElement("br");

        button.innerHTML = "View/Edit Application(s)"
        li.innerText = this.name;
        button.addEventListener("click", this.showCompanyApps.bind(this), this.swapButtonState())
        li.append(linebreak);
        CompanyDiv.append(li);
            if (!this.state) { //Because the EventListener changed the state during the compiling phase, I had to use the bang operator here.
             li.append(button)
            }
        li.style.fontSize = "x-large";
        appendApplication(this.applications, li)
    }

    showCompanyApps(){
        const jobAppIndex = document.getElementById("JobAppIndex")
        jobAppIndex.children[3].innerHTML = ""
        this.appendCompany();
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

    static postCompany(e){
        e.preventDefault()
        debugger
        const newCompany = e.target.children[1].value
        const body = {
            company: {
                name: newCompany
            }
        }

        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            accept: "application/json"
            },
            body: JSON.stringify(body)
        }
            e.target.reset()

            fetch("http://localhost:3000/companies", options)
            .then(resp => resp.json())
            .then(company => {
                let newCompany = new Company(company)
                newCompany.appendCompany()
            })
    }
        
}