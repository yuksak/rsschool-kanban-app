import React from 'react';

import styles from './ModalWindow.module.scss';
import { ModalWindowProps } from './ModalWindow.types';

const ModalWindow = ({ type, actions, children }: ModalWindowProps) => {
  const handleClickCloseWindow = (event: React.SyntheticEvent) => {
    event.stopPropagation();
    const { target } = event;

    if ((target as HTMLElement).id === 'modalWindow' || (target as HTMLElement).id === 'denyButton') {
      actions.closeWindow();
    }
  };

  const handleClickConfirm = (event: React.SyntheticEvent) => {
    event.preventDefault();
    if (actions.confirmAction) {
      actions.confirmAction();
    }
    actions.closeWindow();
  };

  return (
    <div
      id="modalWindow"
      className={styles.main}
      onClick={handleClickCloseWindow}
      onKeyDown={handleClickCloseWindow}
      role="presentation"
    >
      <form
        onSubmit={type === 'modification' ? actions.confirmAction : handleClickConfirm}
        className={styles.container}
      >
        {children}
        <div className={styles.controls}>
          {type === 'information' && (
            <button
              className={`${styles.button} ${styles.denyButton}`}
              id="denyButton"
              type="button"
              aria-label="Close"
              onClick={handleClickCloseWindow}
            >
              Close
            </button>
          )}

          {type !== 'information' && (
            <>
              <button
                className={`${styles.button} ${styles.confirmButton}`}
                type="submit"
                aria-label={type === 'confirmation' ? 'Confirm' : 'Save'}
              >
                {type === 'confirmation' ? 'Confirm' : 'Save'}
              </button>
              <button
                className={`${styles.button} ${styles.denyButton}`}
                id="denyButton"
                type="button"
                aria-label={type === 'confirmation' ? 'Deny' : 'Cancel'}
                onClick={handleClickCloseWindow}
              >
                {type === 'confirmation' ? 'Deny' : 'Cancel'}
              </button>
            </>
          )}
        </div>
      </form>
    </div>
  );
};

export { ModalWindow };
