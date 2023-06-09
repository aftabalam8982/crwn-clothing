import "./form-input.styles.scss";

const InputField = ({ label, ...others }) => {
  return (
    <div className="group">
      <input className="form-input" {...others} />

      {label && (
        <label
          className={`${others && others.value &&others.value.length ? "shrink" : ""} form-input-label`}
        >
          {label}
        </label>
      )}
    </div>
  );
};
export default InputField;
