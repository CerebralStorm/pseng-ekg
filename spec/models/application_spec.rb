require 'rails_helper'

RSpec.describe Application, type: :model do
  let(:application) { FactoryGirl.create(:application) }

  context "associations" do
    it 'should have_many tasks' do
      expect(Application.reflect_on_association(:tasks)).to_not be_nil
      expect(Application.reflect_on_association(:tasks).macro).to eq :has_many
    end
  end

  context "validations" do
    it 'should require a name' do
      expect(FactoryGirl.build(:application, name: nil)).to_not be_valid
    end

    it 'should be valid with valid attributes' do
      expect(FactoryGirl.build(:application)).to be_valid
    end
  end
end
