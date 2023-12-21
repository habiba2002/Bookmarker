var nameInput = document.getElementById('webSiteName')
var urlInput = document.getElementById('webSiteURL')
var addBtn = document.getElementById('addBtn')
var editBtn = document.getElementById('editBtn')
var closeBtn = document.getElementById('closeBtn')
var msgContainer = document.getElementById('msg-container')
var siteList = JSON.parse(localStorage.getItem("siteData"))
var searchInput = document.getElementById('search')
var index = 0;

if (siteList == null) {
    siteList = []
}
else {
    show()
}

function sitNameValidation() {
    var regex = /^.{3,}/
    if (regex.test(nameInput.value) === true) {
        nameInput.classList.add('is-valid')
        nameInput.classList.remove('is-invalid')
        return true
    } else {
        nameInput.classList.remove('is-valid')
        nameInput.classList.add('is-invalid')
        return false
    }
}

function sitUrlValidation() {
    var regex = /^(https:\/\/)?[A-Za-z-0-9]{0,}(\.[A-Za-z-0-9]{2,})/
    if (regex.test(urlInput.value) === true) {
        urlInput.classList.add('is-valid')
        urlInput.classList.remove('is-invalid')
        return true
    } else {
        urlInput.classList.remove('is-valid')
        urlInput.classList.add('is-invalid')
        return false
    }
}

function addSite() {
    site = {
        name: nameInput.value,
        url: urlInput.value
    }
    if (sitNameValidation() === true && sitUrlValidation() === true) {
        siteList.push(site)
        localStorage.setItem("siteData", JSON.stringify(siteList))
        show()
    }
    else {
        msgContainer.classList.remove('d-none')
    }
}
function show() {
    var row = ' '
    for (var i = 0; i < siteList.length; i++) {
        row +=
            `<tr>
                <td> ${i + 1}</td>
                <td> ${siteList[i].name}</td>
                <td><a href='${siteList[i].url}'><button type="button" class="btn btn-dark">Visit<i class='fa-solid fa-eye ms-2'></i></button></a></td>
                <td><button type="button" onclick='deleteSite(${i})' class="btn btn-dark">Delete<i class='fa-solid fa-trash ms-2'></i></button></td>
                <td><button type="button" onclick='editSite(${i})' class="btn btn-dark">Edit<i class='fa-solid fa-edit ms-2'></i></button></td>        
            </tr>`
    }

    document.getElementById('tableData').innerHTML = row
}
function clearForm() {
    nameInput.value = ' '
    urlInput.value = ' '
}
function deleteSite(index) {
    siteList.splice(index, 1)
    localStorage.setItem("siteData", JSON.stringify(siteList))
    show()
}
function editSite(index) {
    nameInput.value = siteList[index].name
    urlInput.value = siteList[index].url
    addBtn.classList.add('d-none')
    editBtn.classList.remove('d-none')
    index = index
}

function editValues() {
    siteList[index].name = nameInput.value
    siteList[index].url = urlInput.value
    localStorage.setItem("siteData", JSON.stringify(siteList))
    clearForm()
    show()
    addBtn.classList.remove('d-none')
    editBtn.classList.add('d-none')
}

function closeMsg() {
    msgContainer.classList.add('d-none')
}

function searchSite() {
    var row = ' '
    var searchKey = searchInput.value.toLowerCase()
    for (var i = 0; i < siteList.length; i++) {
        if (siteList[i].name.toLowerCase().includes(searchKey) == true || siteList[i].url.toLowerCase().includes(searchKey) == true) {
            row +=
                `<tr>
                <td> ${i + 1}</td>
                <td> ${siteList[i].name}</td>
                <td><a href='${siteList[i].url}'><button type="button" class="btn btn-dark">Visit<i class='fa-solid fa-eye ms-2'></i></button></a></td>
                <td><button type="button" onclick='deleteSite(${i})' class="btn btn-dark">Delete<i class='fa-solid fa-trash ms-2'></i></button></td>
                <td><button type="button" onclick='editSite(${i})' class="btn btn-dark">Edit<i class='fa-solid fa-edit ms-2'></i></button></td>        
            </tr>`
        }
    }
    document.getElementById('tableData').innerHTML = row

}

