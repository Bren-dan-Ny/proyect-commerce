import { useState, useEffect } from "react";
import { useCartStore } from "../stores/useCartStore";
import { useNavigate } from "react-router-dom";

/*modal de procesamiento de pagos*/
function CheckoutModal({ show, onClose }) {
  const [step, setStep] = useState("processing"); // "processing" | "success"
  const clearCart = useCartStore((state) => state.clearCart);
  const navigate = useNavigate();

  useEffect(() => {
    if (show) {
      setStep("processing");
      const timer = setTimeout(() => {
        setStep("success");
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [show]);

  const handleConfirm = () => {
    clearCart();
    onClose();
    navigate("/");
  };

  if (!show) return null;

  return (
    <div
      className="modal d-block"
      style={{
        backgroundColor: "rgba(0,0,0,0.5)",
        animation: "fadeIn 0.3s ease",
      }}
    >
      <div
        className="modal-dialog modal-dialog-centered"
        style={{ animation: "slideUp 0.3s ease" }}
      >
        <div className="modal-content text-center p-4">
          {step === "processing" ? (
            <>
              <div
                className="spinner-border text-danger mx-auto mt-2"
                role="status"
                style={{ width: "3rem", height: "3rem" }}
              >
                <span className="visually-hidden">Cargando...</span>
              </div>
              <h5 className="mt-4 fw-bold">Procesando pago...</h5>
              <p className="text-muted">Por favor espera un momento</p>
            </>
          ) : (
            <>
              <div style={{ fontSize: "4rem", animation: "popIn 0.4s ease" }}>
                <i class="bi bi-check-circle-fill text-success"></i>
              </div>
              <h4 className="mt-3 fw-bold">¡Compra exitosa!</h4>
              <p className="text-muted">
                Tu pedido ha sido procesado correctamente. Recibirás un correo
                con los detalles.
              </p>
              <button className="btn btn-danger mt-2" onClick={handleConfirm}>
                Volver al inicio
              </button>
            </>
          )}
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { transform: translateY(40px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes popIn {
          0% { transform: scale(0); opacity: 0; }
          70% { transform: scale(1.2); }
          100% { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
}

export default CheckoutModal;
