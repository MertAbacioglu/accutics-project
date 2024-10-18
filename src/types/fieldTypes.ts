interface Option {
    option_label: string;
    option_value: string;
  }
  
  export interface Field {
    field_key: string;
    field_name: string;
    options: Option[];
    rules: Rule[];
  }

  export interface Rule{
    rule_field_key: string;
    rule_value: string;
    children: Rule[];
  }