import React from 'react';
import { setSearchValue } from '../../redux/slices/filterSlice';

import styles from './Search.module.scss';
import { useDispatch } from 'react-redux';

const Search: React.FC = () => {
  const dispatch = useDispatch();
  const [value, setValue] = React.useState('');

  const inputRef = React.useRef<HTMLInputElement>(null);

  const OnClickClear = () => {
    dispatch(setSearchValue(value));
    setSearchValue('');
    setValue('');
    inputRef.current?.focus();
  };

  const onChangeInput = (event: any) => {
    setValue(event.target.value);
  };

  return (
    <div className={styles.root}>
      <svg
        className={styles.icon}
        height="48"
        viewBox="0 0 48 48"
        width="48"
        xmlns="http://www.w3.org/2000/svg">
        <path d="M31 28h-1.59l-.55-.55C30.82 25.18 32 22.23 32 19c0-7.18-5.82-13-13-13S6 11.82 6 19s5.82 13 13 13c3.23 0 6.18-1.18 8.45-3.13l.55.55V31l10 9.98L40.98 38 31 28zm-12 0c-4.97 0-9-4.03-9-9s4.03-9 9-9 9 4.03 9 9-4.03 9-9 9z" />
        <path d="M0 0h48v48H0z" fill="none" />
      </svg>
      <input
        ref={inputRef}
        value={value}
        onChange={onChangeInput}
        className={styles.input}
        placeholder="Поиск пиццы..."
      />
      {value && (
        <svg onClick={OnClickClear} className={styles.clearIcon}>
          <g fill="#000000" id="Core" transform="translate(-341.000000, -89.000000)">
            <g id="close" transform="translate(341.000000, 89.000000)">
              <path
                d="M14,1.4 L12.6,0 L7,5.6 L1.4,0 L0,1.4 L5.6,7 L0,12.6 L1.4,14 L7,8.4 L12.6,14 L14,12.6 L8.4,7 L14,1.4 Z"
                id="Shape"
              />
            </g>
          </g>
        </svg>
      )}
    </div>
  );
};
export default Search;
