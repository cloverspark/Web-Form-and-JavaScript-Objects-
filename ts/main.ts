class item
{
    Name:string;
    Price:number;
    Type:string;
    Shipping:string;
    IsGift:boolean;
}
function getById(id:string)
{
    return document.getElementById(id);
}

window.onload = function()
{
    let addBtn = 
        <HTMLElement>document.querySelector("input[type=button]");
    addBtn.onclick = addItem;
}

function clearAllErrors()
{
    let errSummary = getById("validation-summary");
    errSummary.innerText = "";
}

function addItem()
{
    console.log("Added Item was called");
    clearAllErrors();

    if(isAllDataValid()){
        let item:item = getItem();
        displayItem(item);
    }
    
}

function getItem():item
{
    let product = new item();

    // Populate with data from the form
    let NameInput = <HTMLInputElement>getById("Name");
    product.Name = NameInput.value;

    let priceInput = <HTMLInputElement>getById("price");
    product.Price = parseFloat(priceInput.value);

    let typeInput = <HTMLSelectElement>getById("Type");
    product.Type = typeInput.value;

    let shippingInput = <HTMLInputElement>getById("shipping");
    product.Shipping = shippingInput.value;

    let gift = <HTMLInputElement>getById("gift");
    product.IsGift = gift.checked;
    console.log(product);
    return product;
}

function displayItem(myItem:item):void
{
    let displayDiv = getById("display");

    
    let itemHeading = document.createElement("h2");
    itemHeading.innerText = myItem.Name;

    
    let itemInfo = document.createElement("p");
    let gameItemDisplay = "";
    if(myItem.IsGift){
        gameItemDisplay = "This is a gift.";
    }
    else{
        gameItemDisplay = "shipping to your adress soon";
    }
    itemInfo.innerText = `${myItem.Name} has a Type of ${myItem.Type}. ` +
        `It costs $${myItem.Price.toFixed(2)}. ${gameItemDisplay}`;

   
    displayDiv.appendChild(itemHeading);
    
    displayDiv.appendChild(itemInfo);
}

function addErrorMessage(errMsg:string) 
{
    let errSummary = getById("validation-summary");
    let errItem = document.createElement("li");
    errItem.innerText = errMsg;
    errSummary.appendChild(errItem);
}

function addErrorMsgWithCustomClass(errMsg:string, cssClass:string)
{
    let errSummary = getById("validation-summary");
    let errItem = document.createElement("li");
    errItem.classList.add(cssClass);
    errItem.innerText = errMsg;
    errSummary.appendChild(errItem);
}

function isAllDataValid()
{
    let isValid = true;

    let name = (<HTMLOptionElement>getById("Name")).value;
    if(name == "")
    {
        isValid = false;
        addErrorMessage("Name is required");
    }

    let price = (<HTMLOptionElement>getById("price")).value;
    let priceValue = parseFloat(price);
    if(price == "" || isNaN(priceValue))
    {
        isValid = false;
        addErrorMessage("Price is required and must be a number");
    }

    let type = (<HTMLOptionElement>getById("type")).value
    if(type == "")
    {
        isValid = false;
        addErrorMsgWithCustomClass("You must choose a type!", "type-error");
    }
    let shipping = (<HTMLOptionElement>getById("shipping")).value
    if(shipping == "")
    {
        isValid = false;
        addErrorMsgWithCustomClass("You must choose a shipping type!", "shipping-error");
    }

    return isValid;
}