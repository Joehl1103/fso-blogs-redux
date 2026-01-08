const { test, describe } = require("node:test");
const assert = require("node:assert");
const listHelper = require("../../utils/list_helper");

const blogs = require("../../utils/blogs.json");

test("dummy returns one", () => {
  const blogs = [];

  const result = listHelper.dummy(blogs);
  assert.strictEqual(result, 1);
});

describe("total likes", () => {
  const emptyBlogArray = [];

  const oneBlogArray = [
    {
      title: "something",
      author: "someone",
      url: "http://somewhere.com",
      likes: 2,
    },
  ];

  const twoBlogArray = [
    {
      title: "something",
      author: "someone",
      url: "http://somewhere.com",
      likes: 2,
    },
    {
      title: "something else",
      author: "someone else",
      url: "http://somewhereElse.com",
      likes: 123,
    },
  ];

  test("of empty list is zero", () => {
    assert.strictEqual(listHelper.totalLikes(emptyBlogArray), 0);
  });

  test("when likes has only one blog, equals likes of that", () => {
    assert.strictEqual(listHelper.totalLikes(oneBlogArray), 2);
  });

  test("of list greater than 1 equals sum of likes", () => {
    assert.strictEqual(listHelper.totalLikes(twoBlogArray), 125);
  });
});

describe("most likes", () => {
  test("most likes if 1 or more than 1", () => {
    const mostLikedBlogs = [blogs[0], blogs[2]];
    assert.deepStrictEqual(
      listHelper.mostLikes(blogs),
      mostLikedBlogs[0] || mostLikedBlogs[1],
    );
  });

  test("most likes author and likes object", () => {
    const mostLikesObjects = [
      {
        author: "Michael Chan",
        likes: 36,
      },
      {
        author: "Edsger W. Dijkstra",
        likes: 15,
      },
    ];

    try {
      assert.deepStrictEqual(
        listHelper.mostLikesObject(blogs),
        mostLikesObjects[0],
      );
    } catch {
      assert.deepStrictEqual(
        listHelper.mostLikesObject(blogs),
        mostLikesObjects[1],
      );
    }
  });
});

describe("most blogs", () => {
  const mostBlogObjects = [
    {
      author: "Robert C. Martin",
      blogs: 3,
    },
    {
      author: "Edsger W. Dijkstra",
      blogs: 3,
    },
  ];

  try {
    assert.deepStrictEqual(
      listHelper.mostBlogs(blogs),
      mostBlogObjects[1] || mostBlogObjects[1],
    );
  } catch {
    assert.deepStrictEqual(
      listHelper.mostBlogs(blogs),
      mostBlogObjects[1] || mostBlogObjects[1],
    );
  }
});
