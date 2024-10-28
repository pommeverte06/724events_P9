import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Form from "./index";

describe("When the Form is created", () => {
  it("displays all the input fields", async () => {
    render(<Form />);
    // verif éléments bien présents
    await screen.findByText("Email");
    await screen.findByText("Nom");
    await screen.findByText("Prénom");
    await screen.findByText("Personel / Entreprise");
  });

  describe("and a click is triggered on the submit button", () => {
    it("the success action is called", async () => {
      const onSuccess = jest.fn(); // mock de la fonction onSuccess
      render(<Form onSuccess={onSuccess} />);

      fireEvent.change(screen.getByPlaceholderText("Entrez votre email"), {
        target: { value: "test@example.com" },
      });

      fireEvent.click(screen.getByText("Envoyer"));

      await screen.findByText("En cours");

      // waitFor pour attendre que la fonction onSuccess soit appelée
      await waitFor(() => {
        expect(onSuccess).toHaveBeenCalled();
      });
    });
  });
});
