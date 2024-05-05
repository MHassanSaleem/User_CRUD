import React from 'react'

function RunAction({ showModal, closeModal }) {
  return (
        <div className={`${showModal ? 'block' : 'hidden'}`}>
            <div className="fixed inset-0 z-10 overflow-y-auto hidden">
                <div className="flex items-center justify-center min-h-screen">
                    {/*transparent bg*/}
                    <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                        <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                    </div>
                    {/*modal*/}
                    <div className="w-[448px] h-[218px] bg-white rounded-md shadow flex-col justify-start items-center inline-flex">
                        <div className="self-stretch px-6 py-4 justify-start items-start gap-2.5 inline-flex">
                            <div className="text-gray-700 text-lg font-bold leading-7">Run action</div>
                        </div>
                        <div className="w-8 h-8 relative rounded-md" />
                        <div className="self-stretch h-[86px] px-6 py-2 flex-col justify-start items-start gap-2.5 flex">
                            <div className="text-gray-900 text-sm font-bold leading-tight">Select action</div>
                            <div className="w-[400px] h-10 pl-4 pr-3 py-2 bg-white rounded-md border border-slate-200 justify-end items-center gap-3 inline-flex">
                                <div className="w-[340px] text-gray-700 text-base font-normal leading-normal">Create item</div>
                                <div className="w-5 h-5 relative flex-col justify-start items-start flex" />
                            </div>
                        </div>
                        <div className="self-stretch h-[72px] px-6 py-4 flex-col justify-start items-end gap-2.5 flex">
                            <div className="self-stretch justify-end items-center gap-3 inline-flex">
                                <div className="w-[86px] px-4 bg-slate-100 rounded-md justify-center items-center gap-2 flex">
                                    <div className="text-gray-900 text-base font-semibold leading-normal">Cancel</div>
                                </div>
                                <div className="w-[62px] px-4 bg-blue-500 rounded-md justify-center items-center gap-2 flex">
                                    <div className="text-white text-base font-semibold leading-normal">Run</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        )
}

export default RunAction