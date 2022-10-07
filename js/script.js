
//* TOGGLES ADD CONTACT DIALOGUE
function toggleDialogue() {
    $("#addContactDialog").toggleClass("show");
}

//* ADD CONTACT TO LOCAL STORAGE
function addContact() {
    let contactDataObject = {
        name: $("#name").val(),
        email: $("#email").val(),
        mobile: $("#mobile").val(),
        landline: $("#landline").val(),
        website: $("#website").val(),
        address: $("#address").val()
    };

    let key = localStorage.length;

    localStorage.setItem(key, JSON.stringify(contactDataObject));

    toggleDialogue();

}

//* ADD NEW CONTACT DIV

//* LOAD CONTACTS

$("document").ready(function () {
    $("#addContact").click(toggleDialogue);
    $("#addContactButton").click(addContact);
});