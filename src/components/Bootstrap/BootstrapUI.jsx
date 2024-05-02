import ModalProvider from "./ModalContext";

const BootstrapUI = ({ children }) => {
  return (
    <ModalProvider>
      {children}
    </ModalProvider>
  );
};

export default BootstrapUI;
