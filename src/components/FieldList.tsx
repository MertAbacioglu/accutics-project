import React, { useState } from "react";
import data from "../data/test-data.json";
import FieldItem from "./FieldItem";
import { Field } from "../types/fieldTypes";

const FieldList: React.FC = () => {
  const [fields, setFields] = useState<Field[]>(data);
  const [newFieldName, setNewFieldName] = useState("");
  const [editedFieldName, setEditedFieldName] = useState("");
  const [editedFieldKey, setEditedFieldKey] = useState<string | null>(null);
  const [showField, setShowField] = useState<string | null>(null);

  const toggleField = (fieldKey: string) => {
    setShowField(showField === fieldKey ? null : fieldKey);
  };

  const handleEditField = (fieldKey: string) => {
    const updatedFields = fields.map((f) => {
      if (fieldKey === f.field_key) {
        return {
          ...f,
          field_name: editedFieldName,
        };
      }
      return f;
    });

    setFields(updatedFields);
    setEditedFieldKey(null);
  };

  const handleAddField = () => {
    if (newFieldName.trim()) {
      const newField = {
        field_key: `field_${Date.now()}`,
        field_name: newFieldName,
        options: [],
        rules: [],
      };
      setFields([...fields, newField]);
    }
  };

  return (
    <div style={{ display: "flex" }}>
      <div style={{ flex: 4, padding: "10px" }}>
        {fields.map((field, index) => (
          <div
            key={index}
            style={{
              border: "1px solid black",
              marginBottom: "10px",
            }}
          >
            <FieldItem
              field={field}
              editedFieldKey={editedFieldKey}
              editedFieldName={editedFieldName}
              setEditedFieldName={setEditedFieldName}
              handleEditField={handleEditField}
              setEditedFieldKey={setEditedFieldKey}
              toggleField={toggleField}
              showField={showField}
              fields={fields}
              setFields={setFields}
            />
          </div>
        ))}
      </div>
      <div
        style={{
          flex: 3,
          padding: "10px",
          marginLeft: "10px",
        }}
      >
        <input
          type="text"
          placeholder="name"
          value={newFieldName}
          onChange={(e) => setNewFieldName(e.target.value)}
        />
        <button onClick={handleAddField}>Add Field</button>
      </div>
    </div>
  );
};

export default FieldList;
