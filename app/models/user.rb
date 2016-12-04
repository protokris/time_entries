class User < ApplicationRecord
  has_secure_password

  validates :email, uniqueness: true, presence: true
  validates_format_of :email, :with => /\A[^@]+@([^@\.]+\.)+[^@\.]+\z/

  has_many :time_entries, dependent: :destroy

  enum role: [:user, :manager, :admin]

end
