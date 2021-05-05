class Application {
    constructor(application){
        this.id = application.id
        this.job_title = application.job_title
        this.status = application.status
        this.notes = application.notes
        this.website_link = application.website_link
        this.email_address = application.email_address
        this.company_id = application.company_id
    }

    static fetchApplication() {
    fetch("http://localhost:3000/applications")
    .then(resp => resp.json())
    .then(appendApplications)
    }


}

function appendApplication(applications, element){
    const ul = document.createElement("ul");
    element.append(ul);
        for (let app of applications){
            const jli = document.createElement("li")
            const sli = document.createElement("li")
            const wli = document.createElement("li")
            const eli = document.createElement("li")
            const nli = document.createElement("li")
            jli.innerText = "Job Title: " + app.job_title
            sli.innerText = "Application Status: " + app.status
            wli.innerText = "Application Link: " + app.website_link
            eli.innerText = "Email contact: " + app.email_address
            nli.innerText = "Application Notes: " + app.notes
            ul.append(jli, sli, wli, eli, nli)
            ul.style.fontSize = "medium";
        }
}