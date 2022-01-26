const root = document.getElementById('root');


async function listBooks(element) {
    let response = await fetch('http://localhost:3001/listBooks')
    let responseText = await response.json();
    let ul = document.createElement('ul')
    responseText.forEach((e)=>{
        let li = document.createElement('li');
        li.innerText = `${e.title} `
        let input = document.createElement('input');
        input.setAttribute('id', e.id);
        input.setAttribute('value', e.quantity);
        li.append(input)
        let btn = document.createElement('button');
        btn.innerText = 'Save';
        btn.addEventListener('click', () => {
            console.log(`Button ${e.id} was clicked`);
            console.log(`Input value is ${input.value}`)
        })
        li.append(btn)
        ul.append(li)
    })
    root.append(ul);
}

listBooks(root);


