import React from 'react';

interface CrewMemberCountProps {
  projectUsers: { id: string }[];
}

const CrewMemberCount: React.FC<CrewMemberCountProps> = ({ projectUsers }) => {
  const crewMemberCount = projectUsers.length || 0;

  return <>{crewMemberCount}</>;
};

export default CrewMemberCount;
