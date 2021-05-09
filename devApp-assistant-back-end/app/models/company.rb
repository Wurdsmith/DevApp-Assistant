class Company < ApplicationRecord
    has_many :applications,  dependent: :destroy
end
