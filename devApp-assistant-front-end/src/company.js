const companyAdd = document.getElementById("CompanyForm")
const back = document.createElement("a")


class Company {
    constructor({id, name, applications}){
        this.id = id;
        this.name = name;
        this.applications = applications.map(app => new Application(app));
        this.state = true;
        Company.allCompanies.push(this);
    }

    swapButtonState(){
        this.state = !this.state //This method changes the state of the object, and thus the visible state of the buttons when clicked.
    }

    appendCompany(){
        //Defines document elements for both the main page and company page.
        const CompanyDiv = document.getElementById("Companies"),
                      div = document.createElement("div"),
                viewEdit = document.createElement("button"),
                companyTitle = document.createElement("h2");
        viewEdit.innerText = "View/Edit Application(s)";
        viewEdit.id = "viewEdit";
        companyTitle.innerText = this.name;
        div.id = "companydiv"
        viewEdit.addEventListener("click", this.showCompanyApps.bind(this), this.swapButtonState());
        CompanyDiv.append(companyTitle);
        companyTitle.id = "companyTitle";
        CompanyDiv.append(div);
            if (!this.state) { //Because the EventListener changed the state during the compiling phase, I had to use the bang operator here.
                div.append(viewEdit);
            }
        div.style.fontSize = "x-large";
        Application.appendApplications(this.applications, div);
    }

    showCompanyApps(){
        const jobAppIndex = document.getElementById("BodyContainer");
        console.log(jobAppIndex.children)
        jobAppIndex.children[0].innerHTML = "";
        const jobForm = document.getElementById("FormContainer")
        back.id = "back"
        back.innerText = "Return Home"
        //jobForm.innerHTML += "<br>"
        jobForm.append(back)
        this.appendCompany();
        this.appendApplicationForm();
        back.addEventListener("click", returntoHome)
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
                newCompany.appendCompany();
            })
    }
        
}