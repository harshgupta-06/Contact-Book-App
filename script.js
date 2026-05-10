const nameInput = document.querySelector("#nameInput");
const phoneInput = document.querySelector("#phoneInput");
const emailInput = document.querySelector("#emailInput");
const addBtn = document.querySelector("#addBtn");
const searchInput  = document.querySelector("#searchInput");
const contactContainer  = document.querySelector("#contactContainer");

let editIndex = null;

let contacts = JSON.parse(localStorage.getItem("contacts")) || [];

const saveData = () => {
    localStorage.setItem("contacts" , JSON.stringify(contacts));
};

const renderContacts = () => {
    contactContainer.innerHTML="";

    const searchText = searchInput.value.toLowerCase();
    let found = false;

    contacts.forEach((contact,index) => {
        if(
            !contact.name.toLowerCase().includes(searchText) && 
            !contact.phone.includes(searchText)
        ){
            return;
        }

        found = true;

        const card = document.createElement("div");
        card.classList.add("contact-card");

        card.innerHTML = `
        <h3> ${contact.name} </h3>
        <p> 📞 ${contact.phone} </p>
        <p> 📧 ${contact.email} </p>

         <div class="actions">
        <button class="editBtn" data-index="${index}">Edit</button>
        <button class="deleteBtn" data-index="${index}">Delete</button>
      </div>
        `;

        contactContainer.appendChild(card);
    });

    if(!found){
        contactContainer.innerHTML=`
        <p class="empty-msg"> No contacts found </p>
        `
    }
    
};


const addContact = () => {
  const name = nameInput.value.trim();
  const phone = phoneInput.value.trim();
  const email = emailInput.value.trim();

  if (name === "" || phone === "" || email === "") {
    alert("Please fill all fields!");
    return;
  }

  if (editIndex !== null) {
    contacts[editIndex] = { name, phone, email };
    editIndex = null;
    addBtn.textContent = "Add Contact";
  } else {
    contacts.push({ name, phone, email });
  }

  saveData();
  renderContacts();

  nameInput.value = "";
  phoneInput.value = "";
  emailInput.value = "";
};


contactContainer.addEventListener("click", (event) => {
    const button = event.target;

    if(!button.dataset.index) return;
    const index = Number(button.dataset.index);

    if(button.classList.contains("deleteBtn")){
        if(confirm("are u sure want to delete this contact?")){
            contacts.splice(index,1);
            saveData();
            renderContacts();

             alert("Contact deleted successfully ✅");
        }
    }

    if(button.classList.contains("editBtn")){
        const contact = contacts[index];

        nameInput.value = contact.name;
        phoneInput.value = contact.phone;
        emailInput.value = contact.email;

        editIndex = index;
        addBtn.textContent = "Update Contact";
}
});

searchInput.addEventListener("input" , renderContacts);
addBtn.addEventListener("click" , addContact);

document.addEventListener("keydown" , (event) => {
    if(event.key === "Enter"){
        addContact();
    }
});

renderContacts();

