import SearchBar from "./components/searchBar";
import AddButton from "./components/addButton";
import Modal from "./components/model";
import MobileNavBar from './components/mobileNavBar.jsx';
import BottomNavBar from "./components/bottamNavBar.jsx";
import { useEffect, useState } from "react";
import { DB } from "./Config/firebaseConfig";
import { doc, deleteDoc, collection, onSnapshot } from "firebase/firestore";
import { FaUser, FaEdit, FaTrash } from 'react-icons/fa';


export default function App() {
  const [contacts, setContacts] = useState([]); //contacts State
  const [modal, setModal] = useState(false); //modal State
  const [update, setUpdate] = useState(null); //modal State for updating contact, where this state acts as boolean
  const [loading, setLoading] = useState(false);// loading state
  console.log(contacts);
  
  function onOpen() {
    setModal(true);
  }

  function onClose() {
    setModal(false);
  }

  //delete contact
  async function deleteContact(id) {
    try {
      const userDoc = doc(DB, "contacts", id);
      await deleteDoc(userDoc);
     
     
    } catch (error) {
      alert("Failed !");
    } // <- Missing closing curly brace was here
  }

  //getting data from firebase
  async function getContacts() {
    try {
      //use same names as in ur firebase database
      setLoading(true);
      const contacts_collection = collection(DB, "contacts");
      onSnapshot(contacts_collection, (snapshot) => {
        const contactLists = snapshot.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          };
        });
        setContacts(contactLists);
        setLoading(false);
        return contactLists;
      });
    } catch (error) {
      console.log(error);
    }
  }

  // using useEffect with empty string which will make getContact function call after initial render
  useEffect(() => {
    getContacts();
  }, []);

  return (
    
    <div className="relative mx-auto h-[520px] min-h-[520px] max-h-[520px] max-w-[330px] p-4 bg-white  mt-10 ">
       <MobileNavBar />
      <SearchBar   setContacts={setContacts}/>
      <p className="mt-5 text-gray-400 text-sm ">{loading && "loading...."}</p>
      
      <ul className="space-y-4 mt-4 overflow-y-auto h-[390px] no-scrollbar">
        {contacts.map((contact) => (
          <li key={contact.id} className="bg-white w-full p-2 flex items-center shadow-md rounded-md">
            <FaUser className="text-gray-500 h-5 w-5" />
            <div className="ml-4 flex-1">
              <div className="text-md font-semibold">{contact.name}</div>
              <div className="text-gray-500 text-xs">{contact.email}</div>
            </div>
            <button onClick={() => { onOpen(); setUpdate(contact) }} className="text-black hover:text-blue-700 ml-2">
              <p className="h-4 w-4 text-xs">edit</p> 
            </button>
            <button onClick={() => deleteContact(contact.id)} className="text-red-500 hover:text-red-700 ml-2">
              <FaTrash className="h-4 w-4" />
            </button>
          </li>
        ))}
        <p className="text-gray-700 w-full p-2 flex justify-center ">{contacts.length <=0 && "No Contacts in this Account!"}</p>
      </ul>
      <div className="absolute bottom-14 right-6">
        <AddButton onOpen={onOpen} />
      </div>
      <BottomNavBar/>
      <Modal update={update} setUpdate={setUpdate} onClose={onClose} mstate={modal} />
      
    </div>
  );
}
