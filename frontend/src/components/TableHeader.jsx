import React from 'react'

function TableHeader() {
  return (
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
  )
}

export default TableHeader