
class Application {
    constructor(application){
        this.id = application.id;
        this.job_title = application.job_title;
        this.status = application.status;
        this.application_date = application.application_date;
        this.website_link = application.website_link;
        this.email_address = application.email_address;
        this.notes = application.notes;
        this.company_id = application.company_id;
        Application.allApplications.push(this);
    }


    appendApplication(element){
        //The line below uses the map function to iterate over the array, creating each list item in one line.
        const ul = document.createElement("ul");
        const [li1,li2,li3,li4,li5,li6] = [1,2,3,4,5,6].map(() => document.createElement("li"));
        const deleteApp = document.createElement("button")
        ul.id = "AppList";
        deleteApp.id = "DeleteBtn";
        deleteApp.innerText = "Delete Application"
        li1.innerHTML = `<h5>Job Title:</h5> <p class= "jobP">${this.job_title}</p>`
        li2.innerHTML = `<h5>Status:</h5><p class= "jobP">${this.status}</p>`
        li3.innerHTML = `<h5>Date Applied:</h5> <p class= "jobP">${this.application_date}</p>`
        li4.innerHTML = `<h5>Application Link:</h5> <p class= "jobP">${this.website_link}</p>`
        li5.innerHTML = `<h5>Email contact:</h5> <p class= "jobP">${this.email_address}</p>`
        li6.innerHTML = `<h5>Application Notes:</h5> <p class= "jobP">${this.notes}</p>`
        deleteApp.addEventListener("click", e => {
            this.deleteApplication(ul)
        });
        ul.append(li1, li2, li3, li4, li5, li6)  
        ul.append(deleteApp)
        ul.style.fontSize = "medium";
        element.append(ul)
    }

    deleteApplication(ul){
        fetch(`http://localhost:3000/applications/${this.id}`, {
            method:"DELETE"
        }).then(jsonToJs)
        .then(m => ul.remove())
        Application.allApplications = Application.allApplications.filter(app => app.id !== this.id)
    }

    static allApplications = []

    static fetchApplication() {
        fetch("http://localhost:3000/applications")
        .then(jsonToJs)
        .then(appendApplications);
        }
    
    
        static appendApplications(applications, element){
            for(let app of applications){
                app.appendApplication(element);
            }
        }

    static addApplication(e){
         e.preventDefault();
        const jobTitle = e.target.children[1].value;
        const status = e.target.children[4].value;
        const date = e.target.children[7].value;
        const appLink = e.target.children[10].value;
        const email = e.target.children[13].value;
        const notes = e.target.children[16].value;
        const companyId = e.target.children[18].id;
        const body = {
        application: {
            job_title: jobTitle,
            status: status,
            application_date: date,
            website_link: appLink,
            email_address: email,
            notes: notes,
            company_id: companyId,
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

            fetch("http://localhost:3000/applications", options)
            .then(jsonToJs)
            .then(app => {
                const li = document.createElement("li");
                const newApp = new Application(app);
                const matchCompany = Company.allCompanies.filter(company => company.id === newApp.company_id);
                matchCompany[0].showCompanyApps();
                
            })

        }
}
 



            
