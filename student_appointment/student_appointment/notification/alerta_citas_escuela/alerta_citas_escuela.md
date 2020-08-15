<div class="container row">
  <table>
    <h3>Cita Agendada</h3>
    <tr>
      <td style="widht: 60%;">
      <h4>Cita <b>#{{ doc.name }}</b> reservada</h4>
      <p><b>Solicitante</b>: {{ doc.visitor_name }}<br>
      <b>Motivo</b>: {{ doc.appointment_type }}<br>
      <b>Maxima Reserva</b>: {{ doc.duration }} minutos<br>
      <b>Fecha</b>: {{ doc.get_formatted('appointment_date') }}<br>
      <b>Hora</b>: {{ doc.appointment_time }}<br>
      <b>Departamento</b>: {{ doc.department }}<br>
      <b>Persona a Visitar</b>: {{ doc.practitioner }}<br>
      <b>Observaciones</b>: <i>{{ doc.notes }}</i><br>
      <b>Para imprimir</b>: {{ frappe.get_url() }}/Visitor%20Appointment/{{ doc.name }}<br>
      <b>Recordatorio Activado</b>: 
        {% if doc.appointment_reminder %}
          S&iacute;
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
<p>Le esperamos en el d&iacute;a y hora indicados. Si desea modificar algo envie correo electr&oacute;nico a <b>clientes@pibico.es</b> indicando en el asunto <b>"Modificaci&oacute;n a Cita #{{ doc.name }}"</b><br>Saludos</p>
</div>