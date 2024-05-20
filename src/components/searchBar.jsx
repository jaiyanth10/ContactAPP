import React, { useRef } from 'react';
import { DB } from "../Config/firebaseConfig";
import { collection, onSnapshot } from "firebase/firestore";
export default function SearchBar({setContacts}) {
    const nameRef = useRef(null);
    function handleKeystroke(){
      console.log(nameRef.current.value);
       // For every key stroke u need to update contact state with database values.If u dont do onSnapshot here, the state will have filtered values and when u backspace u wont get the expected result.
       //so use fresht objtained values from contactLists insted of the contact state.
       const contacts_collection = collection(DB, "contacts");
       onSnapshot(contacts_collection, (snapshot) => {
        const contactLists = snapshot.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          };
        });
        
        const updated_contacts = contactLists.filter((contact)=>contact.name.toLowerCase().includes(nameRef.current.value.toLowerCase()));
      setContacts(updated_contacts);
      
      });
      
    }
    return (
        <div className="flex justify-center items-center my-4">
            <form action="/search" className="w-full max-w-[480px] ">
                <div className="relative">
                    <input 
                        type="text" 
                        name="q" 
                        className="w-full border h-10 shadow p-4 rounded-full focus:outline-none focus:border-black focus:ring-2 focus:ring-black" 
                        placeholder="Search" 
                        ref={nameRef}
                        onChange={handleKeystroke}
                    />
                    <button type="submit" disabled className="absolute top-2 right-3">
                        <svg 
                            className="text-black h-6 w-6 fill-current"
                            xmlns="http://www.w3.org/2000/svg" 
                            xmlnsXlink="http://www.w3.org/1999/xlink" 
                            version="1.1"
                            viewBox="0 0 56.966 56.966"
                            style={{ enableBackground: "new 0 0 56.966 56.966" }} 
                            xmlSpace="preserve"
                        >
                            <path
                                d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23
                                s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92
                                c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17
                                s-7.626,17-17,17s-17-7.626-17-17S14.61,6,23.984,6z"
                            />
                        </svg>
                    </button>
                </div>
            </form>
        </div>
    );
}
