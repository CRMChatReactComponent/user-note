# 使用

## 安装

```shell
pnpm install @crmchatreactcomponent/user-note -D
```

## 使用

```tsx
import {
  UserNote,
  AntdApiContextProviderCmp,
  I18nContextCmp,
} from "@crmchatreactcomponent/user-note";

const UserNoteWrapper = function () {
  const [note, handleNoteChange] = useState('');

  return (
    <AntdApiContextProviderCmp>
      <I18nContextCmp>
        <UserNote
          note={note}
          onNoteChange={handleNoteChange}
          SlotHeader={<div>用户名称</>}
        />
      </I18nContextCmp>
    </AntdApiContextProviderCmp>
  );
};
```

该组件使用 `i8next` 和 `antd` 来分别处理多语言和主题切换功能，因此在调用 `<UserNote/>` 时需要将其包裹在 `AntdApiContextProviderCmp` 和 `I18nContextCmp` 中，以保证逻辑代码正常运行。

> 只需要包裹下即可，不需要进行任何配置

# 参数

## open (可选)

是否展开 默认为 false

## note （可选）

备注字符串 默认为 ''

# 事件

## onNoteChange（可选）

`(note: string) => void;`

当用户修改 note 时触发

当数据发生改变时请及时更新 `note` 数据，以保证列表能正确渲染

## onOpenChange（可选）

`(bool: boolean) => void;`

展开状态改变时的回调

# Slot

插槽

该组件提供以下插槽

1. [SlotIcon](/story/usernote--custom-icon)
2. [SlotHeader](/story/usernote--slot)
3. [SlotFooter](/story/usernote--slot)
