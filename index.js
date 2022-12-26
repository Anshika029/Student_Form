var jpdbBaseURL = 'http://api.login2explore.com:5577';
var jpdbIRL = '/api/irl';
var jpdbIML ='/api/iml';
var stDBName = "StudentDb";
var stRelationName = "Student-Relation";
var connToken = "90938313|-31949273703536137|90952328";

$('#rollno').focus();
function saveRecNo2LS(jsonObj) {
    var lvData = JSON.parse(jsonObj.data);
    localStorage.setItem('recno',lvData.rec_no);
}

function getRollnoAsJsonObj() {
    var rollno = $('#rollno').val();
    var jsonStr = {
        rollNo: rollno
    }

    return JSON.stringify(jsonStr);
}

function fillData(jsonObj) {
    saveRecNo2LS(jsonObj);
    var data = JSON.parse(jsonObj.data).record;
    $("#rollno").val(data.rollno);
$("#studentName").val(data.studentName);
$("#class").val(data.class);
$("#birthDate").val(data.birthDate);
$("#address").val(data.address);
$("eDate").val(data.enrollmentDate);

}

function resetData() {
    $("#rollno").val("")
    $("#studentName").val("");
    $("#class").val("");
    $("#birthDate").val("");
    $("#address").val("");
    $("eDate").val("");
    
    }

    function validateAndGetFormData() {
        var rollnoVar = $("#rollno").val();
        if (rollnoVar === "") {
        alert("Roll No. Required Value");
        $("#rollno").focus();
        return "";
        }
        var studentNameVar = $("#studentName").val();
        if (studentNameVar === "") {
        alert("Student Name is Required Value");
        $("#studentName").focus();
        return "";
        }
        var classVar = $("#class").val();
        if (classVar === "") {
        alert("Class is Required Value");
        $("#class").focus();
        return "";
        }
        var birthDateVar = $("#bithDate").val();
        if(birthDateVar === ""){
            alert("Birth Date is Required");
            $("birthDate").focus();
            return "";
        }
        var addressVar = $("#address").val();
        if(addressVar === ""){
            alert("Address is Required");
            $("#address").focus();
            return "";
        }
        var eDateVar = $("#eDate").val();
        if(eDateVar === ""){
            alert("Enrollment Date is Required");
            $("#eDate").focus();
            return "";
        }
        var jsonStrObj = {
        rollno: rollnoVar,
        studentName: studentNameVar,
        class: classVar,
        birthDate: birthDateVar,
        address: addressVar,
        enrollmentDate: eDateVar
        };
        
        return JSON.stringify(jsonStrObj);
        }

        function getStudent() {
            var rollnoJsonObj = getRollnoAsJsonObj();
            var getRequest = createGET_BY_KEYRequest(connToken,stDBName,stRelationName,rollnoJsonObj);
            jQuery.ajaxSetup({async: false});
            var resultObj = executeCommandAtGivenBaseUrl(getRequest,jpdbBaseURL, jpdbIRL);
            console.log(resultObj)
            console.log(resultObj.status);
            jQuery.ajaxSetup({async: true});
            
            if(resultObj.status === 400){
                $("#save").prop("disabled",false);
                $("#reset").prop("disabled",false);
                $("#rollno").focus();
            }
            else if(resultObj.status === 200){
                $("#rollno").prop("disabled",true);
                fillData(resultObj);
        
                $("#change").prop("disabled",false);
                $("#reset").prop("disabled",false);
                $("#rollno").focus();
            }
        }

function saveData() {
    var jsonStr = validateAndGetFormData();
    if (jsonStr === "") {
    return;
    }
    var putReqStr = createPUTRequest(connToken,
    jsonStr, stDBName, stRelationName);
    alert(putReqStr);
    jQuery.ajaxSetup({async: false});
    var resultObj = executeCommandAtGivenBaseUrl(putReqStr,
    jpdbBaseURL, jpdbIML);
    alert(JSON.stringify(resultObj));
    jQuery.ajaxSetup({async: true});
    resetData();

    $("#rollno").focus();
    }

function changeData() {
    $("#change").prop("disabled",true);
    jsonChng = validateAndGetFormData();
    var updateRequest = createUPDATERecordRequest(connToken,jsonChng,stDBName,stRelationName,localStorage.getItem('recno'));
    jQuery.ajaxSetup({asyn: false});
    var resJsonObj = executeCommandAtGivenBaseUrl(updateRequest,jpdbBaseURL,jpdbIML);
    jQuery.ajaxSetup({async: true});
    console.log(resJsonObj);
    resetData();
    $("#rollno").focus();

}