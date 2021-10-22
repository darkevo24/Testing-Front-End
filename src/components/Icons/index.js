const types = {
  danger: 'red',
  dim: 'gray-dark',
  light: 'gray-light',
  dark: 'black-dark',
};

const getColor = (details) => types[details.variant] || types.dim;

export const Edit = (props) => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M15.7652 3.11426L12.8851 0.234232C12.7351 0.0842531 12.5317 0 12.3195 0C12.1074 0 11.9039 0.0842531 11.7539 0.234232L1.67381 10.3143C1.58586 10.402 1.51981 10.5092 1.48101 10.6271L0.0409933 14.9472C0.00095752 15.0674 -0.00995689 15.1954 0.00914861 15.3206C0.0282541 15.4459 0.0768332 15.5648 0.150887 15.6676C0.22494 15.7704 0.32235 15.8541 0.435097 15.9119C0.547845 15.9697 0.672706 15.9999 0.799401 16C0.885298 15.9999 0.970628 15.9861 1.0522 15.9592L5.37225 14.5192C5.48997 14.48 5.59684 14.4136 5.68425 14.3256L15.7644 4.24547C15.9144 4.09556 15.9988 3.89217 15.999 3.68003C15.9991 3.4679 15.915 3.26439 15.7652 3.11426ZM4.68744 13.0608L2.06421 13.9352L2.93862 11.3119L12.3195 1.93105L14.0683 3.67987L4.68744 13.0608Z"
      fill={`var(--${getColor(props)})`}
    />
  </svg>
);
export const Trash = (props) => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M15.2722 2.90909H11.6359V0.727273C11.6359 0.534388 11.5593 0.349403 11.4229 0.213013C11.2865 0.0766231 11.1015 0 10.9086 0H5.09042C4.89754 0 4.71255 0.0766231 4.57616 0.213013C4.43977 0.349403 4.36315 0.534388 4.36315 0.727273V2.90909H0.726784C0.5339 2.90909 0.348915 2.98571 0.212525 3.1221C0.0761348 3.25849 -0.000488281 3.44348 -0.000488281 3.63636C-0.000488281 3.82925 0.0761348 4.01423 0.212525 4.15062C0.348915 4.28701 0.5339 4.36364 0.726784 4.36364H1.53915L2.91442 15.3629C2.9364 15.5388 3.02184 15.7006 3.15468 15.8179C3.28753 15.9352 3.45864 16 3.63588 16H12.3631C12.5404 16 12.7115 15.9352 12.8443 15.8179C12.9772 15.7006 13.0626 15.5388 13.0846 15.3629L14.4599 4.36364H15.2722C15.4651 4.36364 15.6501 4.28701 15.7865 4.15062C15.9229 4.01423 15.9995 3.82925 15.9995 3.63636C15.9995 3.44348 15.9229 3.25849 15.7865 3.1221C15.6501 2.98571 15.4651 2.90909 15.2722 2.90909ZM5.81769 1.45455H10.1813V2.90909H5.81769V1.45455ZM11.721 14.5455H4.27806L3.00533 4.36364H12.9937L11.721 14.5455Z"
      fill={`var(--${getColor(props)})`}
    />
  </svg>
);

export const LeftChevron = (props) => (
  <svg width="7" height="11" viewBox="0 0 7 11" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M4.99979 11.0001C5.19754 11 5.39083 10.9414 5.55524 10.8315C5.71966 10.7216 5.84779 10.5654 5.92346 10.3827C5.99913 10.2 6.01894 9.999 5.98037 9.80505C5.9418 9.6111 5.8466 9.43293 5.70679 9.29308L2.41379 6.00008L5.70679 2.70708C5.8023 2.61483 5.87848 2.50449 5.93089 2.38249C5.9833 2.26048 6.01088 2.12926 6.01204 1.99648C6.01319 1.8637 5.98789 1.73202 5.93761 1.60913C5.88733 1.48623 5.81307 1.37458 5.71918 1.28069C5.62529 1.18679 5.51364 1.11254 5.39074 1.06226C5.26784 1.01198 5.13616 0.986677 5.00339 0.987831C4.87061 0.988985 4.73939 1.01657 4.61738 1.06898C4.49538 1.12139 4.38503 1.19757 4.29279 1.29308L0.292786 5.29308C0.105315 5.48061 0 5.73492 0 6.00008C0 6.26525 0.105315 6.51955 0.292786 6.70708L4.29279 10.7071C4.48028 10.8946 4.73459 11 4.99979 11.0001Z"
      fill={`var(--${getColor(props)})`}
    />
  </svg>
);

export const RightChevron = (props) => (
  <svg width="7" height="10" viewBox="0 0 7 10" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M6.01207 5.01229C6.01207 4.74712 5.90676 4.49282 5.71929 4.30529L1.71929 0.305288C1.62704 0.209778 1.5167 0.133596 1.39469 0.0811869C1.27269 0.0287779 1.14147 0.00119157 1.00869 3.7757e-05C0.87591 -0.00111606 0.744232 0.0241854 0.621336 0.0744663C0.498439 0.124747 0.386787 0.199 0.292894 0.292893C0.199001 0.386786 0.124747 0.498438 0.0744663 0.621334C0.0241854 0.744231 -0.00111606 0.87591 3.77571e-05 1.00869C0.00119157 1.14147 0.0287788 1.27269 0.0811878 1.39469C0.133597 1.5167 0.209778 1.62704 0.305288 1.71929L3.59829 5.01229L0.305288 8.30529C0.12313 8.49389 0.0223355 8.74649 0.0246139 9.00869C0.0268924 9.27089 0.132062 9.5217 0.31747 9.70711C0.502878 9.89252 0.753691 9.99768 1.01589 9.99996C1.27808 10.0022 1.53069 9.90145 1.71929 9.71929L5.71929 5.71929C5.90676 5.53176 6.01207 5.27745 6.01207 5.01229Z"
      fill={`var(--${getColor(props)})`}
    />
  </svg>
);

export const Search = (props) => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M1.88659 10.9924C2.99501 12.1021 4.47108 12.7682 6.03671 12.8654C7.60235 12.9625 9.14948 12.4839 10.3866 11.5198L14.6435 15.7754C14.7944 15.9211 14.9966 16.0018 15.2065 16C15.4164 15.9981 15.6171 15.914 15.7656 15.7656C15.914 15.6173 15.9981 15.4165 16 15.2067C16.0018 14.9969 15.9211 14.7948 15.7753 14.6439L11.5185 10.3883C12.5257 9.09605 13.0019 7.46839 12.8499 5.83723C12.698 4.20608 11.9294 2.6943 10.7008 1.61022C9.47223 0.526132 7.87627 -0.0486034 6.2384 0.00322354C4.60053 0.0550504 3.04412 0.729536 1.88659 1.88912C1.28849 2.48675 0.814029 3.19632 0.490321 3.97731C0.166613 4.7583 0 5.5954 0 6.44078C0 7.28617 0.166613 8.12327 0.490321 8.90425C0.814029 9.68525 1.28849 10.3948 1.88659 10.9924ZM3.01844 3.02224C3.80974 2.23118 4.85094 1.73888 5.96462 1.62921C7.07829 1.51954 8.19556 1.7993 9.12605 2.42081C10.0565 3.04232 10.7427 3.96714 11.0676 5.03769C11.3925 6.10824 11.336 7.25829 10.9079 8.2919C10.4797 9.32552 9.70627 10.1787 8.71939 10.7062C7.7325 11.2337 6.59321 11.4027 5.49562 11.1846C4.39803 10.9664 3.41005 10.3746 2.70001 9.50991C1.98997 8.6452 1.6018 7.56113 1.60163 6.44238C1.59943 5.80667 1.72354 5.17684 1.96675 4.58946C2.20997 4.00207 2.56744 3.46882 3.01844 3.02064V3.02224Z"
      fill={`var(--${getColor(props)})`}
    />
  </svg>
);

export const actionIcons = {
  edit: Edit,
  trash: Trash,
};
