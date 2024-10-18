import { Field } from "../types/fieldTypes";
import OptionsList from "./OptionsList";
import FieldRules from "./FieldRules";

interface FieldItemProps {
  field: Field;
  editedFieldKey: string | null;
  editedFieldName: string;
  setEditedFieldName: React.Dispatch<React.SetStateAction<string>>;
  handleEditField: (fieldKey: string) => void;
  setEditedFieldKey: React.Dispatch<React.SetStateAction<string | null>>;
  toggleField: (fieldKey: string) => void;
  showField: string | null;
  fields: Field[];
  setFields: React.Dispatch<React.SetStateAction<Field[]>>;
}

const FieldItem: React.FC<FieldItemProps> = ({
  field,
  editedFieldKey,
  editedFieldName,
  setEditedFieldName,
  handleEditField,
  setEditedFieldKey,
  toggleField,
  showField,
  fields,
  setFields,
}) => {
  return (
    <>
      {editedFieldKey === field.field_key ? (
        <h3>
          <input
            type="text"
            placeholder="new field name"
            value={editedFieldName}
            onChange={(e) => setEditedFieldName(e.target.value)}
          />
          <button
            onClick={() => {
              handleEditField(field.field_key);
            }}
          >
            Save
          </button>
          <button
            onClick={() => {
              setEditedFieldKey(null);
            }}
          >
            Cancel
          </button>
        </h3>
      ) : (//if this field is not beign edited
        <h1>
          {field.field_name}{" "}
          <button
            onClick={() => {
              setEditedFieldKey(field.field_key);
              setEditedFieldName(field.field_name);
            }}
          >
            Edit
          </button>
          <button
            onClick={() => {
              toggleField(field.field_key);
            }}
          >
            Show Details
          </button>
        </h1>
      )}

      {showField === field.field_key && (
        <>
          <OptionsList
            field={field}
            showField={showField}
            setFields={setFields}
            fields={fields}
          />
          <button
            onClick={() => {
              const updatedFields = fields.map((f) => {
                if (f.field_key === field.field_key) {
                  return {
                    ...f,
                    options: [
                      ...f.options,
                      {
                        option_label: "New Option",
                        option_value: "New Value",
                      },
                    ],
                  };
                }
                return f;
              });
              setFields(updatedFields);
            }}
          >
            Add Option
          </button>
          <FieldRules field={field} fields={fields} />
        </>
      )}
    </>
  );
};

export default FieldItem;
