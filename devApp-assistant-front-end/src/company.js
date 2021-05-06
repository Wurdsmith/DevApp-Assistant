const companyAdd = document.getElementById("CompanyForm")

class Company {
    constructor({id, name, applications}){
        this.id = id;
        this.name = name;
        this.applications = applications.map(app => new Application(app));
        this.state = true;
    }

    swapButtonState(){
        this.state = !this.state //This method changes the state of the object, and thus the visible state of the buttons when clicked.
    }

    appendCompany(){
        //Defines document elements for both the main page and company page.
        const CompanyDiv = document.getElementById("Companies"),
                      li = document.createElement("li"),
                viewEdit = document.createElement("button"),
               linebreak = document.createElement("br");

        viewEdit.innerHTML = "View/Edit Application(s)"
        li.innerText = this.name;
        viewEdit.addEventListener("click", this.showCompanyApps.bind(this), this.swapButtonState())
        li.append(linebreak);
        CompanyDiv.append(li);
            if (!this.state) { //Because the EventListener changed the state during the compiling phase, I had to use the bang operator here.
             li.append(viewEdit);
            }
        li.style.fontSize = "x-large";
        Application.appendApplications(this.applications, li);
    }

    showCompanyApps(){
        const jobAppIndex = document.getElementById("JobAppIndex");
        jobAppIndex.children[3].innerHTML = "";
        this.appendCompany();
        this.appendApplicationForm();
    }

    appendApplicationForm(){
        const apps = document.getElementById("NewApplication");
        const appForm = `
        <h2>Create a New Application for ${this.name}</h2>
        <form id = applicationForm>
        <label>Job Title:</label>
        <input type="text"><br>
        <label>Application Status</label>
        <input type="text"><br>
        <label> Application Date:</label>
        <input type="date"><br>
        <label>Application Link(if any):</label>
        <input type="text"><br>
        <label>Email Contact(if any):</label>
        <input type="text"><br>
        <label>Notes:</label>
        <input type= "textarea"><br>
        <input type= "hidden" id=${this.id}>
        <input type="submit" value="Create Application">
        </form>`
        apps.innerHTML = appForm;
        document.getElementById("applicationForm").addEventListener("submit", Application.addApplication.bind(this))
    }

    static fetchCompanies(){
        fetch("http://localhost:3000/companies")
        .then(resp => resp.json())
        .then(this.appendCompanies);
    }

    static appendCompanies(companies){
        for (let company of companies){
            let newCompany = new Company(company);
            newCompany.appendCompany();
        }
    }

    static postCompany(e){
        e.preventDefault();
        const newCompany = e.target.children[1].value;
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
            e.target.reset();

            fetch("http://localhost:3000/companies", options)
            .then(resp => resp.json())
            .then(company => {
                let newCompany = new Company(company);
                newCompany.appendCompany();
            })
    }
        
}