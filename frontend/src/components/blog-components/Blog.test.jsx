import { describe, test, expect, beforeEach, vi } from 'vitest'
import { render, screen, fireEvent } from "@testing-library/react";
import Blog from "./Blog";

describe.skip("testing blog", () => {
  let container;

  const user = {
    username: "Username",
  };

  const blog = {
    title: "Title",
    author: "Author",
    username: "",
    url: "https:blog.com",
    likes: 2,
  };

  const mockHandler = vi.fn();

  beforeEach(() => {
    container = render(
      <Blog blog={blog} user={user} handleLike={mockHandler} />,
    ).container;
  });

  test("renders title and author by default", () => {
    // screen.debug()
    const element = screen.getByText("Title by Author");
    expect(element).toBeDefined();
    const details = container.querySelector(".details");
    expect(details).toHaveStyle("display: none");
  });

  test("renders author,url,likes when details are clicked", async () => {
    const button = screen.getByText("view details");
    // screen.debug()
    fireEvent.click(button);

    screen.debug();

    const details = container.querySelector(".details");
    expect(details).toHaveStyle("display: block");
    expect(screen.getByText(/Title by Author/)).toBeInTheDocument();
    expect(screen.getByText(/Author: Author/)).toBeInTheDocument();
    expect(screen.getByText(/https:blog.com/)).toBeInTheDocument();
    expect(screen.getByText(/Likes: 2/)).toBeInTheDocument();

    const hideDetails = container.querySelector(".hideDetails");
    expect(hideDetails).toBeVisible();
  });

  test("when like button clicked, event handler is called", async () => {
    const detailsButton = screen.getByText("view details");
    fireEvent.click(detailsButton);

    const likeButton = screen.getByText("like");
    fireEvent.click(likeButton);
    fireEvent.click(likeButton);
    // screen.debug();

    expect(mockHandler.mock.calls).toHaveLength(2);
  });

  test("deleting can only be done by user who created", async () => {});
});
