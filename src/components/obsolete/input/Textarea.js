const Textarea = ({
  value,
  onChange,
  title,
  placeholder,
  rows,
  isRequired,
  twTitle,
  twTextarea,
  twBody,
  twRequired,
}) => {

  return (
    <div className={`flex flex-col ${twBody}`}>
      <label className={`mb-2 text-gray-800 ${twTitle}`}>
        {title}
        {isRequired && <span className={`text-red-500 ${twRequired}`}> * </span>}
      </label>
      <textarea
        id={title}
        rows={rows}
        name={title}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`block w-full sm:text-sm border border-gray-300 text-gray-800 rounded-sm focus:outline-none ${twTextarea}`}
      />
    </div>
  );
};

export default Textarea;
