
let myLeads = [ ]
const inputEl = document.getElementById("input-el")
const saveButtonId = document.getElementById("save-button-id")
const ulEl = document.getElementById("ul-el")
const deleteButtonId = document.getElementById("delete-button-id")
const tabButtonId = document.getElementById("save-tab-button-id")


const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"))

localStorage.clear()

if (leadsFromLocalStorage){
    myLeads = leadsFromLocalStorage
    render(myLeads)
}

tabButtonId.addEventListener("click", function(){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        console.log(tabs)
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads))
        render(myLeads)
    })
})

saveButtonId.addEventListener("click", function(){
    console.log("Clicou no save")
    myLeads.push(inputEl.value)
    console.log(myLeads)
    inputEl.value = ""
    localStorage.setItem("myLeads", JSON.stringify(myLeads))
    render(myLeads)
})

deleteButtonId.addEventListener("dblclick" , function(){
    console.log("Clicou no delete")
    localStorage.clear()
    myLeads = []
    render(myLeads)
})

function render(leads){
     let listItems = ""
for (i = 0; i<leads.length; i++){
     listItems+= `
                        <li>
                            <a href= ${leads[i]} target='_blank'>
                                ${leads[i]}
                            </a>
                        </li>`
}
ulEl.innerHTML = listItems
}
