class ApplicationSerializer < ActiveModel::Serializer
  attributes :id, :job_title, :application_date, :status, :notes, :website_link, :email_address, :follow_up_date, :company_id
  belongs_to :company
end
