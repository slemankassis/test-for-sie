import React, { useState, useMemo, useCallback } from "react";
import "./DynamicForm.css";

interface Field {
  type: "text" | "number" | "select";
  label: string;
  options?: string[];
  required?: boolean;
}

interface DynamicFormProps {
  fields: Field[];
}

const DynamicForm: React.FC<DynamicFormProps> = ({ fields }) => {
  const [formData, setFormData] = useState<{ [key: string]: string }>(
    Object.fromEntries(fields.map((field) => [field.label, ""]))
  );
  const [errors, setErrors] = useState<{ [key: string]: string }>(
    Object.fromEntries(fields.map((field) => [field.label, ""]))
  );
  const [result, setResult] = useState("");

  const handleInputChange = useCallback((fieldName: string, value: string) => {
    setFormData((prevFormData) => ({ ...prevFormData, [fieldName]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [fieldName]: "" }));
  }, []);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();

      let hasError = false;
      const newErrors: { [key: string]: string } = {};
      fields.forEach(({ label, required }) => {
        if (required && !formData[label]) {
          newErrors[label] = "This field is required";
          hasError = true;
        }
      });

      if (hasError) {
        setErrors(newErrors);
      } else {
        setResult(
          `${formData.Name} is ${formData.Age} years old from ${formData.Country}`
        );
      }
    },
    [fields, formData]
  );

  const memoizedFields = useMemo(() => {
    return fields.map(({ label, type, options, ...others }) => (
      <div key={label}>
        <label>{label}</label>
        {type === "select" ? (
          <select
            value={formData[label]}
            onChange={(e) => handleInputChange(label, e.target.value)}
            {...others}
          >
            {options?.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        ) : (
          <input
            type={type}
            {...("text" === type
              ? { pattern: "[A-Za-z]+" }
              : { pattern: "[0-9]+" })}
            value={formData[label]}
            onChange={(e) => handleInputChange(label, e.target.value)}
            {...others}
          />
        )}
        {errors[label] && <div className="error-message">{errors[label]}</div>}
      </div>
    ));
  }, [fields, formData, handleInputChange, errors]);

  return (
    <>
      <form onSubmit={handleSubmit}>
        {memoizedFields}
        <button type="submit">Submit</button>
      </form>
      <p>{result}</p>
    </>
  );
};

export default DynamicForm;
