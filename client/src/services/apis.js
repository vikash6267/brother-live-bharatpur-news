
const BASE_URL = process.env.REACT_APP_BASE_URL;
// const BASE_URL = "https://news-uab9.onrender.com/api/v1";

// const BASE_URL = "http://localhost:8080/api/v1"


export const endpoints = {
  LOGIN_API: BASE_URL + "/auth/login",
  SIGNUP_API: BASE_URL + "/auth/register",

  SEND_OTP_API: BASE_URL + "/auth/sentotp",
  VERIFY_OTP_API: BASE_URL + "/auth/verifyotp",


  COMMENT_API: BASE_URL + "/news/comment",
  LIKE_API: BASE_URL + "/news/like",
  REMOVE_LIKE_API: BASE_URL + "/news/removelike",
  CONTACT: BASE_URL + "/contact/create",
}

export const adminEndpoints = {
  ADD_NEWS_API: BASE_URL + "/news/create",
  UPDATE_NEWS_API: BASE_URL + "/news/update",
  GET_ALL_NEWS_API: BASE_URL + "/news/all",
  DELETE_NEWS_API: BASE_URL + "/news/delete",
  DETAILS_NEWS_API: BASE_URL + "/news",




  ALL_NOTIFICATIONS_API: BASE_URL + "/news/notifications",

  // ACTIVE STATUS
  STATUS_NEWS_API: BASE_URL + "/news/toggleActive",

  //bREAKING nEWS
  CREATE_BREAKING_NEWS: BASE_URL + "/breakingNews/create",
  GET_ALL_BREAKING_NEWS: BASE_URL + "/breakingNews/getAll",
  DELETE_BREAKING_NEWS: BASE_URL + "/breakingNews/delete",
  ACTIVE_BREAKING_NEWS: BASE_URL + "/breakingNews/update",



  //LIve nEWS
  CREATE_LIVE_NEWS: BASE_URL + "/live/create",
  GET_ALL_LIVE_NEWS: BASE_URL + "/live/getAll",
  DELETE_LIVE_NEWS: BASE_URL + "/live/delete",
  ACTIVE_LIVE_NEWS: BASE_URL + "/live/update",


  // Image
  IMAGE_UPLOAD: BASE_URL + "/image/multi",




  // CateGOry
  ADD_CATEGORY_API: BASE_URL + "/category/create",
  DELETE_CATEGORY_API: BASE_URL + "/category/delete",
  UPDATE_CATEGORY_API: BASE_URL + "/category/update",
  GET_ALL_CATEGORY_API: BASE_URL + "/category/all",
  DETAILS_CATEGORY_API: BASE_URL + "/category",





  // suBCateGOry
  ADD_SUBCATEGORY_API: BASE_URL + "/subcategory/create",
  DELETE_SUBCATEGORY_API: BASE_URL + "/subcategory/delete",
  UPDATE_SUBCATEGORY_API: BASE_URL + "/subcategory/update",
  GET_ALL_SUBCATEGORY_API: BASE_URL + "/subcategory/all",
  DETAILS_SUBCATEGORY_API: BASE_URL + "/subcategory",






}