
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
                         const ul = document.createElement("ul"),
        //The line below uses the map function to iterate over the array, creating each list item in one line.
        [li1,li2,li3,li4,li5,li6] = [1,2,3,4,5,6].map(() => document.createElement("li")), 
                        deleteApp = document.createElement("button"),
                          editApp = document.createElement("button");
        ul.id = "AppList";
        deleteApp.id = "DeleteBtn";
        deleteApp.innerText = "Delete Application"
        editApp.innerText = "Edit Application"
        editApp.id = "EditBtn"
        li1.innerHTML = `<h5>Job Title:</h5> <p class= "jobP">${this.job_title}</p>`
        li2.innerHTML = `<h5>Status:</h5><p class= "jobP">${this.status}</p>`
        li3.innerHTML = `<h5>Date Applied:</h5> <p class= "jobP">${this.application_date}</p>`
        li4.innerHTML = `<h5>Application Link:</h5> <p class= "jobP">${this.website_link}</p>`
        li5.innerHTML = `<h5>Email contact:</h5> <p class= "jobP">${this.email_address}</p>`
        li6.innerHTML = `<h5>Application Notes:</h5> <p class= "jobP">${this.notes}</p>`
        deleteApp.addEventListener("click", e => {
            this.deleteApplication(ul)
        });
        ul.append(li1, li2, li3, li4, li5, li6);
        if (!Window.state){
            ul.append(deleteApp);
            ul.append(editApp);
        }
        ul.style.fontSize = "medium";
        element.append(ul);
        editApp.addEventListener("click", e => {
            this.renderEditForm()});
    }

    deleteApplication(ul){
        if (window.confirm("Permanently delete this application?")) {
        fetch(`http://localhost:3000/applications/${this.id}`, {
            method:"DELETE"
        }).then(jsonToJs)
        .then(m => ul.remove())
        Application.allApplications = Application.allApplications.filter(app => app.id !== this.id)
        this.appendApplication()
        }
    }
   
    //Appends a form for editing a specific job application.
    renderEditForm(){
        jobAppIndex.children[0].innerHTML = "";
        const apps = document.getElementById("Companies");
        const matchCompany = Company.allCompanies.filter(company => company.id === this.company_id);
        debugger
        const appForm = 
            `<h2 id= AppHeadline>Edit Your Application for ${matchCompany[0].name}</h2>
            <form id = ApplicationUpdate> 
            <label>Job Title:</label>
            <input type="text" placeholder= "${this.job_title}"><br>
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
            <input type="date" placeholder= "${this.application_date}"><br>
            <label>Application Link(if any):</label>
            <input type="text" placeholder= "${this.website_link}"><br>
            <label>Email Contact(if any):</label>
            <input type="text" placeholder= "${this.email_address}"><br>
            <label>Notes:</label>
            <input type= "textarea" placeholder= "${this.notes}"><br>
            <input type= "hidden" id=${this.id}>
            <input id= ApplicationSubmit type="submit" value="Update Application">
            </form>`
        apps.innerHTML = appForm;
        document.getElementById("ApplicationUpdate").addEventListener("submit", this.editApplication.bind(this));
    }

    
    editApplication(e){
        e.preventDefault();
       const jobTitle = e.target.children[1].value,
               status = e.target.children[4].value,
                 date = e.target.children[7].value,
              appLink = e.target.children[10].value,
                email = e.target.children[13].value,
                notes = e.target.children[16].value,
            companyId = e.target.children[18].id;
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
           method: "PATCH",
           headers: {
               "Content-Type": "application/json",
           accept: "application/json"
           },
           body: JSON.stringify(body)
       }

        fetch(`http://localhost:3000/applications/${this.id}`, options)
           .then(jsonToJs)
           .then(newApp => {
               let application = Application.allApplications.find(app => app.id === newApp.id)
               application.job_title = newApp.job_title
               application.status = newApp.status
               application.application_date = newApp.application_date
               application.website_link = newApp.website_link
               application.email_address = newApp.email_address
               application.notes = newApp.notes
                const matchCompany = Company.allCompanies.filter(company => company.id === newApp.company_id);
                matchCompany[0].showCompanyApps();
           });

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
         const jobTitle = e.target.children[1].value,
                 status = e.target.children[4].value,
                   date = e.target.children[7].value,
                appLink = e.target.children[10].value,
                  email = e.target.children[13].value,
                  notes = e.target.children[16].value,
              companyId = e.target.children[18].id;
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
                const newApp = new Application(app);
                const matchCompany = Company.allCompanies.filter(company => company.id === newApp.company_id);  
                matchCompany[0].showCompanyApps();
                console.log(newApp)
            })

        }
}
 



            
