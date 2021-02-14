console.log("Postman Project");

// initaillizng no of parameters

let paramsCount = 0;

// utilizing str to DOM Element
function getdomElement(string) {
    let div = document.createElement("div");
    div.innerHTML = string;
    return div.firstElementChild;
}

let paramsBox = document.getElementById('paramsBoxes');
// paramsBox.style.display = 'none';


// If Parmas Radio is clicked display paramsBoxes
let paramsRadio = document.getElementById('customRadio');
paramsRadio.addEventListener('click', () => {
    document.getElementById('jsonContentBox').style.display = 'none';
    paramsBox.style.display = 'block';
})

// If Json Radio is clicked display JSON Box
let jsonRadio = document.getElementById('jsonRadio');
jsonRadio.addEventListener('click', () => {
    paramsBox.style.display = 'none';
    document.getElementById('jsonContentBox').style.display = 'block';
})

// If the user clickes on "+" button add more params
let addParameters = document.getElementById('addParams');
addParameters.addEventListener('click', () => {
    let params = document.getElementById('moreParams');
    let str = `<div class="row mb-3">
                    <label for="paramsBoxes" class="col-sm-2 col-form-label">Parameter ${paramsCount + 2}</label>
                    <div class="col-sm-6">
                        <div class="row">
                            <div class="col">
                                <input type="text" class="form-control" placeholder="Enter Key ${paramsCount + 2}" id="Key${paramsCount + 2}">
                            </div>
                            <div class="col">
                                <input type="text" class="form-control" placeholder="Enter Value ${paramsCount + 2}" id="Value${paramsCount + 2}">
                            </div>
                            <div class="col">
                                <button type="button" class="btn btn-primary delParams"> - </button>
                            </div>
                        </div>
                    </div>
                </div>`;
    let addParams = getdomElement(str)
    params.appendChild(addParams)
    // If "-" is clicked parameter should be removed
    let delParams = document.getElementsByClassName('delParams');
    for (item of delParams) {
        item.addEventListener('click', (e) => {
            e.target.parentElement.parentElement.parentElement.parentElement.remove()
        })
    }
    paramsCount++;
});

// submit button enabled and disabled depend upon URL input
let submit = document.getElementById("submit");
let urlValue = document.getElementById("targetUrl");
urlValue.addEventListener("input", () => {
    if (urlValue.value === "")
        submit.disabled = true;
    else
        submit.disabled = false;
})
// When Submit button is clicked
submit.addEventListener("click", () => {
    // show "please wait" to user
    document.getElementById("responsePrism").innerHTML = "please wait while we are fetching data";
    Prism.highlightAll();
    // fetching values entered by user
    let url = document.getElementById("targetUrl").value;
    let requestType = document.querySelector("input[name= 'request']:checked").value;
    let contentType = document.querySelector("input[name= 'content']:checked").value;

    // if params is selected
    let data = {}
    if (contentType === 'params') {
        for (i = 0; i <= paramsCount; i++) {
            if ((document.getElementById(`Key${i+1}`)) !== null) {
                let key = document.getElementById(`Key${i+1}`).value;
                let value = document.getElementById(`Value${i+1}`).value;
                data[key] = value;
            }
        }
        data = JSON.stringify(data);
        // console.log(data)
    } else {
        data = document.getElementById("jsonContent").value;
        // console.log(data)
    }
    // After clicking Submit button - GET Request
    if (requestType === "GET") {
        fetch(url, {
                method: 'GET'
            })
            .then(res => res.text())
            .then(text => {
                document.getElementById('responsePrism').innerHTML = text;
                Prism.highlightAll();
            })
    }
    // After clicking Submit button - POST Request
    else {
        fetch(url, {
                method: 'POST',
                body: data,
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                }
            })
            .then(res => res.text())
            .then(text => {
                document.getElementById('responsePrism').innerHTML = text;
                Prism.highlightAll();
            })
    }
    document.getElementById("targetUrl").value = "";
    document.querySelector("input[value= 'GET']").checked = true;
    document.querySelector("input[value= 'json']").checked = true;
})