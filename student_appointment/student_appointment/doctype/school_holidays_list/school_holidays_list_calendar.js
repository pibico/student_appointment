// Copyright (c) 2015, Frappe Technologies Pvt. Ltd. and Contributors
// License: GNU General Public License v3. See license.txt

frappe.views.calendar["School Holidays List"] = {
	field_map: {
		"start": "holiday_date",
		"end": "holiday_date",
		"id": "name",
		"title": "description",
		"allDay": "allDay"
	},
	get_events_method: "student_appointment.student_appointment.doctype.school_holidays_list.school_holidays_list.get_events",
	filters: [
		{
			'fieldtype': 'Link',
			'fieldname': 'school_holidays_list',
			'options': 'School Holidays List',
			'label': __('School Holidays List')
		}
	]
}
