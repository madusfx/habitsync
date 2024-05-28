import { useState } from 'react';
import DropDownPicker from 'react-native-dropdown-picker';

export default function DropDownComponent() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<number[]>([]);
  const [items, setItems] = useState([
    { label: 'Domingo', abb: 'dom', value: 1 },
    { label: 'Segunda-feira', abb: 'seg', value: 2 },
    { label: 'Terça-feira', abb: 'ter', value: 3 },
    { label: 'Quarta-feira', abb: 'qua', value: 4 },
    { label: 'Quinta-feira', abb: 'qui', value: 5 },
    { label: 'Sexta-feira', abb: 'sex', value: 6 },
    { label: 'Sábado', abb: 'sab', value: 7 },
  ]);

  const formatSelectedItems = () => {
    return value.map(val => {
      const item = items.find(item => item.value === val);
      return item?.abb;
    }).join(', ');
  };

  return (
    <DropDownPicker
      placeholder='Selecione os dias da semana'
      multiple={true}
      min={1}
      max={7}
      open={open}
      value={value}
      items={items}
      setOpen={setOpen}
      setValue={setValue}
      setItems={setItems}
      multipleText={formatSelectedItems()}
      style={{ backgroundColor: 'white', marginTop: 12 }}
    />
  );
}
