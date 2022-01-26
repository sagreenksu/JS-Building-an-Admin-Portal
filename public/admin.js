const root = document.getElementById('root');

const btnSubmit = document.getElementById('submit');
btnSubmit.addEventListener('click', () => {
    let bookTitle = document.getElementById('book-title').value;
    let bookDesc = document.getElementById('book-desc').value;
    let bookImg = document.getElementById('book-image').value;
    addBook(bookTitle, bookDesc, bookImg);
    document.getElementById('form').reset();
})

async function addBook(title, description, imageURL) {
    const year = new Date().getFullYear();
    let bodyObj = {
        "id": 1,
        "title": title,
        "year": year,
        "description": description,
        "quantity": 1,
        "imageURL": imageURL
      }
    let response = await fetch('http://localhost:3001/addBook', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(bodyObj),
    });
    let responseText = await response.json();
    console.log(responseText);
    let bookList = document.getElementById('book-list');

    let li = document.createElement('li');
    li.innerText = `${responseText.title} `
    li.setAttribute('id', `list-item-${responseText.id}`)

    let input = document.createElement('input');
    input.setAttribute('id', responseText.id);
    input.setAttribute('value', responseText.quantity);
    li.append(input)

    let btnSaveItem = document.createElement('button');
    btnSaveItem.innerText = 'Save';
    btnSaveItem.addEventListener('click', () => {
        updateQty(responseText.id, input.value)
    });
    li.append(btnSaveItem);

    let btnDelete = document.createElement('button');
    btnDelete.innerText = 'Delete';
    btnDelete.addEventListener('click', () => {
        deleteBook(responseText.id)
        document.getElementById(`list-item-${responseText.id}`).remove();
    });
    li.append(btnDelete);

    bookList.append(li);
}

async function updateQty(id, quantity) {
    let response = await fetch('http://localhost:3001/updateBook', {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "id": id,
            "quantity": quantity,
        }),
    });
    let responseText = await response.json();
}

async function deleteBook(id) {
    let response = await fetch(`http://localhost:3001/removeBook/${id}`, {
        method: "DELETE"
    });
    let responseText = await response.json();
}

async function listBooks(element) {
    let response = await fetch('http://localhost:3001/listBooks')
    let responseText = await response.json();
    let ul = document.createElement('ul')
    ul.setAttribute('id', 'book-list');

    responseText.forEach((item)=>{
        let li = document.createElement('li');
        li.innerText = `${item.title} `
        li.setAttribute('id', `list-item-${item.id}`)

        let input = document.createElement('input');
        input.setAttribute('id', item.id);
        input.setAttribute('value', item.quantity);
        li.append(input)

        let btnSaveItem = document.createElement('button');
        btnSaveItem.innerText = 'Save';
        btnSaveItem.addEventListener('click', () => {
            updateQty(item.id, input.value)
        });
        li.append(btnSaveItem);

        let btnDelete = document.createElement('button');
        btnDelete.innerText = 'Delete';
        btnDelete.addEventListener('click', () => {
            deleteBook(item.id)
            document.getElementById(`list-item-${item.id}`).remove();
        });
        li.append(btnDelete);

        ul.append(li);
    })
    root.append(ul);
}

listBooks(root);
