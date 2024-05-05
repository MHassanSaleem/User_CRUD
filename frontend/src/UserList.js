import { useState, useEffect } from "react"
import Axios from "axios";
import CreateUser from "./modals/CreateUser";
import EditUser from "./modals/EditUser";
import RunAction from "./modals/RunAction";


function UserList() {
  const [listOfUsers, setListOfUsers] = useState([]);
  //handling modal
  const [showModal, setShowModal] = useState(false);
  const openModal = () => {
    setShowModal(true);
  };
  const closeModal = () => {
    setShowModal(false);
  };  
  //getting list of users
  useEffect(()=>{
    Axios.get("http://localhost:3001/getUsers").then((response) => {
      setListOfUsers(response.data)
    })
  },[]);

  return (
      <div className="w-[891px] h-[446px] pl-[37px] pr-[50px] pt-[31px] pb-[66px] bg-white flex-col justify-start items-end gap-[41px] inline-flex">
          {/* create user row*/}
          <div className="self-stretch justify-start items-center gap-5 inline-flex">
              <div className="flex grow shrink basis-0 text-gray-900 text-3xl font-bold leading-9">Users</div>
              <button className="w-[107px] px-6 bg-teal-600 rounded-md justify-center items-center gap-2 flex text-white text-lg font-semibold leading-7" onClick={openModal}>Create</button>
              {/* create user modal */}
              <CreateUser showModal={showModal} closeModal={closeModal} />
          </div>
          {/* user table */}
          <div className="w-[804px] p-3 bg-white rounded-xl border border-slate-200 justify-start items-start">
              {/* table header*/}
              <div className="grow shrink basis-0 flex flex-row justify-start items-start">
                <div className="h-10 pt-3 bg-white flex-col justify-end items-center gap-[11px] flex">
                    <div className="flex w-[212px] text-slate-600 text-xs font-bold leading-none tracking-wide">NAME</div>
                    <div className="w-[260px] h-px bg-slate-200" />
                </div>
                <div className="h-10 pt-3 bg-white flex-col justify-end items-center gap-[11px] flex">
                    <div className="flex w-[212px] text-slate-600 text-xs font-bold leading-none tracking-wide">EMAIL</div>
                    <div className="w-[260px] h-px bg-slate-200" />
                </div>
                <div className="h-10 pt-3 bg-white flex-col justify-end items-center gap-[11px] flex">
                    <div className="w-[260px] h-px bg-slate-200" />
                </div>
                </div>
              {/* user data rows*/}
              {listOfUsers.map((user) => {
                return(
                  <div className="grow shrink basis-0 flex flex-row justify-start items-start">
                      <div className="h-[52px] pt-4 bg-white flex-col justify-end items-center gap-[15px] flex">
                          <div className="flex w-[212px] text-gray-700 text-sm font-medium leading-tight">{user.firstname} {user.lastname}</div>
                          <div className="w-[260px] h-px bg-slate-200" />
                      </div>
                      <div className="h-[52px] pt-4 bg-white flex-col justify-end items-center gap-[15px] flex">
                          <div className="flex w-[212px] text-gray-700 text-sm font-normal leading-tight">{user.email}</div>
                          <div className="w-[260px] h-px bg-slate-200" />
                      </div>
                      <div className="w-[260px] h-[52px] relative bg-white">
                        <div className="w-[234px] left-[18px] top-[10px] absolute justify-start items-start gap-2.5 inline-flex">
                            <button className="w-[51px] h-8 px-3 bg-blue-500 rounded-md justify-center items-center gap-2 inline-flex text-white text-sm font-semibold leading-tight">Edit</button>
                            {/* edit user modal */}
                            <EditUser showModal={showModal} closeModal={closeModal} />
                            <button className="w-[68px] h-8 px-3 bg-red-600 rounded-md justify-center items-center gap-2 flex text-white text-sm font-semibold leading-tight">Delete</button>
                            <button className="w-24 h-8 px-3 bg-lime-700 rounded-md justify-center items-center gap-2 flex text-white text-sm font-semibold leading-tight">Run action</button>
                            {/* run actions modal */}
                            <RunAction showModal={showModal} closeModal={closeModal} />
                        </div>
                        <div className="w-[260px] h-px left-0 top-[51px] absolute bg-slate-200" />
                    </div>
                  </div>
                  )
                }
                )}
          </div>
      </div>
  );
}

export default UserList;
