enum ContentTypeEnum {
  JPEG = "JPEG",
  JPG = "JPG",
  PNG = "PNG",
}

enum FileExtensionEnum {
  JPEG = "JPEG",
  JPG = "JPG",
  PNG = "PNG",
}

export type ImageTypes = "image/jpg" | "image/png" | "image/jpeg";

export enum SupportedImages {
  JPG = "image/jpg",
  PNG = "image/png",
  JPEG = "image/jpeg",
}

const getImageMetadata = (
  extension?: string
): { ext: FileExtensionEnum; contentType: ContentTypeEnum } => {
  let ext: FileExtensionEnum;
  let contentType: ContentTypeEnum;

  switch (extension) {
    case SupportedImages.JPEG:
      ext = FileExtensionEnum.JPEG;
      contentType = ContentTypeEnum.JPEG;
      break;
    case SupportedImages.PNG:
      ext = FileExtensionEnum.PNG;
      contentType = ContentTypeEnum.PNG;
      break;
    default:
      ext = FileExtensionEnum.JPG;
      contentType = ContentTypeEnum.JPG;
      break;
  }

  return { ext, contentType };
};

export default getImageMetadata;
