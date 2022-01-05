function isEmail(email) {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
}

$("#submit-button").click(function() {
    if ($("#exampleInputEmail1").val() != "" && $("#exampleInputname").val() != "" && $("#exampleInputclass").val() != "" && $("#exampleInputrollno").val() != "" && $("#exampleInputdob").val() != "" && $("#exampleInputphone").val() != "" && $("#exampleInputPassword1").val() != "") {
        alert("Details saved successfully!!");
    } else {
        alert("Please fill all detials correctly");
    }
});

$("#register-submit").click(function() {
    if ($("#exampleInputEmail").val() != "" && $("#exampleInputname").val() != "" && $("#exampleInputclass").val() != "" && $("#exampleInputphone").val() != "" && $("#exampleInputPassword").val() != "") {
        alert("Details saved successfully!!");
    } else {
        alert("Please fill all detials correctly");
    }
});

$("#update-submit").click(function() {
    if ($("#exampleInputEmail1").val() != "" && $("#exampleInputname").val() != "" && $("#exampleInputclass").val() != "" && $("#exampleInputphone").val() != "") {
        alert("Details UPDATED successfully!!");
    } else {
        alert("Please fill all detials correctly");
    }
});