import React, {useState, useEffect, Fragment, useRef} from 'react';
//import {Link} from 'react-router-dom';
import Moment from 'react-moment';
import PortraitPlaceholder from '../../img/portrait-placeholder.png';
import TextareaAutosize from 'react-autosize-textarea';

function CommentItem({
  context,
  context: {user_uid},
  commentData,
  commentData: {
    comment_uid,
    createdAt,
    first_name,
    last_name,
    comment_text,
    fk_user_uid,
    likeCounts,
    comment_likes,
    postLikes,
    user: {avatar},
  },
  onCommentDelete,
}) {
  const [liked, setLiked] = useState('');
  //const [likedTrue, setLikedTrue] = useState([]);
  const [count, setCount] = useState(null);
  const [editText, setEditText] = useState({
    updatedText: '',
  });
  const [editTextField, setEditTextField] = useState(false);

  let {updatedText} = editText;

  useEffect(() => {
    setCount(likeCounts);
    setEditText({updatedText: comment_text});

    const isPostLiked = (comment_likes) => {
      if (comment_likes.length) {
        for (let like of comment_likes) {
          if (like.user_uid === user_uid) {
            setLiked('liked');
            //setLikedTrue(true);
          }
        }
      }
    };
    isPostLiked(comment_likes);
  }, [likeCounts, comment_likes, user_uid, comment_text]);

  const editRef = useRef(null);

  const onEdit = (e) => {
    setEditText({...editText, [e.target.name]: e.target.value});
  };

  const handleEdit = async (e, comment_uid) => {
    e.preventDefault();
    if (editRef.current.value === '') return console.log('No blank messages');

    const res = await context.actions.update_comment(editText, comment_uid);
    console.log(res);
    toggleEditTextField(editTextField);
  };

  const onDelete = async (comment_uid) => {
    //passes comment_uid up to parent to delete from UI
    onCommentDelete(comment_uid);
    const res = await context.actions.delete_comment(comment_uid);
    if (res === 200) {
      console.log('comment deleted');
    }
  };

  const onLike = async (comment_uid) => {
    const res = await context.actions.comment_like(comment_uid);
    if (res === 200) {
      console.log('comment liked');
    }
  };

  const afterLike = () => {
    if (liked.length) {
      // setLikedTrue(false);
      setLiked('');
      setCount(count - 1);
    } else {
      //setLikedTrue(true);
      setLiked('liked');
      setCount(count + 1);
    }
  };

  const toggleEditTextField = (editTextField) => {
    setEditTextField(!editTextField);
  };

  return (
    <div className='card-body p-0 pl-3 mb-2'>
      <div className='d-flex justify-content-between align-items-center'>
        <div className='d-flex justify-content-between align-items-center'>
          <div className='mr-2'>
            <img
              className='rounded-circle commenter-avatar'
              width='30'
              src={avatar || PortraitPlaceholder}
              alt=''
            />
          </div>
          <div className='ml-2 mr-2'>
            <p className=' m-0 comment-name'>
              {first_name} {last_name} &#8226;{' '}
              <span className='d-inline text-muted comment-date m-0'>
                <Moment format={'MM/DD/YYYY'}>{createdAt}</Moment>
              </span>
            </p>
            {!editTextField ? (
              <p className='comment-text m-0'>{updatedText}</p>
            ) : (
              <Fragment>
                <TextareaAutosize
                  className='edit-comment-textarea ml-2 mr-2 d-inline '
                  rows={1}
                  ref={editRef}
                  name='updatedText'
                  value={updatedText}
                  onChange={(e) => {
                    onEdit(e);
                  }}
                />

                <button
                  type='submit'
                  className='btn btn-secondary btn-sm comment-btn '
                  onClick={(e) => handleEdit(e, comment_uid)}
                >
                  Update Comment
                </button>
              </Fragment>
            )}
            <div></div>
            <button
              onClick={() => {
                onLike(comment_uid);
                afterLike();
              }}
              type='btn'
              className={`btn m-0 p-0 comment-like ${liked}`}
            >
              {count > 0 ? count : null}{' '}
              {/* <i className={`fas fa-thumbs-up ${liked}`} />{' '} */}
              Like
            </button>
            {fk_user_uid === user_uid ? (
              <Fragment>
                <button
                  type='button'
                  onClick={() => toggleEditTextField(editTextField)}
                  className='btn'
                >
                  <i className='far fa-edit'></i>{' '}
                </button>
                <button
                  onClick={() => onDelete(comment_uid)}
                  type='button'
                  className='btn'
                >
                  <i className='far fa-trash-alt'></i>{' '}
                </button>
              </Fragment>
            ) : null}
          </div>
        </div>
        <div></div>
      </div>
    </div>
  );
}

export default CommentItem;
