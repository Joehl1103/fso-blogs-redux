const _ = require("lodash");
const supertest = require("supertest");
const app = require("../app");
const bcrypt = require("bcrypt");
const blogs = require("./blogs.json");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

const api = supertest(app);

const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  if (blogs.length === 0) {
    return 0;
  }
  let sum = 0;
  const likesArray = blogs.map((blog) => blog.likes);
  if (likesArray.length === 1) {
    return (sum = likesArray[0]);
  }
  function sumReducer(sum, item) {
    return sum + item;
  }
  return (sum = likesArray.reduce(sumReducer, sum));
};

const mostLikes = (blogs) => {
  // get a reference to the item that has the most likes
  // iterate over the array to create a new array with index value and likes

  const likesArray = blogs.map((blog) => blog.likes);
  const max = Math.max(...likesArray);
  const mostLikesBlog = blogs.filter((blog) => blog.likes === max);
  return mostLikesBlog[0];

  // get a reference to the index value with the greatest number of likes

  // return the object with the most likes
  // return the object at array index n
};

const mostLikesObject = (blogs) => {
  let returnedObject = _.groupBy(blogs, (blog) => blog.author);

  const { arrayOfLikes } =
    returnArrayOfLikesAndAddSumOfLikesToObject(returnedObject);

  const maxLikes = _.max(arrayOfLikes);

  const keyArray = Object.keys(returnedObject);

  const arrayOfAuthorsAndLikes = createAuthorObject(keyArray, returnedObject);

  const maxAuthor = _.find(
    arrayOfAuthorsAndLikes,
    (object) => object.likes === maxLikes,
  );

  return maxAuthor;
};

function returnArrayOfLikesAndAddSumOfLikesToObject(object) {
  const arrayOfLikes = [];

  _.forOwn(object, (value) => {
    const sumLikes = _.sumBy(value, (value) => value.likes);
    arrayOfLikes.push(sumLikes);
    value["sumOfLikes"] = sumLikes;
  });

  return { arrayOfLikes, object };
}

function createAuthorObject(keyArray, parentObject) {
  const targetArray = [];

  for (let i = 0; i < keyArray.length; i++) {
    const tempLikes = parentObject[keyArray[i]]["sumOfLikes"];
    const newObject = {
      author: keyArray[i],
      likes: tempLikes,
    };
    targetArray.push(newObject);
  }
  return targetArray;
}

const mostBlogs = (blogs) => {
  const countOfAuthors = _.countBy(blogs, (blog) => blog.author);
  const maxBlogCount = _.chain(countOfAuthors).values().max().value();

  const maxBlogAuthor = _.findKey(
    countOfAuthors,
    (value) => value === maxBlogCount,
  );

  const maxBlogObject = {
    author: maxBlogAuthor,
    blogs: maxBlogCount,
  };

  return maxBlogObject;
};

module.exports = {
  dummy,
  totalLikes,
  mostLikes,
  mostLikesObject,
  mostBlogs,
  createAndSaveNewUser,
  generateToken,
};
