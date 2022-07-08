import { bpmUrl } from 'utils/constants';

const src = bpmUrl.concat('PersetujuanAnggaranBiaya?userId=user.df@gmail.com');
const SDIWiki = () => {
  return (
    <div>
      <iframe frameBorder="0" width="100%" height="700px" seamless title="Wiki" src={src}></iframe>
    </div>
  );
};

export default SDIWiki;
