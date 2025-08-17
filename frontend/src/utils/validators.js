import * as yup from 'yup'

/**
 * Validation schema for login form.
 * Ensures that the user provides a valid email and a password of at least 6 characters.
 */
export const loginSchema = yup.object({
  email: yup
    .string()
    .email('Please enter a valid email address')
    .required('Email is required'),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
})

/**
 * Validation schema for project creation/edit form.
 * Ensures that project name, due date, and owner are provided.
 */
export const projectSchema = yup.object({
  name: yup.string().required('Project name is required'),
  dueDate: yup.string().required('Due date is required'),
  owner: yup.string().required('Owner is required'),
})
