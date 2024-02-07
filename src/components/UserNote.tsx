import { FC, ReactNode, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Rnd, Props } from "react-rnd";
import { useLocalStorage } from "react-use";
import { Button, Flex, Space, theme, Input } from "antd";
import {
  EditOutlined,
  CloseOutlined,
  PushpinOutlined,
  PushpinFilled,
} from "@ant-design/icons";
import styled from "styled-components";

type DimensionType = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export type UserNoteProps = {
  open?: boolean;
  note?: string;
  onNoteChange?: (note: string) => void;
  onOpenChange?: (bool: boolean) => void;
  SlotIcon?: ReactNode;
  SlotHeader?: ReactNode;
  SlotFooter?: ReactNode;
};

const DEFAULT_DIMENSION: DimensionType = {
  x: 120,
  y: 120,
  width: 213,
  height: 100,
};

const ICON_SIZE: number = 32;

const NoteWrapper = styled.div<{ $shadow: string }>`
  box-shadow: ${(p) => p.$shadow};
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  height: 100%;

  .ant-input {
    flex: 1 1 auto;
    resize: none;
    border-radius: 0;
    font-size: 14px;
  }
`;

const HeaderWrapper = styled.div<{ $bgc: string }>`
  background-color: ${(p) => p.$bgc};
  padding: 4px 8px;
`;

const MaskWrapper = styled.section`
  position: fixed;
  left: 20px;
  right: 20px;
  bottom: 20px;
  top: 20px;
  pointer-events: none;
  z-index: 9999;
  user-select: none;
`;

let startPosition = 0;

const Note: FC<UserNoteProps> = (props) => {
  const [open, setOpen] = useState(props.open);
  const $wrapper = useRef<HTMLDivElement>(null);

  const { token } = theme.useToken();

  const [pinned, setPinned] = useLocalStorage<boolean>(
    "__user_note_pinned",
    false,
  );

  const [dimension, setDimension] = useLocalStorage<DimensionType>(
    "__user_note_dimension",
    {
      ...DEFAULT_DIMENSION,
    },
  );

  const isShowNote = useMemo(() => {
    return open || pinned;
  }, [open, pinned]);

  const rndProps = useMemo<Partial<Props>>(() => {
    const commonProps: Partial<Props> = {
      maxWidth: 300,
      maxHeight: 340,
      bounds: $wrapper.current ?? ".body",
      enableResizing: false,
      cancel: ".ant-input,.ant-space .ant-btn",
      minWidth: DEFAULT_DIMENSION.width,
      minHeight: DEFAULT_DIMENSION.height,
      position: {
        x: dimension?.x ?? DEFAULT_DIMENSION.x,
        y: dimension?.y ?? DEFAULT_DIMENSION.y,
      },
    };

    if (isShowNote) {
      return {
        ...commonProps,
        enableResizing: true,
        size: {
          width: dimension?.width ?? DEFAULT_DIMENSION.width,
          height: dimension?.height ?? DEFAULT_DIMENSION.height,
        },
      };
    }
    return {
      ...commonProps,
      minWidth: ICON_SIZE,
      minHeight: ICON_SIZE,
      maxWidth: ICON_SIZE,
      maxHeight: ICON_SIZE,
      size: {
        width: ICON_SIZE,
        height: ICON_SIZE,
      },
    };
  }, [dimension, isShowNote, $wrapper]);

  function handleOpenChange(open: boolean) {
    props.onOpenChange?.(open);
    setOpen(open);
  }

  return (
    <>
      <MaskWrapper ref={$wrapper} />
      <Rnd
        {...rndProps}
        style={{ zIndex: 9999 }}
        onDragStart={(_, data) => {
          startPosition = data.x + data.y;
        }}
        onDragStop={(_, data) => {
          //  如果拖拽后，位置没有发生改变，代表着是点击
          if (startPosition === data.x + data.y) {
            handleOpenChange(true);
          } else {
            setDimension({
              ...DEFAULT_DIMENSION,
              ...dimension,
              x: data.x,
              y: data.y,
            });
          }
        }}
        onResizeStop={(e, direction, ref) => {
          setDimension({
            ...DEFAULT_DIMENSION,
            ...dimension,
            width: parseInt(ref.style.width),
            height: parseInt(ref.style.height),
          });
        }}
      >
        {isShowNote ? (
          <NoteWrapper $shadow={token.boxShadow}>
            <HeaderWrapper $bgc={token.colorBgLayout}>
              <Flex justify={"space-between"} align={"center"}>
                <div>{props.SlotHeader}</div>
                <Space size={4}>
                  <Button
                    size={"small"}
                    type={"text"}
                    shape={"circle"}
                    icon={pinned ? <PushpinFilled /> : <PushpinOutlined />}
                    onClick={() => {
                      setPinned(!pinned);
                      setOpen(true);
                    }}
                  />
                  <Button
                    size={"small"}
                    type={"text"}
                    shape={"circle"}
                    icon={<CloseOutlined />}
                    disabled={pinned}
                    onClick={() => handleOpenChange(false)}
                  />
                </Space>
              </Flex>
            </HeaderWrapper>
            <Input.TextArea
              value={props.note}
              onChange={(ev) => {
                props?.onNoteChange?.(ev.target.value);
              }}
            />
            {props.SlotFooter}
          </NoteWrapper>
        ) : (
          <Button
            size={"middle"}
            shape={"circle"}
            type={"primary"}
            icon={props.SlotIcon ?? <EditOutlined />}
          />
        )}
      </Rnd>
    </>
  );
};

const UserNote: FC<UserNoteProps> = (props) => {
  return createPortal(<Note {...props} />, document.body);
};

export default UserNote;
