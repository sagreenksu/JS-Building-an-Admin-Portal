// Beginning Second Stage

const root = document.getElementById('root');

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
    console.log(responseText);
}


async function listBooks(element) {
    let response = await fetch('http://localhost:3001/listBooks')
    let responseText = await response.json();
    let ul = document.createElement('ul')
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
