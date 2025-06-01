export function Field({ label, type, value, setFormField }) {
  return (
    <div className="flex flex-col">
      <label htmlFor={label}>{label.charAt(0).toUpperCase() + label.slice(1)}</label>
      <input
        type={type}
        id={label}
        className="bg-white px-3 py-2 rounded"
        value={value}
        onChange={(e)=>setFormField((v)=>({...v, [label]: e.target.value}))}
      />
    </div>
  );
}
