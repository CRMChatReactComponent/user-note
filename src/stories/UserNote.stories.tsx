import { Typography } from "antd";
import UserNote from "../components/UserNote";
import { HighlightOutlined } from "@ant-design/icons";
import type { Meta, StoryObj } from "@storybook/react";

const { Text } = Typography;

const meta: Meta<typeof UserNote> = {
  title: "UserNote",
  component: UserNote,
  args: {},
  render(props) {
    return (
      <div style={{ paddingLeft: 42 }}>
        <UserNote {...props} />
      </div>
    );
  },
};

type Story = StoryObj<typeof UserNote>;

export const Basic: Story = {};
export const Slot: Story = {
  args: {
    SlotFooter: <Text>SlotFooter</Text>,
    SlotHeader: <Text>SlotHeader</Text>,
  },
};
export const CustomIcon: Story = {
  args: {
    SlotIcon: <HighlightOutlined />,
  },
};

export default meta;
