frappe.ready(function() {
	// bind events here
  document.getElementsByClassName("btn-form-submit")[0].innerText="Book Appointment"; 
document.getElementsByClassName("btn-form-submit")[1].innerText="Book Appointment"; 
frappe.web_form.on('appointment_date', (field, value) => {
  // Check whether date is past 
  let sToday = moment(value,"YY-MM-DD") - moment(frappe.datetime.get_today(),"YY-MM-DD");
  let appointment_date = new Date(value);
  let appointment_type = $('input[data-fieldname="appointment_type"]').val();
  let department =  $('input[data-fieldname="department"]').val();
  let practitioner = $('input[data-fieldname="practitioner"]').val();

  if (sToday<0) {
    frappe.msgprint({
      title: __('Notification'),
      indicator: 'red',
      message: __('Date must be actual or future and Appointment Type, Department and Practitioner are mandatory')
    });
    frappe.web_form.set_value("appointment_date", null);
    return(false);
  }
  if (sToday >=0 && (!appointment_type || !department || !practitioner)) {
    frappe.msgprint({
      title: __('Notification'),
      indicator: 'red',
      message: __('Appointment Type, Department and Practitioner are mandatory')
    });
    frappe.web_form.set_value("appointment_date", null);
    return(false);
  }
  
if (sToday >=0 && appointment_type && department && practitioner) {
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  // Modal Dialog searching available time slots for data
  var d = new frappe.ui.Dialog({
    title: __("Reservar hora de cita el " + appointment_date.toLocaleDateString('es-ES', options) + '?'),
    fields: [
      { fieldtype: 'HTML', fieldname: 'available_slots'}
    ],
    primary_action_label: __("Settle Selection"),
    primary_action: function() {
      frappe.web_form.set_value('appointment_time', selected_slot);
      d.hide();
      d.get_primary_btn().attr('disabled', true);
    },
    secondary_action_label: __("Close"),
    secondary_action: function() {
      d.refresh();
      //d.preventDefault();
    }
  });

  d.set_values({
    'available_slots': show_slots(d)
  });

  // disable dialog action initially
  d.get_primary_btn().attr('disabled', true);
  d.show();

  function show_slots(d,fd) {
    var fd = d.fields_dict;   
    if (value && practitioner){
      fd.available_slots.html("");
      frappe.call({
        method: 'student_appointment.student_appointment.doctype.visitor_appointment.visitor_appointment.get_availability_data',
        args: {
	  practitioner: practitioner,
	  date: value
        },
        callback: (r) => {
          var data = r.message;
	  if(data.slot_details.length > 0) {
	    var $wrapper = d.fields_dict.available_slots.$wrapper;
  	    // make buttons for each slot
	    var slot_details = data.slot_details;
	    var slot_html = "";
	    for (let i = 0; i < slot_details.length; i++) {
	      slot_html = slot_html + `<label>${slot_details[i].slot_name}</label>`;
	      slot_html = slot_html + `<br/>` + slot_details[i].available_slots.map(slot => {
	        let disabled = '';
	        let start_str = slot.from_time;
	        let slot_start_time = moment(slot.from_time, 'HH:mm:ss');
	        let slot_to_time = moment(slot.to_time, 'HH:mm:ss');
	        let interval = (slot_to_time - slot_start_time)/60000 | 0;
	        // iterate in all booked appointments, update the start time and duration
	        slot_details[i].appointments.forEach(function(booked) {
		  let booked_moment = moment(booked.appointment_time, 'HH:mm:ss');
		  let end_time = booked_moment.clone().add(booked.duration, 'minutes');
		  // Deal with 0 duration appointments
		  if(booked_moment.isSame(slot_start_time) || booked_moment.isBetween(slot_start_time, slot_to_time)){
		    if(booked.duration == 0){
		      disabled = 'disabled="disabled"';
		      return false;
		    }
		  }
		  // Check for overlaps considering appointment duration
		  if(slot_start_time.isBefore(end_time) && slot_to_time.isAfter(booked_moment)){
		    // There is an overlap
		    disabled = 'disabled="disabled"';
  		    return false;
		  }
	        });
	        return `<button class="btn btn-default"
		  data-name=${start_str}
		  data-duration=${interval}
		  style="margin: 0 10px 10px 0; width: 72px;" ${disabled}>
		  ${start_str.substring(0, start_str.length - 3)}
	        </button>`;
	      }).join("");
	      slot_html = slot_html + `<br/>`;
	    }
  	    $wrapper
	    .css('margin-bottom', 0)
	    .addClass('text-center')
	    .html(slot_html);
  	    // blue button when clicked
	    $wrapper.on('click', 'button', function() {
	      var $btn = $(this);
	      $wrapper.find('button').removeClass('btn-primary');
	      $btn.addClass('btn-primary');
	      selected_slot = $btn.attr('data-name');
	      duration = $btn.attr('data-duration');
  	      // enable dialog action
	      d.get_primary_btn().attr('disabled', null);
	    });
  	  }else {
	    fd.available_slots.html("Select a valid date".bold())
	  }
        },
        freeze: true,
        freeze_message: __("Fetching records......") 
      });
    }else{
      fd.available_slots.html("Department, Practitioner and Date are mandatory".bold());
    }
  }
}
});
// Check appointment-type to set duration
frappe.web_form.on('appointment_type', (field, value) => {
  let appointment_type = value // $('input[data-fieldname="appointment_type"]').val();
  frappe.web_form.set_value('department', null);
  frappe.web_form.set_value('practitioner', null);
  frappe.call({
    method: 'student_appointment.student_appointment.doctype.visitor_appointment.visitor_appointment.get_duration',
    args: {
      appointment_type: appointment_type
    }, 
    callback: (r) => {
      var data = r.message;
      frappe.web_form.set_value("duration",data);; 
    }
  });
});
// Check email validity
frappe.web_form.on('visitor', (field, value) => {
  let visitor = value //$('input[data-fieldname="appointment_type"]').val();
  if (!validate_email(visitor)) {
    frappe.msgprint({
      title: __('Notification'),
      indicator: 'red',
      message: __("You have not entered a valid email")
    });
    frappe.web_form.set_value("visitor",null);
  }
});
// Check if department filled before select practitioner
frappe.web_form.on('practitioner', (field, value) => {
  let department = $('input[data-fieldname="department"]').val();
  let appointment_type = $('input[data-fieldname="appointment_type"]').val();
  if (!department || !appointment_type) {
    frappe.msgprint({
      title: __('Notification'),
      indicator: 'red',
      message: __("First you must select the Appointment Type and Department")
    });
    frappe.web_form.set_value("practitioner",null);
    return(false);
  }
});
// Fill department based on appointment_type
frappe.web_form.on('appointment_type', (field, value) => {
  filterDepartment(value);
});
function filterDepartment(value) {
$.ajax({
  url: 'api/resource/Appointment Type?fields=["*"]&filters=[["Appointment Type","name","=","' + value + '"]]',
  success: function(result) {
        var options = [];
        for (var i = 0; i < result.data.length; i++) {
          options.push({
            'label': result.data[i].department,
            'value': result.data[i].department
          });
        console.log(result.data[i].department);
        };
        
        var field = frappe.web_form.get_field('department');
        field._data = options;
        field.refresh();
      }
    });
};

// Fill practitioner based on department
frappe.web_form.on('department', (field, value) => {
  let appointment_type = $('input[data-fieldname="appointment_type"]').val();
  if ( !appointment_type ) {
    frappe.msgprint({
     title: __('Notification'),
      indicator: 'red',
      message: __("The Appointment Type must be selected first")
    });
    frappe.web_form.set_value("department", null);
    return(false);
  }
  filterPractitioner(value);
});
function filterPractitioner(value) {
    $.ajax({
      url: 'api/resource/School Practitioner?filters=[["School Practitioner","department","=","' + value + '"]]',
      success: function(result) {
        var options = [];
        for (var i = 0; i < result.data.length; i++) {
          options.push({
            'label': result.data[i].name,
            'value': result.data[i].name
          });
        };
        
        var field = frappe.web_form.get_field('practitioner');
        field._data = options;
        field.refresh();
      }
    });  
  };
})