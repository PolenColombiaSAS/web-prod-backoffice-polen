import { useEffect, useRef, useState } from 'react';
import Swal from 'sweetalert2';
import { useAuthContext } from 'context/auth';

const InactivityHandler = ({ timeout = 300000, modalTimeout = 15000 }) => {
  const [isActive, setIsActive] = useState(true);
  const { logOut } = useAuthContext();
  const timerRef = useRef();

  useEffect(() => {
    window.addEventListener('mousemove', handleActivity);
    window.addEventListener('keydown', handleActivity);
    window.addEventListener('scroll', handleActivity);

    handleActivity();

    return () => {
      clearTimeout(timerRef.current);
      window.removeEventListener('mousemove', handleActivity);
      window.removeEventListener('keydown', handleActivity);
      window.removeEventListener('scroll', handleActivity);
    };
  }, [timeout]);


  const handleActivity = () => {
    if(isActive){
      clearTimeout(timerRef.current);
      setIsActive(true);
      timerRef.current = setTimeout(() => setIsActive(false), timeout);
    }
  };

  useEffect(() => {
    if (!isActive) {
      mostrarSweetAlert()
    }
  }, [isActive, modalTimeout]);

  const mostrarSweetAlert = async () => {
    let secondsLeft = modalTimeout / 1000;
    const interval = setInterval(() => {
      if (Swal.isVisible()) { // Verifica si SweetAlert está visible antes de actualizar
        Swal.update({
          confirmButtonText: `Sí, seguir conectado (${secondsLeft} segundos)`,
        });
        secondsLeft -= 1;
      } else {
        clearInterval(interval); // Limpia el intervalo si SweetAlert ya no es visible
      }
    }, 1000);

    const swalPromise = await Swal.fire({
      title: '¿Sigues ahí?',
      text: "Parece que has estado inactivo por un tiempo. ¿Quieres seguir conectado?",
      icon: 'warning',
      confirmButtonText: `Sí, seguir conectado (${secondsLeft} segundos)`,
      reverseButtons: true,
      allowOutsideClick: false,
      timer: modalTimeout,
      willClose: () => {
        clearInterval(interval);
      }
    })

    if (!swalPromise?.isConfirmed) {
      setIsActive(true);
    }
    if (swalPromise.dismiss === Swal.DismissReason.timer) {
      logOut()
    }
  }
  return null;
};

export default InactivityHandler;
