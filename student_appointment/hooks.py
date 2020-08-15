# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from . import __version__ as app_version

app_name = "student_appointment"
app_title = "Student Appointment"
app_publisher = "PibiCo"
app_description = "Student Appointment"
app_icon = "octicon octicon-file-directory"
app_color = "grey"
app_email = "pibico.sl@gmail.com"
app_license = "MIT"

# Includes in <head>
# ------------------

# include js, css files in header of desk.html
# app_include_css = "/assets/student_appointment/css/student_appointment.css"
# app_include_js = "/assets/student_appointment/js/student_appointment.js"

# include js, css files in header of web template
# web_include_css = "/assets/student_appointment/css/student_appointment.css"
# web_include_js = "/assets/student_appointment/js/student_appointment.js"

# include js in page
# page_js = {"page" : "public/js/file.js"}

# include js in doctype views
# doctype_js = {"doctype" : "public/js/doctype.js"}
# doctype_list_js = {"doctype" : "public/js/doctype_list.js"}
# doctype_tree_js = {"doctype" : "public/js/doctype_tree.js"}
# doctype_calendar_js = {"doctype" : "public/js/doctype_calendar.js"}

# Home Pages
# ----------

# application home page (will override Website Settings)
# home_page = "login"

# website user home page (by Role)
# role_home_page = {
#	"Role": "home_page"
# }

# Website user home page (by function)
# get_website_user_home_page = "student_appointment.utils.get_home_page"

# Generators
# ----------

# automatically create page for each record of this doctype
#website_generators = ["Visitor Appointment"]

# Installation
# ------------

# before_install = "student_appointment.install.before_install"
# after_install = "student_appointment.install.after_install"

# Desk Notifications
# ------------------
# See frappe.core.notifications.get_notification_config

# notification_config = "student_appointment.notifications.get_notification_config"

# Permissions
# -----------
# Permissions evaluated in scripted ways

# permission_query_conditions = {
# 	"Event": "frappe.desk.doctype.event.event.get_permission_query_conditions",
# }
#
# has_permission = {
# 	"Event": "frappe.desk.doctype.event.event.has_permission",
# }

# Jinja Filters
# ---------------
# Methods accessible to print template
jenv = {
    "methods": [
      "get_qrcode:student_appointment.jinja_filters.get_qrcode"
    ]
}

# Document Events
# ---------------
# Hook on document methods and events

# doc_events = {
# 	"*": {
# 		"on_update": "method",
# 		"on_cancel": "method",
# 		"on_trash": "method"
#	}
# }

# Scheduled Tasks
# ---------------

# scheduler_events = {
# 	"all": [
# 		"student_appointment.tasks.all"
# 	],
# 	"daily": [
# 		"student_appointment.tasks.daily"
# 	],
# 	"hourly": [
# 		"student_appointment.tasks.hourly"
# 	],
# 	"weekly": [
# 		"student_appointment.tasks.weekly"
# 	]
# 	"monthly": [
# 		"student_appointment.tasks.monthly"
# 	]
# }

# Testing
# -------

# before_tests = "student_appointment.install.before_tests"

# Overriding Whitelisted Methods
# ------------------------------
#
# override_whitelisted_methods = {
# 	"frappe.desk.doctype.event.event.get_events": "student_appointment.event.get_events"
# }

