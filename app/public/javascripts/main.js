var resultArray = remoteImages.slice();
var target = resultArray.length - 1;
var i = 0, j = 1;

function finish() {
    target = resultArray.length - 1;
    i = 0, j = 1;

    $("#idBattle").hide();
    $("#idReport").show();

    var colCount = 0;
    var row = null;
    for (var k = 0; k < resultArray.length; k++) {
        if (colCount == 0) {
            row = $("<div class = 'row'></div>");
            $("#idResults").append(row);
        }
        var card = $("<div class='col-md-4'><div class='thumbnail result-card center-block'><img src='"+ resultArray[k] +"' alt='pic'> <p>第"+(k+1)+"名</p></div></div>");
        row.append(card);

        colCount++;
        if(colCount == 6){
            colCount = 0;
        }
    }
}

function handleClick(pic) {
    console.log("i="+i+" j="+j+" target="+target);

    if (pic == 'a') {
        var temp = resultArray[i];
        resultArray[i] = resultArray[j];
        resultArray[j] = temp;
    }
    i++;
    j++;

    if (i == target){
        target--;
        if (target == 0){
            resultArray.reverse();
            finish();
            return;
        }
        else {
            i = 0;
            j = 1;
        }
    }

    setImages();
}

$(function () {
    setImages();

    $("#idReport").hide();
});

function setImages() {
    $("#image1").attr("src",resultArray[i]);
    $("#label1").text("第"+(remoteImages.indexOf(resultArray[i]) + 1) +"号");
    $("#image2").attr("src", resultArray[j]);
    $("#label2").text("第"+(remoteImages.indexOf(resultArray[j]) + 1) +"号");
}

function submit() {
    if ($("#idEmailInput").val()) {
        $.ajax({
            url: "/record/save",
            type: 'POST',
            dataType: 'json',
            contentType:"application/json",
            data: JSON.stringify({
                    email: $("#idEmailInput").val(),
                    seq: resultArray
            })
        })
            .done(function(data) {
                alert("提交成功");
            })
            .fail(function(obj) {
                alert("系统错误");
            })
            .always(function() {
                $("#idSubmit").attr("disabled", true);
            });
    }
    else {
        alert("请输入您的email!");
    }
}

function viewResult() {
    var email = $("#idViewInput").val();
    if (email){
        $.ajax({
            url:"/record/getbyemail/" + email,
            type:'GET',
            dataType:'json'
        })
            .done(function (data) {
                if (data.body){
                    resultArray = data.body.seq;
                    finish();
                    $("#idSubmitPanel").hide();
                    $("h1:first").append("<br><small>来自" + email + "的结果</small>");
                }
                else {
                    alert("不存在此人记录!");
                }
            })
            .fail(function (data) {
                alert("系统错误" + data);
            })
    }
    else {
        alert("请输入查询人的email!");
    }
}

function restart() {
    window.location.reload();
}