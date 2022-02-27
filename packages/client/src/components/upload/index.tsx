import React from "react";
import { Upload as SemiUpload, Button, Toast } from "@douyinfe/semi-ui";
import { IconUpload } from "@douyinfe/semi-icons";
import { useAsyncLoading } from "hooks/useAsyncLoading";
import { uploadFile } from "http/file";

interface IProps {
  onOK: (arg: string, fileName: string) => void;
  style?: React.CSSProperties;
  accept?: string;
  children?: (loading: boolean) => React.ReactNode;
}

export const Upload: React.FC<IProps> = ({
  onOK,
  accept,
  style = {},
  children,
}) => {
  const [uploadFileWithLoading, loading] = useAsyncLoading(uploadFile);

  const beforeUpload = ({ file }) => {
    uploadFileWithLoading(file.fileInstance).then((res: string) => {
      Toast.success("上传成功");
      onOK && onOK(res, file.name);
    });
    return false;
  };

  return (
    <SemiUpload
      beforeUpload={beforeUpload}
      previewFile={() => null}
      fileList={[]}
      style={style}
      action={""}
      accept={accept}
    >
      {(children && children(loading)) || (
        <Button icon={<IconUpload />} theme="light">
          点击上传
        </Button>
      )}
    </SemiUpload>
  );
};
