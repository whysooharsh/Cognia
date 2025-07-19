interface InputProps {
    placeholder : string, 
    ref? : any, 
}
export function InputComponent({  placeholder, ref }: InputProps) {
    return (
        <div>
            <input ref={ref}
                type="text"
                placeholder={placeholder}
                className=" w-full px-4 py-2 rounded-md 
                            border border-gray-300 
                            text-sm text-gray-800 
                          placeholder-gray-400 placeholder:text-sm
                             focus:outline-none focus:ring-2 
                          focus:ring-gray-400 focus:border-transparent"
                
            />

        </div>

    )
}