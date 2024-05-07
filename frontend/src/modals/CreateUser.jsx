import { useState } from "react"
import Axios from "axios";

function CreateUser({ showModal, closeModal, userCreated }) {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [actions, setActions] = useState({
    createItem: false,
    deleteItem: false,
    viewItem: false,
    moveItem: false
  });

  const createUser = (e) => {
    e.preventDefault();
    const selectedActions = Object.values(actions).filter(value => value);
    Axios.post("http://localhost:3001/createUser", { firstname, lastname, email, actions: selectedActions })
      .then((response) => {
        // Close the modal after a short delay
        setTimeout(() => {
          closeModal();
          // Reset form fields
          setFirstname("");
          setLastname("");
          setEmail("");
          setActions({
            createItem: false,
            deleteItem: false,
            viewItem: false,
            moveItem: false
          });
          userCreated();
        }, 100);
      })
      .catch((error) => {
        console.error("Error creating user:", error);
      });
    };

    const handleCheckboxChange = (event) => {
      const { name, checked } = event.target;
      setActions(prevActions => ({
        ...prevActions,
        [name]: checked
      }));
    };
  
  return (
    <div className={`fixed inset-0 z-10 overflow-y-auto ${showModal ? 'block' : 'hidden'}`}>
      <div className="flex items-center justify-center min-h-screen">
        <div className="fixed inset-0 bg-gray-500 opacity-75"></div>
        <form onSubmit={createUser}>
          <div className="relative w-[448px] h-[366px] bg-white rounded-md shadow flex-col justify-start items-center inline-flex">
            <div className="self-stretch px-6 py-4 justify-start items-start gap-2.5 inline-flex">
              <div className="text-gray-700 text-lg font-bold leading-7">Create user</div>
            </div>
            <div className="self-stretch h-[234px] px-6 py-2 flex-col justify-start items-start gap-2.5 flex">
                <div className="self-stretch justify-start items-start inline-flex">
                    <div className="w-[72px] h-6 px-2 bg-slate-100 rounded-tl-sm rounded-bl-sm border border-slate-200 justify-center items-center gap-2.5 flex">
                        <div className="text-black text-xs font-normal ">Firstname</div>
                    </div>
                    <input className="grow shrink basis-0 h-6 px-2 bg-white rounded-tr-sm rounded-br-sm border border-slate-200 flex-col justify-center items-center gap-2.5 inline-flex font-normal text-xs" pattern="[A-Za-z]+" placeholder='Jon' type="text" onChange={(e) => setFirstname(e.target.value)} value={firstname} required/>
                </div>
                <div className="self-stretch justify-start items-start inline-flex">
                    <div className="w-[72px] h-6 px-2 bg-slate-100 rounded-tl-sm rounded-bl-sm border border-slate-200 justify-center items-center gap-2.5 flex">
                        <div className="text-black text-xs font-normal ">Lastname</div>
                    </div>
                    <input className="grow shrink basis-0 h-6 px-2 bg-white rounded-tr-sm rounded-br-sm border border-slate-200 flex-col justify-center items-center gap-2.5 inline-flex font-normal text-xs" pattern="[A-Za-z]+" placeholder='Doe' type="text" onChange={(e) => setLastname(e.target.value)} value={lastname} required/>
                </div>
                <div className="self-stretch justify-start items-start inline-flex">
                    <div className="w-[72px] h-6 px-2 bg-slate-100 rounded-tl-sm rounded-bl-sm border border-slate-200 justify-center items-center gap-2.5 flex">
                        <div className="text-black text-xs font-normal ">Email</div>
                    </div>
                    <input className="grow shrink basis-0 h-6 px-2 bg-white rounded-tr-sm rounded-br-sm border border-slate-200 flex-col justify-center items-center gap-2.5 inline-flex font-normal text-xs" placeholder='j.doe@email.com' type="email" onChange={(e) => setEmail(e.target.value)} value={email} required/>
                </div>
                <div className="flex-col justify-start items-start gap-1 flex">
                    <div className="text-gray-900 text-sm font-bold leading-tight">Actions</div>
                    <Checkbox label="Create item" handleCheckboxChange={handleCheckboxChange} name={"createItem"}/>
                    <Checkbox label="Delete item" handleCheckboxChange={handleCheckboxChange} name={"deleteItem"}/>
                    <Checkbox label="View item" handleCheckboxChange={handleCheckboxChange} name={"viewItem"}/>
                    <Checkbox label="Move item" handleCheckboxChange={handleCheckboxChange} name={"moveItem"}/>
                </div>
            </div>
            <div className="self-stretch h-[72px] px-6 py-4 flex-col justify-start items-end gap-2.5 flex">
                <div className="self-stretch justify-end items-center gap-3 inline-flex">
                    <button className="w-[86px] h-10 px-4 bg-slate-100 rounded-md justify-center items-center gap-2 flex text-gray-900 text-base font-semibold leading-normal" onClick={closeModal} type="button">Cancel</button>
                    <button className="w-[85px] h-10 px-4 bg-blue-500 rounded-md justify-center items-center gap-2 flex text-white text-base font-semibold leading-normal" type="submit">Create</button>
                </div>
            </div>
        </div>                      
    </form>
</div>
</div>
)}

const Checkbox = ({ label, name, handleCheckboxChange }) => {
    return (
      <div className="flex items-center gap-2">
        <input type="checkbox" id={label} name={name} className="h-3 w-3 text-blue-600" onChange={handleCheckboxChange}/>
        <label htmlFor={label} className="text-gray-900 text-sm font-normal leading-tight">{label}</label>
      </div>
    )}

export default CreateUser;