import React from 'react';
import { Formik } from 'formik';
import {
  StyledForm,
  Label,
  StyledField,
  Button,
  ErrorMsg,
} from './ContactForm.styled';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
// import { nanoid } from 'nanoid';

const PhonebookSchema = Yup.object().shape({
  name: Yup.string()
    .matches(
      /^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/,
      'Name may contain only letters, apostrophe, dash and spaces.'
    )
    .required('Required')
    .min(2, 'Too Short!')
    .max(50, 'Too Long!'),
  number: Yup.string()
    .matches(
      /\+?\d{1,4}?[ .\-\s]?\(?\d{1,3}?\)?[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,9}/,
      'Phone number must be digits and can contain spaces, dashes, parentheses and can start with +'
    )
    .required('Required')
    .min(2, 'Too Short!')
    .max(50, 'Too Long!'),
});

const ContactForm = ({ onAdd }) => {
  return (
    <Formik
      initialValues={{ name: '', number: '' }}
      validationSchema={PhonebookSchema}
      onSubmit={(values, actions) => {
        onAdd(values);
        actions.resetForm();
      }}
    >
      <StyledForm>
        <Label>
          <StyledField
            name="name"
            type="text"
            placeholder="Enter contact name"
          />
          <ErrorMsg name="name" component="div" />
        </Label>
        <Label>
          <StyledField
            name="number"
            type="tel"
            placeholder="Enter contact number"
          />
          <ErrorMsg name="number" component="div" />
        </Label>
        <Button type="submit">Submit</Button>
      </StyledForm>
    </Formik>
  );
};

// class ContactForm extends Component {
//   state = { name: '', number: '' };

//   nameInputId = nanoid();
//   telInputId = nanoid();

//   handleChange = e => {
//     const { name, value } = e.currentTarget;

//     this.setState({ [name]: value });
//   };

//   handleSubmit = e => {
//     e.preventDefault();

//     const contactId = nanoid();
//     const { name, number } = this.state;
//     const newContact = { name, id: contactId, number };

//     this.props.onSubmit(newContact);
//     this.reset();
//   };

//   reset = () => {
//     this.setState({ name: '', number: '' });
//   };

//   render() {
//     return (
//       <form className={css.formContainer} onSubmit={this.handleSubmit}>
//         <label className={css.formLabel} htmlFor={this.nameInputId}>
//           <input
//             className={css.formInput}
//             onChange={this.handleChange}
//             type="text"
//             name="name"
//             placeholder="Enter contact name"
//             pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
//             title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
//             value={this.state.name}
//             id={this.nameInputId}
//             required
//           />
//         </label>
//         <label className={css.formLabel} htmlFor={this.telInputId}>
//           <input
//             className={css.formInput}
//             onChange={this.handleChange}
//             type="tel"
//             name="number"
//             placeholder="Enter contact number"
//             pattern="\+?\d{1,4}?[ .\-\s]?\(?\d{1,3}?\)?[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,9}"
//             title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
//             value={this.state.number}
//             id={this.telInputId}
//             required
//           />
//         </label>
//         <button className={css.submitButton} type="submit">
//           Add contact
//         </button>
//       </form>
//     );
//   }
// }

export default ContactForm;

ContactForm.propTypes = {
  onAdd: PropTypes.func.isRequired,
};
