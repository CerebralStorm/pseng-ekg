require 'rails_helper'

RSpec.describe Task, type: :model do
  let(:task) { FactoryGirl.create(:task) }

  context "associations" do
    it 'should have_many tasks' do
      expect(Application.reflect_on_association(:tasks)).to_not be_nil
      expect(Application.reflect_on_association(:tasks).macro).to eq :has_many
    end
  end

  context "validations" do
    it 'should require an application' do
      expect(FactoryGirl.build(:task, application: nil)).to_not be_valid
    end

    it 'should be valid with valid attributes' do
      expect(FactoryGirl.build(:task)).to be_valid
    end
  end
end
