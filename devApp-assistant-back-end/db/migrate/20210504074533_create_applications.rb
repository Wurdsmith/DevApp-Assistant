class CreateApplications < ActiveRecord::Migration[6.1]
  def change
    create_table :applications do |t|
      t.string :job_title
      t.string :application_date
      t.string :status
      t.string :notes
      t.string :website_link
      t.string :email_address
      t.string :follow_up_date
      t.belongs_to :company, null: false, foreign_key: true

      t.timestamps
    end
  end
end
