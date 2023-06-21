const CommentBox = () => {
    return (
        <div className='comments_box'>
            <h3>3 Comments </h3>
            <div className='comment_list'>
                <div className='comment-author-thumb'>
                    <img src='assets/img/blog/comment2.png.jpg' alt='' />
                </div>
                <div className='comment_content'>
                    <div className='comment_meta'>
                        <div className='comment_title'>
                            <h5>
                                <a href='#'>Admin</a>
                            </h5>
                            <span>October 16, 2018 at 1:38 am</span>
                        </div>
                    </div>
                    <p>
                        But I must explain to you how all this mistaken idea of
                        denouncing pleasure
                    </p>
                    <div className='comment_reply'>
                        <a href='#'>Reply</a>
                    </div>
                </div>
            </div>
            <div className='comment_list comment_border'>
                <div className='comment-author-thumb'>
                    <img src='assets/img/blog/comment3.png.jpg' alt='' />
                </div>
                <div className='comment_content'>
                    <div className='comment_meta'>
                        <div className='comment_title'>
                            <h5>
                                <a href='#'>Demo</a>
                            </h5>
                            <span>October 16, 2018 at 1:38 am</span>
                        </div>
                    </div>
                    <p>
                        Quisque semper nunc vitae erat pellentesque, ac placerat
                        arcu consectetur
                    </p>
                    <div className='comment_reply'>
                        <a href='#'>Reply</a>
                    </div>
                </div>
            </div>
            <div className='comment_list'>
                <div className='comment-author-thumb'>
                    <img src='assets/img/blog/comment2.png.jpg' alt='' />
                </div>
                <div className='comment_content'>
                    <div className='comment_meta'>
                        <div className='comment_title'>
                            <h5>
                                <a href='#'>Admin</a>
                            </h5>
                            <span>October 16, 2018 at 1:38 am</span>
                        </div>
                    </div>
                    <p>
                        Quisque orci nibh, porta vitae sagittis sit amet,
                        vehicula vel mauris. Aenean at
                    </p>
                    <div className='comment_reply'>
                        <a href='#'>Reply</a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CommentBox;
