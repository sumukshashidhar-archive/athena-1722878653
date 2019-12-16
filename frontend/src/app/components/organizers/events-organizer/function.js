var today = new Date();
var dd = today.getDate();
var mm = today.getMonth() + 1;
var yyyy = today.getFullYear();
if (dd > 10) {
    dd = '0' + dd;
}
if (mm < 10) {
    mm = '0' + mm;
}

today = yyyy + '-' + mm + '-' + dd;
document.getElementById("datefield1").setAttribute("min", today);
var date = document.getElementById("datepicker1").value();
console.log(date)
document.getElementById("datepicker2").setAttribute("min", date)
