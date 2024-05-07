import { useState, useEffect } from 'react';
import Axios from 'axios';

function EditUser({ user, showModal, userUpdated, closeModal }) {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [actions, setActions] = useState([false, false, false, false]);

  useEffect(() => {
    if (user) {
      setFirstname(user.firstname);
      setLastname(user.lastname);
      setEmail(user.email);
      setActions(user.actions || []); // Ensure actions is an array
    }
  }, [user]); // Update state when user prop changes

  const editUser = (e) => {
    if (e) e.preventDefault();
    // Submit updated user data
    Axios.put(`http://localhost:${process.env.PORT}/editUser/${user._id}`, {
      firstname,
      lastname,
      email,
      actions,
    })
      .then((response) => {
        // Reset form fields and close modal
        setFirstname('');
        setLastname('');
        setEmail('');
        setActions([0, 0, 0, 0]);
        userUpdated();
        closeModal();
      })
      .catch((error) => {
        console.error('Error editing user:', error);
      });
  };

  return (
    <div
      className={`${showModal ? 'block' : 'hidden'}`}
    >      <div className='fixed inset-0 z-10 overflow-y-auto'>
        <div className='flex items-center justify-center min-h-screen'>
          {/*transparent bg*/}
          <div
            className='fixed inset-0 bg-gray-500 opacity-75'
            aria-hidden='true'
          ></div>
          {/*modal*/}
          <form onSubmit={editUser}>
            <div className='relative w-[448px] h-[366px] bg-white rounded-md shadow flex-col justify-start items-center inline-flex'>
              <div className='self-stretch px-6 py-4 justify-start items-start gap-2.5 inline-flex'>
                <div className='text-gray-700 text-lg font-bold leading-7'>
                  Edit user
                </div>
              </div>
              <div className='self-stretch h-[234px] px-6 py-2 flex-col justify-start items-start gap-2.5 flex'>
                <div className='self-stretch justify-start items-start inline-flex'>
                  <div className='w-[72px] h-6 px-2 bg-slate-100 rounded-tl-sm rounded-bl-sm border border-slate-200 justify-center items-center gap-2.5 flex'>
                    <div className='text-black text-xs font-normal '>
                      Firstname
                    </div>
                  </div>
                  <input
                    type='text'
                    className='grow shrink basis-0 h-6 px-2 bg-white rounded-tr-sm rounded-br-sm border border-slate-200 flex-col justify-center items-center gap-2.5 inline-flex font-normal text-xs'
                    placeholder='Jon'
                    value={firstname}
                    onChange={(e) => setFirstname(e.target.value)}
                  />
                </div>
                <div className='self-stretch justify-start items-start inline-flex'>
                  <div className='w-[72px] h-6 px-2 bg-slate-100 rounded-tl-sm rounded-bl-sm border border-slate-200 justify-center items-center gap-2.5 flex'>
                    <div className='text-black text-xs font-normal '>
                      Lastname
                    </div>
                  </div>
                  <input
                    type='text'
                    className='grow shrink basis-0 h-6 px-2 bg-white rounded-tr-sm rounded-br-sm border border-slate-200 flex-col justify-center items-center gap-2.5 inline-flex font-normal text-xs'
                    placeholder='Doe'
                    value={lastname}
                    onChange={(e) => setLastname(e.target.value)}
                  />
                </div>
                <div className='self-stretch justify-start items-start inline-flex'>
                  <div className='w-[72px] h-6 px-2 bg-slate-100 rounded-tl-sm rounded-bl-sm border border-slate-200 justify-center items-center gap-2.5 flex'>
                    <div className='text-black text-xs font-normal '>Email</div>
                  </div>
                  <input
                    type='email'
                    className='grow shrink basis-0 h-6 px-2 bg-white rounded-tr-sm rounded-br-sm border border-slate-200 flex-col justify-center items-center gap-2.5 inline-flex font-normal text-xs'
                    placeholder='j.doe@email.com'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className='flex-col justify-start items-start gap-1 flex'>
                  <div className='text-gray-900 text-sm font-bold leading-tight'>
                    Actions
                  </div>
                  <Checkbox label='Create item' />
                  <Checkbox label='Delete item' />
                  <Checkbox label='View item' />
                  <Checkbox label='Move item' />
                </div>
              </div>
              <div className='self-stretch h-[72px] px-6 py-4 flex-col justify-start items-end gap-2.5 flex'>
                <div className='self-stretch justify-end items-center gap-3 inline-flex'>
                  <button
                    type='button'
                    className='w-[86px] h-10 px-4 bg-slate-100 rounded-md justify-center items-center gap-2 flex text-gray-900 text-base font-semibold leading-normal'
                    onClick={closeModal}
                  >
                    Cancel
                  </button>
                  <button
                    type='submit'
                    className='w-[85px] h-10 px-4 bg-blue-500 rounded-md justify-center items-center gap-2 flex text-white text-base font-semibold leading-normal'
                    onClick={() => editUser()}
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

const Checkbox = ({ label }) => {
  return (
    <div className='flex items-center gap-2'>
      <input
        type='checkbox'
        id={label}
        name={label}
        className='h-3 w-3 text-blue-600'
      />
      <label
        htmlFor={label}
        className='text-gray-900 text-sm font-normal leading-tight'
      >
        {label}
      </label>
    </div>
  );
};

export default EditUser;