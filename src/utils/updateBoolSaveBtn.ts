import Block from '../framework/Block';

export const updateBoolSaveBtn = (currentThis: Block, value: boolean) => {
  currentThis.setProps &&
    currentThis.setProps({
      ...currentThis.props,
      props: {
        ...currentThis.props?.props,
        contextProfile: {
          ...currentThis.props.props?.contextProfile,
          saveButton: value,
        },
      },
    });
};
