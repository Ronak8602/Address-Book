let selectedIndex;

//* TOGGLES ADD CONTACT DIALOGUE
function toggleAddDialogue() {
    if ($("#addContactDialog").hasClass("show2")) {
        $("#addContactDialog").toggleClass("show2");
        $("#updateContactButton").toggleClass("showButton");
    }
    $("#nameInput").val("");
    $("#emailInput").val("");
    $("#mobileInput").val("");
    $("#landlineInput").val("");
    $("#websiteInput").val("");
    $("#addressInput").val("");
    $("#addContactDialog").toggleClass("show");
    $("#addContactButton").toggleClass("showButton");

}

//* TOGGLES UPDATE CONTACT DIALOGUE
function toggleUpdateDialogue() {
    $("#addContactDialog").toggleClass("show2");
    $("#updateContactButton").toggleClass("showButton");
}

//* ADD CONTACT TO LOCAL STORAGE

function addContact() {

    let contactDataObject = {
        name: $("#nameInput").val(),
        email: $("#emailInput").val(),
        mobile: $("#mobileInput").val(),
        landline: $("#landlineInput").val(),
        website: $("#websiteInput").val(),
        address: $("#addressInput").val()
    };

    let key = Date.now();
    createContactDiv(key, contactDataObject);
    localStorage.setItem(key, JSON.stringify(contactDataObject));
    toggleAddDialogue();
}

//* CREATE CONTACT DIV

function createContactDiv(index, data) {
    $("#contactList").append(
        `<div class="contactCard" id="${index}">
        <p class="contactName">${data.name}</p>
        <p class="contactDetails">${data.email}</p>
        <p class="contactDetails">${data.mobile}</p>
      </div>`
    )
}

//* SHOW CONTACT DETAILS

function showContactDetails(id) {
    let data = JSON.parse(localStorage.getItem(id));

    $(".editIcon").attr("id", `edit${id}`);
    $(".deleteIcon").attr("id", `delete${id}`);

    $("#nameDetail").text(data.name);
    $("#emailDetail").text(data.email);
    $("#mobileDetail").text(data.mobile);
    $("#landlineDetail").text(data.landline);
    $("#websiteDetail").text(data.website);
    $("#addressDetail1").text(data.address);

    $("#contactDetailCard").removeClass("invisible");

}

//* UPDATE CONTACT

function openUpdateContactDialog(id) {
    selectedIndex = id;
    let data = JSON.parse(localStorage.getItem(id));

    $("#nameInput").val(data.name);
    $("#emailInput").val(data.email);
    $("#mobileInput").val(data.mobile);
    $("#landlineInput").val(data.landline);
    $("#websiteInput").val(data.website);
    $("#addressInput").val(data.address);


    toggleUpdateDialogue();
}

function updateContact() {

    let contactDataObject = {
        name: $("#nameInput").val(),
        email: $("#emailInput").val(),
        mobile: $("#mobileInput").val(),
        landline: $("#landlineInput").val(),
        website: $("#websiteInput").val(),
        address: $("#addressInput").val()
    };

    localStorage.setItem(selectedIndex, JSON.stringify(contactDataObject));

    $(`#${selectedIndex}`).html(`
    <p class="contactName">${contactDataObject.name}</p>
        <p class="contactDetails">${contactDataObject.email}</p>
        <p class="contactDetails">${contactDataObject.mobile}</p>`);



    toggleUpdateDialogue();
}

//* DELETE CONTACT

function deleteContact(id) {
    $(`#${id}`).remove();
    localStorage.removeItem(id);
    $("#contactDetailCard").addClass("invisible");
}

//* LOAD CONTACTS ON STARTUP

function loadContacts() {
    for (let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i);
        let data = JSON.parse(localStorage.getItem(key));
        $("#contactList").append(
            `<div class="contactCard" id="${key}">
        <p class="contactName">${data.name}</p>
        <p class="contactDetails">${data.email}</p>
        <p class="contactDetails">${data.mobile}</p>
      </div>`
        )
    }
}

//* MAIN CODE

$("document").ready(function () {
    loadContacts();
    $("#addContact").click(toggleAddDialogue);
    $("#addContactButton").click(addContact);
    $("#updateContactButton").click(updateContact);
    $("body").on("click", ".contactCard", function () {
        showContactDetails(this.id);
    });
    $("body").on("click", ".editIcon", function () {
        openUpdateContactDialog(this.id.substring(4));
    });
    $("body").on("click", ".deleteIcon", function () {
        deleteContact(this.id.substring(6));
    });
});