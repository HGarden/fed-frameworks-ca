import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import './contactPage.css';

function Contact() {
  const schema = yup.object().shape({
    name: yup.string().min(3).required(),
    subject: yup.string().min(3).required(),
    email: yup.string().email('Invalid email').required(),
    message: yup.string().min(3).required(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  function onSubmit(data){
    console.log(data);
  };

  return (
    <div className='form-container'>
    <div className='form-wrapper'>
      <h1>Contact</h1>
      <form className='form' onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="name">Name</label>
          <input type="text"  {...register('name')} />
          <p>{errors.name?.message}</p>
        </div>
        <div>
          <label htmlFor="subject">Subject</label>
          <input type="text"  {...register('subject')} />
          <p>{errors.name?.message}</p>
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input type="email" name="email" {...register('email')} />
          <p>{errors.email?.message}</p>
        </div>
        <div className='text-container'>
          <label htmlFor="message">Message</label>
          <textarea name="message" {...register('message')}></textarea>
          <p>{errors.message?.message}</p>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
    </div>
  );
}

export default Contact;