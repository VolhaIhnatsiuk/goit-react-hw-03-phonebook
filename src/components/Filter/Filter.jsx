import { Info, Input } from "./Filter.styled";

export function Filter({ onChange, value }) {
function filterContacts(evt) {
    onChange(evt.target.value.trim());
  }

  return (
    <div>
      <Info>Find contacts by name</Info>
      <Input
        type="text"
        onChange={filterContacts}
        value={value}
        name="filter"
      />
    </div>
  );
}