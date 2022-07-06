import { bpmUrl } from 'utils/constants';

const SDIWiki = () => {
  const src = bpmUrl.concat('Artikel');
  return (
    <div className="py-40">
      <div className="pt-0">
        <iframe frameBorder="0" width="100%" height="700px" seamless title="SDI Wiki" src={src}></iframe>
      </div>
    </div>
  );
};

export default SDIWiki;
