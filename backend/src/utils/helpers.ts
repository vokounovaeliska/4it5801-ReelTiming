import path from 'path';
import uniqueSlug from 'unique-slug';

import { FRONTEND_PUBLIC_FOLDER } from '@backend/config';

function safeFilenameString(rawFilename: string): string {
  return rawFilename.replaceAll(/[^A-Za-z0-9]/g, '-');
}

export const getPublicStorageFilePath = ({
  filename,
  relativeDirectory,
}: {
  filename: string;
  relativeDirectory: string;
}) => {
  const { name, ext } = path.parse(filename);

  const uniqueFilename = `${safeFilenameString(name).slice(
    0,
    50,
  )}-${safeFilenameString(uniqueSlug())}${ext}`;

  const fileDirectoryPath = path.resolve(
    FRONTEND_PUBLIC_FOLDER,
    relativeDirectory,
  );

  return {
    fileDirectoryPath,
    filePath: path.join(fileDirectoryPath, uniqueFilename),
    relativeFileUrl: `/${path
      .join(relativeDirectory, uniqueFilename)
      .split(path.sep)
      .join('/')}`,
  };
};

export const convertToLocalTime = (utcTime: Date): Date => {
  var offset = utcTime.getTimezoneOffset();
  var localTimestamp = utcTime.getTime() - offset * 60000;
  return new Date(localTimestamp);
};
