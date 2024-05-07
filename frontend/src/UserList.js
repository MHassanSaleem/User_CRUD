import { useState, useEffect } from "react"
import Axios from "axios";
import CreateUser from "./modals/CreateUser";
import EditUser from "./modals/EditUser";
import RunAction from "./modals/RunAction";
import TableHeader from "./components/TableHeader"

function UserList() {
  const [listOfUsers, setListOfUsers] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [refreshList, setRefreshList] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showActionsModal, setShowActionsModal] = useState(false);

  //---handling Create User modal
  const openCreateModal = () => {
    setShowCreateModal(true);
  };
  const closeCreateModal = () => {
    setShowCreateModal(false);
  };  
  const onUserCreated = () => {
    setRefreshList((prev) => !prev);
  };

  //--- handling edit User modal
  const openEditModal = () => {
    setShowEditModal(true);
  };
  const closeEditModal = () => {
    setShowEditModal(false);
  };
  const onUserUpdated = () => {
    setRefreshList((prev) => !prev);
  };  

  //--- Function to delete a user
  const deleteUser = (userId) => {
    Axios.delete(`http://localhost:3001/deleteUser/${userId}`)
      .then((response) => {
        // Filter out the deleted user from the list of users
        setListOfUsers((prevUsers) => prevUsers.filter(user => user._id !== userId));
      })
      .catch((error) => {
        console.error("Error deleting user:", error);
      });
  };

  //--- handling actions modal
  const openActionsModal = () => {
    setShowActionsModal(true);
  };
  const closeActionsModal = () => {
    setShowActionsModal(false);
  };  
  
  //getting list of users
  useEffect(()=>{
    Axios.get(`http://localhost:3001/getUsers`).then((response) => {
      setListOfUsers(response.data)
    })
  },[refreshList]);

  return (
      <div className="w-[891px] h-[446px] pl-[37px] pr-[50px] pt-[31px] pb-[66px] bg-white flex-col justify-start items-end gap-[41px] inline-flex">
          {/* create user row*/}
          <div className="self-stretch justify-start items-center gap-5 inline-flex">
              <div className="flex grow shrink basis-0 text-gray-900 text-3xl font-bold leading-9">Users</div>
              <button className="w-[107px] px-6 bg-teal-600 rounded-md justify-center items-center gap-2 flex text-white text-lg font-semibold leading-7" onClick={openCreateModal}>Create</button>
              {/* create user modal */}
              <CreateUser 
                  showModal={showCreateModal} 
                  closeModal={closeCreateModal} 
                  userCreated={onUserCreated} 
              />
          </div>
          {/* user table */}
          <div className="w-[804px] p-3 bg-white rounded-xl border border-slate-200 justify-start items-start">
            {/* table header*/}
            <TableHeader/>
            {/* user data rows*/}
            {listOfUsers.map((user) => {
              return(
                <div className="grow shrink basis-0 flex flex-row justify-start items-start" key={user._id}>
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
                          <button className="w-[51px] h-8 px-3 bg-blue-500 rounded-md justify-center items-center gap-2 inline-flex text-white text-sm font-semibold leading-tight" onClick={openEditModal}>Edit</button>
                          {/* edit user modal */}
                          <EditUser 
                              showModal={showEditModal} 
                              closeModal={closeEditModal} 
                              user={user} 
                              key={`edit-user-${user._id}`} 
                              userUpdated={onUserUpdated}
                          />
                          <button className="w-[68px] h-8 px-3 bg-red-600 rounded-md justify-center items-center gap-2 flex text-white text-sm font-semibold leading-tight" onClick={() => deleteUser(user._id)}>Delete</button>
                          <button className="w-24 h-8 px-3 bg-lime-700 rounded-md justify-center items-center gap-2 flex text-white text-sm font-semibold leading-tight" onClick={openActionsModal}>Run action</button>
                          {/* run actions modal */}
                          <RunAction 
                              showModal={showActionsModal} 
                              closeModal={closeActionsModal} 
                          />
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
