import useForm from '../../hooks/useForm';
import Button from '../Button/Button';
import Form from '../Form/Form';
import './styles.css';

function Main() {
  const { isOpen, open: openForm, close: closeForm } = useForm();
  return (
    <main className="main">
      <div className="first-line">
        A better way
        <br />
        to enjoy every day.
      </div>
      <div className="second-line">Be the first to know when we launch.</div>
      <div>
        <Button text="Request an invite" onClick={openForm} />
      </div>
      <div className={isOpen ? 'overlay' : ''}>
        <Form
          isOpen={isOpen}
          openForm={openForm}
          closeForm={closeForm}
          onSuccess={openForm}
        />
      </div>
    </main>
  );
}

export default Main;
