import React, {useState, useEffect, useRef} from 'react';
import {Link} from 'react-router-dom';
import withContext from '../../Context';
// import CommentForm from './CommentForm';
import CommentItem from './CommentItem';
import Moment from 'react-moment';
import TextareaAutosize from 'react-autosize-textarea';
import PortraitPlaceholder from '../../img/portrait-placeholder.png';

const CommentItemWithContext = withContext(CommentItem);

function Post({context, match, context: {user_uid}}) {
  // Gets post by params and loads comment Items
  //let initialState = {comment_text: ''};
  const [postData, setPostData] = useState({});
  const [liked, setLiked] = useState('');
  //const [likedTrue, setLikedTrue] = useState([]);
  const [count, setCount] = useState(null);
  const [comment_text, setComment_Text] = useState('');
  const [comments_array, setComments_Array] = useState([]);
  const [avatar, setAvatar] = useState(null);
  let {
    first_name,
    last_name,
    text,
    post_uid,
    fk_user_uid,
    createdAt,
  } = postData;

  useEffect(() => {
    const getPostByUid = async () => {
      let res = await context.actions.get_post_by_uid(match.params.post_uid);
      console.log(res);
      setPostData({...res.post});
      setComment_Text('');
      isPostLiked(res.post.post_likes);
      setCount(res.post.likeCounts);
      setAvatar(res.post.user.avatar);
      setComments_Array([...res.post.comments]);
      setComment_Text({comment_text: ''});
    };
    getPostByUid();

    const isPostLiked = (post_likes_array) => {
      if (post_likes_array) {
        for (let like of post_likes_array) {
          if (like.user_uid === user_uid) {
            setLiked('liked');
            //setLikedTrue(true);
          }
        }
      }
    };
  }, [context.actions, match.params.post_uid, user_uid]);

  //clears the comment input after submission
  const ref = useRef(null);
  const clearInput = () => (ref.current.value = '');

  //rendered as prop to child in order to delete comment from UI
  const onCommentDelete = (comment_uid) => {
    let updatedComments = comments_array.filter(
      (comment) => comment_uid !== comment.comment_uid
    );

    setComments_Array(updatedComments);
  };

  const onChange = (e) => {
    setComment_Text({...comment_text, [e.target.name]: e.target.value});
  };

  //
  const onClick = async (e) => {
    e.preventDefault();

    if (ref.current.value === '') return console.log('No blank messages');

    const res = await context.actions.post_comment(comment_text, post_uid);
    console.log(res);
    setComment_Text('');
    if (res) {
      console.log('I left a comment');
      setComments_Array([...comments_array, res.comment]);
      setComment_Text({comment_text: ''});
      clearInput();
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
      //setLikedTrue(false);
      setLiked('');
      setCount(count - 1);
    } else {
      //setLikedTrue(true);
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
          {/* <a className='card-link' href='#'></a> */}

          <p className='card-text'>{text}</p>
        </div>
        <div className='card-footer p-0 mb-2'>
          <button
            onClick={() => {
              onLike(post_uid);
              afterLike();
            }}
            type='button'
            className='btn'
          >
            {count > 0 ? count : null}{' '}
            <i className={`fas fa-thumbs-up ${liked}`} />{' '}
          </button>

          {fk_user_uid === user_uid ? (
            <button type='button' className='btn'>
              <i className='far fa-trash-alt'></i>{' '}
            </button>
          ) : null}
        </div>
        {/* Comment */}
        {comments_array.map((comment) => {
          return (
            <CommentItemWithContext
              onCommentDelete={onCommentDelete}
              key={comment.uid}
              commentData={comment}
            />
          );
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
            ref={ref}
            name='comment_text'
            value={comment_text.value}
            placeholder='Leave a comment...'
            onChange={(e) => {
              onChange(e);
            }}
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
    </div>
  );
}

export default Post;
