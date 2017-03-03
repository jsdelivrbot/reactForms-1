import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPost } from '../actions/index';
import { Link } from 'react-router';

class PostsShow extends Component {
  componentWillMount(){
    this.props.fetchPost(this.props.params.id);
  }

  render(){
    const post = this.props.post;

    if(!post){
      return <div>Loading...</div>;
    }

    return(
      <div>
        <h3>{ post.title }</h3>
        <h6>Categories: { post.categories}</h6>
        <p>{ post.content }</p>

        <Link to="/" className="btn btn-primary">Back To Home</Link>
      </div>
    );
  }
}

function mapStateToProps(state){
  return { post: state.posts.post };
}

export default connect(mapStateToProps, { fetchPost })(PostsShow);
