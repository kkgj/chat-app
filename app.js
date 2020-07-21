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
    db.collection('messages').add({
        name: name, 
        message: message,
        date: firebase.firestore.Timestamp.fromMillis(Date.now())
    }).then((docRef) => {
        console.log(`Document written with ID: ${docRef.id}`);
        document.querySelector('#message-form').reset();
    }).catch((error) => {
        console.error(`Error adding document: ${error}`);
    }); 
});

db.collection('messages').orderBy('date', 'asc').onSnapshot(snapshot => {
    document.querySelector('#messages').innerHTML = '';
    snapshot.forEach(doc => {
        let message = document.createElement('div');
        let pName = document.createElement('p');
        pName.classList.add('name');
        pName.textContent = doc.data().name;
        let pMess = document.createElement('p');
        pMess.textContent = doc.data().message;
        message.appendChild(pName);
        message.appendChild(pMess);
        document.querySelector('#messages').appendChild(message)
    });
});

document.querySelector('#clear').addEventListener('click', () => {
    db.collection("messages").get().then(snapshot => {
        snapshot.forEach(doc => {
            db.collection('messages').doc(doc.id).delete()
            .then(() => {console.log('Document successfully deleted!')})
            .catch(error => {console.log(error)});
        });
    }).catch(error => {console.log(error)});
});

