# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

# Add the default users.
User.create(email: 'kris.read@gmail.com', password: 'password123', role: 'admin') unless  User.where(email: 'kris.read@gmail.com').present?
admin =  User.where(email: 'kris.read@gmail.com').first

User.create(email: 'manager@gmail.com', password: 'password123', role: 'manager') unless  User.where(email: 'manager@gmail.com').present?
manager =  User.where(email: 'manager@gmail.com').first


User.create(email: 'user_dude@gmail.com', password: 'password123') unless  User.where(email: 'user_dude@gmail.com').present?
user =  User.where(email: 'user_dude@gmail.com').first

# Add some time entries for the default user
(1..30).each do |i|
  TimeEntry.create(date: (Date.today - i), time: rand(100..5000), distance: rand(100..500), user_id: admin.id)
  TimeEntry.create(date: (Date.today - i), time: rand(100..5000), distance: rand(100..500), user_id: manager.id)
  TimeEntry.create(date: (Date.today - i), time: rand(100..5000), distance: rand(100..500), user_id: user.id)
end
