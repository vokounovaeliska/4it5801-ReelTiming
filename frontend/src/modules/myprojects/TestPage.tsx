import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '@frontend/modules/auth';
import { MyProjectsTemplate } from '@frontend/modules/auth/templates/MyProjectsTemplate';

export function TestPage() {
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
