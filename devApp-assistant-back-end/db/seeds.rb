# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Company.create(name:"Mozilla")
Company.create(name:"Target")
Company.create(name:"Best Buy")
Company.create(name:"Amazon")

Application.create(job_title: "Junior Developer", application_date: "06/25/2021", status:"pending", notes: "Application sent on 06/25/2021.", website_link: "www.mozilla.org", email_address: "mozilla@mozilla.org", follow_up_date: "07/05/2021", company_id: 1)
Application.create(job_title: "Senior Developer", application_date: "06/30/2021", status:"pending", notes: "Application sent on 06/30/2021.", website_link: "www.mozilla.com", email_address: "mozilla@mozilla.org", follow_up_date: "07/10/2021", company_id: 1)
Application.create(job_title: "Frontend Developer", application_date: "07/05/2021", status:"pending", notes: "Application sent on 07/05/2021.", website_link: "www.target.com", email_address: "target@target.com", follow_up_date: "07/15/2021", company_id: 2)
Application.create(job_title: "Web Developer", application_date: "07/10/2021", status:"pending", notes: "Application sent on 07/10/2021.", website_link: "www.bestbuy.com", email_address: "bestbuy@bestbuy.com", follow_up_date: "07/25/2021", company_id: 3)
Application.create(job_title: "Software Engineer", application_date: "07/15/2021", status:"pending", notes: "Application sent on 07/015/2021.", website_link: "www.amazon.com", email_address: "amazon@amazon.com", follow_up_date: "07/15/2021", company_id: 4)   