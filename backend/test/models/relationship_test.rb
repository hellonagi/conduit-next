require 'test_helper'

class RelationshipTest < ActiveSupport::TestCase
  def setup
    @relationship = Relationship.new(user_id: users(:mike).id,
                                     follow_id: users(:john).id)
  end

  test 'should be valid' do
    assert @relationship.valid?
  end

  test 'should require a user_id' do
    @relationship.user_id = nil
    assert_not @relationship.valid?
  end

  test 'should require a follow_id' do
    @relationship.follow_id = nil
    assert_not @relationship.valid?
  end
end
