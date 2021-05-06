var item = (function () {
    function item() {
    }
    return item;
}());
function getById(id) {
    return document.getElementById(id);
}
window.onload = function () {
    var addBtn = document.querySelector("input[type=button]");
    addBtn.onclick = addItem;
};
function clearAllErrors() {
    var errSummary = getById("validation-summary");
    errSummary.innerText = "";
}
function addItem() {
    console.log("Added Item was called");
    clearAllErrors();
    if (isAllDataValid()) {
        var item_1 = getItem();
        displayItem(item_1);
    }
}
function getItem() {
    var product = new item();
    var NameInput = getById("Name");
    product.Name = NameInput.value;
    var priceInput = getById("price");
    product.Price = parseFloat(priceInput.value);
    var typeInput = getById("Type");
    product.Type = typeInput.value;
    var shippingInput = getById("shipping");
    product.Shipping = shippingInput.value;
    var gift = getById("gift");
    product.IsGift = gift.checked;
    console.log(product);
    return product;
}
function displayItem(myItem) {
    var displayDiv = getById("display");
    var itemHeading = document.createElement("h2");
    itemHeading.innerText = myItem.Name;
    var itemInfo = document.createElement("p");
    var gameItemDisplay = "";
    if (myItem.IsGift) {
        gameItemDisplay = "This is a gift.";
    }
    else {
        gameItemDisplay = "shipping to your adress soon";
    }
    itemInfo.innerText = myItem.Name + " has a Type of " + myItem.Type + ". " +
        ("It costs $" + myItem.Price.toFixed(2) + ". " + gameItemDisplay);
    displayDiv.appendChild(itemHeading);
    displayDiv.appendChild(itemInfo);
}
function addErrorMessage(errMsg) {
    var errSummary = getById("validation-summary");
    var errItem = document.createElement("li");
    errItem.innerText = errMsg;
    errSummary.appendChild(errItem);
}
function addErrorMsgWithCustomClass(errMsg, cssClass) {
    var errSummary = getById("validation-summary");
    var errItem = document.createElement("li");
    errItem.classList.add(cssClass);
    errItem.innerText = errMsg;
    errSummary.appendChild(errItem);
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
