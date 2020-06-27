import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
// import CommentForm from './CommentForm';
import CommentItem from './CommentItem';
import Moment from 'react-moment';
import TextareaAutosize from 'react-autosize-textarea';

import PortraitPlaceholder from '../../img/portrait-placeholder.png';

function Post({context, match, context: {user_uid}}) {
  // Gets post by params and loads comment Items

  const [postData, setPostData] = useState({});
  const [liked, setLiked] = useState('');
  const [likedTrue, setLikedTrue] = useState([]);
  const [count, setCount] = useState(null);
  const [comment_text, setComment_Text] = useState();
  const [comments_array, setComments_Array] = useState([]);
  let {
    first_name,
    last_name,
    text,
    post_uid,
    fk_user_uid,
    createdAt,
  } = postData;
  let avatar;

  useEffect(() => {
    const getPostByUid = async () => {
      let res = await context.actions.get_post_by_uid(match.params.post_uid);
      console.log(res);
      setPostData({...res.post});
      isPostLiked(res.post.post_likes);
      setCount(res.post.likeCounts);
      avatar = res.post.user.avatar;
      setComments_Array([...res.post.comments]);
    };
    getPostByUid();

    const isPostLiked = (post_likes_array) => {
      if (post_likes_array) {
        for (let like of post_likes_array) {
          if (like.user_uid === user_uid) {
            setLiked('liked');
            setLikedTrue(true);
          }
        }
      }
    };
  }, []);

  const onChange = (e) => {
    setComment_Text({...comment_text, [e.target.name]: e.target.value});
  };

  const onClick = async (e) => {
    e.preventDefault();

    if (comment_text.length === 0) return console.log('no blank comments');
    const res = await context.actions.post_comment(comment_text, post_uid);
    console.log(res);
    if (res) {
      //history.push('/home');
      console.log('I left a comment');
    }
  };

  const onLike = async (post_uid) => {
    const res = await context.actions.like(post_uid);
    if (res === 200) {
      console.log('post liked');
    }
  };

  const afterLike = () => {
    if (liked.length) {
      setLikedTrue(false);
      setLiked('');
      setCount(count - 1);
    } else {
      setLikedTrue(true);
      setLiked('liked');
      setCount(count + 1);
    }
  };

  return (
    <div className='container'>
      <div className='card gedf-card mt-3'>
        <div className='card-header'>
          <div className='d-flex justify-content-between align-items-center'>
            <div className='d-flex justify-content-between align-items-center'>
              <div className='mr-2'>
                <Link to='/' style={{textDecoration: 'none'}}>
                  <img
                    className='rounded-circle'
                    width='45'
                    src={avatar || PortraitPlaceholder}
                    alt=''
                  />
                </Link>
              </div>
              <div className='ml-2'>
                <Link
                  to='/'
                  className='primary-color'
                  style={{textDecoration: 'none'}}
                >
                  <div className='h5 m-0'>
                    {first_name} {last_name}
                  </div>
                </Link>

                <div className='h7 text-muted'>
                  <Moment format={'MM/DD/YYYY'}>{createdAt}</Moment>
                </div>
              </div>
            </div>
            <div></div>
          </div>
        </div>
        <div className='card-body'>
          <a className='card-link' href='#'></a>

          <p className='card-text'>{text}</p>
        </div>
        <div className='card-footer p-0 mb-2'>
          <button
            onClick={() => {
              onLike(post_uid);
              afterLike();
            }}
            type='button'
            class='btn'
          >
            {count > 0 ? count : null}{' '}
            <i className={`fas fa-thumbs-up ${liked}`} />{' '}
          </button>

          {fk_user_uid === user_uid ? (
            <button onClick={''} type='button' class='btn'>
              <i className='far fa-trash-alt'></i>{' '}
            </button>
          ) : null}
        </div>
        {/* Comment */}
        {comments_array.map((comment) => {
          return <CommentItem key={comment.uid} commentData={comment} />;
        })}
        {/* end of comment */}
        <div className='card-footer pb-0'>
          <img
            className='rounded-circle mr-1 comment-avatar'
            width='30'
            src={avatar || PortraitPlaceholder}
            alt=''
          />
          <TextareaAutosize
            className='comment-textarea ml-2 mr-2 '
            rows={1}
            onResize={(e) => {}}
            name='comment_text'
            placeholder='Leave a comment...'
            onChange={(e) => onChange(e)}
          />

          <button
            type='submit'
            className='btn btn-secondary btn-sm comment-btn'
            onClick={(e) => onClick(e)}
          >
            Add Comment
          </button>
        </div>
      </div>

      {/* <Link
        to='/home/messageboard'
        className='primary-color'
        style={{'text-decoration': 'none'}}
      >
        Back to Posts
      </Link> */}
      {/* <PostItem postId={match.params} /> */}
      {/* <CommentForm postId={''} />
      <CommentItem />
      <CommentItem />
      <CommentItem /> */}
      {/* <div className='comments'>
        {post.comments.map((comment) => (
          <CommentItem key={comment._id} comment={comment} postId={post._id} />
        ))}
      </div> */}
    </div>
  );
}

export default Post;
