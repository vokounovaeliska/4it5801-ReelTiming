import gql from 'graphql-tag';

export const EDIT_PROJECT = gql(`
    mutation EditProject($data: ProjectInput!, $projectId: String!){
        updateProject(data: $data, projectId: $projectId){
            description,
            name,
            production_company,
            end_date,
            is_active,
            last_update_user_id,
            currency,
            # start_date
        }
    } 
`);
