import React from 'react';
import { CrewMemberData, ProjectUser } from '../interfaces/interfaces';
import { useDrag, useDrop } from 'react-dnd';
import { CrewMemberRow } from './CrewMemberRow';
import { DepartmentRow } from './DepartmentRow';


export const DraggableRow: React.FC<{
  index: number;
  departmentName: string;
  groupedByDepartment: Record<string, ProjectUser>;
  moveDepartment: (
    dragIndex: number,
    hoverIndex: number,
    isDragging: boolean,
  ) => void;
  projectCurrency?: string;
  handleEditMemberClick: (user: CrewMemberData) => void;
  sendInvitation: (
    userId: string,
    name: string,
    email: string,
    resend: boolean,
  ) => void;
  handleRemoveButtonClick: (userId: string) => void;
  userRoleInProject: string;
  authUserId: string | undefined;
  handleDragEnd: () => void;
}> = ({
  index,
  departmentName,
  groupedByDepartment,
  moveDepartment,
  projectCurrency,
  handleEditMemberClick,
  sendInvitation,
  handleRemoveButtonClick,
  userRoleInProject,
  authUserId,
  handleDragEnd,
}) => {
  const ref = React.useRef<HTMLTableRowElement>(null);

  const [{ isDragging }, drag] = useDrag({
    type: 'DEPARTMENT',
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    end: () => {
      handleDragEnd();
    },
  });

  const [, drop] = useDrop({
    accept: 'DEPARTMENT',
    hover: (item: { index: number }) => {
      if (item.index !== index) {
        moveDepartment(item.index, index, isDragging);
        item.index = index;
      }
    },
  });

  drag(drop(ref));

  return (
    <>
      <tr
        ref={ref}
        style={{
          opacity: isDragging ? 0.5 : 1,
          cursor: 'move',
        }}
      >
        <DepartmentRow departmentName={departmentName} />
      </tr>
      {groupedByDepartment[departmentName]?.map((user) => (
        <CrewMemberRow
          key={user.id}
          user={user}
          projectCurrency={projectCurrency!}
          handleEditMemberClick={handleEditMemberClick}
          sendInvitation={sendInvitation}
          handleRemoveButtonClick={handleRemoveButtonClick}
          userRoleInProject={userRoleInProject}
          authUserId={authUserId}
        />
      ))}
    </>
  );
};
