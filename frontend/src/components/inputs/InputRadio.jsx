export default function InputRadio ({ id, label, setFunction, list, wrap, addFunction, value, disabled=false }) {
    return (
        <div className="mb-4 flex flex-col justify-center items-start w-full">
            <div className="flex justify-between items-center w-full">
                <label htmlFor={id} className="font-medium">{label}</label>
                {addFunction ? <div className="text-primary cursor-pointer text-xs" onClick={addFunction}>
                    Add new
                </div> : <></>}
            </div>
            <div className={wrap ? "flex flex-wrap" : "flex flex-col"}>
            {list && list.map((item) => {
                return (
                    <div className="flex items-center ml-2" key={item.id}>
                        <input id={item.id} type="radio" name={id} disabled={disabled} onChange={(e)=>{
                            if (e.target.checked)
                                setFunction (item)
                        }} checked={value && value.id === item.id} className="px-3 py-2" />
                        <label htmlFor={item.id} className="mx-1">{item.name}</label>
                    </div>
                )
            })}
            </div>
        </div>
    )
}