import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { createPost } from '../actions/index';
import { Link } from 'react-router';

class PostsNew extends Component{
  //in general, avoid using context
  static contextTypes = {
    router: PropTypes.object
  };

  onSubmit(props){
    this.props.createPost(props)
    .then( () => {
      //blog post has been created, nvaigate user to index
      //we navigate by calling this.context.router.push with
      //the new path to navigate to
      this.context.router.push('/');
    });
  }

  render(){
    const handleSubmit = this.props.handleSubmit;
    //fields available in props due to Line 35
    const title = this.props.fields.title;
    const categories = this.props.fields.categories;
    const content = this.props.fields.content;

    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <h3>Create A New Post</h3>
        <div className={`form-group ${title.touched && title.invalid ? 'has-danger' : ''}`}>
          <label>Title</label>
          <input type="text" className="form-control" {...title}/>
          <div className="text-help">
            {title.touched ? title.error : ''}
          </div>
        </div>
        <div className={`form-group ${categories.touched && categories.invalid ? 'has-danger' : ''}`}>
          <label>Categories</label>
          <input type="text" className="form-control" {...categories}/>
          <div className="text-help">
            {categories.touched ? categories.error : ''}
          </div>
        </div>
        <div className="form-group">
          <label>Content</label>
          <textarea className="form-control" {...content}/>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
        <Link to="/" className="btn btn-danger">Cancel</Link>
      </form>
    );
  }
}

//build and return errors object for form-validation
function validate(values){
  //create object
  const errors={};

  if(!values.title){
    errors.title = 'Enter a username';
  }

  if(!values.categories){
    errors.categories = 'Enter categories';
  }

 return errors;
}

//connect: first args = mapStateToProps, second = mapDispatchToProps
//reduxForm: first args = form config, second = mapStateToProps, third= mapDispatchToProps
export default reduxForm({
  form: 'PostsNewForm',
  fields:['title', 'categories', 'content'], //injects these 3 into props object
  validate
}, null, { createPost })(PostsNew);
