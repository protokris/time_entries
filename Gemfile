source 'http://rubygems.org'

# default rails gems
gem 'rails', '~> 5.0.0', '>= 5.0.0.1'
gem 'pg'
gem 'sass-rails', '~> 5.0'
gem 'bootstrap-sass', '~> 3.3.6'
gem 'uglifier', '>= 1.3.0'
gem 'turbolinks'
gem 'listen', '~> 3.0.5'
gem 'jquery-rails'
gem 'jbuilder', '~> 2.5'
gem 'bcrypt', '~> 3.1.11'

gem 'react-rails', '~> 1.9.0' # react helper
gem 'knock', '~> 2.0' # Authentication
gem 'pundit', '~> 1.1.0' # Authorization
gem 'kaminari' # Pagination
gem 'browserify-rails' # include npm modules

group :production do
# gem 'puma', '~> 3.0' # doesn't work well with teaspooon
end

group :development, :test do
  gem "teaspoon-jasmine", "~> 2.3.4"
  gem "phantomjs"
  gem "coffee-script" # required for teaspoon to work
end

# Windows compatibility
gem 'tzinfo-data', platforms: [:mingw, :mswin, :x64_mingw, :jruby]
gem 'wdm', '>= 0.1.0' if Gem.win_platform?
