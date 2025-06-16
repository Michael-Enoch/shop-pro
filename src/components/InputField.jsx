import {Controller} from "react-hook-form"
export const InputField =({name, control, label, type = "text", error}) => {
    return(
        <div className="">
         <label className="font-semibold">{label}</label>
         <Controller
            name={name}
            control={control}
            render={({field}) => (
                <input
                    {...field}
                    type={type}
                    className={`border px-3 py-2 rounded w-full ${
                                 error ? "border-red-500" : "border-gray-300"
                                }`}
                />
            )}
         />
         {error && <p className="text-red-500 text-xs">{error}</p>}
        </div>
    );
}