import { defineQuery } from "next-sanity";

export const STARTUP_QUERY =
  defineQuery(`*[_type == "startup" && defined(slug.current) && !defined($search) || title match $search || category match $search || author->name match $search ] | order(_createdAt desc) {
  _id,
  title,
  slug,
  author -> {
    _id,
    name,
    image,
    bio,
    },
  _createdAt,
  views,
  image,
  description,
  category,
}`);

export const GET_STARTUP_QUERY =
  defineQuery(`*[_type == "startup" && _id == $id][0] {
  _id,
  title,
  slug,
  author -> {
    _id,
    name,
    image,
    bio,
    },
  _createdAt,
  views,
  image,
  pitch,
  description,
  category,
  } `);

export const GET_VIEWS_QUERY =
  defineQuery(`*[_type == "startup" && _id == $id][0] {
  _id,
  views,
  } `);

// Check if author with specific user id exist

export const AUTHOR_BY_GITHUB_ID_QUERY =
  defineQuery(`*[_type == "author" && id == $id][0] {
  _id,
  name,
  image,
  bio,
  id,
}`);

export const AUTHOR_BY_ID_QUERY = defineQuery(`
*[_type == "author" && _id == $id][0]{
    _id,
    id,
    name,
    username,
    email,
    image,
    bio
}
`);

export const STARTUPS_BY_AUTHOR_QUERY =
  defineQuery(`*[_type == "startup" && author._ref == $id] | order(_createdAt desc) {
  _id, 
  title, 
  slug,
  _createdAt,
  author -> {
    _id, name, image, bio
  }, 
  views,
  description,
  category,
  image,
}`);