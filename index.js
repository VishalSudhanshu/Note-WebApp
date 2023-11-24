const addBtn = document.querySelector("#add-note")

addBtn.addEventListener("click", function(){
    addNotes()
})

function addNotes(text = "") {
    const note = document.createElement("div")
    note.classList.add("note")
    note.innerHTML = `<div class="tools">
        <i id="save" class="fa-regular fa-floppy-disk"></i>
        <i id="delete" class="fa-solid fa-trash"></i>
    </div>
    <textarea>${text}</textarea>`
    document.querySelector(".container").appendChild(note)
    saveNotes()

    note.querySelector("#delete").addEventListener("click", function () {
        note.remove()
        saveNotes()
    })
    
    note.querySelector("#save").addEventListener("click", function () {
        saveNotes()
    })

    note.querySelector("textarea").addEventListener("focusout", function(){
        saveNotes()
    })
}

function saveNotes() {
    const notes = document.querySelectorAll(".note textarea")
    const data = []
    notes.forEach((note) => {
        data.push(note.value)
    })
    if(data.length === 0){
        localStorage.removeItem("notes")
    }else{
        localStorage.setItem("notes",JSON.stringify(data))
    }
}


(
    function (){
        const lsNotes = JSON.parse(localStorage.getItem("notes"))
        if(!lsNotes){
            addNotes()
        }else{
            lsNotes.forEach((lsNote) =>{
                addNotes(lsNote)
            })
        }
    }
)()
