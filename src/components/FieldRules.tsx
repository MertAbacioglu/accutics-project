import React, { useState } from "react";
import { Field, Rule } from "../types/fieldTypes";
import RuleForm from "./RuleForm";

interface RuleProps {
  field: Field;
  fields: Field[];
}

const FieldRules: React.FC<RuleProps> = ({ field, fields }) => {
  const [rules, setRules] = useState<Rule[]>(field.rules);

  const handleAddRule = () => {
    setRules([
      ...rules,
      {
        rule_field_key: `rule_${Math.random()}`,
        rule_value: "new rule",
        children: [],
      },
    ]);
  };

  const handleAddGroup = (parentRule: Rule) => {
    const updatedRules = addGroupToRule(rules, parentRule);
    setRules(updatedRules);
    console.log(updatedRules);
  };

  const addGroupToRule = (rules: Rule[], parentRule: Rule): Rule[] => {
    return rules.map((rule) => {
      if (rule.rule_field_key === parentRule.rule_field_key) {
        return {
          ...rule,
          children: [
            ...rule.children,
            {
              rule_field_key: `${Math.random()}`,
              rule_value: "",
              children: [],
            },
          ],
        };
      }

      if (rule.children.length > 0) {
        return {
          ...rule,
          children: addGroupToRule(rule.children, parentRule),
        };
      }
      return rule;
    });
  };

  return (
    <div>
      <h3>Rules</h3>
      {rules.map((rule, index) => (
        <div
          key={index}
          style={{
            border: "1px solid black",
            padding: "10px",
            marginBottom: "10px",
            width: "max-content",
          }}
        >
          <RuleForm rule={rule} fields={fields} onAddGroup={handleAddGroup} />
        </div>
      ))}
      <button onClick={handleAddRule}>Add Rule</button>
    </div>
  );
};

export default FieldRules;
