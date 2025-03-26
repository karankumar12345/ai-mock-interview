/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import {
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Controller } from "react-hook-form";

interface FormFieldProps {
  control: any;
  name: string;
  label: string;
  placeholder: string;
  type?: string;
}

const FormField = ({ control, name, label, placeholder, type = "text" }: FormFieldProps) => (
  <Controller 
    name={name}
    control={control}
    render={({ field }) => (
      <FormItem>
        <FormLabel className="label">{label}</FormLabel>
        <FormControl>
          <Input type={type} className="input" placeholder={placeholder} {...field} />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
);

export default FormField;
