import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection

import { useAuth } from '@frontend/modules/auth'; // Import the useAuth hook
import { MyProjectsTemplate } from '@frontend/modules/auth/templates/MyProjectsTemplate';

export function MyProjectsPage() {
  const auth = useAuth();
  const navigate = useNavigate();
  const [projects, setProjects] = useState<string[]>([]);

  const handleAddProject = () => {
    setProjects([...projects, `New Project ${projects.length + 1}`]);
  };

  useEffect(() => {
    if (!auth.user) {
      navigate('/');
    }
  }, [auth.user, navigate]);

  if (!auth.user) {
    return null;
  }

  return (
    <MyProjectsTemplate projects={projects} onAddProject={handleAddProject} />
  );
}
