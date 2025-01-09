import React from 'react';
import { CrewMemberData, ProjectUser } from '../interfaces/interfaces';
import { useDrag, useDrop } from 'react-dnd';
import { CrewMemberRow } from './CrewMemberRow';
import { DepartmentRow } from './DepartmentRow';

const ItemType = 'DEPARTMENT';

export const DraggableRow: React.FC<{
   index: number;
   departmentName: string;
   groupedByDepartment: Record<string, ProjectUser>;
   moveDepartment: (dragIndex: number, hoverIndex: number) => void;
   projectCurrency?: string;
   handleEditMemberClick: (user: CrewMemberData) => void;
   sendInvitation: (userId: string, name: string, email: string, resend: boolean) => void;
   handleRemoveButtonClick: (userId: string) => void;
   userRoleInProject: string;
   authUserId: string | undefined;
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
}) => {
      const ref = React.useRef<HTMLTableRowElement>(null);

      const [, drag] = useDrag({
         type: ItemType,
         item: { index },
      });

      const [, drop] = useDrop({
         accept: ItemType,
         hover: (draggedItem: { index: number }) => {
            if (draggedItem.index !== index) {
               moveDepartment(draggedItem.index, index);
               draggedItem.index = index;
            }
         },
      });

      drag(drop(ref));

      return (
         <>
            <tr ref={ref}>
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
