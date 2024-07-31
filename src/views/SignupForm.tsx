import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { apiRootPath } from '../conf/backendStatus';

interface SignUpFormProps {
  closeModal: () => void;
}

const SignUpForm: React.FC<SignUpFormProps> = ({ closeModal }) => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const onSubmit = async (data: any) => {
    try {
      data.isForBeta = true;
      const response = await axios.post(`${apiRootPath}/account/signup`, data);
      console.log('Réponse du serveur:', response.data);
      reset();
      closeModal();
    } catch (error) {
      console.error('Erreur lors de la soumission du formulaire:', error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      style={{ display: 'flex', flexDirection: 'column' }}
    >
      <div style={{ marginBottom: '15px' }}>
        <label style={{ fontWeight: 'bold' }}>Email</label>
        <input
          type={'email'}
          {...register('email', {
            required: 'Email est requis',
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: 'Email invalide'
            }
          })}
          style={{
            padding: '8px',
            fontSize: '14px',
            border: '1px solid #ccc',
            borderRadius: '4px'
          }}
        />
      </div>

      <div style={{ marginBottom: '15px' }}>
        <label style={{ fontWeight: 'bold' }}>Prénom</label>
        <input
          type={'text'}
          {...register('firstName', { required: 'Prénom est requis' })}
          style={{
            padding: '8px',
            fontSize: '14px',
            border: '1px solid #ccc',
            borderRadius: '4px'
          }}
        />
      </div>

      <div style={{ marginBottom: '15px' }}>
        <label style={{ fontWeight: 'bold' }}>Nom</label>
        <input
          type={'text'}
          {...register('lastName', { required: 'Nom est requis' })}
          style={{
            padding: '8px',
            fontSize: '14px',
            border: '1px solid #ccc',
            borderRadius: '4px'
          }}
        />
      </div>

      <div style={{ marginBottom: '15px' }}>
        <label style={{ fontWeight: 'bold' }}>Date de Naissance (DD/MM/YYYY)</label>
        <input
          type={'text'}
          {...register('bornDate', {
            required: 'Date de naissance est requise',
            pattern: {
              value: /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/,
              message: 'Date invalide (format DD/MM/YYYY)'
            }
          })}
          style={{
            padding: '8px',
            fontSize: '14px',
            border: '1px solid #ccc',
            borderRadius: '4px'
          }}
        />
      </div>

      <div style={{ marginBottom: '15px' }}>
        <label style={{ fontWeight: 'bold' }}>Mot de Passe</label>
        <input
          type={'password'}
          {...register('password', { required: 'Mot de passe est requis' })}
          style={{
            padding: '8px',
            fontSize: '14px',
            border: '1px solid #ccc',
            borderRadius: '4px'
          }}
        />
      </div>

      <button
        type={'submit'}
        style={{
          padding: '10px 20px',
          fontSize: '16px',
          backgroundColor: '#28a745',
          color: '#fff',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          marginTop: '10px'
        }}
      >
        S&apos;inscrire
      </button>
    </form>
  );
};

export default SignUpForm;
