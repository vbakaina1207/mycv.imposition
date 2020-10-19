let inputSubmit = document.querySelector(".button-form");
//console.log(inputSubmit);

inputSubmit.onclick = function () {
    //e.preventDefault();
    //console.log(inputName.value);

    let inputName = document.getElementById("in_name");
    let inputEmail = document.getElementById("in_email");


    if (inputName.value.length == 0) {
        inputName.classList.add("red");
        return false;
    } else {
        inputName.classList.add("green");
    }

    if (inputEmail.value.length == 0) {
        inputEmail.classList.add("red");
        document.getElementById("emailf").innerHTML = "*введите email";
        return false;
    } else if (inputEmail.value.indexOf('@', 0) == -1){
        inputEmail.classList.add("red");
        document.getElementById("emailf").innerHTML = "*email введен не верно";
        return false;
    } else {
        inputEmail.classList.add("green");
        $.ajax({
            url: 'test.html',
            success: function (data){
                $('#result').html(data);
            }
        })
    }

    //console.log(inputEmail.value);


    // if (at < 1) {
    //     document.getElementById("emailf").innerHTML = "*email введен не верно";
    //     return false;
    // }
}


document.getElementById("sendHello").onclick = function (e){
    e.preventDefault();
    $.ajax({
        url: 'test.html',
        success: function (data){
            $('#result').html(data);
        }
    })
}

/*
$.cookie('name', 'value');
$.cookie('name', 'value', { expires: 7 });
$.cookie('name', 'value', { expires: 7, path: '/shop.php' });
if ( $.cookie('nothing') == null ) {
    alert("Кука не была установлена!");
} else {
    alert("Кука Есть");
}
*/

//let a = document.cookie = "user=Login";
//console.log(a);
/*
if (localStorage.getItem("popUpVision") !== 'none') {
    alert('localStorage не был установлен на сайте');
} else
    {
        alert('Пользовтель уже был на сайте');
    }

localStorage.setItem("popUpVision", "none");
*/
/*
$(document).ready(function () {
$.ajax({
    type: "GET",
    url: 'uploads/works.xml',
    dataType: "xml",
    success: xmlParser
})
});
function xmlParser(xml) {
    $(xml).find("work").each(function () {
        $(".links").append(
            '<div class="links__info"><div class="links__info_text">' +
            '<a href=" ' + $(this).find("link").text() + ' " target="_blank">' + $(this).find("name").text() + '</a>' +
            '</div>' +
            '<div class="links__info_year">' + $(this).find("date").text() + '</div>' +
            '</div>'
        );
    });
}
*/
//написать функцию, кот. на основе локалСторадж должно повится через 15 сек сообщение, через 1 мин оно должно закріться. при повторном заходе
// сообщение не должно показ.
if (localStorage.getItem("popUpVision") !== '1') {
   $('#popup').hide();

    setTimeout(function() {
        // Открываем модал
        $('#popup').show(0).delay(5000).hide(0);
        document.querySelector('.close').onclick = function () {
            $('#popup').hide();
        };
        // Сохраняем флаг в localStorage
        localStorage.setItem('popUpVision', '1');
    }, 5 * 1000);
} else {
$('#popup').hide();
}
//localStorage.setItem("popUpVision", "1");
//localStorage.removeItem('1');
/*
$(function(){
    setTimeout(function(){
        $('#my-alert').alert('close');
        if (localStorage.getItem("alert_messageA") === null) {
            $('#my-alert').removeClass('hide');
            $('#my-alert').on('closed.bs.alert', function () {
                localStorage.setItem("alert_messageA", true);
            });
        }
    },15000);
});
*/













