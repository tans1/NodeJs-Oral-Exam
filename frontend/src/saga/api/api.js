import axios from "axios";

export async function create_questions_api() {
  try {
    const response = await axios.get(
      "http://localhost:5000/questions/generate",
      {
        headers: {
          "Content-Type": "application/json"
        },
        withCredentials: true
      }
    );

    if (response.status === 200) {
      return {
        success: true,
        error: false
      };
    }
  } catch (e) {
    return {
      success: false,
      error: true
    };
  }
}

export async function fetch_questions_api(number) {
  try {
    const response = await axios.get(
      `http://localhost:5000/questions/single?number=${number}`,
      {
        headers: {
          "Content-Type": "application/json"
        },
        withCredentials: true
      }
    );
    return response.data.question;
  } catch (error) {
    return "error occurred";
  }
}

export async function submit_answer_api(data) {
  try {
    const response = await axios.post(
      "http://localhost:5000/questions/evaluate",
      data,
      {
        headers: {
          "Content-Type": "application/json"
        },
        withCredentials: true
      }
    );
    return response.data.point;
  } catch (e) {}
}
export async function register_user(data) {
  try {
    const response = await axios.post(
      "http://localhost:5000/user/signup",
      JSON.stringify(data),
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );

    if (response.status === 200) {
      return {
        success: true,
        error: false
      };
    } else {
      return {
        success: false,
        error: true
      };
    }
  } catch (e) {
    return {
      success: false,
      error: true
    };
  }
}

export async function login_user(data) {
  try {
    const response = await axios.post(
      "http://localhost:5000/user/login",
      JSON.stringify(data),
      {
        headers: {
          "Content-Type": "application/json"
        },
        withCredentials: true
      }
    );

    if (response.status === 200) {
      return {
        success: true,
        error: false,
        user_fullName: response.data.user_fullName
      };
    } else {
      return {
        success: false,
        error: true
      };
    }
  } catch (e) {
    return {
      success: false,
      error: true
    };
  }
}
