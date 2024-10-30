import PropTypes from "prop-types";
import "./style.scss";

export const FIELD_TYPES = {
  INPUT_TEXT: 1,
  TEXTAREA: 2,
  EMAIL: 3, // ajout du type EMAIL
};

const Field = ({
  type = FIELD_TYPES.INPUT_TEXT,
  label,
  name,
  placeholder,
  onChange,
  required, // ajout de required
}) => {
  let component;
  switch (type) {
    case FIELD_TYPES.INPUT_TEXT:
      component = (
        <input
          type="text"
          name={name}
          placeholder={placeholder}
          data-testid="field-testid"
          onChange={onChange}
          required={required}
        />
      );
      break;
    case FIELD_TYPES.TEXTAREA:
      component = (
        <textarea
          name={name}
          placeholder={placeholder}
          data-testid="field-testid"
          onChange={onChange}
          required={required}
        />
      );
      break;
    case FIELD_TYPES.EMAIL:
      component = (
        <input
          type="email"
          name={name}
          placeholder={placeholder}
          data-testid="field-testid"
          autoCapitalize="none"
          autoComplete="email"
          onChange={(e) => onChange(e.target.value.toLowerCase())} // Conversion en minuscule
          required={required}
        />
      );
      break;
    default:
      component = (
        <input
          type="text"
          name={name}
          placeholder={placeholder}
          data-testid="field-testid"
          onChange={onChange}
          required={required}
        />
      );
  }
  return (
    <div className="inputField">
      <span>{label}</span>
      {component}
    </div>
  );
};

Field.propTypes = {
  type: PropTypes.oneOf(Object.values(FIELD_TYPES)),
  name: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  required: PropTypes.bool, // ajout de required dans les prop types
};

Field.defaultProps = {
  label: "",
  placeholder: "",
  type: FIELD_TYPES.INPUT_TEXT,
  name: "field-name",
  onChange: () => {},
  required: false,
};

export default Field;
