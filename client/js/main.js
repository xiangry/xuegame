// var socket = io();
// $(function () {
//     $('form').submit(function(){
//         var socket = io();
//         socket.emit('chat message', $('#m').val());
//         $('#m').val('');
//         return false;
//     });
// });

var socket = io();

var exp = $("#exp")
var expValue = exp.innerText;

socket.on("s2ccmd", function (msg) {
    console.log("get message " + msg);
    $("#exp").text(msg)
})

$('#test').css('background-color', 'yellow')

$('#client').submit(function () {
    var data = $("#m").val();
    console.log("value ==== " + data);
    socket.emit("c2scmd", data)
    return false;
})




