require 'test_helper'

class UserTest < ActiveSupport::TestCase
  test 'should follow and unfollow a user' do
    mike = users(:mike)
    john = users(:john)
    assert_not mike.following?(john)
    mike.follow(john)
    assert mike.following?(john)
    assert john.followers.include?(mike)
    mike.unfollow(john)
    assert_not mike.following?(john)
    # ユーザーは自分自身をフォローできない
    mike.follow(mike)
    assert_not mike.following?(mike)
  end
end
