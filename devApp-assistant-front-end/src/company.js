const jobAppIndex = document.getElementById("BodyContainer");
const jobForm = document.getElementById("FormContainer");


class Company {
    constructor({id, name, applications}){
        this.id = id;
        this.name = name;
        this._applications = applications.map(app => new Application(app));
        Company.allCompanies.push(this);
    }

    appendCompany(){
        //Defines document elements for both the main page and company page.
        const CompanyDiv = document.getElementById("Companies"),
                     div = document.createElement("div"),
                viewEdit = document.createElement("button"),
            companyTitle = document.createElement("h2"),
           deleteCompany = document.createElement("button");
        viewEdit.innerText = "View/Edit Application(s)";
        viewEdit.id = "ViewEdit";
        companyTitle.innerText = this.name;
        div.id = "CompanyDiv"
        CompanyDiv.append(companyTitle);
        companyTitle.id = "CompanyTitle";
        deleteCompany.id = "DeleteCompanyBtn"
        deleteCompany.innerText = "Delete Company and all Applications"
        
        CompanyDiv.append(div);
            if (Window.state) { //Because the EventListener changed the state during the compiling phase, I had to use the bang operator here.
                div.append(viewEdit);

            }
            if(!Window.state){
                companyTitle.append(deleteCompany)
            }
        div.style.fontSize = "x-large";
        Application.appendApplications(this.applications, div);
        viewEdit.addEventListener("click", this.showCompanyApps.bind(this))
        deleteCompany.addEventListener("click", e => {
            this.deleteCompany()
        });
    }

    showCompanyApps(){ 
        Window.state=false;
        jobAppIndex.children[0].innerHTML = "";
        back.id = "Back";
        back.innerText = "Return Home";
       //debugger
        jobForm.append(back);
        this.appendCompany();
        this.appendApplicationForm();
        back.addEventListener("click", returntoHome);
    }

    
    appendApplicationForm(){
        const apps = document.getElementById("NewApplication");
        const appForm = `
        <h2>Create a New Application for ${this.name}</h2>
        <form id = ApplicationForm> 
        <label>Job Title:</label>
        <input type="text"><br>
        <label>Current application status:</label>
        <select id="status" name="status" size="1">
            <option value="Application submitted">Application submitted</option>
            <option value="Application received">Application received</option>
            <option value="Interview(s) requested">Interview(s) requested</option>
            <option value="Interview(s) scheduled">Interview(s) scheduled</option>
            <option value="Interview(s) conducted">Interview(s) conducted</option>
            <option value="Awaiting hiring decision">Awaiting hiring decision</option>
        </select>
        <br>
        <label> Application Date:</label>
        <input type="date"><br>
        <label>Application Link(if any):</label>
        <input type="text"><br>
        <label>Email Contact(if any):</label>
        <input type="text"><br>
        <label>Notes:</label>
        <input type= "textarea"><br>
        <input type= "hidden" id=${this.id}>
        <input id=ApplicationSubmit type="submit" value="Create Application">
        </form>`
        apps.innerHTML = appForm;
        document.getElementById("ApplicationForm").addEventListener("submit", Application.addApplication.bind(this))
    }

    deleteCompany(){
        if (window.confirm("Permanently delete this company and its applications?")) {
        fetch(`http://localhost:3000/companies/${this.id}`, {
            method:"DELETE"
        }).then(jsonToJs)
        .then(m => alert(m.message));
        Company.allCompanies = Company.allCompanies.filter(company => company.id !== this.id);
        returntoHome();
        }
    }

    get applications() {
        return Application.allApplications.filter(app => app.company_id === this.id)
    }

    static allCompanies = []

    static fetchCompanies(){
        fetch("http://localhost:3000/companies")
        .then(jsonToJs)
        .then(this.appendCompanies);
    }

    static appendCompanies(companies){
        for (let company of companies){
            let newCompany = new Company(company);
            newCompany.appendCompany();
        }
    }

    static showCompanies(){
        for (let company of Company.allCompanies){
            company.appendCompany();
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
            .then(jsonToJs)
            .then(company => {
                let newCompany = new Company(company);
                newCompany.showCompanyApps();
            })
    }
        
}