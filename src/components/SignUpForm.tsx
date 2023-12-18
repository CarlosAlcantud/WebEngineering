'use client';


import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';


interface FormValues {
  name: string;
  surname: string;
  address: string;
  birthdate: string;
  email: string;
  password: string;
  
}

export default function SignUpForm() {
  const router = useRouter();
  const [error, setError] = useState<string>('');
  
  const [formValues, setFormValues] = useState<FormValues>({
    name: '',
    surname: '',
    address: '',
    birthdate: '',
    email: '',
    password: ''
  });

  const handleSubmit = async function (
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();
    if (!event.currentTarget.checkValidity()) {
      return false;
    }
    
    const res = await fetch(
        `/api/users/`,
          {
              method: "POST",
              body: JSON.stringify(
                 formValues
              ),
          }
    );
    if (res.ok) {
      setError('');
      router.push('/?registered=true');
      router.refresh();
      toast.success('Your Account has been created. Please log in.');
    } else {
      if (!res.ok) {
        setError(
          `Email already in use.`
        );
      } else {
        setError(
          'An error occurred while processing your request. Please try again later.'
        );
      }
    }
    

  };

  return (
    
    <form className='group space-y-6 ' onSubmit={handleSubmit} noValidate>
      
      <div className='overflow-auto max-h-[190px]'>
        <div>
          <label
            htmlFor='name'
            className='block text-sm font-medium leading-6 text-gray-900'
          >
            Name
          </label>
          <input
            id='name'
            name='name'
            type='name'
            placeholder='John'
            required
            className='peer mt-2 block w-full rounded-md border-0 px-1.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 invalid:[&:not(:placeholder-shown):not(:focus)]:ring-red-500'
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setFormValues((prevFormValues) => ({
                ...prevFormValues,
                name: e.target.value,
              }))
            }
          />
        </div>
        <div>
          <label
            htmlFor='surname'
            className='block text-sm font-medium leading-6 text-gray-900'
          >
            Surname
          </label>
          <input
            id='surname'
            name='surname'
            type='surname'
            placeholder='Doe'
            required
            className='peer mt-2 block w-full rounded-md border-0 px-1.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 invalid:[&:not(:placeholder-shown):not(:focus)]:ring-red-500'
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setFormValues((prevFormValues) => ({
                ...prevFormValues,
                surname: e.target.value,
              }))
            }
          />
        </div>  
        <div>
          <label
            htmlFor='address'
            className='block text-sm font-medium leading-6 text-gray-900'
          >
            Address
          </label>
          <input
            id='address'
            name='address'
            type='address'
            placeholder='Via Roma 1'
            required
            className='peer mt-2 block w-full rounded-md border-0 px-1.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 invalid:[&:not(:placeholder-shown):not(:focus)]:ring-red-500'
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setFormValues((prevFormValues) => ({
                ...prevFormValues,
                address: e.target.value,
              }))
            }
          />
        </div>  

        <div>
          <label
            htmlFor='birthdate'
            className='block text-sm font-medium leading-6 text-gray-900'
          >
            Birthdate
          </label>
          <input
            id='birthdate'
            name='birthdate'
            type='birthdate'
            placeholder='01/01/2000'
            required
            className='peer mt-2 block w-full rounded-md border-0 px-1.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 invalid:[&:not(:placeholder-shown):not(:focus)]:ring-red-500'
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setFormValues((prevFormValues) => ({
                ...prevFormValues,
                birthdate: e.target.value,
              }))
            }
          />
        </div>

        <div>
          <label
            htmlFor='email'
            className='block text-sm font-medium leading-6 text-gray-900'
          >
            E-mail address
          </label>
          <input
            id='email'
            name='email'
            type='email'
            autoComplete='email'
            placeholder='johndoe@example.com'
            required
            className='peer mt-2 block w-full rounded-md border-0 px-1.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 invalid:[&:not(:placeholder-shown):not(:focus)]:ring-red-500'
            value={formValues.email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setFormValues((prevFormValues) => ({
                ...prevFormValues,
                email: e.target.value,
              }))
            }
          />
          <p className='mt-2 hidden text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block'>
            Please provide a valid email address.
          </p>
        </div>

        <div>
          <label
            htmlFor='password'
            className='block text-sm font-medium leading-6 text-gray-900'
          >
            Password
          </label>
          <input
            id='password'
            name='password'
            type='password'
            autoComplete='current-password'
            placeholder=' '
            required
            className='peer mt-2 block w-full rounded-md border-0 px-1.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 invalid:[&:not(:placeholder-shown):not(:focus)]:ring-red-500'
            value={formValues.password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setFormValues((prevFormValues) => ({
                ...prevFormValues,
                password: e.target.value,
              }))
            }
          />
          
        </div>

        

      </div>
      {error &&
          <div className='mt-2 rounded-md border-0 bg-red-500 bg-opacity-30 px-3 py-1.5 ring-1 ring-inset ring-red-500'>
            <p className='text-sm text-gray-900'>
              {error}
            </p>
          </div>
        }
      <div className = ' flex justify-center mt-4'>
        <button
          type='submit'
          className='flex justify-center rounded-md bg-indigo-600 px-4 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 group-invalid:pointer-events-none group-invalid:opacity-30 w-auto'
        >
          Register
        </button>
      </div>
      
    </form>
      
    
  );
}