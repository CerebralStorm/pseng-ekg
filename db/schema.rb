# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20150929203412) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "applications", force: :cascade do |t|
    t.string   "name"
    t.string   "url"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "errors", force: :cascade do |t|
    t.integer  "task_id"
    t.string   "message"
    t.text     "backtrace"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "errors", ["task_id"], name: "index_errors_on_task_id", using: :btree

  create_table "logs", force: :cascade do |t|
    t.integer  "task_id"
    t.text     "value"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "logs", ["task_id"], name: "index_logs_on_task_id", using: :btree

  create_table "tasks", force: :cascade do |t|
    t.integer  "application_id"
    t.string   "name"
    t.string   "status"
    t.integer  "progress"
    t.integer  "duration"
    t.datetime "completed_at"
    t.datetime "failed_at"
    t.text     "log"
    t.integer  "errors_count"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "tasks", ["application_id"], name: "index_tasks_on_application_id", using: :btree

end
