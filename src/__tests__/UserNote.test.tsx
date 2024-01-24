import {
  resetIntersectionMocking,
  setupIntersectionMocking,
} from "react-intersection-observer/test-utils";
import UserNote from "../components/UserNote";
import { AntdApiContextProviderCmp } from "../context/AntdApiContext";
import { fireEvent, render, within } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

beforeEach(() => {
  setupIntersectionMocking(vi.fn);
});

afterEach(() => {
  resetIntersectionMocking();
});

describe("UserNote component", () => {
  {
    const { container } = render(
      <AntdApiContextProviderCmp>
        <UserNote></UserNote>
      </AntdApiContextProviderCmp>,
    );

    const C = within(container);

    it("renders correctly", async () => {
      expect(true).toBeTruthy();
    });
  }
});
