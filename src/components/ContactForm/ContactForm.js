import { Formik, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { AddContactBtn, FieldInput, FormContacts, FormLabel } from './ContactForm.styled';


const phoneRegExp = /^(\+?\d+)?\s*(\(\d+\))?[\s-]*([\d-]*)$/;
const nameRegExp = /^(([a-zA-Z' -]{1,80})|([а-яА-ЯЁёІіЇїҐґЄє' -]{1,80}))$/u;

const ContactSchema = Yup.object().shape({
	firstName: Yup.string()
		.matches(nameRegExp,
			'Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz.')
		.min(2, 'Too Short!')
		.required('Required'),
	tel: Yup.string()
		.matches(phoneRegExp, 'Phone number is not valid!')
		.min(16, "Too short!")
		.max(16, "Too long!")
		.required('Required'),
});

export const ContactForm = ({ onAddContact }) => {
	return (
		<div>
			<Formik
				initialValues={{
					firstName: '',
					tel: '',
				}}
				validationSchema={ContactSchema}
				onSubmit={(values, actions) => {
					onAddContact(values);
					actions.resetForm();
				}}
			>
				<FormContacts>
					<FormLabel htmlFor="firstName">Name</FormLabel>
					<FieldInput id="firstName" name="firstName" placeholder="" />
					<ErrorMessage name="firstName" />

					<FormLabel htmlFor="tel">Number</FormLabel>
					<FieldInput id="tel" name="tel" placeholder="+XXXXX-XXX-XX-XX" type="tel" />
					<ErrorMessage name="tel" />

					<AddContactBtn type="submit">Add contact</AddContactBtn>
				</FormContacts>
			</Formik>
		</div>
	);
};
