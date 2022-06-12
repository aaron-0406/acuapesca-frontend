import Button from "../../../../../../ui/Button";
import HeaderPlus from "../../../../../../ui/Header/HeaderPlus";
import Icon from "../../../../../../ui/Icon";
import { IProceduresForm } from "../../../types/types";

interface IFileTitleProps {
  procedure: IProceduresForm | null;
  onToggleModal: () => void;
}

export const FilesTitle = ({ procedure, onToggleModal }: IFileTitleProps) => {
  return (
    <HeaderPlus
      title={procedure?.title ? procedure.title : "--"}
      disabledButton={!procedure}
      setVisibleModal={() => {}}
      plusHeader={
        procedure?.title && (
          <Button
            type="secondary"
            icon={<Icon remixiconClass="ri-more-fill" />}
            onClick={onToggleModal}
          />
        )
      }
    />
  );
};
