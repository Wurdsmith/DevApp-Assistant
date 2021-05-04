# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Company.create(name:"Mozilla")

Application.create(job_title: "Junior Developer", application_date: "06/25/2020", status:"pending", notes: "Application sent on 06/25/2020.", website_link: "www.mozilla.org", email_address: "mozilla@mozilla.org", follow_up_date: "07/05/2021", company_id: 1) 