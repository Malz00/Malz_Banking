import React from 'react'
import { FormControl, FormField, FormLabel, FormMessage } from './ui/form'
import { Input } from './ui/input';

import { Control, FieldPath } from 'react-hook-form';
import { z } from 'zod';
import { authFormSchema } from '@/lib/utils';
// Removed incorrect import
const schema = authFormSchema("someString"); // Replace "someString" with the appropriate string value

interface CustomInputProps {
    control: Control<z.infer<typeof schema>>;
    name: FieldPath<z.infer<typeof schema>>; 
    label: string;
    placeholder: string;
}

const CustomInput: React.FC<CustomInputProps> = ({ control, name, label, placeholder }) => {
  return (
    <>
         <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <div className='form-item'>
                    <FormLabel className='form-label'>
                        {label}
                    </FormLabel>
                    <div className='flex w-full flex-col'>
                        <FormControl >
                            <Input 
                            placeholder={placeholder}
                            className='input-class'
                            type={name === 'password' ? 'password' : 'text'}
                            {...field}
                            />

                        </FormControl>
                        <FormMessage 
                            className='form-message mt-2'
                        />
                    </div>
                </div>
                )}
            />

                    {/* <FormField
                    control={control}
                    name="password"
                    render={({ field }) => (
                        <div className='form-item'>
                            <FormLabel className='form-label'>
                                Password
                            </FormLabel>
                            <div className='flex w-full flex-col'>
                                <FormControl >
                                    <Input 
                                    placeholder='Enter your password'
                                    className='input-class'
                                    type='password'
                                    {...field}
                                    />

                                </FormControl>
                                <FormMessage 
                                    className='form-message mt-2'
                                />
                            </div>
                        </div>
                        )}
                    /> */}
    </>
  );
}

     
export default CustomInput