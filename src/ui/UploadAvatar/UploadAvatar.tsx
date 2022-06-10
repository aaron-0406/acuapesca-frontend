import React, { RefObject } from "react";
import styled, { css } from "styled-components";
import classnames from "classnames";
import { notification, Upload } from "antd";
import { RcFile, UploadChangeParam } from "antd/lib/upload";
import { UploadFile } from "antd/lib/upload/interface";
import Icon from "../Icon";
import StyledInputWrapper from "../Field/Wrapper";
import InputLabel, { InputLabelProps } from "../InputLabel";
import InputHelper from "../Inputs/InputHelper";
import validateImageFileType from "../../shared/utils/helpers/validateImageFileType";

const { Dragger } = Upload;

export type UploadAvatarProps = Omit<InputLabelProps, "label"> & {
  className?: string;
  helperText?: string;
  hasError?: boolean;
  avatar?: RcFile | string;
  label?: React.ReactNode | string;
  onChange: (avatar?: RcFile) => void;
  hint?: string;
  deletable?: boolean;
  onDelete?: () => void;
  height?: number;
  width?: number;
};

export const UploadAvatar = React.forwardRef(
  (
    props: UploadAvatarProps,
    ref:
      | ((instance: HTMLParagraphElement | null) => void)
      | RefObject<HTMLParagraphElement>
      | null
      | undefined
  ) => {
    const hoverDivTop = 8;
    const hoverDivLeft = 8;

    const {
      avatar,
      onChange,
      label,
      helperText,
      hasError,
      className,
      hint,
      deletable,
      height = 130,
      width = 130,
      onDelete,
      ...labelProps
    } = props;
    const onDraggerChange = (info: UploadChangeParam<UploadFile<unknown>>) =>
      onChange(info.file.originFileObj);

    const getImageSource = (file: RcFile | string) => {
      try {
        return typeof avatar === "string"
          ? avatar
          : URL.createObjectURL(file as RcFile);
      } catch {
        return undefined;
      }
    };

    const beforeUpload = (file: RcFile) => {
      const isValid = validateImageFileType(file.type);

      if (!isValid) {
        notification["error"]({
          message: "Solo puede cargar imágenes JPG, JPEG o PNG.",
        });
      }

      return isValid;
    };

    return (
      <StyledInputWrapper className={classnames("avatar", className)}>
        {label && <InputLabel label={label} {...labelProps} />}

        <StyledUploadAvatar
          ref={ref}
          width={width}
          height={height}
          top={hoverDivTop}
          left={hoverDivLeft}
        >
          <Dragger
            beforeUpload={beforeUpload}
            onChange={onDraggerChange}
            customRequest={() => null}
            listType="picture"
            accept="image/*"
            multiple={false}
            showUploadList={false}
          >
            {avatar ? (
              <div>
                <img className="img-avatar" src={getImageSource(avatar)} alt="avatar" />

                <div className="hover-container">
                  <label htmlFor={"edit-image-input"}>
                    <Icon remixiconClass="ri-pencil-line" />
                  </label>
                  {deletable && (
                    <button
                      data-value={avatar}
                      // eslint-disable-next-line jsx-a11y/aria-role
                      role="delete-image"
                      onClick={(event) => {
                        event.stopPropagation();
                        event.preventDefault();
                        onDelete && onDelete();
                      }}
                    >
                      <Icon remixiconClass="ri-delete-bin-7-line" />
                    </button>
                  )}
                </div>
              </div>
            ) : (
              <>
                <Icon
                  remixiconClass="ri-add-fill"
                  size={36}
                  color="$color-neutral-7"
                />
                {!!hint && <p className="ant-upload-hint">{hint}</p>}
              </>
            )}
          </Dragger>
        </StyledUploadAvatar>

        {!!helperText && (
          <InputHelper $hasError={hasError}>{helperText}</InputHelper>
        )}
      </StyledInputWrapper>
    );
  }
);

const getImageHoverWidth = (width: number, divLeft: number) => {
  return width - divLeft * 2 - 4;
};

const getImageHoverHeight = (height: number, divTop: number) => {
  return height - divTop * 2 - 4;
};

const StyledUploadAvatar = styled.div<{
  width: number;
  height: number;
  top: number;
  left: number;
}>`
  ${({ width, height, top, left, theme }) => css`
    width: ${width}px;
    height: ${height}px;

    input {
      display: none;
    }

    img {
      width: ${width - 2}px;
      height: ${height - 2}px;
      border-radius: 4px;
      object-fit: cover;
    }

    .ant-upload .ant-upload-btn {
      padding: 0;
    }

    .ant-upload.ant-upload-drag {
      border-radius: 4px;
      padding: 0;
    }

    .ant-upload.ant-upload-drag:hover {
      border-color: ${theme.colors["$color-primary-2"]};
      background: ${theme.colors["$color-neutral-3"]};
    }

    .ant-upload-hint {
      margin-top: 12px;
    }

    .hover-container {
      position: absolute;
      top: ${top + 1}px;
      left: ${left + 1}px;
      width: ${getImageHoverWidth(width, left)}px;
      height: ${getImageHoverHeight(height, top)}px;
      border-radius: 4px;
      z-index: 10;
      display: none;

      background: ${theme.colors.blackAlpha45};

      input {
        display: none;
      }

      button {
        height: 30px;
        border: none;
        background-color: unset;
        margin: 0;
        padding: 0;
        margin-left: 8px;

        :hover {
          cursor: pointer;
        }
      }

      label:hover {
        cursor: pointer;
      }
    }

    :hover {
      img {
        width: ${getImageHoverWidth(width, left)}px;
        height: ${getImageHoverHeight(height, top)}px;
      }

      .hover-container {
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .anticon {
        color: ${theme.colors.white};
      }
    }
  `}
`;
