import React, { useState, useEffect } from 'react';
import { getJobs, createJob, updateJob, deleteJob } from '../services/api';

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [formData, setFormData] = useState({ type: '', status: '', date: '' });

  useEffect(() => {
    loadJobs();
  }, []);

  const loadJobs = async () => {
    const response = await getJobs();
    setJobs(response.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.id) {
      await updateJob(formData.id, formData);
    } else {
      await createJob(formData);
    }
    setFormData({ type: '', status: '', date: '' });
    loadJobs();
  };

  const handleEdit = (job) => {
    setFormData(job);
  };

  const handleDelete = async (id) => {
    await deleteJob(id);
    loadJobs();
  };

  return (
    <div>
      <h2>Job List</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Type"
          value={formData.type}
          onChange={(e) => setFormData({ ...formData, type: e.target.value })}
        />
        <input
          type="text"
          placeholder="Status"
          value={formData.status}
          onChange={(e) => setFormData({ ...formData, status: e.target.value })}
        />
        <input
          type="datetime-local"
          value={formData.date}
          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
        />
        <button type="submit">{formData.id ? 'Update' : 'Create'}</button>
      </form>

      <ul>
        {jobs.map((job) => (
          <li key={job.jobID}>
            {job.type} - {job.status} - {job.date}
            <button onClick={() => handleEdit(job)}>Edit</button>
            <button onClick={() => handleDelete(job.jobID)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default JobList;
