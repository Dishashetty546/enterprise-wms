import React, { useState } from 'react';
import Layout from '../../components/Layout';
import { useSelector, useDispatch } from 'react-redux';
import { addProject, deleteProject } from '../../store/slices/projectsSlice';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { projectSchema } from '../../utils/validators';
import { Link } from 'react-router-dom';

export default function Projects() {
  const projects = useSelector((state) => state.projects.projects);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(projectSchema),
  });

  const onSubmit = (data) => {
    dispatch(addProject({ ...data, status: 'Active', id: Date.now().toString() }));
    reset();
    setOpen(false);
  };

  return (
    <Layout>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Projects</h2>
        <button
          onClick={() => setOpen(true)}
          className="px-3 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
        >
          New Project
        </button>
      </div>

      {/* Projects List */}
      <div className="grid md:grid-cols-3 gap-4">
        {projects.map((p) => (
          <div
            key={p.id}
            className="p-4 rounded-2xl bg-white dark:bg-gray-800 shadow"
          >
            <div className="font-semibold">{p.name}</div>
            <div className="text-sm opacity-70">Owner: {p.owner}</div>
            <div className="text-sm">Status: {p.status}</div>

            <div className="mt-2 flex gap-2">
              <Link
                to={`/projects/${p.id}`}
                className="px-3 py-1 rounded-lg border hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                Open
              </Link>
              <button
                onClick={() => dispatch(deleteProject(p.id))}
                className="px-3 py-1 rounded-lg border border-red-500 text-red-600 hover:bg-red-50 dark:hover:bg-red-700 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal: Create Project */}
      {open && (
        <div className="fixed inset-0 bg-black/40 grid place-items-center z-50">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow w-[32rem] space-y-3"
          >
            <h3 className="text-lg font-semibold">Create Project</h3>

            {/* Project Name */}
            <input
              id="projectName"
              aria-label="Project Name"
              {...register('name')}
              placeholder="Project name"
              className="w-full px-3 py-2 rounded-lg border bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}

            {/* Due Date */}
            <input
              id="dueDate"
              aria-label="Due Date"
              type="date"
              {...register('dueDate')}
              className="w-full px-3 py-2 rounded-lg border bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.dueDate && <p className="text-red-500 text-sm">{errors.dueDate.message}</p>}

            {/* Project Owner */}
            <input
              id="owner"
              aria-label="Project Owner"
              {...register('owner')}
              placeholder="Owner"
              className="w-full px-3 py-2 rounded-lg border bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.owner && <p className="text-red-500 text-sm">{errors.owner.message}</p>}

            {/* Buttons */}
            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="px-3 py-1 rounded-lg border hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-3 py-1 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
              >
                Create
              </button>
            </div>
          </form>
        </div>
      )}
    </Layout>
  );
}
