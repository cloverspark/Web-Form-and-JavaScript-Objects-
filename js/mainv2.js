var Item = (function () {
    function Item() {
    }
    return Item;
}());
window.onload = function () {
    var addBtn = document.querySelector("input[type=button]");
    addBtn.onclick = addItem;
};
function clearAllErrors() {
    var errSummary = getById("validations");
    errSummary.innerText = "";

}
function addItem() {
    console.log("Add video Items was called");
    
    if (isAllDataValid()) {
        var produce = getItem();
        displayItems(produce);
        clearAllErrors();
    }
    
}

function getById(id) {
    return document.getElementById(id);
}
function getItem() {
    var Items = new Item();
    var NameInput = getById("Name");
    Items.Name = NameInput.value;
    var priceInput = getById("price");
    Items.price = parseFloat(priceInput.value);
    var ProduceTypeInput = getById("type");
    Items.ProduceType = ProduceTypeInput.value;
    var shippingTypeInput = getById("shipping");
    Items.shippingType = shippingTypeInput.value;
    var selfOrGift = getById("gift");
    Items.isGift = selfOrGift.checked;
    console.log(Items);
    return Items;
}
function displayItems(myItems) {
    var displayDiv = getById("display");
    var ItemsHeading = document.createElement("h2");
    ItemsHeading.innerText = myItems.Name;
    var ItemsInfo = document.createElement("p");
    var ItemsMediumDisplay = "";
    if (myItems.isGift) {
        ItemsMediumDisplay = "This is a gift in";
    }
    else {
        ItemsMediumDisplay = "shipping to your location in";
    }
    ItemsInfo.innerText = myItems.Name + " has a ProduceType of " + myItems.ProduceType + ". " +
        ("It costs $" + myItems.price.toFixed(2) + ". " + ItemsMediumDisplay + " " + myItems.shippingType + " days.");
    displayDiv.appendChild(ItemsHeading);
    displayDiv.appendChild(ItemsInfo);
}
function getInputById(id) {
    return document.getElementById(id);
}
function isAllDataValid() {
    var isValid = true;
    var name = getById("Name").value;
    if (name == "") {
        isValid = false;
        addErrorMessage("Name is required");
    }
    var price = getById("price").value;
    var priceValue = parseFloat(price);
    if (price == "" || isNaN(priceValue)) {
        isValid = false;
        addErrorMessage("Price is required and must be a number");
    }
    var type = getById("type").value;
    if (type == "") {
        isValid = false;
        addErrorMsgWithCustomClass("You must choose a type!", "type-error");
    }
    var shipping = getById("shipping").value;
    if (shipping == "") {
        isValid = false;
        addErrorMsgWithCustomClass("You must choose a shipping type!", "shipping-error");
    }
    return isValid;
}

function addErrorMessage(errMsg) {
    var errSummary = getById("validations");
    var errItem = document.createElement("li");
    errItem.innerText = errMsg;
    errSummary.appendChild(errItem);
}
function addErrorMsgWithCustomClass(errMsg, cssClass) {
    var errSummary = getById("validations");
    var errItem = document.createElement("li");
    errItem.classList.add(cssClass);
    errItem.innerText = errMsg;
    errSummary.appendChild(errItem);
}
