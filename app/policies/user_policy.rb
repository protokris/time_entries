class UserPolicy < ApplicationPolicy

  def show?
    user.id == record.id || user.admin? || user.manager?
  end

  def update?
      user.id == record.id || user.admin? || user.manager?
  end

  def create?
    true # anyone can register
  end

  def destroy?
    user.admin? || user.manager?
  end

  def user_list?
    user.admin? || user.manager?
  end

end
