let addToy = false;

function createToy(toy) {
  let div = document.createElement('div');
  let h2 = document.createElement('h2');          
  let img = document.createElement('img');
  let p = document.createElement('p');
  let button = document.createElement('button');
  
  div.id = "card_" + toy["id"];
  div.classList.add('card');
  h2.innerHTML = toy['name'];
  img.classList.add('toy-avatar');
  img.src = toy['image'];
  p.innerHTML = toy['likes'] + " Likes";
  button.classList.add('like-btn');
  button.innerHTML = 'Like';
  button.onclick = function () { putLike(toy['likes'], toy['id']); }
  
  div.appendChild(h2);
  div.appendChild(img);
  div.appendChild(p);
  div.appendChild(button);

  return div;
}

function addToyToDisplay(toy)
{
  document.getElementById('toy-collection').appendChild( createToy( toy ) );
}

function fetchToys() {
  fetch("http://localhost:3000/toys")
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data[0]);
      for (let index in data) {
        addToyToDisplay(data[index]);
      }
    })
}

function putLike( currentAmo, id) {
  fetch("http://localhost:3000/toys/" + id, {
    method: "PATCH",
    headers:
    {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      "likes": currentAmo + 1
    })
  }).then(() => {  
    document.querySelector("#card_" + id + " p").innerHTML = currentAmo + 1 + " Likes";
  });

}

function addToyToDb( name, image ) {
  fetch("http://localhost:3000/toys", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      name: name,
      image: image,
      likes: 0
    })
  });
}

function addToyFromForm() {
  let name = document.getElementById('name').value;
  let image = document.getElementById('image').value;
  addToyToDb(name, image);
  addToyToDisplay({
    name: name,
    image: image,
    likes: 0
  });

}

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  fetchToys();
});
