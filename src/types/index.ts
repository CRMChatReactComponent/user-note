import { ReactElement } from "react";

export type SlotType = (props: { value: string }) => ReactElement | null;
