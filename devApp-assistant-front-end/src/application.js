
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
    }


    appendApplication(element){
        //The line below uses the map function to iterate over the array, creating each list item in one line.
        const ul = document.createElement("ul");
        const [li1,li2,li3,li4,li5,li6] = [1,2,3,4,5,6].map(() => document.createElement("li"));
        const deleteApp = document.createElement("button")
        deleteApp.innerText = "Delete Application"
        li1.innerText = "Job Title:" + this.job_title
        li2.innerText = "Status:" + this.status 
        li3.innerText = "Date Applied:" + this.application_date
        li4.innerText = "Application Link:" + this.website_link
        li5.innerText = "Email contact:" + this.email_address
        li6.innerText = "Application Notes:" + this.notes
        deleteApp.addEventListener("click", e => {
            this.deleteApplication(ul)
        });
        ul.append(li1, li2, li3, li4, li5, li6)  
        li6.append(deleteApp)
        ul.style.fontSize = "medium";
        element.append(ul)
    }

    deleteApplication(ul){
        fetch(`http://localhost:3000/applications/${this.id}`, {
            method:"DELETE"
        }).then(jsonToJs)
        .then(m => ul.remove())
    }

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
                const li = document.createElement("li")
                const newApp = new Application(app);
                Company.appendCompanies;
                location.reload()
            })

        }
}
 



            
