class TimeEntryPolicy < ApplicationPolicy

  class Scope < Scope
    def resolve
      if user.admin?
        scope.all
      else
        scope.where(user_id: user.id)
      end
    end
  end

  def show?
    own? || user.admin?
  end

  def update?
    own? || user.admin?
  end

  def create?
    own? || user.admin?
  end

  def destroy?
    own? || user.admin?
  end

  def own?
    user.id == record.user_id
  end

end
