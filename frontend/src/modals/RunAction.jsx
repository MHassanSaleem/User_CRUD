import React from 'react';

function RunAction({ showModal, closeModal, userActions }) {
  return (
    <div className={`fixed inset-0 z-10 overflow-y-auto ${showModal ? 'block' : 'hidden'}`}>
      <div className="flex items-center justify-center min-h-screen">
        <div className='fixed inset-0 bg-gray-500 opacity-40'></div>
        <div className="relative w-[448px] h-[218px] bg-white rounded-md shadow flex-col justify-start items-center inline-flex">
          <div className="self-stretch px-6 py-4 justify-start items-start gap-2.5 inline-flex">
            <div className="text-gray-700 text-lg font-bold leading-7">Run action</div>
          </div>
          <div className="w-8 h-8 relative rounded-md" />
          <div className="self-stretch h-[86px] px-6 py-2 flex-col justify-start items-start gap-2.5 flex">
            <div className="text-gray-900 text-sm font-bold leading-tight">Select action</div>
            <div className="relative w-[400px]">
              <select className="appearance-none w-full h-10 pl-4 pr-3 py-2 bg-white rounded-md border border-slate-200 text-gray-700 text-base font-normal leading-normal focus:outline-none focus:ring focus:border-blue-500">
                <option value="create">Create item</option>
                <option value="delete">Delete item</option>
                <option value="view">View item</option>
                <option value="move">Move item</option>
              </select>
              <svg className="w-5 h-5 absolute right-3 top-3 pointer-events-none text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 12a1 1 0 0 1-.707-.293l-3-3a1 1 0 0 1 1.414-1.414L10 9.586l2.293-2.293a1 1 0 0 1 1.414 1.414l-3 3a1 1 0 0 1-.707.293z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
          <div className="self-stretch h-[72px] px-6 py-4 flex-col justify-start items-end gap-2.5 flex">
            <div className="self-stretch justify-end items-center gap-3 inline-flex">
              <button className="w-[86px] h-10 px-4 bg-slate-100 rounded-md justify-center items-center gap-2 flex text-gray-900 text-base font-semibold leading-normal" onClick={closeModal}>Cancel</button>
              <button className="w-[85px] h-10 px-4 bg-blue-500 rounded-md justify-center items-center gap-2 flex text-white text-base font-semibold leading-normal">Run</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RunAction;
