import { gql } from '@frontend/gql';

export const NOTIFY_USERS = gql(`
  mutation NotifyUser(
    $dates: String!,
    $message: String!,
    $email: String!,
    $name: String!,
    $projectName: String!,
    $link: String!,
) {
    notifyUser(dates: $dates, message: $message, email: $email, name: $name, projectName: $projectName, link: $link)
}
`);
