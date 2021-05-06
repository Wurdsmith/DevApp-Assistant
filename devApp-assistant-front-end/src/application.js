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
    applications.map((ele) => {
        //The line below uses the map function to iterate over the array, creating each list item in one line.
        const [li1,li2,li3,li4,li5] = [1,2,3,4,5].map(() => document.createElement("li"));
        li1.innerText = `Job Title: ${ele.job_title}` 
        li2.innerText = `Application Status: ${ele.status}` 
        li3.innerText = `Application Link: ${ele.website_link}`
        li4.innerText = `Email contact: ${ele.email_address}`
        li5.innerText = `Application Notes: ${ele.notes}`
        ul.append(li1, li2, li3, li4, li5)
    });

            ul.style.fontSize = "medium";
}