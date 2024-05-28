import { Control, FieldValues, Path, useController } from "react-hook-form";
import { Input } from "./styles";

type FormValues = {
  name: string;
  email: string;
  password: string;
};

type InputProps<T extends FieldValues> = {
  name: Path<T>;
  placeholder: string;
  control: Control<T>;
  secureTextEntry?: boolean;
}

export default function InputComponent<T extends FieldValues>({ name, placeholder, control, secureTextEntry }: InputProps<T>) {
  const { field } = useController({
    control,
    defaultValue: '' as any,
    name,
  })

  return (
    <Input 
      placeholder={placeholder}
      value={field.value}
      onChangeText={field.onChange}
      secureTextEntry={secureTextEntry} 
    />
  )
}