import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog";

describe("testing blog", () => {
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
    // console.log('element',element)
    expect(element).toBeDefined();
    // console.log('container',container)
    const details = container.querySelector(".details");
    // console.log('details',details)
    expect(details).toHaveStyle("display: none");
  });

  test("renders author,url,likes when details are clicked", async () => {
    const user = userEvent.setup();
    const button = screen.getByText("view details");
    // console.log('button',button)
    // screen.debug()
    await user.click(button);

    screen.debug();

    const details = container.querySelector(".details");
    // console.log('details',details)
    expect(details).toHaveStyle("display: block");
    expect(screen.getByText(/Title by Author/)).toBeInTheDocument();
    expect(screen.getByText(/Author: Author/)).toBeInTheDocument();
    expect(screen.getByText(/https:blog.com/)).toBeInTheDocument();
    expect(screen.getByText(/Likes: 2/)).toBeInTheDocument();

    const hideDetails = container.querySelector(".hideDetails");
    expect(hideDetails).toBeVisible();
  });

  test.only("when like button clicked, event handler is called", async () => {
    const user = userEvent.setup();
    const detailsButton = screen.getByText("view details");
    await user.click(detailsButton);

    const likeButton = screen.getByText("like");
    // console.log('like button',likeButton)
    await user.click(likeButton);
    await user.click(likeButton);
    console.log("mock handler calls", mockHandler.mock.calls);

    screen.debug();

    expect(mockHandler.mock.calls).toHaveLength(2);
  });

  test("deleting can only be done by user who created", async () => {});
});
