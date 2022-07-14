import { bpmUrl } from 'utils/constants';

const RegistrasiMenuPengguna = () => {
  const src = bpmUrl.concat('RegistrasiPengguna');
  return (
    <div className="">
      <div className="pt-0">
        <iframe
          rameBorder="0"
          width="100%"
          height="1200px"
          seamless
          title="Registrasi Pengguna"
          scrolling="no"
          src={src}></iframe>
      </div>
    </div>
  );
};

export default RegistrasiMenuPengguna;
