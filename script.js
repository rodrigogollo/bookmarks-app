const addDiv = document.querySelector('.add');
const items = document.querySelector('.items');
const container = document.querySelector('.container');

addDiv.addEventListener('click', function(){
    container.classList.add('open');
});

const btnAdd = document.querySelector('#btnAdd');
btnAdd.addEventListener('click', function(){
    let title = document.querySelector('#title').value;
    let link = document.querySelector('#link').value
    let storage = JSON.parse(localStorage.getItem('bookmarks'));
    let id;
    if (storage.length==0) id = 1
    else id = storage[storage.length-1].id + 1;
    addNewDiv(id, title, link, true);
});

function addNewDiv(id, title, link, fromBtn) {
    if(fromBtn) window.event.preventDefault();
    if ((title != null && title != "") && (link != null && link != "")) {
        const newDiv = document.createElement("div");
        newDiv.classList.add('item');
        newDiv.setAttribute('id', id)
        
        const newIcon = document.createElement("i");
        newIcon.classList.add('remove', 'fas', 'fa-times', 'fa');
        newIcon.setAttribute('id', 'remove')
        newIcon.addEventListener('click', function(){
            this.parentElement.remove();
            removeFromStorage(newDiv.getAttribute('id'))
        });

        const newH3 = document.createElement("h3");
        newH3.innerText = title;

        newH3.addEventListener('click', function(){
            let url = link;
            if (!/^(?:f|ht)tps?\:\/\//.test(url)) {
                url = "http://" + url;
            }
            console.log(url)
            window.open(url, '_blank');
        })

        newDiv.appendChild(newIcon)
        newDiv.appendChild(newH3)
        
        items.appendChild(newDiv)

        btnCloseForm.click();
        
        if(fromBtn) addToStorage(title, link);
    }
}

function addToStorage(entryTitle, entryLink) {
    if(localStorage.getItem("bookmarks") == null || localStorage.getItem("bookmarks") == '') localStorage.setItem("bookmarks", JSON.stringify([]));
    let storage = JSON.parse(localStorage.getItem("bookmarks"));

    let id;
    if (storage.length==0) id = 1
    else id = storage[storage.length-1].id + 1;

    var entry = {
        "id": id,
        "title": entryTitle,
        "link": entryLink
    };

    storage.push(entry);
    localStorage.setItem("bookmarks", JSON.stringify(storage));
}

function removeFromStorage(id) {
    let storage = JSON.parse(localStorage.getItem('bookmarks'));
    let newBookmark = storage.filter(obj => obj.id != id);
    localStorage.setItem("bookmarks", JSON.stringify(newBookmark));
}

const btnCloseForm = document.querySelector('#closeForm');

btnCloseForm.addEventListener('click', function(){
    document.querySelector('#title').value = '';
    document.querySelector('#link').value = '';
    container.classList.remove('open');
})

function populateStorage(){
    if(localStorage.getItem("bookmarks") == null || localStorage.getItem("bookmarks") == '') localStorage.setItem("bookmarks", JSON.stringify([]));
    let storage = JSON.parse(localStorage.getItem("bookmarks"));
    storage.forEach(bookmark => {
        addNewDiv(bookmark.id, bookmark.title, bookmark.link, false);
    })
}
populateStorage();
