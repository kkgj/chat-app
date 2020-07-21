
var db = firebase.firestore();
if (localStorage.getItem('name')) {
    name = localStorage.getItem('name');
} else {
    name = prompt('What is your name?');
    localStorage.setItem('name', name);
}
document.querySelector('#name').innerText = name;

document.querySelector('#change-name').addEventListener('click', () => {
    name = prompt('What is your name?');
    localStorage.setItem('name', name);
    document.querySelector('#name').innerText = name;
});

document.querySelector('#message-form').addEventListener('submit', e => {
    e.preventDefault();
    let message = document.querySelector('#message-input').value;
    db.collection('messages').add({name: name, message: message})
    .then((docRef) => {
        console.log(`Document written with ID: ${docRef.id}`);
        document.querySelector('#message-form').reset();
    }).catch((error) => {
        console.error(`Error adding document: ${error}`);
    }); 
});

