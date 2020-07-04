import React, {Component} from 'react';
import axios from 'axios';
//import config from './config';
const Context = React.createContext();

const config = {
  headers: {
    'Content-Type': 'application/json',
    // 'Access-Control-Allow-Origin': '*',
  },
};

export class Provider extends Component {
  state = {
    userToken: localStorage.getItem('token') || null,
    user_uid: localStorage.getItem('user_uid') || null,
    first_name: localStorage.getItem('first_name') || null,
    avatar: localStorage.getItem('avatar') || null,
    verified: localStorage.getItem('verified') || null,
  };

  render() {
    const {userToken, user_uid, first_name, avatar, verified} = this.state;

    const value = {
      userToken,
      user_uid,
      first_name,
      avatar,
      verified,
      //stores any handlers or actions to perform on data passed through context
      actions: {
        signIn: this.signIn,
        signOut: this.signOut,
        signUp: this.signUp,
        verify_user: this.verify_user,
        get_my_profile: this.get_my_profile,
        get_profile_by_uid: this.get_profile_by_uid,
        create_profile: this.create_profile,
        update_name: this.update_name,
        update_profile_photo: this.update_profile_photo,
        update_profile_cover_photo: this.update_profile_cover_photo,
        update_profile_info: this.update_profile_info,
        post: this.post,
        get_posts: this.get_posts,
        get_post_by_uid: this.get_post_by_uid,
        update_post: this.update_post,
        post_comment: this.post_comment,
        update_comment: this.update_comment,
        like: this.like,
        comment_like: this.comment_like,
        delete_comment: this.delete_comment,
        delete_post: this.delete_post,
        create_experience: this.create_experience,
        upload_exp_cover_photo: this.upload_exp_cover_photo,
        get_exp_by_uid: this.get_exp_by_uid,
        get_user_experiences: this.get_user_experiences,
        edit_experience: this.edit_experience,
        delete_experience: this.delete_experience,
        save_experience: this.save_experience,
        get_saved_experiences: this.get_saved_experiences,
        get_featured_experiences: this.get_featured_experiences,
      },
    };

    //returns provider components with value prop
    //this.props.children passes in all props to components
    return (
      <Context.Provider value={value}>{this.props.children}</Context.Provider>
    );
  }

  signIn = async (email, password) => {
    // const config = {
    //   headers: {
    //     'Content-Type': 'application/json',
    //     // 'Access-Control-Allow-Origin': '*',
    //   },
    // };

    const body = JSON.stringify({email, password});
    console.log(body);
    try {
      const res = await axios.post(`http://localhost:5000/auth`, body, config);
      if (res.status === 200) {
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('user_uid', res.data.user.user_uid);
        localStorage.setItem('first_name', res.data.user.first_name);
        localStorage.setItem('avatar', res.data.user.avatar);
        localStorage.setItem('verified', res.data.user.verified);
        this.setState(() => {
          return {
            userToken: localStorage.getItem('token'),
            user_uid: localStorage.getItem('user_uid'),
            first_name: localStorage.getItem('first_name'),
            avatar: localStorage.getItem('avatar'),
            verified: localStorage.getItem('verified'),
          };
        });
        return 200;
      }
    } catch (error) {
      // Error 😨
      if (error.response) {
        /*
         * The request was made and the server responded with a
         * status code that falls out of the range of 2xx
         */
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
        if (error.response.status === 400) return error.response.data;
      } else if (error.request) {
        /*
         * The request was made but no response was received, `error.request`
         * is an instance of XMLHttpRequest in the browser and an instance
         * of http.ClientRequest in Node.js
         */
        console.log(error.request);
      } else {
        // Something happened in setting up the request and triggered an Error
        console.log('Error', error.message);
      }
      console.log(error);
    }
  };

  signOut = () => {
    this.setState(() => {
      return {
        userToken: null,
        first_name: null,
        avatar: null,
        verified: null,
      };
    });
    localStorage.removeItem('token');
    localStorage.removeItem('user_uid');
    localStorage.removeItem('first_name');
    localStorage.removeItem('avatar');
    localStorage.removeItem('verified');
  };

  signUp = async (first_name, last_name, email, password) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        // 'Access-Control-Allow-Origin': '*',
      },
    };

    const body = JSON.stringify({first_name, last_name, email, password});
    console.log(body);
    try {
      const res = await axios.post('http://localhost:5000/users', body, config);
      if (res.status === 201) {
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('user_uid', res.data.user.user_uid);
        localStorage.setItem('first_name', res.data.user.first_name);
        localStorage.setItem('avatar', res.data.user.avatar);
        localStorage.setItem('verified', res.data.user.verified);
        this.setState(() => {
          return {
            userToken: localStorage.getItem('token'),
            user_uid: localStorage.getItem('user_uid'),
            first_name: localStorage.getItem('first_name'),
            avatar: localStorage.getItem('avatar'),
            verified: localStorage.getItem('verified'),
          };
        });
        return 201;
      }
    } catch (error) {
      // Error 😨

      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
        if (error.response.status === 400) return error.response.data;
        if (error.response.status === 500) return 500;
      } else if (error.request) {
        console.log(error.request);
      } else {
        // Something happened in setting up the request and triggered an Error
        console.log('Error', error.message);
      }
      console.log(error);
    }
  };

  verify_user = async () => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        // 'Access-Control-Allow-Origin': '*',
      },
    };

    //const body = JSON.stringify();

    try {
      const res = await axios.post('http://localhost:5000/auth/verify', config);
      if (res.status === 200) {
        localStorage.setItem('verified', true);
        this.setState(() => {
          return {
            verified: localStorage.getItem('verified'),
          };
        });
        return 200;
      }
    } catch (error) {
      // Error 😨

      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
        if (error.response.status === 400) return error.response.data;
        if (error.response.status === 500) return 500;
      } else if (error.request) {
        console.log(error.request);
      } else {
        // Something happened in setting up the request and triggered an Error
        console.log('Error', error.message);
      }
      console.log(error);
    }
  };

  get_my_profile = async () => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        // 'Access-Control-Allow-Origin': '*',
      },
    };
    try {
      const res = await axios.get('http://localhost:5000/profile/me', config);
      if (res.status === 200) {
        return res.data;
      }
    } catch (error) {
      // Error 😨

      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
        if (error.response.status === 400) return 400;
        if (error.response.status === 500) return 500;
      } else if (error.request) {
        console.log(error.request);
      } else {
        // Something happened in setting up the request and triggered an Error
        console.log('Error', error.message);
      }
      console.log(error);
    }
  };

  get_profile_by_uid = async (user_uid) => {
    // const config = {
    //   headers: {
    //     'Content-Type': 'application/json',
    //     // 'Access-Control-Allow-Origin': '*',
    //   },
    // };
    try {
      const res = await axios.get(
        `http://localhost:5000/profile/user/${user_uid}`
      );
      if (res.status === 200) {
        return res.data;
      }
    } catch (error) {
      // Error 😨

      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
        if (error.response.status === 400) return 400;
        if (error.response.status === 500) return 500;
      } else if (error.request) {
        console.log(error.request);
      } else {
        // Something happened in setting up the request and triggered an Error
        console.log('Error', error.message);
      }
      console.log(error);
    }
  };

  create_profile = async () => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        // 'Access-Control-Allow-Origin': '*',
      },
    };
    try {
      const res = await axios.post('http://localhost:5000/profile/me', config);
      if (res.status === 200) {
        return res.data;
      }
    } catch (error) {
      // Error 😨

      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
        if (error.response.status === 400) return 400;
        if (error.response.status === 500) return 500;
      } else if (error.request) {
        console.log(error.request);
      } else {
        // Something happened in setting up the request and triggered an Error
        console.log('Error', error.message);
      }
      console.log(error);
    }
  };

  update_name = async (first_name, last_name) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        // 'Access-Control-Allow-Origin': '*',
      },
    };

    const body = JSON.stringify({first_name, last_name});
    try {
      const res = await axios.put(
        'http://localhost:5000/auth/update',
        body,
        config
      );
      if (res.status === 200) {
        return 200;
      }
    } catch (error) {
      // Error 😨

      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
        if (error.response.status === 400) return error.response.data;
        if (error.response.status === 500) return 500;
      } else if (error.request) {
        console.log(error.request);
      } else {
        // Something happened in setting up the request and triggered an Error
        console.log('Error', error.message);
      }
      console.log(error);
    }
  };

  update_profile_photo = async (photo) => {
    let config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        // 'Access-Control-Allow-Origin': '*',
      },
    };

    let formData = new FormData();
    formData.append('photo', photo);

    //const body = JSON.stringify({first_name, last_name});
    try {
      const res = await axios.post(
        'http://localhost:5000/upload/profile_photo',
        formData,
        config
      );
      if (res.status === 200) {
        console.log(res.data);
        localStorage.setItem('avatar', res.data.user.avatar);
        this.setState(() => {
          return {
            avatar: localStorage.getItem('avatar'),
          };
        });
        return res.data;
      }
    } catch (error) {
      // Error 😨

      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
        if (error.response.status === 400) return error.response.data;
        if (error.response.status === 500) return 500;
      } else if (error.request) {
        console.log(error.request);
      } else {
        // Something happened in setting up the request and triggered an Error
        console.log('Error', error.message);
      }
      console.log(error);
    }
  };

  update_profile_cover_photo = async (photo) => {
    let config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        // 'Access-Control-Allow-Origin': '*',
      },
    };

    let formData = new FormData();
    formData.append('photo', photo);

    //const body = JSON.stringify({first_name, last_name});
    try {
      const res = await axios.post(
        'http://localhost:5000/upload/profile_cover_photo',
        formData,
        config
      );
      if (res.status === 200) {
        console.log(res.data);
        return res.data;
      }
    } catch (error) {
      // Error 😨

      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
        if (error.response.status === 400) return error.response.data;
        if (error.response.status === 500) return 500;
      } else if (error.request) {
        console.log(error.request);
      } else {
        // Something happened in setting up the request and triggered an Error
        console.log('Error', error.message);
      }
      console.log(error);
    }
  };

  update_profile_info = async (
    bio,
    gender,
    date_of_birth,
    country,
    languages,
    phone_number
  ) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        // 'Access-Control-Allow-Origin': '*',
      },
    };

    const body = JSON.stringify({
      bio,
      gender,
      date_of_birth,
      country,
      languages,
      phone_number,
    });
    try {
      const res = await axios.post(
        'http://localhost:5000/profile/me',
        body,
        config
      );
      if (res.status === 200) {
        return 200;
      }
    } catch (error) {
      // Error 😨

      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
        if (error.response.status === 400) return error.response.data;
        if (error.response.status === 500) return 500;
      } else if (error.request) {
        console.log(error.request);
      } else {
        // Something happened in setting up the request and triggered an Error
        console.log('Error', error.message);
      }
      console.log(error);
    }
  };

  post = async (text) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        // 'Access-Control-Allow-Origin': '*',
      },
    };

    const body = JSON.stringify({text});
    console.log(body);
    try {
      const res = await axios.post('http://localhost:5000/posts', body, config);
      if (res.status === 200) {
        return 200;
      }
    } catch (error) {
      // Error 😨

      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
        if (error.response.status === 400) return error.response.data;
        if (error.response.status === 500) return 500;
      } else if (error.request) {
        console.log(error.request);
      } else {
        // Something happened in setting up the request and triggered an Error
        console.log('Error', error.message);
      }
      console.log(error);
    }
  };

  get_posts = async () => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        // 'Access-Control-Allow-Origin': '*',
      },
    };

    //const body = JSON.stringify({});
    //console.log(body);
    try {
      const res = await axios.get(`http://localhost:5000/posts/`, config);
      if (res.status === 200) {
        return res.data;
      }
    } catch (error) {
      // Error 😨

      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
        if (error.response.status === 400) return error.response.data;
        if (error.response.status === 500) return 500;
      } else if (error.request) {
        console.log(error.request);
      } else {
        // Something happened in setting up the request and triggered an Error
        console.log('Error', error.message);
      }
      console.log(error);
    }
  };

  get_post_by_uid = async (post_uid) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        // 'Access-Control-Allow-Origin': '*',
      },
    };

    //const body = JSON.stringify({});
    //console.log(body);
    try {
      const res = await axios.get(
        `http://localhost:5000/posts/${post_uid}`,
        config
      );
      if (res.status === 200) {
        return res.data;
      }
    } catch (error) {
      // Error 😨

      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
        if (error.response.status === 400) return error.response.data;
        if (error.response.status === 500) return 500;
      } else if (error.request) {
        console.log(error.request);
      } else {
        // Something happened in setting up the request and triggered an Error
        console.log('Error', error.message);
      }
      console.log(error);
    }
  };

  update_post = async (editText, post_uid) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        // 'Access-Control-Allow-Origin': '*',
      },
    };

    let text = {text: editText.updatedText};

    const body = JSON.stringify(text);
    console.log(body);
    try {
      const res = await axios.put(
        `http://localhost:5000/posts/${post_uid}`,
        body,
        config
      );
      if (res.status === 200) {
        return res.data;
      }
    } catch (error) {
      // Error 😨

      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
        if (error.response.status === 400) return error.response.data;
        if (error.response.status === 500) return 500;
      } else if (error.request) {
        console.log(error.request);
      } else {
        // Something happened in setting up the request and triggered an Error
        console.log('Error', error.message);
      }
      console.log(error);
    }
  };

  post_comment = async (text, post_uid) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        // 'Access-Control-Allow-Origin': '*',
      },
    };
    console.log(post_uid);
    const body = JSON.stringify(text);
    console.log(body);
    try {
      const res = await axios.post(
        `http://localhost:5000/posts/comment/${post_uid}`,
        body,
        config
      );
      if (res.status === 200) {
        return res.data;
      }
    } catch (error) {
      // Error 😨

      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
        if (error.response.status === 400) return error.response.data;
        if (error.response.status === 500) return 500;
      } else if (error.request) {
        console.log(error.request);
      } else {
        // Something happened in setting up the request and triggered an Error
        console.log('Error', error.message);
      }
      console.log(error);
    }
  };

  update_comment = async (editText, comment_uid) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        // 'Access-Control-Allow-Origin': '*',
      },
    };

    let text = {text: editText.updatedText};

    const body = JSON.stringify(text);
    console.log(body);
    try {
      const res = await axios.put(
        `http://localhost:5000/posts/comment/${comment_uid}`,
        body,
        config
      );
      if (res.status === 200) {
        return res.data;
      }
    } catch (error) {
      // Error 😨

      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
        if (error.response.status === 400) return error.response.data;
        if (error.response.status === 500) return 500;
      } else if (error.request) {
        console.log(error.request);
      } else {
        // Something happened in setting up the request and triggered an Error
        console.log('Error', error.message);
      }
      console.log(error);
    }
  };

  delete_post = async (post_uid) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        // 'Access-Control-Allow-Origin': '*',
      },
    };

    console.log(typeof post_uid);
    //const body = JSON.stringify({});
    //console.log(body);
    try {
      const res = await axios.delete(
        `http://localhost:5000/posts/${post_uid}`,
        config
      );
      if (res.status === 200) {
        return 200;
      }
    } catch (error) {
      // Error 😨

      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
        if (error.response.status === 400) return error.response.data;
        if (error.response.status === 500) return 500;
      } else if (error.request) {
        console.log(error.request);
      } else {
        // Something happened in setting up the request and triggered an Error
        console.log('Error', error.message);
      }
      console.log(error);
    }
  };

  like = async (post_uid) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        // 'Access-Control-Allow-Origin': '*',
      },
    };

    console.log(typeof post_uid);
    //const body = JSON.stringify({});
    //console.log(body);
    try {
      const res = await axios.put(
        `http://localhost:5000/posts/like/${post_uid}`,
        config
      );
      if (res.status === 200) {
        return 200;
      }
    } catch (error) {
      // Error 😨

      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
        if (error.response.status === 400) return error.response.data;
        if (error.response.status === 500) return 500;
      } else if (error.request) {
        console.log(error.request);
      } else {
        // Something happened in setting up the request and triggered an Error
        console.log('Error', error.message);
      }
      console.log(error);
    }
  };

  comment_like = async (comment_uid) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        // 'Access-Control-Allow-Origin': '*',
      },
    };

    console.log(typeof comment_uid);
    //const body = JSON.stringify({});
    //console.log(body);
    try {
      const res = await axios.put(
        `http://localhost:5000/posts/comment/like/${comment_uid}`,
        config
      );
      if (res.status === 200) {
        return 200;
      }
    } catch (error) {
      // Error 😨

      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
        if (error.response.status === 400) return error.response.data;
        if (error.response.status === 500) return 500;
      } else if (error.request) {
        console.log(error.request);
      } else {
        // Something happened in setting up the request and triggered an Error
        console.log('Error', error.message);
      }
      console.log(error);
    }
  };
  delete_comment = async (comment_uid) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        // 'Access-Control-Allow-Origin': '*',
      },
    };

    console.log(typeof comment_uid);
    //const body = JSON.stringify({});
    //console.log(body);
    try {
      const res = await axios.delete(
        `http://localhost:5000/posts/comment/${comment_uid}`,
        config
      );
      if (res.status === 200) {
        return 200;
      }
    } catch (error) {
      // Error 😨

      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
        if (error.response.status === 400) return error.response.data;
        if (error.response.status === 500) return 500;
      } else if (error.request) {
        console.log(error.request);
      } else {
        // Something happened in setting up the request and triggered an Error
        console.log('Error', error.message);
      }
      console.log(error);
    }
  };

  create_experience = async (experienceData) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        // 'Content-Type': 'multipart/form-data',
        // 'Access-Control-Allow-Origin': '*',
      },
    };

    const body = JSON.stringify(experienceData);
    console.log(body);

    try {
      const res = await axios.post(
        'http://localhost:5000/adventure',
        body,
        config
      );
      if (res.status === 200) {
        return res.data;
      }
    } catch (error) {
      // Error 😨

      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
        if (error.response.status === 400) return error.response.data;
        if (error.response.status === 500) return 500;
      } else if (error.request) {
        console.log(error.request);
      } else {
        // Something happened in setting up the request and triggered an Error
        console.log('Error', error.message);
      }
      console.log(error);
    }
  };

  upload_exp_cover_photo = async (photo) => {
    const config = {
      headers: {
        //'Content-Type': 'application/json',
        'Content-Type': 'multipart/form-data',
        // 'Access-Control-Allow-Origin': '*',
      },
    };

    let formData = new FormData();
    formData.append('photo', photo);
    console.log(formData);

    try {
      const res = await axios.post(
        'http://localhost:5000/upload/exp_cover_photo',
        formData,
        config
      );
      if (res.status === 200) {
        return res.data;
      }
    } catch (error) {
      // Error 😨

      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
        if (error.response.status === 400) return 400;
        if (error.response.status === 500) return 500;
      } else if (error.request) {
        console.log(error.request);
      } else {
        // Something happened in setting up the request and triggered an Error
        console.log('Error', error.message);
      }
      console.log(error);
    }
  };

  edit_experience = async (experienceData, uid) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        // 'Content-Type': 'multipart/form-data',
        // 'Access-Control-Allow-Origin': '*',
      },
    };

    const body = JSON.stringify(experienceData);
    console.log(body);

    try {
      const res = await axios.put(
        `http://localhost:5000/adventure/${uid}`,
        body,
        config
      );
      if (res.status === 200) {
        console.log(res.data);
        return 200;
      }
    } catch (error) {
      // Error 😨

      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
        if (error.response.status === 400) return error.response.data;
        if (error.response.status === 500) return 500;
      } else if (error.request) {
        console.log(error.request);
      } else {
        // Something happened in setting up the request and triggered an Error
        console.log('Error', error.message);
      }
      console.log(error);
    }
  };

  get_exp_by_uid = async (adventure_uid) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        // 'Access-Control-Allow-Origin': '*',
      },
    };

    //const body = JSON.stringify({});
    //console.log(body);
    try {
      const res = await axios.get(
        `http://localhost:5000/adventure/${adventure_uid}`,
        config
      );
      if (res.status === 200) {
        console.log(res.data);
        return res.data;
      }
    } catch (error) {
      // Error 😨

      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
        if (error.response.status === 400) return error.response.data;
        if (error.response.status === 500) return 500;
      } else if (error.request) {
        console.log(error.request);
      } else {
        // Something happened in setting up the request and triggered an Error
        console.log('Error', error.message);
      }
      console.log(error);
    }
  };

  get_user_experiences = async () => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        // 'Access-Control-Allow-Origin': '*',
      },
    };

    // const body = JSON.stringify();
    // console.log(body);
    try {
      const res = await axios.get(
        `http://localhost:5000/adventure/user/adventures`,
        config
      );
      if (res.status === 200) {
        return res.data;
      }
    } catch (error) {
      // Error 😨

      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
        if (error.response.status === 400) return error.response.data;
        if (error.response.status === 500) return 500;
      } else if (error.request) {
        console.log(error.request);
      } else {
        // Something happened in setting up the request and triggered an Error
        console.log('Error', error.message);
      }
      console.log(error);
    }
  };

  delete_experience = async (experience_uid) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        // 'Access-Control-Allow-Origin': '*',
      },
    };

    //const body = JSON.stringify({});
    //console.log(body);
    try {
      const res = await axios.delete(
        `http://localhost:5000/adventure/delete/${experience_uid}`,
        config
      );
      if (res.status === 200) {
        return 200;
      }
    } catch (error) {
      // Error 😨

      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
        if (error.response.status === 400) return error.response.data;
        if (error.response.status === 500) return 500;
      } else if (error.request) {
        console.log(error.request);
      } else {
        // Something happened in setting up the request and triggered an Error
        console.log('Error', error.message);
      }
      console.log(error);
    }
  };

  save_experience = async (adventure_uid) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        // 'Access-Control-Allow-Origin': '*',
      },
    };

    //const body = JSON.stringify({});
    //console.log(body);
    try {
      const res = await axios.post(
        `http://localhost:5000/favorites/${adventure_uid}`,
        config
      );
      if (res.status === 200) {
        return res.data;
      }
      if (res.status === 202) {
        return res.status;
      }
    } catch (error) {
      // Error 😨

      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
        if (error.response.status === 400) return error.response.data;
        if (error.response.status === 500) return 500;
      } else if (error.request) {
        console.log(error.request);
      } else {
        // Something happened in setting up the request and triggered an Error
        console.log('Error', error.message);
      }
      console.log(error);
    }
  };

  get_saved_experiences = async () => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        // 'Access-Control-Allow-Origin': '*',
      },
    };

    //const body = JSON.stringify({});
    //console.log(body);
    try {
      const res = await axios.get(`http://localhost:5000/favorites`, config);
      if (res.status === 200) {
        return res.data;
      }
    } catch (error) {
      // Error 😨

      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
        if (error.response.status === 400) return error.response.data;
        if (error.response.status === 500) return 500;
      } else if (error.request) {
        console.log(error.request);
      } else {
        // Something happened in setting up the request and triggered an Error
        console.log('Error', error.message);
      }
      console.log(error);
    }
  };

  get_featured_experiences = async () => {
    //const body = JSON.stringify({});
    //console.log(body);
    try {
      const res = await axios.get(`http://localhost:5000/adventure/featured`);
      if (res.status === 200) {
        return res.data;
      }
    } catch (error) {
      // Error 😨

      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
        if (error.response.status === 400) return error.response.data;
        if (error.response.status === 500) return 500;
      } else if (error.request) {
        console.log(error.request);
      } else {
        // Something happened in setting up the request and triggered an Error
        console.log('Error', error.message);
      }
      console.log(error);
    }
  };
}

export const Consumer = Context.Consumer;

/**
 * A higher-order component that wraps the provided component in a Context Consumer component.
 * @param {class} Component - A React component.
 * @returns {function} A higher-order component.
 */

export default function withContext(Component) {
  return function ContextComponent(props) {
    return (
      <Context.Consumer>
        {(context) => <Component {...props} context={context} />}
      </Context.Consumer>
    );
  };
}
