import { bpmUrl } from 'utils/constants';

const CRApproverSetting = () => {
  const src = bpmUrl.concat('ChangeRequestApprover');
  return (
    <div className="py-40">
      <div className="pt-0">
        <iframe frameBorder="0" width="100%" height="700px" seamless title="CR Approver Setting" src={src}></iframe>
      </div>
    </div>
  );
};

export default CRApproverSetting;
