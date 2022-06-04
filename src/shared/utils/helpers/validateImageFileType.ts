import { SupportedImages } from "./getImageMetadata";

const validateImageFileType = (type: string) => {
  const listTypes = Object.values(SupportedImages) as Array<string>;

  return listTypes.includes(type);
};

export default validateImageFileType;
