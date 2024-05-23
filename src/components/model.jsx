import { ErrorMessage, Field, Form, Formik } from "formik";
import { createPortal } from "react-dom";
import { DB } from "../Config/firebaseConfig";
import { addDoc, collection, updateDoc, doc } from "firebase/firestore";
import * as yup from "yup";

const contactSchemaValidation = yup
  .object()
  .shape({
    name: yup.string().required("name is required!"),
    email: yup.string().email("Invalid Email").required("Email is required"),
  });

export default function Modal({ update, setUpdate, onClose, mstate }) {
  //function to add new contact to  firebase
  async function addContact(values) {
    try {
      const contacts_collection = collection(DB, "contacts");
      // addDoc will update collection with the object (values).
      //here values is a object as u can see in initial values is an object. so u can directly pass
      // any keys of object(name, email) are also same as headings in firebase so no problem
      await addDoc(contacts_collection, values);
      onClose();
    } catch (error) {
      alert(error && "Unable to create contact");
    }
  }

  //update contact in fire base
  async function updateContact(id, newValues) {
    try {
      const userDoc = doc(DB, "contacts", id);
      await updateDoc(userDoc, newValues);
      onClose();
    } catch (error) {
      alert(error && "Unable to update contact");
    }
  }

  return (
    mstate &&
    createPortal(
      <>
        <div className="fixed inset-0  flex items-center justify-center ">
          <div className="relative h-[440px] min-h-[440px] max-h-[440px] w-full max-w-[330px] bg-white p-4  ">
            <Formik
              //pass yup schema here
              validationSchema={contactSchemaValidation}
              //mandatory declaration
              //keys should have same value of name in the form.
              initialValues={
                update
                  ? { name: update.name, email: update.email }
                  : { name: "", email: "" }
              }
              //handle on submit, u will get values prop directly
              onSubmit={(values) => {
                update ? updateContact(update.id, values) : addContact(values);
              }}
              reset
            >
              <Form>
                <div className="flex flex-col gap-2">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="name">Name</label>
                    <Field name="name" className="h-10 border"></Field>
                    <div className="text-red-600 text-xs">
                      {/* inbuilt function from formik, should have same name as yup  */}
                      <ErrorMessage name="name" />
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="email">Email</label>
                    <Field
                      type="email"
                      name="email"
                      className="h-10 border"
                    ></Field>
                    <div className=" text-red-600 text-xs">
                      {/* inbuilt function from formik, should have same name as yup  */}
                      <ErrorMessage name="email" />
                    </div>
                  </div>
                </div>
                {update ? (
                  <button
                    type="submit"
                    className="border py-1 px-2 gap-2 mt-8 text-white bg-black rounded-md"
                  >
                    update
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="border py-1 px-2 gap-2 mt-8 text-white bg-black rounded-md"
                  >
                    create
                  </button>
                )}
              </Form>
            </Formik>
            <button
              onClick={() => {
                onClose();
                setUpdate(null);
              }}
              className="absolute bottom-4 right-4 bg-black text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Close
            </button>
          </div>
        </div>
      </>,
      document.getElementById("modalRoot")
    )
  );
}
