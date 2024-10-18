import React from "react";
import { Field } from "../types/fieldTypes";

interface OptionsListProps {
  field: Field;
  showField: string | null;
  setFields: React.Dispatch<React.SetStateAction<Field[]>>;
  fields: Field[];
}

const OptionsList: React.FC<OptionsListProps> = ({
  field,
  showField,
  setFields,
  fields,
}) => {
  return (
    <>
      {" "}
      {showField === field.field_key &&
        field.options.length > 0 &&
        field.options.map((option, index) => (
          <p key={index}>
            <input
              type="text"
              value={option.option_label}
              onChange={(e) => {
                const updatedFields = fields.map((f) => {
                  if (field.field_key === f.field_key) {
                    const updatedOptions = f.options.map((o, i) => {
                      if (index === i) {
                        return { ...o, option_label: e.target.value };
                      }
                      return o;
                    });

                    return { ...f, options: updatedOptions };
                  }
                  return f;
                });

                setFields(updatedFields);
              }}
            />
            <input
              type="text"
              value={option.option_value}
              onChange={(e) => {
                const updatedFields = fields.map((f) => {
                  if (f.field_key === field.field_key) {
                    const updatedOptions = f.options.map((o, i) => {
                      if (index === i) {
                        return { ...o, option_value: e.target.value };
                      }
                      return o;
                    });

                    return { ...f, options: updatedOptions };
                  }
                  return f;
                });

                setFields(updatedFields);
                console.log(fields);
              }}
            />
            <button
              onClick={() => {
                const updatedFields = fields.map((f) => {
                  if (field.field_key === f.field_key) {
                    return {
                      ...f,
                      options: f.options.filter((_, i) => index !== i),
                    };
                  }
                  return f;
                });
                setFields(updatedFields);
              }}
            >
              Delete
            </button>
          </p>
        ))}
      {showField === field.field_key && field.options.length === 0 && (
        <p>No options</p>
      )}
    </>
  );
};

export default OptionsList;
