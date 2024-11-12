import { useCallback, useState } from "react";
import PropTypes from "prop-types";
import Field, { FIELD_TYPES } from "../../components/Field";
import Select from "../../components/Select";
import Button, { BUTTON_TYPES } from "../../components/Button";

const mockContactApi = () =>
  new Promise((resolve) => {
    setTimeout(resolve, 500);
  });

const Form = ({ onSuccess, onError }) => {
  const [sending, setSending] = useState(false);

  const sendContact = useCallback(
    async (evt) => {
      evt.preventDefault();
      setSending(true);
      try {
        await mockContactApi();
        setSending(false);
        onSuccess(); // ajout de onSuccess pour quand l'envoi du formulaire est réussi
      } catch (err) {
        setSending(false);
        onError(err);
      }
    },
    [onSuccess, onError]
  );

  return (
    <form onSubmit={sendContact}>
      <div className="row">
        <div className="col">
          <Field
            placeholder="Entrez votre nom" // ajout
            label="Nom"
            name="name" // ajout
            id="name" // ajout
            required // ajout
            autocomplete="family-name" // ajout
          />
          <Field
            placeholder="Entrez votre prénom"
            label="Prénom"
            name="firstName"
            id="firstName"
            required
            autocomplete="given-name"
          />
          <Select
            selection={["Personel", "Entreprise"]}
            onChange={() => null}
            label="Personel / Entreprise"
            type="large"
            titleEmpty
          />
          <Field
            placeholder="Entrez votre email"
            label="Email"
            type={FIELD_TYPES.EMAIL} // ajout
            name="email"
            id="email"
            required
            autocomplete="email"
          />
          <Button
            type={BUTTON_TYPES.SUBMIT}
            disabled={sending}
            data-testid="button-test-id"
          >
            {sending ? "En cours" : "Envoyer"}
          </Button>
        </div>
        <div className="col">
          <Field
            placeholder="Entrez votre message"
            label="Message"
            type={FIELD_TYPES.TEXTAREA}
            name="message"
            id="message"
            required
            autocomplete="off" // ajout
          />
        </div>
      </div>
    </form>
  );
};

Form.propTypes = {
  onError: PropTypes.func,
  onSuccess: PropTypes.func,
};

Form.defaultProps = {
  onError: () => null,
  onSuccess: () => null,
};

export default Form;
