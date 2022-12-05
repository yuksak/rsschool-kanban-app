import API from 'api/base';
import { ColumnInterface } from 'api/currentBoard/columnsApi.types';
import { TaskInterface } from 'api/currentBoard/tasksApi.types';
import React, { useEffect, FC, useState } from 'react';

import { FiSearch } from 'react-icons/fi';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
// import { useAppDispatch } from 'store/hooks';
import { setColumns, setTasks } from 'store/slices/currentBoardSlice';
import { RootState } from 'store/store';
import styles from './index.module.scss';

const SearchBar = () => {
  const [input, setInput] = useState<string>('');
  const dispatch = useDispatch();
  const { columns } = useSelector((state: RootState) => state.currentBoard);
  const { boardId } = useParams();

  const searchHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const submitHandler = async () => {
    if (input) {
      const tasks = await API.get(`/tasksSet/?search=${input}`);

      if (tasks.data) {
        const ids = tasks.data.map((task: TaskInterface) => {
          return task.columnId;
        });
        const fetchedColumns = await API.get(`/columnsSet/?ids=${ids}`);

        if (fetchedColumns.data) {
          // console.log(columns);
          // console.log(fetchedColumns.data);
          dispatch(setColumns(fetchedColumns.data));
          // setGlobalColumns(fetchedColumns.data);
        }
      }
    }
  };

  const keyboardHandler = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') submitHandler();
  };

  return (
    <div className={styles.search} data-testid="search-bar">
      <input
        type="search"
        placeholder="Search"
        className={styles.searchInput}
        value={input}
        onChange={searchHandler}
        onKeyDown={keyboardHandler}
        data-testid="search-input"
      />
      <button type="button" className={styles.submitButton} onClick={submitHandler} data-testid="search-button">
        <FiSearch />
      </button>
    </div>
  );
};

export default SearchBar;
