<div class="container row">
  <table>
    <tr>
      <td style="widht: 60%;">
      <h4>Appointment <b>#{{ doc.name }}</b> booked</h4>
      <p><b>Visitor</b>: {{ doc.visitor_name }}<br>
      <b>Purpose</b>: {{ doc.appointment_type }}<br>
      <b>Maximum Time Slot</b>: {{ doc.duration }} minutes<br>
      <b>Date</b>: {{ doc.get_formatted('appointment_date') }}<br>
      <b>Time</b>: {{ doc.appointment_time }}<br>
      <b>Department</b>: {{ doc.department }}<br>
      <b>Practitioner</b>: {{ doc.practitioner }}<br>
      <b>Remarks</b>: <i>{{ doc.notes }}</i><br>
      <b>For Printing</b>: {{ frappe.get_url() }}/Visitor%20Appointment/{{ doc.name }}<br>
      <b>Reminder Active</b>: 
        {% if doc.appointment_reminder %}
          Yes
        {% else %}
          No
        {% endif %}  
      <br>
      </td>
      <td style="widht: 40%;">
        <img src={{ doc.qr_code }} />
      </td>
    <tr>
  </table>
<p>We look forward to see you on date and time booked. If you want to modify something, please call us or send us an email to <b>ventas@pibico.es</b> showing in the subject <b>"Modification to Appointment #{{ doc.name }}"</b><br>Greetings</p>
</div>