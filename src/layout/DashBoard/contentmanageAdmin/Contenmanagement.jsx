import  { useState, useRef, useMemo } from 'react';
import JoditEditor from 'jodit-react';
import Swal from 'sweetalert2';
import { useForm } from 'react-hook-form';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useNavigate } from 'react-router-dom';

const ContentManagement = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const { register, handleSubmit, reset, watch, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      const imageFile = { image: data.image[0] };
      const res = await axiosSecure.post('https://api.imgbb.com/1/upload?key=1d6fdf8c502424c419510b9f0a67a7f8', imageFile, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (res.data.success) {
        const blogData = {
          title: data.title,
          thumbnail: res.data.data.display_url,
          content: data.content,
          status: 'draft', 
        };

        // Assuming you have an endpoint to create a new blog
        const blogRes = await axiosSecure.post('/blogs', blogData);

        if (blogRes.data.insertedId) {
          reset();
          Swal.fire({
            position: 'top-center',
            icon: 'success',
            title: `Blog created successfully.`,
            showConfirmButton: false,
            timer: 1500,
          });
          navigate('/dashboard/admin');
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const editor = useRef(null);
  const [content, setContent] = useState('');

  const config = useMemo(
    () => ({
      readonly: false,
      placeholder: 'Start typing...', // Default placeholder if none provided
    }),
    []
  );

  return (
    <div>
      <p>This is the content management route for admin.</p>

      <JoditEditor
        ref={editor}
        value={content}
        config={config}
        tabIndex={1}
        onBlur={(newContent) => setContent(newContent)}
        onChange={(newContent) => {
          // Handle content change if needed
          // You can perform additional actions when the content changes
        }}
      />

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-control w-full py-3 mb-2 max-w-xs">
          <label className="block mb-2 text-sm font-bold text-gray-700 dark:text-white" htmlFor="title">
            Title:
          </label>
          <input {...register('title', { required: true })} type="text" className="input" />
          {errors.title?.type === 'required' && <p className="text-red-600">Title is required</p>}
        </div>

        <div className="form-control w-full py-3 mb-2 max-w-xs">
          <label
            className="block mb-2 text-sm font-bold text-gray-700 dark:text-white"
            htmlFor="thumbnail"
          >
            Thumbnail Image (150 x 150 pixels):
          </label>
          <input
            {...register('image', { required: true })}
            type="file"
            className="file-input w-full"
          />
          {errors.image?.type === 'required' && (
            <p className="text-red-600" role="alert">
              Image is required
            </p>
          )}
        </div>

        <div className="form-control w-full py-3 mb-2 max-w-xs">
          <label
            className="block mb-2 text-sm font-bold text-gray-700 dark:text-white"
            htmlFor="content"
          >
            Content:
          </label>
          {/* Assuming you have a "content" field in your form */}
          <textarea
            {...register('content', { required: true })}
            className="textarea"
            rows="5"
          ></textarea>
          {errors.content?.type === 'required' && (
            <p className="text-red-600" role="alert">
              Content is required
            </p>
          )}
        </div>

        <button type="submit" className="btn">
          Create Blog
        </button>
      </form>
    </div>
  );
};

export default ContentManagement;
