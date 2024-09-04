
import { setToken, setUser } from "../../redux/authSlice";
import { apiConnector } from "../apiConnector";
import { endpoints } from "../apis";
import { toast } from "react-toastify";


const {
  REMOVE_LIKE_API,
  COMMENT_API,
  LIKE_API,
  CONTACT,

} = endpoints;

export const addCommentMain = async (data, token) => {

  const toastId = toast.loading("Loading...")
  let result = false
  try {
    const response = await apiConnector("POST", COMMENT_API, data, {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    })
    console.log("CREATE COMMENT  API RESPONSE............", response)
    if (!response?.data?.success) {
      throw new Error("Could Not Add COMMENT Details")
    }
    toast.success(response?.data?.message)
    result = response?.data?.news
  } catch (error) {
    console.log("CREATE COMMENT API ERROR............", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
  return result
}
export const contact = async (data) => {

  const toastId = toast.loading("Loading...")
  let result = false
  try {
    const response = await apiConnector("POST", CONTACT, data)
    console.log("CREATE contact  API RESPONSE............", response)
    if (!response?.data?.success) {
      throw new Error("Could Not Add contact Details")
    }
    toast.success(response?.data?.message)
    result = response?.data?.contact
  } catch (error) {
    console.log("CREATE COMMENT API ERROR............", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
  return result
}

export const addLikeMain = async (data, token) => {

  const toastId = toast.loading("Loading...")
  let result = false
  try {
    const response = await apiConnector("POST", LIKE_API, data, {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    })
    // console.log("CREATE LIKE  API RESPONSE............", response)
    toast.success("Liked")

    result = true
  } catch (error) {
    console.log("CREATE LIKE API ERROR............", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
  return result
}


export const removeLikeMain = async (data, token) => {

  const toastId = toast.loading("Loading...")
  let result = false
  try {
    const response = await apiConnector("POST", REMOVE_LIKE_API, data, {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    })
    // console.log("CREATE Remove Like  API RESPONSE............", response)


    toast.success("Remove Liked")
    result = true
  } catch (error) {
    console.log("CREATE Remove Like API ERROR............", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
  return result
}



export function logout(navigate) {
  return (dispatch) => {
    dispatch(setToken(null))
    dispatch(setUser(null))

    localStorage.removeItem("token")
    localStorage.removeItem("user")
    toast.success("Logged Out")
    navigate("/")

  }
}
