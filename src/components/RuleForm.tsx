import React, { useState } from "react";
import { Field, Rule } from "../types/fieldTypes";

interface RuleItemProps {
  rule: Rule;
  fields: Field[];
  onAddGroup: (rule: Rule) => void;
}

const RuleForm: React.FC<RuleItemProps> = ({ rule, fields, onAddGroup }) => {
  const [selectedFieldKey, setSelectedFieldKey] = useState("");

  const checkField = (fieldKey: string, fieldValue: string) => {
    const field = fields.find((field) => field.field_key === fieldKey);
    console.log("field", field);
    if (field?.field_name === fieldValue) {
      console.log("selected field's name is equal to the input valeu");
    } else console.log("selected field's name is not equal to the input value");
  };

  return (
    <div>
      <ul>
        {" "}
        <select onChange={(e) => setSelectedFieldKey(e.target.value)}>
          <option hidden value="">
            Choose field
          </option>
          {fields.map((field) => (
            <option key={field.field_key} value={field.field_key}>
              {field.field_name}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="enter field value"
          onChange={(e) => {
            checkField(selectedFieldKey, e.target.value);
          }}
          disabled={!selectedFieldKey}
        />
        <button className="add-group-btn" onClick={() => onAddGroup(rule)}>
          Add group
        </button>
        {rule.children &&
          rule.children.length > 0 &&
          rule.children.map((childRule, index) => (
            <div
              key={index}
              style={{
                border: "1px solid black",
                padding: "10px",
                marginBottom: "10px",
                width: "max-content",
              }}
            >
              <RuleForm
                key={index}
                rule={childRule}
                fields={fields}
                onAddGroup={onAddGroup}
              />
            </div>
          ))}
      </ul>
    </div>
  );
};

export default RuleForm;
