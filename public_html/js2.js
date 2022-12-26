var jpdbbaseURL = "http://api.login2explore.com:5577";
var jpdbIRL = "/api/irl";
var jpdbIML = "/api/iml";
var empDBNAME = "COLLEGE-DB";
var empRelationName = "PROJECT-TABLE";
var connToken = "90938345|-31949271951726529|90951958";

$("#projectid").focus();

funtion saveRecNo2LS(jsonObj){
    var lvData = JSON.parse(jsonObj.data);
    localStorage.setItem("recno", lvData.rec_no);
}

function getProjectIdAsJsonObj() {
    var projectid = $("#projectid").val();
    var jsonStr = {
        id: projectid
    };
    return JSON.stringify(jsonStr);

}

function fillData(jsonObj) {
    saveRecNo2LS(jsonObj);
    var record = JSON.parse(jsnObj.date).record;
    $("#projecctname").val(record.name);
    $("#assignedto").val(record.assignedto);
    $("#assignmentdate").val(record.assignmentdate);
    $("#deadline").val(record.deadline);

}

function resetForm() {
    $("#projectid").val("");
    $("#projectname").val("");
    $("#assignto").val("");
    $("#assignmentdate").val("");
    $("#deadline").val("");
    $("#projectid").prop("disabled", false);
    $("#save").prop("disabled", true);
    $("#change").prop("disabled", true);
    $("#reset").prop("disabled", true);
    $("#projectid").focus();
}

function validationData() {
    var projectid, projectname, assignto, assignmentdate, deadline;
    projectid = $("#projectid").val();
    projectname = $("#projectname").val();
    assignedto = $("#assignedto").val();
    assignmentdate = $("#assignmentdate").val();
    deadline = $("#deadline").val();

    if (projectid === "") {
        alert("Project ID missing");
        $("#projectid").focus();
        return"";
    }
    if (projectname === "") {
        alert("Project Nmae missing");
        $("#projectname").focus();
        return"";
    }
    if (assignedto === "") {
        alert("Assigned to missing");
        $("#assignedto").focus();
        return"";
    }
    if (assignmentdate === "") {
        alert("Assignment date missing");
        $("#assignmentdate").focus();
        return"";
    }
    if (deadline === "") {
        alert("Deadline missing");
        $("#deadline").focus();
        return"";
    }


    var jsonStrObj = {
        id: projectid,
        name: projectname,
        assign: assignedto,
        assignment: assigmentdate,
        deadline: deadline

    };
    return JSON.stringify(jsonStrObj);
}

function getEmp() {
    var projectIdJsonObj = getProjectIdAsJsonObj();
    var getRequest = createGET_BY_KEYRequest(connToken, empDBName, empRelationName, empRelation, projectIdJsonObj);
    jQuery.ajaxSetup({async: false});
    var resJsonObj = executeCommandAtGivenBaseUrl(getRequest, jpdbBaseURL, jpdbURL);
    if (resJsonObj.status === 400) {
        $("#save").prop("disabled", false);
        $("#reset").prop("disabled", false);
        $("#projectname").focus();

    } else if (resJsonObj.status === 200) {
        $("#projectid").prop("disabled", true);
        fillData(resJsonObj);

        $("#update").prop("disabled", false);
        $("#reset").prop("disabled", false);
        $("#projectname").focus();


    }
}
function saveData() {
    var jsonObj = validateData();
    if (jsonStrObj === "") {
        return"";
    }
    var putRequest = createPUTRequest(connToken, jsonStrObj, empDBName, empRelationName);
    jQuery.ajaxSetup({async: false});
    var resJsonObj = executeCommandAtGivenBaseUrl(updateRequest, jpdbBaseURL, jpdbIML);
    jQuery.ajaxSetup({async: true});
    resetForm();
    $("#projectid").focus();

}

function updateData() {
    $("#update").prop("disabled", true);
    jsonchg = validateDate();
    var updateRequest = createUPDATERequest(connToken, jsonchg, empRelationName, localStorage.getItem("recno"));
    jQuery.ajaxSetup({async: false});
    var resJsonObj = executeCommandAtGivenBaseUrl(updateRequest, jpdbBaseURL, jpdbIML);
    jQuery.ajaxSetup({async: true});
    console.log(resJsonObj);
    resetForm();
    $("#projectid").focus();
}